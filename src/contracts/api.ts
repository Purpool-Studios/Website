export interface UserProfile {
  username: string;
}

// --- Estructuras para Partidas ---
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

// --- Estructuras para Tabla de Clasificaciones ---
export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
  current_page: number;
  total_pages: number;
  total_users: number;
  current_user: LeaderboardEntry | null;
}

export interface IApiClient {
  getCurrentUser(): Promise<UserProfile | null>;
  createUser(username: string): Promise<UserProfile>;
  
  // Endpoints del Ciclo de Partida
  requestMatch(): Promise<MatchResponse>;
  startMinigameTimer(): Promise<void>;
  submitMinigameResult(payload: MinigameSubmitPayload): Promise<MatchResponse>;
  abandonMatch(): Promise<void>;

  // Endpoint de Clasificaciones
  getLeaderboard(page?: number, category?: string): Promise<LeaderboardResponse>;
}