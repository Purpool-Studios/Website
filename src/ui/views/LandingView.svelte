<script lang="ts">
  import type { IAuthService } from '../../contracts/auth';

  // Svelte 5: Declaración de props
  let { authService }: { authService: IAuthService } = $props();

  const handleLoginClick = async (): Promise<void> => {
    await authService.login(); // Dispara la redirección a Auth0
  };
</script>

<main class="landing-container">
  <div class="ambient-background"></div>

  <div class="content-wrapper">
    <section class="brand-column">
      <h1 class="game-title">
        WITS <br /> OLYMPIADS
      </h1>
      <span class="studio-name">BY PURPOOL STUDIOS</span>
    </section>

    <div class="vertical-divider"></div>

    <section class="action-column">
      <div class="lore-box">
        <p class="intro-text">
          La batalla de los intelectos ha comenzado, supera los límites evolutivos y compite por convertirte en una entidad cósmica del saber.
        </p>
      </div>
      
      <button class="btn-sci-fi" onclick={handleLoginClick}>
        <span class="btn-text">INICIAR SESIÓN</span>
      </button>
    </section>
  </div>
</main>

<style>
  .landing-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at center, #0c1021 0%, var(--color-bg-deep) 80%);
  }

  .ambient-background {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: radial-gradient(var(--color-text-muted) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.05;
    pointer-events: none;
  }

  .content-wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    width: 80%;
    max-width: 1200px;
    height: 60vh;
    min-height: 400px;
  }

  .brand-column, .action-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem;
  }

  .brand-column {
    align-items: flex-end;
    text-align: right;
  }

  .action-column {
    align-items: flex-start;
    text-align: left;
  }

  .vertical-divider {
    width: 2px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--color-accent-primary) 50%,
      transparent 100%
    );
    box-shadow: 0 0 10px var(--color-accent-glow);
    margin: 0 2rem;
  }

  .game-title {
    font-family: var(--font-display);
    font-size: 4rem;
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: 0.1em;
    color: var(--color-text-main);
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    margin-bottom: 0.5rem;
  }

  .studio-name {
    font-family: var(--font-body);
    font-size: 1rem;
    letter-spacing: 0.3em;
    color: var(--color-accent-primary);
    opacity: 0.8;
  }

  .lore-box {
    margin-bottom: 3rem;
    max-width: 400px;
  }

  .intro-text {
    font-size: 1.25rem;
    line-height: 1.5;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  .btn-sci-fi {
    position: relative;
    background: transparent;
    border: none;
    padding: 1rem 3rem;
    cursor: pointer;
    outline: none;
    display: inline-block;
  }

  .btn-sci-fi::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 229, 255, 0.05);
    border: 1px solid var(--color-accent-primary);
    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
    transition: all 0.3s ease;
  }

  .btn-text {
    position: relative;
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: var(--color-accent-primary);
    transition: color 0.3s ease;
  }

  .btn-sci-fi:hover::before {
    background: var(--color-accent-primary);
    box-shadow: 0 0 20px var(--color-accent-glow);
  }

  .btn-sci-fi:hover .btn-text {
    color: var(--color-bg-deep);
  }

  .btn-sci-fi:active::before {
    transform: scale(0.98);
  }
</style>