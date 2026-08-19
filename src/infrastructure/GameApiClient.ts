import type { IApiClient, UserProfile, MatchResponse, MinigameSubmitPayload } from '../contracts/api';
import type { IAuthService } from '../contracts/auth';

export class GameApiClient implements IApiClient {
  private readonly baseUrl: string;

  constructor(private readonly authService: IAuthService) {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  private async getHeaders(): Promise<Headers> {
    const token = await this.authService.getToken();
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public async getCurrentUser(): Promise<UserProfile | null> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}/api/v1/users/me`, { 
      method: 'GET',
      headers,
      cache: 'no-cache' 
    });
    
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`[API] Error fetching user: ${response.status}`);
    
    return await response.json();
  }

  public async createUser(username: string): Promise<UserProfile> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}/api/v1/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ username })
    });

    if (!response.ok) throw new Error(`[API] Error creating user: ${response.status}`);
    
    return await response.json();
  }

  // --- Endpoints de Partidas ---

  public async requestMatch(): Promise<MatchResponse> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}/api/v1/matches`, { method: 'POST', headers });
    
    if (response.status === 409) throw new Error('MATCH_IN_PROGRESS');
    if (!response.ok) throw new Error(`[API] Error requesting match: ${response.status}`);
    
    return await response.json();
  }

  public async startMinigameTimer(): Promise<void> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}/api/v1/matches/current/start`, { method: 'POST', headers });
    if (!response.ok) throw new Error(`[API] Error starting timer: ${response.status}`);
  }

  public async submitMinigameResult(payload: MinigameSubmitPayload): Promise<MatchResponse> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}/api/v1/matches/current/submit`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    
    if (response.status === 408) throw new Error('MATCH_TIMEOUT');
    if (!response.ok) throw new Error(`[API] Error submitting result: ${response.status}`);
    
    return await response.json();
  }

  public async abandonMatch(): Promise<void> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}/api/v1/matches/current`, { method: 'DELETE', headers });
    if (!response.ok && response.status !== 204) {
      throw new Error(`[API] Error abandoning match: ${response.status}`);
    }
  }
}