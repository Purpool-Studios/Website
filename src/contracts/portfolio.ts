import type { SectionId } from './events';

export type ProjectCategory = 'videojuego' | 'software' | 'motor';

export type ProjectStatus = 'Lanzado' | 'En desarrollo' | 'Arquitectura interna';

export interface ProjectMetric {
  readonly label: string;
  readonly value: string;
}

export interface ProjectItem {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: ProjectCategory;
  readonly categoryLabel: string;
  readonly status: ProjectStatus;
  readonly year: string;
  readonly tagline: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  readonly image: string | null;
  readonly accentHex: string;
  readonly metrics: readonly ProjectMetric[];
}

export interface NavItem {
  readonly id: SectionId;
  readonly label: string;
}

export interface StudioPillar {
  readonly code: string;
  readonly title: string;
  readonly description: string;
}

export interface StackLayer {
  readonly layer: string;
  readonly title: string;
  readonly technology: string;
  readonly summary: string;
}
