<script lang="ts">
  import { onMount } from 'svelte';
  import type { IApiClient, MatchResponse } from '../../contracts/api';
  import DummyMinigameUI from '../components/DummyMinigameUI.svelte';

  let { apiClient, onExit }: { apiClient: IApiClient; onExit: () => void } = $props();

  type FlowState = 'INITIALIZING' | 'CONFLICT' | 'TUTORIAL' | 'PLAYING' | 'SUBMITTING' | 'COMPLETED' | 'ERROR';
  
  let currentState = $state<FlowState>('INITIALIZING');
  let matchData = $state<MatchResponse | null>(null);
  let errorMessage = $state('');

  onMount(async () => {
    await requestNewMatch();
  });

  const requestNewMatch = async () => {
    try {
      currentState = 'INITIALIZING';
      matchData = await apiClient.requestMatch();
      currentState = 'TUTORIAL';
    } catch (error: any) {
      if (error.message === 'MATCH_IN_PROGRESS') {
        currentState = 'CONFLICT';
      } else {
        errorMessage = error.message;
        currentState = 'ERROR';
      }
    }
  };

  const forceAbandonMatch = async () => {
    try {
      currentState = 'INITIALIZING';
      await apiClient.abandonMatch();
      await requestNewMatch(); // Reintentamos iniciar partida limpia
    } catch (error: any) {
      errorMessage = error.message;
      currentState = 'ERROR';
    }
  };

  const handleStartMinigame = async () => {
    try {
      currentState = 'PLAYING';
      await apiClient.startMinigameTimer();
    } catch (error: any) {
      errorMessage = error.message;
      currentState = 'ERROR';
    }
  };

  const handleMinigameFinish = async (stats: { correct_answers: number, total_answers: number }) => {
    try {
      currentState = 'SUBMITTING';
      matchData = await apiClient.submitMinigameResult(stats);
      
      if (matchData.current_minigame) {
        currentState = 'TUTORIAL'; // Pasamos al siguiente juego
      } else {
        currentState = 'COMPLETED'; // Partida terminada
      }
    } catch (error: any) {
      if (error.message === 'MATCH_TIMEOUT') {
        errorMessage = "El tiempo de sincronización expiró. Partida anulada.";
      } else {
        errorMessage = error.message;
      }
      currentState = 'ERROR';
    }
  };
</script>

<div class="orchestrator-container">
  {#if currentState === 'INITIALIZING' || currentState === 'SUBMITTING'}
    <div class="center-content">
      <h3 class="glitch-text">PROCESANDO DATOS...</h3>
    </div>

  {:else if currentState === 'CONFLICT'}
    <div class="center-content panel">
      <h3 class="text-danger">CONFLICTO DETECTADO</h3>
      <p>Ya tienes una partida en progreso abandonada previamente.</p>
      <div class="actions">
        <button class="btn btn-danger" on:click={forceAbandonMatch}>PURGAR Y REINICIAR</button>
        <button class="btn" on:click={onExit}>CANCELAR</button>
      </div>
    </div>

  {:else if currentState === 'ERROR'}
    <div class="center-content panel border-danger">
      <h3 class="text-danger">FALLO DEL SISTEMA</h3>
      <p>{errorMessage}</p>
      <button class="btn" on:click={onExit}>VOLVER AL NÚCLEO</button>
    </div>

  {:else if currentState === 'TUTORIAL' && matchData?.current_minigame}
    <div class="center-content panel">
      <div class="minigame-header">
        <span class="category-badge">{matchData.current_minigame.minigame.category}</span>
        <h2>{matchData.current_minigame.minigame.name}</h2>
      </div>
      
      <div class="tutorial-box">
        <p>Prepárate para el siguiente reto neuronal. Tienes 60 segundos una vez iniciado el enlace.</p>
      </div>
      
      <div class="actions">
        <button class="btn btn-primary" on:click={handleStartMinigame}>INICIAR ENLACE</button>
        <button class="btn btn-danger" on:click={async () => { await apiClient.abandonMatch(); onExit(); }}>ABANDONAR</button>
      </div>
    </div>

  {:else if currentState === 'PLAYING' && matchData?.current_minigame}
    <!-- Delega la UI completamente al componente genérico que envuelve el motor -->
    <DummyMinigameUI 
      gameName={matchData.current_minigame.minigame.name} 
      onFinish={handleMinigameFinish} 
    />

  {:else if currentState === 'COMPLETED'}
    <div class="center-content panel border-success">
      <h2 class="text-success">SECUENCIA COMPLETADA</h2>
      <p class="score-text">Puntaje Consolidado: <strong>{matchData?.match.score}</strong></p>
      <button class="btn btn-primary mt-2" on:click={onExit}>FINALIZAR</button>
    </div>
  {/if}
</div>

<style>
  .orchestrator-container { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
  .center-content { text-align: center; max-width: 600px; width: 90%; }
  
  .panel {
    background: rgba(12, 16, 33, 0.9); border: 1px solid rgba(0, 229, 255, 0.3);
    padding: 3rem; box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  }
  
  .border-danger { border-color: #ff3366; box-shadow: inset 0 0 15px rgba(255, 51, 102, 0.1); }
  .border-success { border-color: #00ffaa; box-shadow: inset 0 0 15px rgba(0, 255, 170, 0.1); }
  .text-danger { color: #ff3366; font-family: var(--font-display); letter-spacing: 0.1em; }
  .text-success { color: #00ffaa; font-family: var(--font-display); letter-spacing: 0.1em; }
  
  .category-badge {
    display: inline-block; background: rgba(0, 229, 255, 0.1); color: var(--color-accent-primary);
    padding: 0.2rem 0.8rem; border-radius: 12px; font-size: 0.8rem; letter-spacing: 0.1em; margin-bottom: 1rem;
  }
  
  h2 { font-family: var(--font-display); color: var(--color-text-main); margin-bottom: 1.5rem; letter-spacing: 0.1em; }
  p { font-family: var(--font-body); color: var(--color-text-muted); line-height: 1.6; margin-bottom: 2rem; }
  
  .actions { display: flex; justify-content: center; gap: 1rem; }
  .mt-2 { margin-top: 2rem; }
  
  .btn {
    background: transparent; border: 1px solid var(--color-text-muted); color: var(--color-text-main);
    padding: 0.8rem 2rem; font-family: var(--font-display); font-weight: bold; cursor: pointer; transition: all 0.2s;
  }
  .btn:hover { background: rgba(255,255,255,0.1); }
  
  .btn-primary { border-color: var(--color-accent-primary); color: var(--color-accent-primary); }
  .btn-primary:hover { background: var(--color-accent-primary); color: var(--color-bg-deep); box-shadow: 0 0 15px var(--color-accent-glow); }
  
  .btn-danger { border-color: #ff3366; color: #ff3366; }
  .btn-danger:hover { background: #ff3366; color: var(--color-bg-deep); box-shadow: 0 0 15px rgba(255,51,102,0.5); }
  
  .score-text { font-size: 1.5rem; color: var(--color-text-main); }
  .glitch-text { font-family: var(--font-display); color: var(--color-accent-primary); animation: pulse 1s infinite; }
  
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
</style>