import type { PointerState } from '@contracts/events';
import type { NodePool } from '../ecs/NodePool';

/**
 * Pure ECS movement & pointer-interaction system operating directly on NodePool TypedArrays.
 */
export class AmbientFieldSystem {
  public ringAngle = 0;
  public accentEnergy = 0.35;
  private targetEnergy = 0.35;

  public setEnergyTarget(energy: number): void {
    this.targetEnergy = energy;
  }

  public update(
    pool: NodePool,
    dtSeconds: number,
    width: number,
    height: number,
    pointer: PointerState,
    pointerRadius: number
  ): void {
    // Clamp delta to prevent large simulation jumps after tab switches
    const dt = dtSeconds > 0.05 ? 0.05 : dtSeconds;
    this.ringAngle = (this.ringAngle + dt * 0.075) % (Math.PI * 2);
    this.accentEnergy += (this.targetEnergy - this.accentEnergy) * (dt * 3.0);

    const radiusSq = pointerRadius * pointerRadius;
    const damping = 1 - Math.min(dt * 2.4, 0.25);
    const margin = 24;

    const count = pool.activeCount;
    const px = pointer.x;
    const py = pointer.y;
    const pointerActive = pointer.active;

    for (let i = 0; i < count; i++) {
      let vx = pool.vx[i];
      let vy = pool.vy[i];

      // Relax smoothly toward intrinsic drift velocity
      vx = vx * damping + pool.baseVx[i] * (1 - damping);
      vy = vy * damping + pool.baseVy[i] * (1 - damping);

      if (pointerActive) {
        const dx = pool.x[i] - px;
        const dy = pool.y[i] - py;
        const distSq = dx * dx + dy * dy;

        if (distSq > 1 && distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / pointerRadius;
          const impulse = falloff * 115 * dt;
          vx += (dx / dist) * impulse;
          vy += (dy / dist) * impulse;
        }
      }

      let nx = pool.x[i] + vx * dt;
      let ny = pool.y[i] + vy * dt;

      if (nx < -margin) nx = width + margin;
      else if (nx > width + margin) nx = -margin;

      if (ny < -margin) ny = height + margin;
      else if (ny > height + margin) ny = -margin;

      pool.x[i] = nx;
      pool.y[i] = ny;
      pool.vx[i] = vx;
      pool.vy[i] = vy;
      pool.phase[i] = (pool.phase[i] + dt * 1.15) % (Math.PI * 2);
    }
  }
}
