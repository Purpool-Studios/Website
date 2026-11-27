<script lang="ts">
  import type { EngineMetrics, EventBus, SectionId } from '@contracts/events';
  import type { ProjectItem } from '@contracts/portfolio';
  import { NAV_ITEMS, PROJECTS, STACK_LAYERS, STUDIO_PILLARS } from '@infrastructure/studioData';
  import FloatingNav from './components/FloatingNav.svelte';
  import HeroSection from './components/HeroSection.svelte';
  import StudioSection from './components/StudioSection.svelte';
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

  const selectedProject = $derived<ProjectItem | null>(
    selectedProjectId ? PROJECTS.find((p) => p.id === selectedProjectId) ?? null : null
  );

  function navigateToSection(sectionId: SectionId): void {
    activeSection = sectionId;
    eventBus.emit('nav:section-selected', { sectionId });
    eventBus.emit('nav:section-active', { sectionId });

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleSelectProject(projectId: string): void {
    selectedProjectId = projectId;
    eventBus.emit('project:selected', { projectId });
  }

  function handleCloseModal(): void {
    selectedProjectId = null;
    eventBus.emit('project:modal-closed', {});
  }

  $effect(() => {
    const offMetrics = eventBus.on('engine:metrics-updated', (metrics) => {
      engineMetrics = metrics;
    });

    const sectionIds: readonly SectionId[] = ['inicio', 'estudio', 'proyectos', 'tecnologia', 'contacto'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            if (activeSection !== id) {
              activeSection = id;
              eventBus.emit('nav:section-active', { sectionId: id });
            }
          }
        }
      },
      {
        rootMargin: '-38% 0px -45% 0px',
        threshold: 0
      }
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      offMetrics();
      observer.disconnect();
    };
  });
</script>

<main class="hud-shell">
  <HeroSection onNavigate={navigateToSection} />
  <StudioSection pillars={STUDIO_PILLARS} />
  <ProjectsSection projects={PROJECTS} onSelectProject={handleSelectProject} />
  <TechSection layers={STACK_LAYERS} metrics={engineMetrics} />
  <ContactSection />
</main>

<FloatingNav
  items={NAV_ITEMS}
  {activeSection}
  onSelect={navigateToSection}
/>

<ProjectModal project={selectedProject} onClose={handleCloseModal} />
