<script lang="ts">
  import LandingView from './views/LandingView.svelte';
  import MainLayout from './views/MainLayout.svelte';

  // Usando Svelte 5 Runes para reactividad de estado
  let isAuthenticated = $state(false);

  // Handlers para simular la lógica de autenticación
  const handleLogin = () => {
    isAuthenticated = true;
  };

  const handleLogout = () => {
    isAuthenticated = false;
  };
</script>

{#if !isAuthenticated}
  <LandingView onLogin={handleLogin} />
{:else}
  <MainLayout onLogout={handleLogout} />
{/if}

<style>
</style>