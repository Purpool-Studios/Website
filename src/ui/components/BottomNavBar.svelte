<script lang="ts">
  let { 
    activeTab, 
    onSelectTab, 
    hidden = false 
  }: { 
    activeTab: string; 
    onSelectTab: (id: string) => void;
    hidden?: boolean;
  } = $props();

  const navItems = [
    { id: 'new_game', label: 'Nuevo Juego' },
    { id: 'leaderboard', label: 'Clasificaciones' },
    { id: 'profile', label: 'Perfil' },
    { id: 'social', label: 'Social' }
  ];
</script>

<nav class="bottom-nav {hidden ? 'hidden' : ''}">
  <ul class="nav-list">
    {#each navItems as item}
      <li>
        <button 
          class="nav-btn {activeTab === item.id ? 'active' : ''}" 
          on:click={() => onSelectTab(item.id)}
        >
          {item.label}
        </button>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to top, var(--color-bg-panel) 0%, transparent 100%);
    border-top: 1px solid rgba(0, 229, 255, 0.2);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 1rem;
    /* Transición suave para ocultar/mostrar la barra hacia abajo */
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(0);
  }

  /* Desplaza la barra hacia abajo fuera de la vista */
  .bottom-nav.hidden {
    transform: translateY(100%);
    pointer-events: none;
  }

  .nav-list {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-btn {
    position: relative;
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
  }

  .nav-btn::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: var(--color-accent-primary);
    box-shadow: 0 0 10px var(--color-accent-glow);
    transition: width 0.3s ease;
  }

  .nav-btn:hover {
    color: var(--color-text-main);
  }

  .nav-btn:hover::after {
    width: 50%;
  }

  .nav-btn.active {
    color: var(--color-accent-primary);
    text-shadow: 0 0 10px var(--color-accent-glow);
  }

  .nav-btn.active::after {
    width: 100%;
  }
</style>