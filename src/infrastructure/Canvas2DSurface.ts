import type { FrameScheduler, RenderSurface } from '@contracts/engine';

/**
 * Concrete Canvas 2D surface adapter bridging browser DOM canvas to the pure core RenderSurface contract.
 */
export class Canvas2DSurface implements RenderSurface {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private logicalWidth = 0;
  private logicalHeight = 0;
  private currentDpr = 1;

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true
    });
    if (!context) {
      throw new Error('Canvas 2D context is not available in this browser environment.');
    }
    this.canvas = canvas;
    this.ctx = context;
    this.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio || 1);
  }

  public get width(): number {
    return this.logicalWidth;
  }

  public get height(): number {
    return this.logicalHeight;
  }

  public resize(width: number, height: number, dpr: number): void {
    const safeDpr = Math.min(Math.max(dpr, 1), 2);
    this.logicalWidth = width;
    this.logicalHeight = height;
    this.currentDpr = safeDpr;

    this.canvas.width = Math.floor(width * safeDpr);
    this.canvas.height = Math.floor(height * safeDpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
  }

  public beginFrame(width: number, height: number): void {
    if (width !== this.logicalWidth || height !== this.logicalHeight) {
      this.resize(width, height, this.currentDpr);
    }
    this.ctx.setTransform(this.currentDpr, 0, 0, this.currentDpr, 0, 0);
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);
  }

  public drawCircle(x: number, y: number, radius: number, fillStyle: string, alpha: number): void {
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = fillStyle;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  public drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeStyle: string,
    lineWidth: number,
    alpha: number
  ): void {
    this.ctx.globalAlpha = alpha;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  public drawArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    strokeStyle: string,
    lineWidth: number,
    alpha: number
  ): void {
    this.ctx.globalAlpha = alpha;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, startAngle, endAngle);
    this.ctx.stroke();
  }
}

/**
 * Browser requestAnimationFrame adapter implementing FrameScheduler.
 */
export class BrowserFrameScheduler implements FrameScheduler {
  public requestFrame(callback: (timestampMs: number) => void): number {
    return window.requestAnimationFrame(callback);
  }

  public cancelFrame(handle: number): void {
    window.cancelAnimationFrame(handle);
  }

  public now(): number {
    return performance.now();
  }
}
