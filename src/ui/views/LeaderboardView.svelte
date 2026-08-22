<script lang="ts">
  import { onMount } from 'svelte';
  import type { IApiClient, LeaderboardResponse } from '../../contracts/api';

  let { apiClient }: { apiClient: IApiClient } = $props();

  const categories = [
    { id: '', label: 'GENERAL' },
    { id: 'LOGIC', label: 'LÓGICA' },
    { id: 'MATH', label: 'MATEMÁTICAS' },
    { id: 'MEMORY', label: 'MEMORIA' },
    { id: 'VISUAL', label: 'VISUAL' }
  ];

  let selectedCategory = $state('');
  let currentPage = $state(1);
  let leaderboardData = $state<LeaderboardResponse | null>(null);
  let isLoading = $state(false);
  let errorMessage = $state('');

  const fetchLeaderboard = async () => {
    isLoading = true;
    errorMessage = '';
    try {
      leaderboardData = await apiClient.getLeaderboard(
        currentPage,
        selectedCategory || undefined
      );
    } catch (error: any) {
      errorMessage = 'Error al sincronizar la tabla de clasificaciones.';
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    fetchLeaderboard();
  });

  const selectCategory = (categoryId: string) => {
    if (selectedCategory === categoryId) return;
    selectedCategory = categoryId;
    currentPage = 1;
    fetchLeaderboard();
  };

  const changePage = (newPage: number) => {
    if (!leaderboardData) return;
    if (newPage < 1 || newPage > leaderboardData.total_pages) return;
    currentPage = newPage;
    fetchLeaderboard();
  };
</script>

