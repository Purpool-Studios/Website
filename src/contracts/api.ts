export interface UserProfile {
  username: string;
}

// --- Nuevas estructuras para Partidas ---
export interface MinigameInfo {
  id: string;
  name: string;
  category: string;
}

export interface MatchMinigameState {
  id: string;
  status: 'PENDING' | 'PLAYING' | 'COMPLETED';
  minigame: MinigameInfo;
}

export interface MatchState {
  id: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  score: number;
}

export interface MatchResponse {
  match: MatchState;
  current_minigame: MatchMinigameState | null;
}

export interface MinigameSubmitPayload {
  correct_answers: number;
  total_answers: number;
}

export interface IApiClient {
  getCurrentUser(): Promise<UserProfile | null>;
  createUser(username: string): Promise<UserProfile>;
  
  // Endpoints del Ciclo de Partida
  requestMatch(): Promise<MatchResponse>;
  startMinigameTimer(): Promise<void>;
  submitMinigameResult(payload: MinigameSubmitPayload): Promise<MatchResponse>;
  abandonMatch(): Promise<void>;
}