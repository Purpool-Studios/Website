import type { RenderSurface } from '@contracts/engine';
import type { NodePool } from '../ecs/NodePool';

// Pre-allocated color palette aligned with Purpool Studios' deep plum, violet, and cyan accents
const NODE_COLORS = ['#9d6bff', '#c084fc', '#38bdf8'] as const;
const LINK_COLOR = '#7c3aed';
const ORBIT_COLOR_PRIMARY = '#6d28d9';
const ORBIT_COLOR_SECONDARY = '#38bdf8';

/**
 * Pure rendering system that reads NodePool TypedArrays and issues draw calls to an abstract RenderSurface.
 */
export class CanvasRenderSystem {
  public render(
    surface: RenderSurface,
    pool: NodePool,
    connectionRadius: number,
    ringAngle: number,
    accentEnergy: number
  ): void {
    const width = surface.width;
    const height = surface.height;
    if (width <= 0 || height <= 0) {
      return;
    }

    surface.beginFrame(width, height);
    surface.clear();

    // Subtle segmented orbital rings inspired by the Purpool emblem
    const centerX = width * 0.5;
    const centerY = height * 0.42;
    const baseRadius = Math.min(width, height) * 0.36;
    const segSpan = Math.PI * 0.38;
    const arcAlpha = 0.045 + accentEnergy * 0.03;

    for (let s = 0; s < 4; s++) {
      const start = ringAngle + s * (Math.PI * 0.5);
      surface.drawArc(
        centerX,
        centerY,
        baseRadius,
        start,
        start + segSpan,
        ORBIT_COLOR_PRIMARY,
        1.25,
        arcAlpha
      );
    }

    const outerRadius = baseRadius * 1.32;
    for (let s = 0; s < 4; s++) {
      const start = -ringAngle * 0.65 + s * (Math.PI * 0.5) + 0.25;
      surface.drawArc(
        centerX,
        centerY,
        outerRadius,
        start,
        start + Math.PI * 0.28,
        ORBIT_COLOR_SECONDARY,
        1,
        arcAlpha * 0.65
      );
    }

    // Proximity constellation lines
    const maxDistSq = connectionRadius * connectionRadius;
    const count = pool.activeCount;
    const xArr = pool.x;
    const yArr = pool.y;

    for (let i = 0; i < count; i++) {
      const x1 = xArr[i];
      const y1 = yArr[i];

      for (let j = i + 1; j < count; j++) {
        const dx = x1 - xArr[j];
        const dy = y1 - yArr[j];
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const ratio = 1 - distSq / maxDistSq;
          surface.drawLine(x1, y1, xArr[j], yArr[j], LINK_COLOR, 0.85, ratio * 0.14);
        }
      }
    }

    // Individual nodes
    for (let i = 0; i < count; i++) {
      const colorIdx = pool.paletteIndex[i];
      const color = NODE_COLORS[colorIdx] ?? NODE_COLORS[0];
      const pulse = 0.72 + Math.sin(pool.phase[i]) * 0.28;
      const alpha = (0.28 + accentEnergy * 0.25) * pulse;
      surface.drawCircle(xArr[i], yArr[i], pool.radius[i], color, alpha);
    }
  }
}
