<script lang="ts">
  import { onMount } from 'svelte';
  import type { IAuthService } from '../contracts/auth';
  import type { IApiClient } from '../contracts/api';
  
  import LandingView from './views/LandingView.svelte';
  import AuthCallbackView from './views/AuthCallbackView.svelte';
  import OnboardingView from './views/OnboardingView.svelte';
  import MainLayout from './views/MainLayout.svelte';

  // Inyección de dependencias usando Svelte 5 Runes
  let { authService, apiClient }: { authService: IAuthService; apiClient: IApiClient } = $props();

  // Máquina de estados estricta
  type AppState = 'INITIALIZING' | 'LANDING' | 'PROCESSING_AUTH' | 'ONBOARDING' | 'MAIN';
  let currentState: AppState = $state('INITIALIZING');

  onMount(async () => {
    try {
      // 1. Si venimos redirigidos desde Auth0, interceptamos antes de hacer nada.
      if (authService.hasRedirectCallback()) {
        currentState = 'PROCESSING_AUTH';
        await authService.handleRedirectCallback();
        await evaluateUserDatabase();
        return;
      }

      // 2. Si no es un callback, revisamos si el usuario ya tiene sesión activa
      const isAuth = await authService.isAuthenticated();
      if (isAuth) {
        currentState = 'PROCESSING_AUTH'; // Mostramos pantalla de carga
        await evaluateUserDatabase();
      } else {
        currentState = 'LANDING';
      }
    } catch (error) {
      console.error("[App] Fallo en la inicialización:", error);
      currentState = 'LANDING';
    }
  });

  const evaluateUserDatabase = async () => {
    try {
      const user = await apiClient.getCurrentUser();
      if (user) {
        currentState = 'MAIN'; // Usuario existe, directo al juego
      } else {
        currentState = 'ONBOARDING'; // Nuevo usuario, pedir username
      }
    } catch (error) {
      console.error("[App] Error validando base de datos:", error);
      authService.logout(); // Fail-safe
    }
  };

  const onOnboardingComplete = () => {
    currentState = 'MAIN';
  };
</script>

{#if currentState === 'INITIALIZING'}
  <!-- Pantalla negra o spinner mientras se carga Auth0 -->
  <div class="loader-bg"></div>
{:else if currentState === 'LANDING'}
  <LandingView {authService} />
{:else if currentState === 'PROCESSING_AUTH'}
  <AuthCallbackView />
{:else if currentState === 'ONBOARDING'}
  <OnboardingView {apiClient} onComplete={onOnboardingComplete} />
{:else if currentState === 'MAIN'}
  <MainLayout onLogout={() => authService.logout()} />
{/if}

<style>
  .loader-bg {
    width: 100vw; height: 100vh;
    background-color: var(--color-bg-deep);
  }
</style>