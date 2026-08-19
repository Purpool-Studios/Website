<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { GameRegistry } from '../../core/games/GameRegistry';
  import type { DummyRoundState } from '../../core/games/DummyEngine';

  let { gameName, onFinish }: { 
    gameName: string; 
    onFinish: (stats: { correct_answers: number, total_answers: number }) => void 
  } = $props();

  // Instanciamos el motor a través del Factory
  let engine = GameRegistry.getEngine(gameName);
  let roundState = $state<DummyRoundState | null>(null);
  
  // Estadísticas y Tiempo
  let timeLeft = $state(60);
  let correctCount = 0;
  let totalCount = 0;
  let timerInterval: number;

  onMount(() => {
    // Generar primera ronda
    roundState = engine.generateRound();
    
    // Iniciar temporizador
    timerInterval = window.setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        // Informamos al Orquestador que el juego terminó
        onFinish({ correct_answers: correctCount, total_answers: totalCount });
      }
    }, 1000);
  });

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
  });

  const handleAnswerSelect = (answer: number) => {
    if (!roundState || timeLeft <= 0) return;
    
    totalCount++;
    if (engine.evaluate(answer, roundState)) {
      correctCount++;
    }
    
    // Siguiente ronda inmediata
    roundState = engine.generateRound();
  };
</script>

<div class="game-board">
  <!-- Cabecera de estado -->
  <div class="status-bar">
    <div class="stats">
      <span>INTENTOS: {totalCount}</span>
      <span class="text-success">ACIERTOS: {correctCount}</span>
    </div>
    <div class="timer {timeLeft <= 10 ? 'danger-time' : ''}">
      00:{timeLeft.toString().padStart(2, '0')}
    </div>
  </div>

  <!-- Área de juego -->
  <div class="play-area">
    {#if roundState}
      <h3 class="instruction">IDENTIFICA LA SEÑAL OBJETIVO</h3>
      <div class="target-display">
        {roundState.target}
      </div>

      <div class="options-grid">
        {#each roundState.options as option}
          <button class="option-btn" on:click={() => handleAnswerSelect(option)}>
            {option}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .game-board {
    width: 100%; height: 100%; display: flex; flex-direction: column;
    padding: 2rem; box-sizing: border-box;
  }

  .status-bar {
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid rgba(0, 229, 255, 0.3); padding-bottom: 1rem;
    font-family: var(--font-display);
  }

  .stats { display: flex; gap: 2rem; color: var(--color-text-muted); font-size: 0.9rem; letter-spacing: 0.1em; }
  .text-success { color: #00ffaa; }

  .timer {
    font-size: 2rem; font-weight: bold; color: var(--color-accent-primary);
    text-shadow: 0 0 10px var(--color-accent-glow);
  }
  .danger-time { color: #ff3366; text-shadow: 0 0 15px rgba(255, 51, 102, 0.8); animation: pulse-fast 0.5s infinite alternate; }

  .play-area { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; }

  .instruction { font-family: var(--font-body); color: var(--color-text-muted); letter-spacing: 0.2em; margin-bottom: 2rem; }

  .target-display {
    font-family: var(--font-display); font-size: 6rem; color: var(--color-text-main);
    background: rgba(0, 229, 255, 0.05); border: 2px solid var(--color-accent-primary);
    padding: 2rem 4rem; border-radius: 8px; margin-bottom: 4rem;
    box-shadow: 0 0 30px rgba(0, 229, 255, 0.1);
  }

  .options-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; }

  .option-btn {
    background: var(--color-bg-panel); border: 1px solid var(--color-text-muted);
    color: var(--color-text-main); font-family: var(--font-display); font-size: 2rem;
    width: 100px; height: 100px; display: flex; justify-content: center; align-items: center;
    cursor: pointer; transition: all 0.1s ease; border-radius: 4px;
  }

  .option-btn:hover {
    border-color: var(--color-accent-primary); color: var(--color-accent-primary);
    box-shadow: 0 0 20px var(--color-accent-glow); transform: scale(1.05);
  }
  .option-btn:active { transform: scale(0.95); }

  @keyframes pulse-fast { 0% { opacity: 1; } 100% { opacity: 0.5; } }
</style>