<script lang="ts">
  import type { IApiClient } from '../../contracts/api';

  // Svelte 5: Declaración conjunta de props
  let { apiClient, onComplete }: { apiClient: IApiClient; onComplete: () => void } = $props();

  let username = $state('');
  let isSubmitting = $state(false);
  let errorMessage = $state('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      errorMessage = "El identificador debe tener al menos 3 caracteres.";
      return;
    }

    isSubmitting = true;
    errorMessage = '';

    try {
      await apiClient.createUser(username.trim());
      onComplete(); // Notifica a App.svelte que cambie al estado MAIN
    } catch (error) {
      errorMessage = "Error en la matriz de registro. Identificador no disponible.";
      isSubmitting = false;
    }
  };
</script>

<div class="onboarding-container">
  <div class="panel">
    <h2 class="panel-title">INICIALIZACIÓN DE ENTIDAD</h2>
    <p class="panel-desc">Registra tu designación cósmica en la red de Wits Olympiads.</p>

    <form class="sci-fi-form" onsubmit={handleSubmit}>
      <div class="input-group">
        <label for="username">Identificador (Username)</label>
        <input 
          id="username" 
          type="text" 
          bind:value={username} 
          disabled={isSubmitting}
          placeholder="Ej: Nova_Prime" 
          autocomplete="off"
        />
      </div>

      {#if errorMessage}
        <p class="error-msg">{errorMessage}</p>
      {/if}

      <button type="submit" class="btn-sci-fi" disabled={isSubmitting}>
        <span class="btn-text">{isSubmitting ? 'PROCESANDO...' : 'CONFIRMAR IDENTIDAD'}</span>
      </button>
    </form>
  </div>
</div>

<style>
  .onboarding-container {
    width: 100%; height: 100%;
    display: flex; justify-content: center; align-items: center;
    background: radial-gradient(circle at center, #0c1021 0%, var(--color-bg-deep) 80%);
  }

  .panel {
    background: var(--color-bg-panel);
    border: 1px solid rgba(0, 229, 255, 0.3);
    padding: 3rem;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(0, 229, 255, 0.05);
    width: 100%;
    max-width: 500px;
    text-align: center;
  }

  .panel-title {
    font-family: var(--font-display);
    color: var(--color-text-main);
    letter-spacing: 0.15em;
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }

  .panel-desc {
    font-family: var(--font-body);
    color: var(--color-text-muted);
    margin-bottom: 2.5rem;
  }

  .sci-fi-form { display: flex; flex-direction: column; gap: 2rem; }

  .input-group {
    display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem;
  }

  .input-group label {
    font-family: var(--font-body);
    color: var(--color-accent-primary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.9rem;
  }

  .input-group input {
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid var(--color-text-muted);
    color: var(--color-text-main);
    padding: 1rem;
    font-family: var(--font-display);
    font-size: 1.1rem;
    outline: none;
    transition: all 0.3s ease;
  }

  .input-group input:focus {
    border-color: var(--color-accent-primary);
    box-shadow: 0 0 10px var(--color-accent-glow);
  }

  .error-msg {
    color: #ff3366;
    font-family: var(--font-body);
    font-size: 0.9rem;
  }

  .btn-sci-fi {
    position: relative; background: transparent; border: none; padding: 1rem 2rem;
    cursor: pointer; outline: none; margin-top: 1rem;
  }
  .btn-sci-fi::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 229, 255, 0.05); border: 1px solid var(--color-accent-primary);
    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
    transition: all 0.3s ease;
  }
  .btn-text {
    position: relative; font-family: var(--font-display); font-size: 1rem;
    font-weight: 700; letter-spacing: 0.15em; color: var(--color-accent-primary);
  }
  .btn-sci-fi:hover:not(:disabled)::before {
    background: var(--color-accent-primary); box-shadow: 0 0 20px var(--color-accent-glow);
  }
  .btn-sci-fi:hover:not(:disabled) .btn-text { color: var(--color-bg-deep); }
  .btn-sci-fi:disabled { opacity: 0.5; cursor: not-allowed; }
</style>