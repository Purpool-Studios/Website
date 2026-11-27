<script lang="ts">
  import type { EngineMetrics, EventBus, SectionId } from '@contracts/events';
  import type { ProjectItem } from '@contracts/portfolio';
  import {
    NAV_ITEMS,
    PROJECTS,
    STACK_LAYERS,
    STUDIO_PILLARS,
    TEAM_MEMBERS
  } from '@infrastructure/studioData';
  import FloatingNav from './components/FloatingNav.svelte';
  import HeroSection from './components/HeroSection.svelte';
  import StudioSection from './components/StudioSection.svelte';
  import MembersSection from './components/MembersSection.svelte';
  import ProjectsSection from './components/ProjectsSection.svelte';
  import TechSection from './components/TechSection.svelte';
  import ContactSection from './components/ContactSection.svelte';
  import ProjectModal from './components/ProjectModal.svelte';

  interface Props {
    eventBus: EventBus;
  }

  let { eventBus }: Props = $props();

  let activeSection = $state<SectionId>('inicio');
  let selectedProjectId = $state<string | null>(null);
  let engineMetrics = $state<EngineMetrics>({
    fps: 0,
    activeNodes: 0,
    frameTimeMs: 0
  });

  // Touch swipe tracking for horizontal card navigation
  let touchStartX = 0;
  let touchStartY = 0;

  const activeIndex = $derived(
    Math.max(
      0,
      NAV_ITEMS.findIndex((item) => item.id === activeSection)
    )
  );

  const selectedProject = $derived<ProjectItem | null>(
    selectedProjectId ? PROJECTS.find((p) => p.id === selectedProjectId) ?? null : null
  );

  function navigateToSection(sectionId: SectionId): void {
    if (activeSection === sectionId) {
      return;
    }
    activeSection = sectionId;
    eventBus.emit('nav:section-selected', { sectionId });
    eventBus.emit('nav:section-active', { sectionId });
  }

  function stepSection(delta: -1 | 1): void {
    const nextIndex = activeIndex + delta;
    if (nextIndex < 0 || nextIndex >= NAV_ITEMS.length) {
      return;
    }
    navigateToSection(NAV_ITEMS[nextIndex].id);
  }

  function handleSelectProject(projectId: string): void {
    selectedProjectId = projectId;
    eventBus.emit('project:selected', { projectId });
  }

  function handleCloseModal(): void {
    selectedProjectId = null;
    eventBus.emit('project:modal-closed', {});
  }

  function handleWindowKeydown(event: KeyboardEvent): void {
    if (selectedProject) {
      return;
    }
    if (event.key === 'ArrowRight') {
      stepSection(1);
    } else if (event.key === 'ArrowLeft') {
      stepSection(-1);
    }
  }

  function handleTouchStart(event: TouchEvent): void {
    if (selectedProject || event.touches.length !== 1) {
      return;
    }
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }

  function handleTouchEnd(event: TouchEvent): void {
    if (selectedProject || event.changedTouches.length !== 1) {
      return;
    }
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.35) {
      stepSection(dx < 0 ? 1 : -1);
    }
  }

  $effect(() => {
    const offMetrics = eventBus.on('engine:metrics-updated', (metrics) => {
      engineMetrics = metrics;
    });

    return () => {
      offMetrics();
    };
  });
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<main
  class="deck-viewport"
  ontouchstart={handleTouchStart}
  ontouchend={handleTouchEnd}
