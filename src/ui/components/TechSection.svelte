<script lang="ts">
  import type { EngineMetrics } from '@contracts/events';
  import type { StackLayer } from '@contracts/portfolio';

  interface Props {
    layers: readonly StackLayer[];
    metrics: EngineMetrics;
  }

  let { layers, metrics }: Props = $props();
</script>

<section id="tecnologia" class="card-section">
  <div class="section-header tech-header">
    <span class="eyebrow">Arquitectura &amp; Stack</span>
    <h2 class="section-title">Diseñado bajo un enfoque de cero overhead.</h2>
    <p class="section-subtitle">
      Separamos estrictamente la simulación en TypeScript puro de la interfaz en Svelte 5 mediante contratos e invariantes tipados. El fondo interactivo que ves en esta página corre sobre esa misma arquitectura.
    </p>
  </div>

  <div class="tech-body">
    <aside class="telemetry-card glass-card" aria-label="Telemetría en tiempo real del motor">
      <div class="telemetry-head">
        <span class="telemetry-dot" aria-hidden="true"></span>
        <span>Motor Canvas ECS en vivo</span>
      </div>
      <div class="telemetry-values">
        <div>
          <span class="t-label">FPS</span>
          <strong class="t-val">{metrics.fps || '--'}</strong>
        </div>
        <div>
          <span class="t-label">Nodos Pool</span>
          <strong class="t-val">{metrics.activeNodes}</strong>
        </div>
        <div>
          <span class="t-label">Frame CPU</span>
          <strong class="t-val">{metrics.frameTimeMs.toFixed(2)} ms</strong>
        </div>
      </div>
    </aside>

    <div class="stack-grid">
      {#each layers as layer (layer.layer)}
        <article class="stack-card glass-card">
          <span class="stack-kicker">{layer.layer}</span>
          <h3 class="stack-title">{layer.title}</h3>
          <span class="stack-tech">{layer.technology}</span>
          <p class="stack-summary">{layer.summary}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .card-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    height: 100%;
  }

  .tech-header {
    margin-bottom: 0;
  }

  .tech-body {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    flex: 1;
  }

  .telemetry-card {
    padding: 1rem 1.35rem;
    border-radius: 20px;
  }

  .telemetry-head {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
  }

  .telemetry-dot {
    width: 0.48rem;
    height: 0.48rem;
    border-radius: 9999px;
    background: #34d399;
    box-shadow: 0 0 10px rgba(52, 211, 153, 0.75);
  }

  .telemetry-values {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .t-label {
    display: block;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--text-muted);
  }

  .t-val {
    font-size: 1.08rem;
    font-weight: 800;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }

  .stack-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .stack-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
  }

  .stack-kicker {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent-cyan);
  }

  .stack-title {
    margin: 0.1rem 0 0;
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--text-primary);
  }

  .stack-tech {
    font-size: 0.86rem;
    font-weight: 700;
    color: var(--accent-lavender);
  }

  .stack-summary {
    margin: 0.3rem 0 0;
    font-size: 0.93rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  @media (max-width: 780px) {
    .stack-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
