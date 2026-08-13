import type { IApiClient, UserProfile } from '../contracts/api';
import type { IAuthService } from '../contracts/auth';

export class GameApiClient implements IApiClient {
  private readonly baseUrl: string;

  // Inyectamos IAuthService para garantizar que siempre obtenemos el token más reciente
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
    const response = await fetch(`${this.baseUrl}/api/v1/users/me`, { headers });
    
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
}