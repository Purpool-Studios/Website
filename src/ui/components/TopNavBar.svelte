<script lang="ts">
  // Svelte 5 Props
  let { onLogout }: { onLogout: () => void } = $props();

  const handleAction = (action: string) => {
    console.log(`[TopNav] Acción disparada: ${action}`);
    if (action === 'logout') onLogout();
  };
</script>

<header class="top-nav">
  <div class="nav-content">
    <div class="spacer"></div>
    <div class="actions">
      <button class="top-btn" onclick={() => handleAction('settings')}>Configuración</button>
      <button class="top-btn" onclick={() => handleAction('help')}>Ayuda</button>
      <button class="top-btn btn-danger" onclick={() => handleAction('logout')}>Salir</button>
    </div>
  </div>
</header>

<style>
  .top-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(to bottom, var(--color-bg-panel) 0%, transparent 100%);
    border-bottom: 1px solid rgba(0, 229, 255, 0.2);
    z-index: 100;
    display: flex;
    align-items: center;
    padding: 0 2rem;
  }

  .nav-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .actions {
    display: flex;
    gap: 1.5rem;
  }

  .top-btn {
    background: none;
    border: none;
    color: var(--color-text-muted);
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.2s ease, text-shadow 0.2s ease;
  }

  .top-btn:hover {
    color: var(--color-accent-primary);
    text-shadow: 0 0 8px var(--color-accent-glow);
  }

  .btn-danger:hover {
    color: #ff3366;
    text-shadow: 0 0 8px rgba(255, 51, 102, 0.5);
  }
</style>