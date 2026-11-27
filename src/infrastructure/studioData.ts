import type { NavItem, ProjectItem, StackLayer, StudioPillar } from '@contracts/portfolio';

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'estudio', label: 'Estudio' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'tecnologia', label: 'Stack' },
  { id: 'contacto', label: 'Contacto' }
];

export const STUDIO_PILLARS: readonly StudioPillar[] = [
  {
    code: '01',
    title: 'Ingeniería de Cero Overhead',
    description:
      'Construimos sistemas deterministas con control estricto de memoria, pools preasignados y arquitecturas libres de bloqueos por Garbage Collection.'
  },
  {
    code: '02',
    title: 'Videojuegos con Identidad',
    description:
      'Diseñamos experiencias interactivas y competitivas donde la respuesta inmediata, la estética espacial y la profundidad mecánica convergen.'
  },
  {
    code: '03',
    title: 'Software Especializado',
    description:
      'Creamos herramientas técnicas, entornos de ensamblado y plataformas robustas pensadas para desarrolladores, estudiantes e investigadores.'
  }
];

export const PROJECTS: readonly ProjectItem[] = [
  {
    id: 'wits-olympiads',
    title: 'Wits Olympiads',
    subtitle: 'Videojuego Competitivo & Plataforma Evolutiva',
    category: 'videojuego',
    categoryLabel: 'Videojuego',
    status: 'En desarrollo',
    year: '2026',
    tagline:
      'La batalla de los intelectos ha comenzado: supera los límites evolutivos y compite por convertirte en una entidad cósmica del saber.',
    description:
      'Experiencia competitiva centrada en desafíos intelectuales en tiempo real, progresión cósmica e interfaz de alto contraste. Diseñada sobre una arquitectura desacoplada que separa el motor de simulación de la capa HUD para garantizar respuestas instantáneas sin latencia visual.',
    highlights: [
      'Duelos intelectuales con emparejamiento progresivo y métricas en vivo.',
      'Motor desacoplado de la interfaz para mantener 60+ FPS estables.',
      'Identidad visual futurista con autenticación segura integrada.'
    ],
    stack: ['TypeScript Strict', 'ECS + Object Pools', 'Svelte 5 HUD', 'Auth0 SPA'],
    image: '/assets/wits-olympiads-example.png',
    accentHex: '#38bdf8',
    metrics: [
      { label: 'Género', value: 'Estrategia / Intelecto' },
      { label: 'Arquitectura', value: 'ECS Desacoplado' },
      { label: 'Estado', value: 'Producción activa' }
    ]
  },
  {
    id: 'minkiassembler',
    title: 'MinkiAssembler',
    subtitle: 'IDE de Ensamblador Multi-Arquitectura',
    category: 'software',
    categoryLabel: 'Software',
    status: 'Lanzado',
    year: '2025',
    tagline:
      'Entorno de desarrollo oscuro y preciso para programación en ensamblador, análisis de ROM en tiempo real y transmisión serial.',
    description:
      'Herramienta de escritorio enfocada en el aprendizaje y despliegue sobre arquitecturas personalizadas (.suasm). Permite gestionar múltiples archivos, seleccionar puertos de transmisión serial, cambiar de arquitectura objetivo y monitorear el porcentaje exacto de uso de ROM mientras se escribe código.',
    highlights: [
      'Soporte para segmentos DATA y CODE con sintaxis clara y pestañas múltiples.',
      'Medidor visual de ocupación de ROM en tiempo real durante la edición.',
      'Gestión integrada de puertos de transmisión serial y selección de arquitectura.'
    ],
    stack: ['Ensamblador (.suasm)', 'Serial I/O', 'Multi-Arquitectura', 'Desktop UI'],
    image: '/assets/minkiassembler-example.png',
    accentHex: '#c084fc',
    metrics: [
      { label: 'Formato', value: '.suasm' },
      { label: 'Telemetría', value: 'Uso de ROM en vivo' },
      { label: 'Despliegue', value: 'Puerto Serial' }
    ]
  },
  {
    id: 'purpool-core',
    title: 'Purpool Core Engine',
    subtitle: 'Runtime Web Determinista & Zero-GC',
    category: 'motor',
    categoryLabel: 'Tecnología',
    status: 'Arquitectura interna',
    year: '2026',
    tagline:
      'Base tecnológica de Purpool Studios para sitios interactivos y videojuegos web con costo mínimo de CPU y cero asignaciones por frame.',
    description:
      'El mismo motor ligero que impulsa este sitio web. Organizado bajo contratos estrictos entre dominio puro, TypedArrays contiguos (Structure of Arrays), bus de eventos fuertemente tipado y componentes Svelte 5 dedicados exclusivamente a superposiciones e interfaces.',
    highlights: [
      'Cero dependencias DOM dentro de la capa core para portabilidad y testeo.',
      'Pools de entidades en Float32Array que evitan pausas del Garbage Collector.',
      'Comunicación reactiva mediante Event Bus tipado con patrón Observer.'
    ],
    stack: ['Nix Shell', 'Vite + TS Strict', 'Canvas 2D / WebGL', 'Svelte 5'],
    image: null,
    accentHex: '#a855f7',
    metrics: [
      { label: 'Asignaciones / Frame', value: '0 bytes' },
      { label: 'Capa UI', value: 'Svelte 5 Runes' },
      { label: 'Entorno', value: 'Nix Determinista' }
    ]
  }
];

export const STACK_LAYERS: readonly StackLayer[] = [
  {
    layer: '01 · Entorno',
    title: 'Reproducibilidad Determinista',
    technology: 'Nix (shell.nix) + Make',
    summary:
      'Cada colaborador compila bajo exactamente el mismo entorno Node.js y herramientas del sistema, eliminando inconsistencias entre máquinas.'
  },
  {
    layer: '02 · Núcleo',
    title: 'Motor Puro ECS & Object Pools',
    technology: 'TypeScript Strict + TypedArrays',
    summary:
      'Simulación y renderizado desacoplados del DOM en src/core/, manteniendo memoria contigua y latencia constante sin picos de CPU.'
  },
  {
    layer: '03 · Contratos',
    title: 'Comunicación por Event Bus',
    technology: 'Observer Pattern Tipado',
    summary:
      'Invariantes e interfaces explícitas en src/contracts/ que conectan infraestructura, motor e interfaz sin acoplamiento directo.'
  },
  {
    layer: '04 · Interfaz',
    title: 'HUD y Overlays Ultraligeros',
    technology: 'Svelte 5',
    summary:
      'La capa visual opera únicamente como superposición sobre el motor, logrando transiciones fluidas y un peso mínimo en producción.'
  }
];

export const STUDIO_EMAIL = 'contacto@purpoolstudios.com';
