<script lang="ts">
  import type { SectionId } from '@contracts/events';

  interface Props {
    onNavigate: (sectionId: SectionId) => void;
  }

  let { onNavigate }: Props = $props();
</script>

<section id="inicio" class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <div class="eyebrow">
        <span class="pulse-dot" aria-hidden="true"></span>
        Conglomeración Independiente · Software &amp; Videojuegos
      </div>

      <h1 class="hero-title">
        Ingeniería precisa y mundos interactivos desde <span class="title-gradient">Purpool Studios</span>.
      </h1>

      <p class="hero-description">
        Somos un colectivo de desarrolladores independientes unidos por la obsesión técnica y la creatividad. Construimos desde herramientas de bajo nivel y entornos de ensamblado hasta videojuegos competitivos de alto rendimiento.
      </p>

      <div class="hero-actions">
        <button type="button" class="btn btn-primary" onclick={() => onNavigate('proyectos')}>
          Explorar proyectos
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>

        <button type="button" class="btn btn-secondary" onclick={() => onNavigate('tecnologia')}>
          Ver arquitectura
        </button>
      </div>

      <dl class="hero-stats">
        <div class="stat-item">
          <dt>Enfoque</dt>
          <dd>Software &amp; Videojuegos</dd>
        </div>
        <div class="stat-item">
          <dt>Arquitectura</dt>
          <dd>Cero Overhead · ECS</dd>
        </div>
        <div class="stat-item">
          <dt>Modelo</dt>
          <dd>Colectivo Independiente</dd>
        </div>
      </dl>
    </div>

    <div class="hero-emblem-wrap" aria-hidden="true">
      <div class="emblem-halo"></div>
      <div class="emblem-card glass-card">
        <div class="emblem-ring">
          <img src="/assets/logo.png" alt="Emblema de Purpool Studios" class="emblem-logo" />
        </div>
        <div class="emblem-caption">
          <span class="caption-name">PURPOOL STUDIOS</span>
          <span class="caption-sub">Craft · Performance · Play</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: calc(100vh - 4rem);
    display: flex;
    align-items: center;
    padding: 5.5rem 0 4rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.85fr);
    align-items: center;
    gap: 3.5rem;
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
    gap: 1.45rem;
  }

  .pulse-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: var(--accent-cyan);
    box-shadow: 0 0 12px var(--accent-cyan);
  }

  .hero-title {
    margin: 0;
    font-size: clamp(2.35rem, 4.8vw, 3.85rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.08;
    color: var(--text-primary);
  }

  .title-gradient {
    background: linear-gradient(120deg, #e9d5ff 0%, #c084fc 48%, #38bdf8 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hero-description {
    margin: 0;
    max-width: 600px;
    font-size: 1.12rem;
    font-weight: 400;
    color: var(--text-secondary);
    line-height: 1.72;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
    margin-top: 0.35rem;
  }

  .hero-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
    margin: 1.35rem 0 0;
    padding-top: 1.6rem;
    border-top: 1px solid var(--border-subtle);
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .stat-item dt {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  .stat-item dd {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .hero-emblem-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .emblem-halo {
    position: absolute;
    width: 320px;
    height: 320px;
    border-radius: 9999px;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(56, 189, 248, 0.08) 48%, transparent 72%);
    filter: blur(22px);
    pointer-events: none;
  }

  .emblem-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
    padding: 2.5rem 2.25rem;
    width: 100%;
    max-width: 340px;
    background: linear-gradient(160deg, rgba(24, 17, 40, 0.85), rgba(12, 9, 21, 0.88));
  }

  .emblem-ring {
    width: 184px;
    height: 184px;
    border-radius: 9999px;
    padding: 18px;
    background: radial-gradient(circle at 35% 30%, #ffffff 0%, #f3ecff 75%, #e5d8ff 100%);
    box-shadow:
      0 0 0 6px rgba(168, 85, 247, 0.14),
      0 18px 42px rgba(4, 2, 12, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .emblem-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .emblem-caption {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    text-align: center;
  }

  .caption-name {
    font-size: 0.92rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    color: var(--text-primary);
  }

  .caption-sub {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-muted);
  }

  @media (max-width: 920px) {
    .hero {
      min-height: auto;
      padding: 3.75rem 0 3rem;
    }

    .hero-grid {
      grid-template-columns: 1fr;
      gap: 2.75rem;
    }

    .hero-emblem-wrap {
      order: -1;
    }

    .emblem-card {
      max-width: 290px;
      padding: 2rem 1.75rem;
    }

    .emblem-ring {
      width: 144px;
      height: 144px;
      padding: 14px;
    }
  }

  @media (max-width: 560px) {
    .hero-stats {
      grid-template-columns: 1fr;
      gap: 0.85rem;
    }
  }
</style>
