import type { AppEventMap, EventBus, EventHandler, EventKey } from '@contracts/events';

/**
 * Strongly typed Event Bus implementing the Observer pattern for decoupled Core <-> UI communication.
 */
export class TypedEventBus implements EventBus {
  private readonly listeners = new Map<EventKey, Set<EventHandler<EventKey>>>();

  public on<K extends EventKey>(event: K, handler: EventHandler<K>): () => void {
    let bucket = this.listeners.get(event);
    if (!bucket) {
      bucket = new Set();
      this.listeners.set(event, bucket);
    }
    const typedHandler = handler as EventHandler<EventKey>;
    bucket.add(typedHandler);

    return () => {
      this.off(event, handler);
    };
  }

  public off<K extends EventKey>(event: K, handler: EventHandler<K>): void {
    const bucket = this.listeners.get(event);
    if (!bucket) {
      return;
    }
    bucket.delete(handler as EventHandler<EventKey>);
    if (bucket.size === 0) {
      this.listeners.delete(event);
    }
  }

  public emit<K extends EventKey>(event: K, payload: AppEventMap[K]): void {
    const bucket = this.listeners.get(event);
    if (!bucket) {
      return;
    }
    for (const handler of bucket) {
      (handler as EventHandler<K>)(payload);
    }
  }

  public clear(): void {
    this.listeners.clear();
  }
}
