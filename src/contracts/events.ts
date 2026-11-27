export type SectionId = 'inicio' | 'estudio' | 'miembros' | 'proyectos' | 'tecnologia' | 'contacto';

export interface EngineMetrics {
  readonly fps: number;
  readonly activeNodes: number;
  readonly frameTimeMs: number;
}

export interface ViewportSize {
  readonly width: number;
  readonly height: number;
  readonly dpr: number;
}

export interface PointerState {
  readonly x: number;
  readonly y: number;
  readonly active: boolean;
}

export interface AppEventMap {
  'nav:section-selected': { readonly sectionId: SectionId };
  'nav:section-active': { readonly sectionId: SectionId };
  'project:selected': { readonly projectId: string };
  'project:modal-closed': Record<string, never>;
  'viewport:resized': ViewportSize;
  'pointer:moved': PointerState;
  'engine:metrics-updated': EngineMetrics;
  'engine:visibility-changed': { readonly hidden: boolean };
}

export type EventKey = keyof AppEventMap;
export type EventHandler<K extends EventKey> = (payload: AppEventMap[K]) => void;

export interface EventBus {
  on<K extends EventKey>(event: K, handler: EventHandler<K>): () => void;
  off<K extends EventKey>(event: K, handler: EventHandler<K>): void;
  emit<K extends EventKey>(event: K, payload: AppEventMap[K]): void;
  clear(): void;
}
