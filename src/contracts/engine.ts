/**
 * Abstract 2D rendering surface so the core engine stays free of DOM/CanvasElement dependencies.
 */
export interface RenderSurface {
  readonly width: number;
  readonly height: number;
  clear(): void;
  beginFrame(width: number, height: number): void;
  drawCircle(x: number, y: number, radius: number, fillStyle: string, alpha: number): void;
  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeStyle: string,
    lineWidth: number,
    alpha: number
  ): void;
  drawArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    strokeStyle: string,
    lineWidth: number,
    alpha: number
  ): void;
}

/**
 * Abstract frame scheduler injected from infrastructure to avoid window/DOM coupling in core.
 */
export interface FrameScheduler {
  requestFrame(callback: (timestampMs: number) => void): number;
  cancelFrame(handle: number): void;
  now(): number;
}

export interface EngineConfig {
  readonly poolCapacity: number;
  readonly connectionRadius: number;
  readonly pointerInfluenceRadius: number;
}

export interface EngineLifecycle {
  start(): void;
  stop(): void;
  destroy(): void;
}
