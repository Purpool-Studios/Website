import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
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