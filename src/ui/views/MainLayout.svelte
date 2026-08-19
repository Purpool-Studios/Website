<script lang="ts">
  import TopNavBar from '../components/TopNavBar.svelte';
  import BottomNavBar from '../components/BottomNavBar.svelte';
  import MatchOrchestrator from './MatchOrchestrator.svelte';
  import LeaderboardView from './LeaderboardView.svelte';
  import type { IApiClient } from '../../contracts/api';

  let { apiClient, onLogout }: { apiClient: IApiClient; onLogout: () => void } = $props();

  let activeTab = $state('new_game');
  let isMatchActive = $state(false);

  const handleSelectTab = (tabId: string) => {
    activeTab = tabId;
  };

  const handleStartMatch = () => {
    isMatchActive = true;
  };

  const handleExitMatch = () => {
    isMatchActive = false;
  };
</script>

<div class="layout-container">
  <TopNavBar {onLogout} />
  
  <main class="viewport">
    <div class="grid-overlay"></div>
    
    {#if activeTab === 'new_game'}
      {#if !isMatchActive}
        <div class="dashboard-content">
          <h2>SISTEMA NEURONAL EN LÍNEA</h2>
          <p class="subtitle">Selecciona tu protocolo de sincronización</p>
          
          <button class="btn-primary" on:click={handleStartMatch}>
            INICIAR PARTIDA
          </button>
        </div>
      {:else}
        <MatchOrchestrator {apiClient} onExit={handleExitMatch} />
      {/if}
    {:else if activeTab === 'leaderboard'}
      <LeaderboardView {apiClient} />
    {:else}
      <div class="dashboard-content">
        <h2>MÓDULO EN DESARROLLO</h2>
        <p class="subtitle">Sección [{activeTab.toUpperCase()}] no disponible en esta fase.</p>
      </div>
    {/if}
  </main>

  <BottomNavBar {activeTab} onSelectTab={handleSelectTab} />
</div>

<style>
  .layout-container {
    width: 100%; height: 100%; display: flex; flex-direction: column;
    background-color: var(--color-bg-deep);
  }

  .viewport {
    flex: 1; position: relative; margin-top: 40px; margin-bottom: 80px; 
    overflow: hidden; display: flex; flex-direction: column;
  }

  .grid-overlay {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px);
    background-size: 40px 40px; z-index: -1; pointer-events: none;
  }

  .dashboard-content {
    flex: 1; display: flex; flex-direction: column; 
    justify-content: center; align-items: center; text-align: center;
  }

  .dashboard-content h2 {
    color: var(--color-accent-primary); font-family: var(--font-display);
    letter-spacing: 0.2em; font-size: 2rem; margin-bottom: 0.5rem;
  }

  .subtitle {
    color: var(--color-text-muted); font-family: var(--font-body);
    margin-bottom: 3rem;
  }

  .btn-primary {
    background: transparent; border: 1px solid var(--color-accent-primary);
    color: var(--color-accent-primary); padding: 1rem 3rem;
    font-family: var(--font-display); font-size: 1.2rem; font-weight: bold;
    letter-spacing: 0.1em; cursor: pointer; transition: all 0.3s ease;
    box-shadow: inset 0 0 10px rgba(0, 229, 255, 0.1);
  }

  .btn-primary:hover {
    background: var(--color-accent-primary); color: var(--color-bg-deep);
    box-shadow: 0 0 20px var(--color-accent-glow);
  }
</style>