<script lang="ts">
  import { STUDIO_EMAIL } from '@infrastructure/studioData';

  let copied = $state(false);
  let copyTimer: number | undefined;

  async function copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(STUDIO_EMAIL);
      copied = true;
      if (copyTimer !== undefined) {
        window.clearTimeout(copyTimer);
      }
      copyTimer = window.setTimeout(() => {
        copied = false;
      }, 2400);
    } catch {
      window.location.href = `mailto:${STUDIO_EMAIL}`;
    }
  }
</script>

<section id="contacto" class="section contact-section">
  <div class="container">
    <div class="contact-card glass-card">
      <div class="contact-copy">
        <span class="eyebrow">Colaboración</span>
        <h2 class="section-title">¿Construimos algo juntos?</h2>
        <p class="section-subtitle">
          Estamos abiertos a colaboraciones técnicas, alianzas entre estudios independientes y proyectos que exijan rendimiento real y cuidado visual.
        </p>
      </div>

      <div class="contact-actions">
        <a href={`mailto:${STUDIO_EMAIL}`} class="btn btn-primary">
          Escribir a Purpool Studios
        </a>
        <button type="button" class="btn btn-secondary" onclick={copyEmail}>
          {#if copied}
            Correo copiado
          {:else}
            Copiar {STUDIO_EMAIL}
          {/if}
        </button>
      </div>
    </div>

    <footer class="studio-footer">
      <div class="footer-brand">
        <span class="footer-dot" aria-hidden="true"></span>
        <span>Purpool Studios</span>
      </div>
      <p class="footer-note">
        Conglomeración independiente de desarrollo de software y videojuegos · 2026
      </p>
    </footer>
  </div>
</section>

<style>
  .contact-section {
    padding-bottom: 3rem;
  }

  .contact-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.5rem;
    padding: 3rem;
    background:
      radial-gradient(circle at 90% 15%, rgba(168, 85, 247, 0.18), transparent 55%),
      radial-gradient(circle at 10% 90%, rgba(56, 189, 248, 0.1), transparent 50%),
      var(--bg-surface-elevated);
  }

  .contact-copy {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 560px;
  }

  .contact-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    flex-shrink: 0;
  }

  .studio-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2.5rem;
    padding: 0 0.5rem;
    color: var(--text-muted);
    font-size: 0.88rem;
  }

  .footer-brand {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-weight: 700;
    color: var(--text-secondary);
  }

  .footer-dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 9999px;
    background: var(--accent-violet);
  }

  .footer-note {
    margin: 0;
  }

  @media (max-width: 900px) {
    .contact-card {
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
  }
</style>
