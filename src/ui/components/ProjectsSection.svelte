<script lang="ts">
  import type { ProjectCategory, ProjectItem } from '@contracts/portfolio';

  interface Props {
    projects: readonly ProjectItem[];
    onSelectProject: (projectId: string) => void;
  }

  type FilterOption = 'todos' | ProjectCategory;

  let { projects, onSelectProject }: Props = $props();
  let activeFilter = $state<FilterOption>('todos');

  const filterButtons: ReadonlyArray<{ id: FilterOption; label: string }> = [
    { id: 'todos', label: 'Todos' },
    { id: 'videojuego', label: 'Videojuegos' },
    { id: 'software', label: 'Software' },
    { id: 'motor', label: 'Tecnología' }
  ];

  const filteredProjects = $derived(
    activeFilter === 'todos'
      ? projects
      : projects.filter((project) => project.category === activeFilter)
  );
</script>

<section id="proyectos" class="card-section">
  <div class="projects-topbar">
    <div class="section-header projects-header">
      <span class="eyebrow">Portafolio</span>
      <h2 class="section-title">Proyectos desarrollados por el estudio.</h2>
      <p class="section-subtitle">
        Cada obra combina arquitectura limpia, herramientas especializadas y una experiencia visual cuidada. Selecciona cualquier proyecto para explorar su ficha técnica.
      </p>
    </div>

    <div class="filter-bar" role="tablist" aria-label="Filtrar proyectos por categoría">
      {#each filterButtons as btn (btn.id)}
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === btn.id}
          class="filter-pill"
          class:is-active={activeFilter === btn.id}
          onclick={() => (activeFilter = btn.id)}
        >
          {btn.label}
        </button>
      {/each}
    </div>
  </div>

  <div class="projects-grid">
    {#each filteredProjects as project (project.id)}
      <article class="project-card glass-card">
        <button
          type="button"
          class="project-trigger"
          onclick={() => onSelectProject(project.id)}
          aria-label={`Ver detalles de ${project.title}`}
        >
          <div class="project-preview">
            {#if project.image}
              <img
                src={project.image}
                alt={`Vista previa de ${project.title}`}
                loading="lazy"
              />
            {:else}
              <div class="core-preview">
                <div class="core-badge">ECS · ZERO GC</div>
                <div class="core-lines">
                  <span>Float32Array&lt;NodePool&gt;</span>
                  <span>TypedEventBus&lt;AppEventMap&gt;</span>
                  <span>Svelte 5 HUD Overlay</span>
                </div>
              </div>
            {/if}
            <span class="status-chip">{project.status}</span>
          </div>

          <div class="project-body">
            <div class="project-meta">
              <span class="category-tag" style="--accent: {project.accentHex}">
                {project.categoryLabel}
              </span>
              <span class="year-tag">{project.year}</span>
            </div>

            <h3 class="project-title">{project.title}</h3>
            <p class="project-subtitle">{project.subtitle}</p>
            <p class="project-tagline">{project.tagline}</p>

            <div class="project-footer">
              <div class="tech-tags">
                {#each project.stack.slice(0, 3) as tech}
                  <span class="tech-tag">{tech}</span>
                {/each}
              </div>

              <span class="inspect-link">
                Ver ficha
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </button>
      </article>
    {/each}
  </div>
</section>

<style>
  .card-section {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .projects-topbar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.25rem;
    flex-wrap: wrap;
  }

  .projects-header {
    margin-bottom: 0;
  }

  .filter-bar {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    padding: 0.3rem;
    border-radius: var(--radius-pill);
    background: rgba(18, 13, 29, 0.8);
    border: 1px solid var(--border-subtle);
    flex-shrink: 0;
  }

  .filter-pill {
    padding: 0.42rem 0.9rem;
    border: none;
    border-radius: var(--radius-pill);
    background: transparent;
    color: var(--text-secondary);
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .filter-pill:hover {
    color: var(--text-primary);
  }

  .filter-pill.is-active {
    color: #ffffff;
    background: rgba(168, 85, 247, 0.3);
    box-shadow: inset 0 0 0 1px rgba(192, 132, 252, 0.35);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.1rem;
  }

  .project-card {
    overflow: hidden;
  }

  .project-card:hover {
    transform: translateY(-3px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 20px 42px rgba(4, 2, 12, 0.6);
  }

  .project-trigger {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
  }

  .project-preview {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #0a0712;
    border-bottom: 1px solid var(--border-subtle);
  }

  .project-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s var(--ease-out);
  }

  .project-card:hover .project-preview img {
    transform: scale(1.03);
  }

  .core-preview {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    padding: 1.25rem;
    background:
      radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.22), transparent 55%),
      radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.14), transparent 55%),
      #0b0814;
  }

  .core-badge {
    padding: 0.28rem 0.75rem;
    border-radius: var(--radius-pill);
    border: 1px solid rgba(192, 132, 252, 0.35);
    background: rgba(168, 85, 247, 0.15);
    color: var(--accent-lavender);
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .core-lines {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.45rem;
  }

  .core-lines span {
    padding: 0.35rem 0.65rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(196, 168, 255, 0.14);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .status-chip {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.26rem 0.65rem;
    border-radius: var(--radius-pill);
    background: rgba(9, 7, 15, 0.78);
    border: 1px solid rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(8px);
    color: var(--text-primary);
    font-size: 0.7rem;
    font-weight: 700;
  }

  .project-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1.1rem 1.2rem 1.2rem;
  }

  .project-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .category-tag {
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
  }

  .year-tag {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--text-muted);
  }

  .project-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: -0.015em;
    color: var(--text-primary);
  }

  .project-subtitle {
    margin: 0.15rem 0 0;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--accent-lavender);
  }

  .project-tagline {
    margin: 0.6rem 0 0.9rem;
    font-size: 0.87rem;
    color: var(--text-secondary);
    line-height: 1.5;
    flex: 1;
  }

  .project-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding-top: 0.85rem;
    border-top: 1px solid rgba(196, 168, 255, 0.1);
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .tech-tag {
    padding: 0.2rem 0.55rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(196, 168, 255, 0.12);
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .inspect-link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-primary);
    white-space: nowrap;
    transition: color 0.2s ease;
  }

  .project-card:hover .inspect-link {
    color: var(--accent-lavender);
  }

  @media (max-width: 1000px) {
    .projects-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 680px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
