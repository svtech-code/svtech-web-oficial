# SV Tech Web Oficial

Sitio web corporativo de SV Tech desarrollado con Astro, TypeScript y TailwindCSS 4.0. Una solución moderna, rápida y altamente optimizada para presentar servicios de tecnología y consultoría IT.

## ✨ Características

- **🚀 Alto rendimiento** - Astro SSG con lazy loading inteligente, code splitting y optimización de fuentes
- **📱 Responsive excepcional** - Diseño adaptativo con Tailwind CSS 4.0 y variables CSS personalizadas
- **♿ Accesibilidad de primer nivel** - 65+ ARIA labels, semantic HTML, skip links y navegación por teclado
- **🔒 Seguro y robusto** - Validación avanzada con Cloudflare Turnstile y manejo de errores
- **📧 Formulario inteligente** - Contacto con validación en tiempo real, estados de carga y EmailJS
- **🎨 Animaciones fluidas** - Transiciones optimizadas con `prefers-reduced-motion` y micro-interacciones
- **⚡ TypeScript estricto** - Tipado fuerte con configuración strict mode
- **🗂️ Arquitectura sólida** - Manager Pattern, separación de responsabilidades y código escalable

## 🚀 Estructura del Proyecto

```text
/
├── public/
│   ├── fonts/          # Fuentes web optimizadas (preload, WOFF2)
│   ├── images/         # Imágenes optimizadas (WebP, lazy loading)
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/         # SVGs y recursos optimizados
│   ├── components/     # Componentes Astro reutilizables
│   │   ├── ui/         # Componentes de UI base (Icon, Button, etc.)
│   │   ├── ContactForm.astro
│   │   ├── CustomerCarousel.astro
│   │   ├── ProjectModal.astro
│   │   └── ...
│   ├── consts/         # Constantes, datos estáticos y configuraciones
│   │   ├── projects.ts   # Datos de proyectos con tipado fuerte
│   │   ├── customers.ts  # Información de clientes
│   │   ├── icons.ts      # Mapeo optimizado de iconos
│   │   └── ...
│   ├── layouts/        # Layouts de página con meta tags optimizados
│   ├── lib/            # Lógica de negocio y managers (patrón de diseño)
│   │   ├── contact-form-manager.ts    # Gestión completa de formularios
│   │   ├── customer-carousel-manager.ts
│   │   ├── project-modal-manager.ts   # Modal system robusto
│   │   ├── lazy-observer.ts           # Observer optimizado con presets
│   │   └── generic-card-visibility-manager.ts
│   ├── pages/          # Rutas de la aplicación (file-based routing)
│   ├── sections/       # Secciones principales de página
│   ├── styles/         # Estilos globales y Tailwind customizations
│   └── types/          # Definiciones TypeScript completas
└── package.json
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                       | Acción                                               |
| :---------------------------- | :--------------------------------------------------- |
| `bun install`                 | Instala las dependencias                             |
| `bun dev`                     | Inicia el servidor de desarrollo en `localhost:4321` |
| `bun build`                   | Construye el sitio para producción en `./dist/`      |
| `bun preview`                 | Previsualiza la build localmente                     |
| `bun astro check`             | Verifica errores de TypeScript y Astro               |
| `bun astro add <integration>` | Agrega una integración de Astro                      |
| `bun format`                  | Formatea código con Prettier                         |
| `bun lint`                    | Ejecuta ESLint para verificar código                 |

## 🛠️ Stack Tecnológico

### Core

- **[Astro 4.x](https://astro.build/)** - Framework web moderno con SSG optimizado
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático en modo strict
- **[TailwindCSS 4.0](https://tailwindcss.com/)** - Framework CSS utilitario con variables CSS

### Integraciones y Servicios

- **[EmailJS](https://www.emailjs.com/)** - Servicio de email sin backend
- **[Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)** - Protección anti-bot avanzada
- **[Bun](https://bun.sh/)** - Runtime JavaScript rápido para desarrollo

### Herramientas de Desarrollo

- **[ESLint](https://eslint.org/)** - Linting con reglas personalizadas
- **[Prettier](https://prettier.io/)** - Formateo automático de código
- **Path Mapping** - Imports absolutos para mejor organización

## 📋 Características Técnicas

### 🚀 Performance y Optimización

- **Lazy Loading inteligente** con `LazyObserver` y presets personalizados
- **Code Splitting automático** con chunks manuales para EmailJS e iconos
- **Optimización de fuentes** con preload estratégico y `font-display: swap`
- **Imágenes optimizadas** en formato WebP con lazy loading
- **Bundle size optimizado** con tree shaking y imports dinámicos eficientes

### 🏗️ Arquitectura y Patrones

- **Manager Pattern** para lógica compleja (ContactForm, ProjectModal, CustomerCarousel)
- **Event Delegation** optimizado para mejor performance en DOM
- **Cleanup automático** de event listeners para prevenir memory leaks
- **Separation of Concerns** con estructura modular clara
- **TypeScript strict mode** con interfaces y tipos fuertemente tipados

### 📱 UI/UX y Accesibilidad

- **Sistema de modales robusto** con animaciones y gestión de estado
- **Responsive design avanzado** con breakpoints optimizados
- **Accessibility-first** con 65+ ARIA labels y semantic HTML
- **Keyboard navigation** completa con skip links
- **prefers-reduced-motion** respetado en todas las animaciones

### 📧 Sistema de Formularios

- **Validación en tiempo real** con feedback visual inmediato
- **Estados de carga avanzados** con modales informativos
- **Protección anti-spam robusta** con Cloudflare Turnstile
- **Error handling completo** con retry automático
- **Sanitización de inputs** para seguridad

### 🎠 Carrusel de Clientes

- **Renderizado dinámico** desde configuración TypeScript
- **Animación infinita optimizada** con CSS transforms
- **Interacciones intuitivas** (hover para pause/resume)
- **Performance optimizado** con `contain` y `will-change`
- **Gestión de estados** avanzada con cleanup automático

### 🖼️ Sistema de Iconos

- **Mapeo optimizado** con Map() para acceso O(1)
- **Lazy loading eficiente** sin imports dinámicos repetitivos
- **Props tipadas fuertemente** con union types
- **Sizes predefinidos** con clases Tailwind consistentes

## 🚦 Configuración de Desarrollo

### 1. **Clona el repositorio**

```sh
git clone <repository-url>
cd svtech-web-oficial
```

### 2. **Instala dependencias**

```sh
bun install
```

### 3. **Configura variables de entorno**

```sh
cp .env.example .env
# Edita .env con tus claves:
# - EMAILJS_PUBLIC_KEY
# - EMAILJS_SERVICE_ID
# - EMAILJS_TEMPLATE_ID
# - TURNSTILE_SITE_KEY
```

### 4. **Inicia el servidor de desarrollo**

```sh
bun dev
```

### 5. **Verifica la configuración**

```sh
# Ejecuta TypeScript check
bun astro check

