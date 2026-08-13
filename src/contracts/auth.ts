export interface IAuthService {
  /** Inicializa el cliente y procesa redirecciones si existen en la URL */
  init(): Promise<void>;
  
  /** Verifica si hay un usuario autenticado en sesión */
  isAuthenticated(): Promise<boolean>;
  
  /** Retorna el JWT para ser usado en las peticiones al backend */
  getToken(): Promise<string>;
  
  /** Inicia el flujo de login redirigiendo a Auth0 */
  login(): Promise<void>;
  
  /** Cierra la sesión y limpia la caché */
  logout(): void;
  
  /** Evalúa si la URL actual contiene parámetros de respuesta de Auth0 */
  hasRedirectCallback(): boolean;
  
  /** Procesa el callback de Auth0 y limpia la URL */
  handleRedirectCallback(): Promise<void>;
}