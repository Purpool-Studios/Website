/**
 * Contiguous Structure-of-Arrays (SoA) object pool for ambient ECS nodes.
 * All memory is allocated once at construction to prevent GC pauses during rendering.
 */
export class NodePool {
  public readonly capacity: number;
  public activeCount: number;

  public readonly x: Float32Array;
  public readonly y: Float32Array;
  public readonly vx: Float32Array;
  public readonly vy: Float32Array;
  public readonly baseVx: Float32Array;
  public readonly baseVy: Float32Array;
  public readonly radius: Float32Array;
  public readonly phase: Float32Array;
  public readonly paletteIndex: Uint8Array;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.activeCount = 0;

    this.x = new Float32Array(capacity);
    this.y = new Float32Array(capacity);
    this.vx = new Float32Array(capacity);
    this.vy = new Float32Array(capacity);
    this.baseVx = new Float32Array(capacity);
    this.baseVy = new Float32Array(capacity);
    this.radius = new Float32Array(capacity);
    this.phase = new Float32Array(capacity);
    this.paletteIndex = new Uint8Array(capacity);
  }

  /**
   * Populates the pool deterministically within the given viewport bounds.
   */
  public seed(width: number, height: number, count: number): void {
    const safeWidth = width > 0 ? width : 1280;
    const safeHeight = height > 0 ? height : 720;
    const targetCount = count < this.capacity ? count : this.capacity;
    this.activeCount = targetCount;

    let rngState = 0x50555250; // "PURP"
    const nextRand = (): number => {
      rngState = (rngState + 0x6d2b79f5) | 0;
      let t = Math.imul(rngState ^ (rngState >>> 15), 1 | rngState);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    for (let i = 0; i < targetCount; i++) {
      this.x[i] = nextRand() * safeWidth;
      this.y[i] = nextRand() * safeHeight;

      const angle = nextRand() * Math.PI * 2;
      const speed = 8 + nextRand() * 14;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      this.vx[i] = vx;
      this.vy[i] = vy;
      this.baseVx[i] = vx;
      this.baseVy[i] = vy;
      this.radius[i] = 1.2 + nextRand() * 1.9;
      this.phase[i] = nextRand() * Math.PI * 2;
      this.paletteIndex[i] = i % 3;
    }
  }

  /**
   * Proportionally repositions existing entities on viewport resize without reallocating.
   */
  public rescale(prevWidth: number, prevHeight: number, nextWidth: number, nextHeight: number): void {
    if (prevWidth <= 0 || prevHeight <= 0 || nextWidth <= 0 || nextHeight <= 0) {
      return;
    }
    const sx = nextWidth / prevWidth;
    const sy = nextHeight / prevHeight;
    for (let i = 0; i < this.activeCount; i++) {
      this.x[i] *= sx;
      this.y[i] *= sy;
    }
  }
}
