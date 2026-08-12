import { mount } from 'svelte';
import './ui/global.css';
import App from './ui/App.svelte';

const targetElement = document.getElementById('app');

if (!targetElement) {
  throw new Error("[UI Engine] Error crítico: No se encontró el elemento raíz '#app' en el DOM.");
}

const app = mount(App, {
  target: targetElement
});

export default app;