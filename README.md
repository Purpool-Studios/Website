# Game Site Root

## Descripción Macro
Aplicación web de alto rendimiento orientada al desarrollo de un juego con estándares de Clean Code y principios SOLID. Diseñada bajo un enfoque de **cero overhead**, costo de CPU mínimo y control estricto de memoria para evitar pausas por Garbage Collection.

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