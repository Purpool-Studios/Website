<script lang="ts">
  import TopNavBar from '../components/TopNavBar.svelte';
  import BottomNavBar from '../components/BottomNavBar.svelte';

  export let onLogout: () => void;
</script>

<div class="layout-container">
  <TopNavBar {onLogout} />
  
  <main class="viewport">
    <!-- Aquí se inyectará el contexto 3D/WebGL del juego o las vistas internas -->
    <div class="viewport-placeholder">
      <div class="grid-overlay"></div>
      <h2>SISTEMA EN LÍNEA</h2>
      <p>Esperando enlace neuronal...</p>
    </div>
  </main>

  <BottomNavBar />
</div>

<style>
  .layout-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-deep);
  }

  .viewport {
    flex: 1;
    position: relative;
    margin-top: 40px; /* Altura del TopNav */
    margin-bottom: 80px; /* Altura del BottomNav */
    overflow: hidden;
  }

  /* Placeholder temporal para denotar dónde va el core del juego */
  .viewport-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-accent-primary);
    font-family: var(--font-display);
    opacity: 0.3;
  }

  .viewport-placeholder h2 {
    letter-spacing: 0.2em;
    margin-bottom: 1rem;
  }

  .viewport-placeholder p {
    font-family: var(--font-body);
    font-size: 1.2rem;
  }

  .grid-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: -1;
    pointer-events: none;
  }
</style>