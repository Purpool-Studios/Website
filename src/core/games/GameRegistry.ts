import { DummyEngine } from './DummyEngine';
import type { IMinigameEngine } from '../../contracts/game';

export class GameRegistry {
  /**
   * Patrón de diseño Abstract Factory / Registry.
   * Por ahora, como se solicitó, todos los juegos devuelven el DummyEngine.
   */
  public static getEngine(gameName: string): IMinigameEngine<any> {
    console.log(`[GameRegistry] Cargando motor para: ${gameName}`);
    return new DummyEngine();
  }
}