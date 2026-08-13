import { createAuth0Client, Auth0Client } from '@auth0/auth0-spa-js';
import type { IAuthService } from '../contracts/auth';

export class Auth0Service implements IAuthService {
  private client: Auth0Client | null = null;

  public async init(): Promise<void> {
    // Las variables de entorno son inyectadas por Vite (import.meta.env)
    this.client = await createAuth0Client({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        // Usamos el origin para compatibilidad perfecta con Dev (localhost) y Prod (GitHub Pages)
        redirect_uri: window.location.origin
      },
      cacheLocation: 'memory' // Crítico: Evita ataques XSS
    });
  }

  public async isAuthenticated(): Promise<boolean> {
    if (!this.client) throw new Error("Auth0Client no inicializado");
    return await this.client.isAuthenticated();
  }

  public async getToken(): Promise<string> {
    if (!this.client) throw new Error("Auth0Client no inicializado");
    try {
      // getTokenSilently maneja automáticamente la renovación de tokens expirados
      return await this.client.getTokenSilently();
    } catch (error) {
      console.error("[AuthService] No se pudo obtener el token silenciosamente", error);
      await this.login();
      throw error;
    }
  }

  public async login(): Promise<void> {
    if (!this.client) throw new Error("Auth0Client no inicializado");
    await this.client.loginWithRedirect();
  }

  public logout(): void {
    if (!this.client) throw new Error("Auth0Client no inicializado");
    this.client.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  public hasRedirectCallback(): boolean {
    const search = window.location.search;
    return search.includes("code=") && search.includes("state=");
  }

  public async handleRedirectCallback(): Promise<void> {
    if (!this.client) throw new Error("Auth0Client no inicializado");
    await this.client.handleRedirectCallback();
    // Limpiamos la URL para no dejar el 'code' visible en GitHub Pages
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}