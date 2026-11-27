import { mount } from 'svelte';
import '@ui/styles/app.css';
import App from '@ui/App.svelte';
import { PurpoolEngine } from '@core/PurpoolEngine';
import { TypedEventBus } from '@infrastructure/TypedEventBus';
import { BrowserFrameScheduler, Canvas2DSurface } from '@infrastructure/Canvas2DSurface';

function bootstrap(): void {
  const rootTarget = document.getElementById('app');
  if (!rootTarget) {
    throw new Error('Root mount element #app was not found.');
  }

  const eventBus = new TypedEventBus();

  // Mount dedicated background Canvas 2D surface for the Core ECS Engine
  const canvas = document.createElement('canvas');
  canvas.className = 'engine-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const surface = new Canvas2DSurface(canvas);
  const scheduler = new BrowserFrameScheduler();

  const engine = new PurpoolEngine(eventBus, surface, scheduler, {
    poolCapacity: 52,
    connectionRadius: 155,
    pointerInfluenceRadius: 145
  });

  // Wire DOM environment events into the decoupled EventBus
  const handleResize = (): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    surface.resize(width, height, dpr);
    eventBus.emit('viewport:resized', { width, height, dpr });
  };

  const handlePointerMove = (event: PointerEvent): void => {
    eventBus.emit('pointer:moved', {
      x: event.clientX,
      y: event.clientY,
      active: true
    });
  };

  const handlePointerLeave = (): void => {
    eventBus.emit('pointer:moved', {
      x: 0,
      y: 0,
      active: false
    });
  };

  const handleVisibilityChange = (): void => {
    eventBus.emit('engine:visibility-changed', {
      hidden: document.hidden
    });
  };

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Respect user's reduced-motion preference by rendering a single static frame instead of a loop
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    engine.renderSingleFrame();
  } else {
    engine.start();
  }

  // Mount Svelte 5 HUD/Overlay layer
  mount(App, {
    target: rootTarget,
    props: {
      eventBus
    }
  });
}

bootstrap();
