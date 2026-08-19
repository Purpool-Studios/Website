/**
 * Interfaz base que todo motor de minijuego debe implementar.
 * Permite que la UI interactúe con el juego sin conocer su lógica específica.
 */
export interface IMinigameEngine<TState> {
  /** Genera el estado de una nueva ronda (ej: opciones y objetivo) */
  generateRound(): TState;
  
  /** Evalúa la respuesta del usuario contra el estado actual */
  evaluate(answer: any, currentState: TState): boolean;
}