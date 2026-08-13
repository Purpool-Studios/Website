export interface UserProfile {
  id: string;
  username: string;
}

export interface IApiClient {
  /** Verifica si el usuario actual existe en la base de datos */
  getCurrentUser(): Promise<UserProfile | null>;
  
  /** Crea un nuevo perfil para un jugador recién autenticado */
  createUser(username: string): Promise<UserProfile>;
}