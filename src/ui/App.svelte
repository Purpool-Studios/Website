<script lang="ts">
  import { onMount } from 'svelte';
  import type { IAuthService } from '../contracts/auth';
  import type { IApiClient } from '../contracts/api';
  
  import LandingView from './views/LandingView.svelte';
  import AuthCallbackView from './views/AuthCallbackView.svelte';
  import OnboardingView from './views/OnboardingView.svelte';
  import MainLayout from './views/MainLayout.svelte';

  let { authService, apiClient }: { authService: IAuthService; apiClient: IApiClient } = $props();

  type AppState = 'INITIALIZING' | 'LANDING' | 'PROCESSING_AUTH' | 'ONBOARDING' | 'MAIN';
  let currentState: AppState = $state('INITIALIZING');

  onMount(async () => {
    try {
      if (authService.hasRedirectCallback()) {
        currentState = 'PROCESSING_AUTH';
        await authService.handleRedirectCallback();
        await evaluateUserDatabase();
        return;
      }

      const isAuth = await authService.isAuthenticated();
      if (isAuth) {
        currentState = 'PROCESSING_AUTH'; 
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
        currentState = 'MAIN'; 
      } else {
        currentState = 'ONBOARDING'; 
      }
    } catch (error) {
      console.error("[App] Error validando base de datos:", error);
      authService.logout(); 
    }
  };

  const onOnboardingComplete = () => {
    currentState = 'MAIN';
  };
</script>

{#if currentState === 'INITIALIZING'}
  <div class="loader-bg"></div>
{:else if currentState === 'LANDING'}
  <LandingView {authService} />
{:else if currentState === 'PROCESSING_AUTH'}
  <AuthCallbackView />
{:else if currentState === 'ONBOARDING'}
  <OnboardingView {apiClient} onComplete={onOnboardingComplete} />
{:else if currentState === 'MAIN'}
  <!-- AHORA INYECTAMOS EL apiClient A MainLayout -->
  <MainLayout {apiClient} onLogout={() => authService.logout()} />
{/if}

<style>
  .loader-bg {
    width: 100vw; height: 100vh;
    background-color: var(--color-bg-deep);
  }
</style>