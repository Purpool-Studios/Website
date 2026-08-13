import { mount } from 'svelte';
import './ui/global.css';
import App from './ui/App.svelte';
import { Auth0Service } from './infrastructure/Auth0Service';
import { GameApiClient } from './infrastructure/GameApiClient';

const bootstrap = async () => {
  const targetElement = document.getElementById('app');
  if (!targetElement) {
    throw new Error("[UI Engine] Error crítico: No se encontró '#app' en el DOM.");
  }

  // Composición de dependencias
  const authService = new Auth0Service();
  await authService.init(); // Inicializa Auth0 y procesa variables de entorno

  const apiClient = new GameApiClient(authService);

  // Montamos la aplicación inyectando los contratos (no clases concretas)
  mount(App, {
    target: targetElement,
    props: {
      authService,
      apiClient
    }
  });
};

bootstrap().catch(console.error);