<div class="leaderboard-container">
  <!-- Pestañas de Filtro -->
  <header class="category-tabs">
    {#each categories as category}
      <button
        class="tab-btn {selectedCategory === category.id ? 'active' : ''}"
        onclick={() => selectCategory(category.id)}
      >
        {category.label}
      </button>
    {/each}
  </header>

  <!-- Panel Personal del Jugador -->
  <section class="user-summary-card">
    {#if leaderboardData?.current_user}
      <div class="user-info">
        <span class="user-label">TU POSICIÓN ACTUAL</span>
        <span class="user-rank">#{leaderboardData.current_user.rank}</span>
      </div>
      <div class="user-details">
        <span class="user-name">{leaderboardData.current_user.username}</span>
        <span class="user-score">{leaderboardData.current_user.score} PTS</span>
      </div>
    {:else}
      <div class="user-empty-state">
        <p>¡Juega tu primera partida para aparecer en el ranking!</p>
      </div>
    {/if}
  </section>

  <!-- Tabla de Posiciones / Contenido -->
  <section class="table-wrapper">
    {#if isLoading}
      <div class="state-message">
        <p class="loading-text">CARGANDO MATRIZ DE POSICIONES...</p>
      </div>
    {:else if errorMessage}
      <div class="state-message error">
        <p>{errorMessage}</p>
      </div>
    {:else if leaderboardData && leaderboardData.entries.length > 0}
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th class="col-rank">POS</th>
            <th class="col-user">ENTIDAD / JUGADOR</th>
            <th class="col-score">PUNTAJE</th>
          </tr>
        </thead>
        <tbody>
          {#each leaderboardData.entries as entry}
            <tr class={leaderboardData.current_user?.username === entry.username ? 'highlight' : ''}>
              <td class="col-rank">
                <span class="rank-badge rank-{entry.rank}">{entry.rank}</span>
              </td>
              <td class="col-user">{entry.username}</td>
              <td class="col-score">{entry.score}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <div class="state-message">
        <p>No hay registros disponibles para esta categoría.</p>
      </div>
    {/if}
  </section>

  <!-- Barra de Paginación -->
  {#if leaderboardData && leaderboardData.total_pages > 1}
    <footer class="pagination-bar">
      <button
        class="page-btn"
        disabled={currentPage <= 1 || isLoading}
        onclick={() => changePage(currentPage - 1)}
      >
        &lt; ANTERIOR
      </button>
      <span class="page-indicator">
        PÁGINA {leaderboardData.current_page} DE {leaderboardData.total_pages}
      </span>
      <button
        class="page-btn"
        disabled={currentPage >= leaderboardData.total_pages || isLoading}
        onclick={() => changePage(currentPage + 1)}
      >
        SIGUIENTE &gt;
      </button>
    </footer>
  {/if}
</div>

<style>
  .leaderboard-container {
    width: 100%;
    max-width: 900px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-sizing: border-box;
  }

  .category-tabs {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 229, 255, 0.2);
  }

  .tab-btn {
    background: transparent;
    border: 1px solid rgba(0, 229, 255, 0.3);
    color: var(--color-text-muted);
    font-family: var(--font-display);
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .tab-btn:hover {
    color: var(--color-text-main);
    border-color: var(--color-accent-primary);
  }

  .tab-btn.active {
    background: rgba(0, 229, 255, 0.1);
    color: var(--color-accent-primary);
    border-color: var(--color-accent-primary);
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.2);
  }

  .user-summary-card {
    background: rgba(12, 16, 33, 0.8);
    border: 1px solid var(--color-accent-primary);
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.1);
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }

  .user-label {
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    letter-spacing: 0.1em;
  }

  .user-rank {
    font-family: var(--font-display);
    font-size: 1.8rem;
    color: var(--color-accent-primary);
    font-weight: bold;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .user-name {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--color-text-main);
  }

  .user-score {
    font-family: var(--font-display);
    font-size: 1rem;
    color: #00ffaa;
  }

  .user-empty-state {
    width: 100%;
    text-align: center;
    font-family: var(--font-body);
    color: var(--color-accent-primary);
    font-size: 0.95rem;
  }

  .table-wrapper {
    flex: 1;
    overflow-y: auto;
    background: rgba(12, 16, 33, 0.5);
    border: 1px solid rgba(0, 229, 255, 0.1);
  }

  .leaderboard-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-body);
    text-align: left;
  }

  .leaderboard-table th {
    background: rgba(0, 0, 0, 0.4);
    color: var(--color-accent-primary);
    font-family: var(--font-display);
    font-size: 0.85rem;
    padding: 0.8rem 1rem;
    letter-spacing: 0.1em;
    border-bottom: 1px solid rgba(0, 229, 255, 0.2);
  }

  .leaderboard-table td {
    padding: 0.8rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: var(--color-text-main);
  }

  .leaderboard-table tr:hover {
    background: rgba(0, 229, 255, 0.05);
  }

  .leaderboard-table tr.highlight {
    background: rgba(0, 229, 255, 0.15);
    font-weight: bold;
  }

  .col-rank { width: 15%; text-align: center; }
  .col-user { width: 60%; }
  .col-score { width: 25%; text-align: right; font-family: var(--font-display); }

  .rank-badge {
    display: inline-block;
    min-width: 28px;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: var(--font-display);
    font-size: 0.9rem;
    text-align: center;
  }

  .rank-1 { background: #ffd700; color: #000; font-weight: bold; }
  .rank-2 { background: #c0c0c0; color: #000; font-weight: bold; }
  .rank-3 { background: #cd7f32; color: #000; font-weight: bold; }

  .state-message {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-text-muted);
    font-family: var(--font-display);
    padding: 2rem;
  }

  .loading-text {
    animation: pulse 1s infinite alternate;
    color: var(--color-accent-primary);
  }

  .error { color: #ff3366; }

  .pagination-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 229, 255, 0.2);
  }

  .page-btn {
    background: transparent;
    border: 1px solid var(--color-accent-primary);
    color: var(--color-accent-primary);
    font-family: var(--font-display);
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .page-btn:hover:not(:disabled) {
    background: var(--color-accent-primary);
    color: var(--color-bg-deep);
  }

  .page-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    border-color: var(--color-text-muted);
    color: var(--color-text-muted);
  }

  .page-indicator {
    font-family: var(--font-display);
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }

  @keyframes pulse {
    0% { opacity: 0.4; }
    100% { opacity: 1; }
  }
</style>