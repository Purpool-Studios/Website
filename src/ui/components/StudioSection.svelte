<script lang="ts">
  import type { StudioPillar } from '@contracts/portfolio';

  interface Props {
    pillars: readonly StudioPillar[];
  }

  let { pillars }: Props = $props();
</script>

<section id="estudio" class="section">
  <div class="container">
    <div class="section-header">
      <span class="eyebrow">El Colectivo</span>
      <h2 class="section-title">Un ecosistema para crear software sólido y videojuegos memorables.</h2>
      <p class="section-subtitle">
        Purpool Studios reúne a programadores de sistemas, diseñadores y creadores de videojuegos bajo una cultura común: construir productos propios con rigor técnico, estética limpia y rendimiento verificable.
      </p>
    </div>

    <div class="pillars-grid">
      {#each pillars as pillar (pillar.code)}
        <article class="pillar-card glass-card">
          <span class="pillar-code">{pillar.code}</span>
          <h3 class="pillar-title">{pillar.title}</h3>
          <p class="pillar-description">{pillar.description}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .pillar-card {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: 2rem;
  }

  .pillar-card:hover {
    transform: translateY(-4px);
  }

  .pillar-code {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 10px;
    background: rgba(168, 85, 247, 0.14);
    border: 1px solid rgba(168, 85, 247, 0.3);
    color: var(--accent-lavender);
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  .pillar-title {
    margin: 0.25rem 0 0;
    font-size: 1.22rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--text-primary);
  }

  .pillar-description {
    margin: 0;
    font-size: 0.97rem;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  @media (max-width: 900px) {
    .pillars-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
