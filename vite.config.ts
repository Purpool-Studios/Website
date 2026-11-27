import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// En CI (GitHub Actions) VITE_BASE_PATH se inyecta como /<repo-name>/
// En desarrollo local no se define, por lo que el sitio sirve desde la raíz.
const base = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [svelte()],
  resolve: {
    alias: {
      '@contracts': resolve(__dirname, './src/contracts'),
      '@core': resolve(__dirname, './src/core'),
      '@ui': resolve(__dirname, './src/ui'),
      '@infrastructure': resolve(__dirname, './src/infrastructure')
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false
  }
});