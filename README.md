# Sitio web principal

Sitio web de alto rendimiento orientado a la presentación de la organización **Purpool Studios**. Diseñada bajo un enfoque de **cero overhead**, costo de CPU mínimo y control estricto de memoria para evitar pausas por Garbage Collection. La navegación por el sitio debe ser extremadamente veloz, sin pérdidas en la calidad visual o experiencia del usuario.

## Stack Tecnológico
* **Entorno de Ejecución Determinista:** Nix (`shell.nix`)
* **Bundler & Dev Server:** Vite + TypeScript (Modo `strict`)
* **Core Engine:** TypeScript Puro (WebGL / Canvas 2D + Architecture ECS + Object Pools)
* **UI Layer:** Svelte 5 (Utilizado únicamente para HUD, Menús y Overlays)
* **Comunicación Desacoplada:** Event Bus fuertemente tipado (Patrón Observer)

## Estructura de Directorios (`src/`)
* `contracts/`: Tipos de eventos, contratos de interfaces e invariantes.
* `core/`: Motor del juego (Game Loop, sistemas ECS, render). Libre de dependencias DOM/UI.
* `ui/`: Componentes Svelte para interfaces y HUD.
* `infrastructure/`: Implementaciones concretas de buses de eventos, carga de recursos y persistencia.
* `main.ts`: Punto de orquestación e inyección de dependencias.