>
  <header class="deck-hud-bar" aria-label="Indicador de tarjeta actual">
    <div class="deck-hud-brand">
      <span class="hud-dot" aria-hidden="true"></span>
      <span>Purpool Studios</span>
    </div>

    <div class="deck-hud-progress">
      <span class="hud-counter">0{activeIndex + 1} / 0{NAV_ITEMS.length}</span>
      <span class="hud-divider" aria-hidden="true">·</span>
      <span class="hud-label">{NAV_ITEMS[activeIndex].label}</span>
    </div>
  </header>

  <button
    type="button"
    class="deck-arrow is-prev"
    aria-label="Tarjeta anterior"
    disabled={activeIndex === 0}
    onclick={() => stepSection(-1)}
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  </button>

  <button
    type="button"
    class="deck-arrow is-next"
    aria-label="Siguiente tarjeta"
    disabled={activeIndex === NAV_ITEMS.length - 1}
    onclick={() => stepSection(1)}
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  </button>

  <div
    class="deck-track"
    style="transform: translate3d(-{activeIndex * 100}%, 0, 0);"
  >
    <div class="deck-slide" aria-hidden={activeSection !== 'inicio'}>
      <div class="slide-card" class:is-active={activeSection === 'inicio'}>
        <HeroSection onNavigate={navigateToSection} />
      </div>
    </div>

    <div class="deck-slide" aria-hidden={activeSection !== 'estudio'}>
      <div class="slide-card" class:is-active={activeSection === 'estudio'}>
        <StudioSection pillars={STUDIO_PILLARS} />
      </div>
    </div>

    <div class="deck-slide" aria-hidden={activeSection !== 'miembros'}>
      <div class="slide-card" class:is-active={activeSection === 'miembros'}>
        <MembersSection members={TEAM_MEMBERS} />
      </div>
    </div>

    <div class="deck-slide" aria-hidden={activeSection !== 'proyectos'}>
      <div class="slide-card" class:is-active={activeSection === 'proyectos'}>
        <ProjectsSection projects={PROJECTS} onSelectProject={handleSelectProject} />
      </div>
    </div>

    <div class="deck-slide" aria-hidden={activeSection !== 'tecnologia'}>
      <div class="slide-card" class:is-active={activeSection === 'tecnologia'}>
        <TechSection layers={STACK_LAYERS} metrics={engineMetrics} />
      </div>
    </div>

    <div class="deck-slide" aria-hidden={activeSection !== 'contacto'}>
      <div class="slide-card" class:is-active={activeSection === 'contacto'}>
        <ContactSection />
      </div>
    </div>
  </div>
</main>

<FloatingNav
  items={NAV_ITEMS}
  {activeSection}
  onSelect={navigateToSection}
/>

<ProjectModal project={selectedProject} onClose={handleCloseModal} />

<style>
  .deck-viewport {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .deck-hud-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    padding: 1rem 1.5rem 0.25rem;
    flex-shrink: 0;
  }

  .deck-hud-brand {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .hud-dot {
    width: 0.48rem;
    height: 0.48rem;
    border-radius: 9999px;
    background: var(--accent-lavender);
    box-shadow: 0 0 10px rgba(192, 132, 252, 0.7);
  }

  .deck-hud-progress {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0.85rem;
    border-radius: 9999px;
    background: rgba(17, 13, 27, 0.72);
    border: 1px solid rgba(196, 168, 255, 0.14);
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--text-secondary);
  }

  .hud-counter {
    color: var(--accent-lavender);
    font-variant-numeric: tabular-nums;
  }

  .hud-divider {
    color: var(--text-muted);
  }

  .deck-track {
    display: flex;
    width: 100%;
    flex: 1;
    min-height: 0;
    transition: transform 0.62s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }

  .deck-slide {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    padding: 0.75rem 4.25rem 5.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slide-card {
    width: 100%;
    max-width: 1140px;
    max-height: 100%;
    overflow-y: auto;
    padding: 2.35rem 2.6rem;
    border-radius: 28px;
    background: rgba(14, 10, 23, 0.62);
    border: 1px solid rgba(196, 168, 255, 0.14);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 26px 70px rgba(3, 1, 10, 0.58);
    transform: scale(0.94);
    opacity: 0.42;
    transition:
      transform 0.58s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.5s ease;
    scrollbar-width: thin;
    scrollbar-color: rgba(192, 132, 252, 0.25) transparent;
  }

  .slide-card.is-active {
    transform: scale(1);
    opacity: 1;
  }

  .deck-arrow {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 40;
    width: 2.7rem;
    height: 2.7rem;
    border-radius: 9999px;
    border: 1px solid rgba(196, 168, 255, 0.18);
    background: rgba(16, 12, 26, 0.76);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    color: var(--text-primary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 10px 26px rgba(3, 1, 10, 0.55);
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease,
      opacity 0.2s ease;
  }

  .deck-arrow svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  .deck-arrow.is-prev {
    left: 1rem;
  }

  .deck-arrow.is-next {
    right: 1rem;
  }

  .deck-arrow:hover:not(:disabled) {
    background: rgba(168, 85, 247, 0.24);
    border-color: rgba(196, 168, 255, 0.4);
    transform: translateY(-50%) scale(1.06);
  }

  .deck-arrow:disabled {
    opacity: 0.25;
    cursor: default;
  }

  @media (max-width: 900px) {
    .deck-slide {
      padding: 0.5rem 1rem 5.4rem;
    }

    .slide-card {
      padding: 1.5rem 1.35rem;
      border-radius: 22px;
    }

    .deck-arrow {
      display: none;
    }
  }
</style>
