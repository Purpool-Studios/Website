import type { EngineConfig, EngineLifecycle, FrameScheduler, RenderSurface } from '@contracts/engine';
import type { EventBus, PointerState, SectionId } from '@contracts/events';
import { NodePool } from './ecs/NodePool';
import { AmbientFieldSystem } from './systems/AmbientFieldSystem';
import { CanvasRenderSystem } from './systems/CanvasRenderSystem';

const SECTION_ENERGY: Record<SectionId, number> = {
  inicio: 0.45,
  estudio: 0.35,
  proyectos: 0.55,
  tecnologia: 0.65,
  contacto: 0.3
};

/**
 * Pure TypeScript simulation & rendering engine with zero DOM/UI dependencies.
 */
export class PurpoolEngine implements EngineLifecycle {
  private readonly eventBus: EventBus;
  private readonly surface: RenderSurface;
  private readonly scheduler: FrameScheduler;
  private readonly config: EngineConfig;

  private readonly pool: NodePool;
  private readonly fieldSystem: AmbientFieldSystem;
  private readonly renderSystem: CanvasRenderSystem;

  private readonly unsubscribers: Array<() => void> = [];

  private pointer: PointerState = { x: 0, y: 0, active: false };
  private viewportWidth = 1280;
  private viewportHeight = 720;

  private running = false;
  private hidden = false;
  private frameHandle = 0;
  private lastTimestampMs = 0;

  // Pre-allocated telemetry accumulators
  private metricsElapsedMs = 0;
  private frameCounter = 0;
  private accumFrameWorkMs = 0;

  constructor(
    eventBus: EventBus,
    surface: RenderSurface,
    scheduler: FrameScheduler,
    config: EngineConfig
  ) {
    this.eventBus = eventBus;
    this.surface = surface;
    this.scheduler = scheduler;
    this.config = config;

    this.pool = new NodePool(config.poolCapacity);
    this.fieldSystem = new AmbientFieldSystem();
    this.renderSystem = new CanvasRenderSystem();

    this.viewportWidth = surface.width || 1280;
    this.viewportHeight = surface.height || 720;
    this.pool.seed(this.viewportWidth, this.viewportHeight, this.computeTargetNodeCount());

    this.bindEvents();
  }

  public start(): void {
    if (this.running) {
      return;
    }
    this.running = true;
    this.lastTimestampMs = this.scheduler.now();
    this.scheduleNext();
  }

  public renderSingleFrame(): void {
    this.renderSystem.render(
      this.surface,
      this.pool,
      this.config.connectionRadius,
      this.fieldSystem.ringAngle,
      this.fieldSystem.accentEnergy
    );
  }

  public stop(): void {
    if (!this.running) {
      return;
    }
    this.running = false;
    if (this.frameHandle !== 0) {
      this.scheduler.cancelFrame(this.frameHandle);
      this.frameHandle = 0;
    }
  }

  public destroy(): void {
    this.stop();
    for (let i = 0; i < this.unsubscribers.length; i++) {
      this.unsubscribers[i]();
    }
    this.unsubscribers.length = 0;
  }

  private bindEvents(): void {
    this.unsubscribers.push(
      this.eventBus.on('viewport:resized', ({ width, height }) => {
        const prevW = this.viewportWidth;
        const prevH = this.viewportHeight;
        this.viewportWidth = width;
        this.viewportHeight = height;
        this.pool.rescale(prevW, prevH, width, height);
        this.pool.activeCount = this.computeTargetNodeCount();
      }),
      this.eventBus.on('pointer:moved', (state) => {
        this.pointer = state;
      }),
      this.eventBus.on('nav:section-active', ({ sectionId }) => {
        this.fieldSystem.setEnergyTarget(SECTION_ENERGY[sectionId]);
      }),
      this.eventBus.on('engine:visibility-changed', ({ hidden }) => {
        this.hidden = hidden;
        if (!hidden && this.running && this.frameHandle === 0) {
          this.lastTimestampMs = this.scheduler.now();
          this.scheduleNext();
        }
      })
    );
  }

  private computeTargetNodeCount(): number {
    const area = this.viewportWidth * this.viewportHeight;
    const scaled = Math.floor(area / 32000);
    const clamped = scaled < 18 ? 18 : scaled > this.config.poolCapacity ? this.config.poolCapacity : scaled;
    return clamped;
  }

  private scheduleNext(): void {
    if (!this.running || this.hidden) {
      this.frameHandle = 0;
      return;
    }
    this.frameHandle = this.scheduler.requestFrame(this.tick);
  }

  private readonly tick = (timestampMs: number): void => {
    this.frameHandle = 0;
    if (!this.running || this.hidden) {
      return;
    }

    const workStart = this.scheduler.now();
    const elapsedMs = timestampMs - this.lastTimestampMs;
    this.lastTimestampMs = timestampMs;

    const dtSeconds = elapsedMs > 0 ? elapsedMs * 0.001 : 0.016;

    this.fieldSystem.update(
      this.pool,
      dtSeconds,
      this.viewportWidth,
      this.viewportHeight,
      this.pointer,
      this.config.pointerInfluenceRadius
    );

    this.renderSystem.render(
      this.surface,
      this.pool,
      this.config.connectionRadius,
      this.fieldSystem.ringAngle,
      this.fieldSystem.accentEnergy
    );

    const workDuration = this.scheduler.now() - workStart;
    this.frameCounter += 1;
    this.metricsElapsedMs += elapsedMs > 0 ? elapsedMs : 16.6;
    this.accumFrameWorkMs += workDuration;

    if (this.metricsElapsedMs >= 500) {
      const fps = Math.round((this.frameCounter * 1000) / this.metricsElapsedMs);
      const avgWorkMs = Math.round((this.accumFrameWorkMs / this.frameCounter) * 100) / 100;

      this.eventBus.emit('engine:metrics-updated', {
        fps: fps > 240 ? 240 : fps,
        activeNodes: this.pool.activeCount,
        frameTimeMs: avgWorkMs
      });

      this.frameCounter = 0;
      this.metricsElapsedMs = 0;
      this.accumFrameWorkMs = 0;
    }

    this.scheduleNext();
  };
}
