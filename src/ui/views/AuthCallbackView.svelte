<script lang="ts">
</script>

<div class="processing-container">
  <div class="hologram-spinner"></div>
  <h2 class="status-text">SINCRONIZANDO ENLACE NEURONAL</h2>
  <p class="sub-text">Estableciendo conexión segura con el núcleo...</p>
</div>

<style>
  .processing-container {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    background-color: var(--color-bg-deep);
    color: var(--color-accent-primary);
  }

  .hologram-spinner {
    width: 80px; height: 80px;
    border: 2px solid rgba(0, 229, 255, 0.2);
    border-top: 2px solid var(--color-accent-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite, glow 2s ease-in-out infinite alternate;
    margin-bottom: 2rem;
  }

  .status-text {
    font-family: var(--font-display);
    letter-spacing: 0.2em;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .sub-text {
    font-family: var(--font-body);
    color: var(--color-text-muted);
  }

  @keyframes spin { 100% { transform: rotate(360deg); } }
  @keyframes glow { 100% { box-shadow: 0 0 20px var(--color-accent-glow); } }
</style>