<script lang="ts">
  import type { SectionId } from '@contracts/events';
  import type { NavItem } from '@contracts/portfolio';

  interface Props {
    items: readonly NavItem[];
    activeSection: SectionId;
    onSelect: (sectionId: SectionId) => void;
  }

  let { items, activeSection, onSelect }: Props = $props();
</script>

<nav class="floating-dock-wrapper" aria-label="Navegación principal">
  <div class="floating-dock">
    <button
      type="button"
      class="dock-brand"
      aria-label="Ir al inicio de Purpool Studios"
      onclick={() => onSelect('inicio')}
    >
      <span class="dock-brand-ring">
        <img src="/assets/logo.png" alt="Logo Purpool Studios" class="dock-brand-img" />
      </span>
    </button>

    <span class="dock-divider" aria-hidden="true"></span>

    <ul class="dock-list">
      {#each items as item (item.id)}
        {@const isActive = activeSection === item.id}
        <li>
          <button
            type="button"
            class="dock-item"
            class:is-active={isActive}
            aria-current={isActive ? 'page' : undefined}
            onclick={() => onSelect(item.id)}
          >
            <span class="dock-icon" aria-hidden="true">
              {#if item.id === 'inicio'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 10.5 12 3l9 7.5" />
                  <path d="M5.5 9.5V20h13V9.5" />
                </svg>
              {:else if item.id === 'estudio'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4l2.5 2.5" />
                </svg>
              {:else if item.id === 'miembros'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="8" r="3.2" />
                  <path d="M3.5 19c0-2.8 2.5-4.8 5.5-4.8s5.5 2 5.5 4.8" />
                  <circle cx="16.5" cy="9" r="2.5" />
                  <path d="M15.5 14.5c2.4.2 4.5 1.8 4.5 4.5" />
                </svg>
              {:else if item.id === 'proyectos'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="8" height="7" rx="2" />
                  <rect x="13" y="4" width="8" height="7" rx="2" />
                  <rect x="3" y="13" width="8" height="7" rx="2" />
                  <rect x="13" y="13" width="8" height="7" rx="2" />
                </svg>
              {:else if item.id === 'tecnologia'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m12 3 8 4.5-8 4.5-8-4.5Z" />
                  <path d="m4 12 8 4.5 8-4.5" />
                  <path d="m4 16.5 8 4.5 8-4.5" />
                </svg>
              {:else}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              {/if}
            </span>
            <span class="dock-label">{item.label}</span>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  .floating-dock-wrapper {
    position: fixed;
    left: 50%;
    bottom: 1.35rem;
    transform: translateX(-50%);
    z-index: 60;
    width: max-content;
    max-width: calc(100vw - 1.5rem);
  }

  .floating-dock {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 0.55rem;
    border-radius: 9999px;
    background: rgba(15, 11, 25, 0.8);
    border: 1px solid rgba(196, 168, 255, 0.18);
    backdrop-filter: blur(22px) saturate(165%);
    -webkit-backdrop-filter: blur(22px) saturate(165%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.09),
      0 18px 46px rgba(3, 1, 10, 0.72),
      0 0 36px rgba(139, 92, 246, 0.14);
  }

  .dock-brand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.35rem;
    height: 2.35rem;
    padding: 0;
    border: none;
    border-radius: 9999px;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .dock-brand:hover {
    transform: scale(1.06);
  }

  .dock-brand-ring {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.15rem;
    height: 2.15rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.94);
    padding: 3px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  }

  .dock-brand-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .dock-divider {
    width: 1px;
    height: 1.4rem;
    background: rgba(196, 168, 255, 0.16);
    margin: 0 0.15rem;
    flex-shrink: 0;
  }

  .dock-list {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .dock-item {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.52rem 0.95rem;
    border: none;
    border-radius: 9999px;
    background: transparent;
    color: var(--text-secondary);
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition:
      color 0.2s ease,
      background-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .dock-item:hover {
    color: var(--text-primary);
    background: rgba(196, 168, 255, 0.09);
  }

  .dock-item.is-active {
    color: #ffffff;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.92), rgba(168, 85, 247, 0.88));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.22),
      0 6px 18px rgba(147, 51, 234, 0.38);
  }

  .dock-icon {
    display: inline-flex;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  .dock-icon svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 760px) {
    .floating-dock-wrapper {
      bottom: 0.85rem;
    }

    .floating-dock {
      gap: 0.15rem;
      padding: 0.36rem 0.4rem;
    }

    .dock-brand,
    .dock-divider {
      display: none;
    }

    .dock-item {
      flex-direction: column;
      gap: 0.18rem;
      padding: 0.4rem 0.56rem;
      border-radius: 16px;
      font-size: 0.66rem;
    }

    .dock-icon {
      width: 1rem;
      height: 1rem;
    }
  }
</style>