# Verifica el linting
bun lint

# Formatea el código
bun format
```

## 🔧 Variables de Entorno Requeridas

```env
# EmailJS Configuration
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
PUBLIC_EMAILJS_TO_NAME=your_to_name

# Cloudflare Turnstile
TURNSTILE_SITE_KEY=your_turnstile_key
TURNSTILE_SECRET_KEY=your_secret_key
```

## 🎯 SEO y Performance

### Optimizaciones Incluidas

- **Meta tags completos** con Open Graph y Twitter Cards
- **Structured data JSON-LD** para SEO local business
- **Sitemap automático** generado por Astro
- **Robots.txt optimizado** para crawling
- **Critical CSS inlined** para First Paint rápido
- **Font preloading** estratégico

### Lighthouse Scores Objetivo

- **Performance**: 100 🎉
- **Accessibility**: 100 🎉
- **Best Practices**: 100 🎉
- **SEO**: 100 🎉

## 📝 Uso de Componentes

### LazyObserver con Presets

```typescript
import { LazyObserver } from 'lib/lazy-observer';

// Presets optimizados para diferentes casos de uso
LazyObserver.create('#form-element', callback, { preset: 'form' }); // Formularios
LazyObserver.create('#carousel', callback, { preset: 'carousel' }); // Carruseles
LazyObserver.create('#image', callback, { preset: 'image' }); // Imágenes

// Configuración personalizada avanzada
LazyObserver.create('#element', callback, {
  threshold: 0.3,
  rootMargin: '100px 0px',
  timeout: 2000,
  once: true,
});
```

### Manager Pattern - Sistemas Complejos

```typescript
// Sistema de formulario completo con validación y estados
import { ContactFormManager } from 'lib/contact-form-manager';
const formManager = new ContactFormManager('#contact-form');

// Carrusel infinito con interacciones
import { CustomerCarouselManager } from 'lib/customer-carousel-manager';
const carouselManager = new CustomerCarouselManager('#customers-carousel');

// Sistema de modales con animaciones
import { ProjectModalManager } from 'lib/project-modal-manager';
const modalManager = new ProjectModalManager();
modalManager.show(projectData);
```

### Componentes de UI Optimizados

```astro
<!-- Sistema de iconos con tipado fuerte -->
<Icon name="arrow-right" size="lg" class="text-primary" />
<Icon name="user" size="sm" aria-hidden="true" />

<!-- Botones con estados y accesibilidad -->
<Button variant="primary" size="lg" aria-label="Enviar formulario"> Contactar </Button>

<!-- Cards con lazy loading automático -->
<ProjectCard project={project} class="hover:scale-105" />
```

### Configuración de Visibility Manager

```typescript
import { setupCardVisibility } from 'lib/generic-card-visibility-manager';

// Sistema inteligente de mostrar/ocultar cards
setupCardVisibility({
  sectionName: 'projects',
  mobileLimit: 2,
  tabletLimit: 4,
  desktopLimit: 6,
});
```

## 🤝 Contribuir

Consulta la [guía para contribuir en español](CONTRIBUTING_ES.md) o su
[versión en inglés](CONTRIBUTING.md) para conocer el flujo de pull requests, las
verificaciones y las convenciones de commits.

## 🔍 Testing y Quality Assurance

### Herramientas de Calidad

```sh
# TypeScript check completo
bun astro check

# Linting con ESLint
bun lint

# Formateo con Prettier
bun format

# Build para verificar errores
bun build
```

### Métricas de Calidad

- **TypeScript Coverage**: 100% (strict mode)
- **ESLint Warnings**: 0
- **Accessibility Score**: 100 (65+ ARIA labels)
- **Performance Score**: 100
- **Code Architecture**: Manager Pattern implementado

## 📊 Análisis del Proyecto

### Estadísticas del Código

- **Componentes Astro**: 25+ componentes reutilizables
- **Managers TypeScript**: 4+ sistemas complejos
- **Tipos definidos**: 100% coverage con interfaces
- **Imágenes optimizadas**: 13 WebP, 9 SVG
- **Bundle optimization**: Code splitting manual configurado

### Arquitectura Destacada

- **Manager Pattern** para separación de responsabilidades
- **Event Delegation** optimizado para performance
- **Accessibility-first** development approach
- **Production-ready** con error handling robusto

## 📞 Contacto

**SV Tech** - Soluciones tecnológicas y consultoría IT

- 🌐 Sitio web: [svtech.cl](https://svtech.cl)
- 📧 Email: <contacto@svtech.cl>
