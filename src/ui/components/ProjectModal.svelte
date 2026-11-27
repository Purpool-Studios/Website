<script lang="ts">
  import type { ProjectItem } from '@contracts/portfolio';

  interface Props {
    project: ProjectItem | null;
    onClose: () => void;
  }

  let { project, onClose }: Props = $props();

  function handleWindowKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && project) {
      onClose();
    }
  }
</script>

<svelte:window onkeydown={handleWindowKeydown} />

{#if project}
  <div
    class="modal-backdrop"
    role="presentation"
    onclick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}
  >
    <div
      class="modal-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      tabindex="-1"
    >
      <header class="modal-header">
        <div class="modal-meta-row">
          <span class="modal-category" style="--accent: {project.accentHex}">
            {project.categoryLabel}
          </span>
          <span class="modal-status">{project.status} · {project.year}</span>
        </div>

        <button
          type="button"
          class="modal-close"
          aria-label="Cerrar detalle del proyecto"
          onclick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div class="modal-body">
        {#if project.image}
          <div class="modal-media">
            <img src={project.image} alt={`Captura de ${project.title}`} />
          </div>
        {:else}
          <div class="modal-media modal-media-diagram">
            <div class="diagram-grid">
              <div class="diagram-node">
                <span class="diagram-kicker">src/contracts</span>
                <strong>EventMap &amp; Interfaces</strong>
              </div>
              <div class="diagram-arrow">→</div>
              <div class="diagram-node is-accent">
                <span class="diagram-kicker">src/core</span>
                <strong>ECS + Float32Array Pools</strong>
              </div>
              <div class="diagram-arrow">→</div>
              <div class="diagram-node">
                <span class="diagram-kicker">src/ui</span>
                <strong>Svelte 5 HUD Overlay</strong>
              </div>
            </div>
          </div>
        {/if}

        <div class="modal-content">
          <h3 id="modal-project-title" class="modal-title">{project.title}</h3>
          <p class="modal-subtitle">{project.subtitle}</p>
          <p class="modal-description">{project.description}</p>

          <div class="modal-metrics">
            {#each project.metrics as metric (metric.label)}
              <div class="metric-box">
                <span class="metric-label">{metric.label}</span>
                <strong class="metric-value">{metric.value}</strong>
              </div>
            {/each}
          </div>

          <div class="modal-section">
            <h4>Aspectos clave</h4>
            <ul class="highlights-list">
              {#each project.highlights as point}
                <li>{point}</li>
              {/each}
            </ul>
          </div>

          <div class="modal-section">
            <h4>Tecnologías empleadas</h4>
            <div class="stack-pills">
              {#each project.stack as tech}
                <span class="stack-pill">{tech}</span>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 90;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(5, 3, 10, 0.78);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .modal-panel {
    width: 100%;
    max-width: 860px;
    max-height: calc(100vh - 3rem);
    overflow-y: auto;
    border-radius: 26px;
    background: #120e1e;
    border: 1px solid rgba(196, 168, 255, 0.22);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 32px 80px rgba(0, 0, 0, 0.75);
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(196, 168, 255, 0.1);
  }

  .modal-meta-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .modal-category {
    padding: 0.28rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 14%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
  }

  .modal-status {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-weight: 600;
  }

  .modal-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 9999px;
    border: 1px solid rgba(196, 168, 255, 0.16);
    background: rgba(255, 255, 255, 0.04);
    color: var(--text-secondary);
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .modal-close:hover {
    background: rgba(168, 85, 247, 0.2);
    color: #ffffff;
  }

  .modal-close svg {
    width: 1.1rem;
    height: 1.1rem;
  }

  .modal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .modal-media {
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(196, 168, 255, 0.14);
    background: #09070f;
  }

  .modal-media img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
  }

  .modal-media-diagram {
    padding: 2.25rem 1.5rem;
    background:
      radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.18), transparent 70%),
      #0a0712;
  }

  .diagram-grid {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.9rem;
    flex-wrap: wrap;
  }

  .diagram-node {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.95rem 1.2rem;
    border-radius: 14px;
    border: 1px solid rgba(196, 168, 255, 0.16);
    background: rgba(20, 15, 34, 0.85);
    min-width: 180px;
  }

  .diagram-node.is-accent {
    border-color: rgba(168, 85, 247, 0.5);
    background: rgba(88, 28, 135, 0.24);
  }

  .diagram-kicker {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--accent-lavender);
    letter-spacing: 0.04em;
  }

  .diagram-node strong {
    font-size: 0.92rem;
    color: var(--text-primary);
  }

  .diagram-arrow {
    color: var(--text-muted);
    font-weight: 700;
  }

  .modal-title {
    margin: 0;
    font-size: 1.85rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .modal-subtitle {
    margin: 0.25rem 0 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--accent-lavender);
  }

  .modal-description {
    margin: 1rem 0 0;
    color: var(--text-secondary);
    line-height: 1.7;
  }

  .modal-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.85rem;
    margin-top: 1.35rem;
  }

  .metric-box {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(196, 168, 255, 0.1);
  }

  .metric-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 600;
  }

  .metric-value {
    font-size: 0.96rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .modal-section {
    margin-top: 1.4rem;
  }

  .modal-section h4 {
    margin: 0 0 0.65rem;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .highlights-list {
    margin: 0;
    padding-left: 1.15rem;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    color: var(--text-secondary);
  }

  .stack-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .stack-pill {
    padding: 0.35rem 0.8rem;
    border-radius: 9999px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-primary);
    background: rgba(168, 85, 247, 0.12);
    border: 1px solid rgba(168, 85, 247, 0.26);
  }
</style>
