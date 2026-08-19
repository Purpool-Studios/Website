import type { IMinigameEngine } from '../../contracts/game';

export interface DummyRoundState {
  target: number;
  options: number[];
}

export class DummyEngine implements IMinigameEngine<DummyRoundState> {
  public generateRound(): DummyRoundState {
    const target = Math.floor(Math.random() * 100);
    // Generar entre 3 y 5 opciones
    const optionsCount = Math.floor(Math.random() * 3) + 3; 
    
    const opts = new Set<number>();
    opts.add(target);
    
    while(opts.size < optionsCount) {
      opts.add(Math.floor(Math.random() * 100));
    }
    
    return {
      target,
      // Desordenar las opciones aleatoriamente
      options: Array.from(opts).sort(() => Math.random() - 0.5)
    };
  }

  public evaluate(answer: number, currentState: DummyRoundState): boolean {
    return answer === currentState.target;
  }
}