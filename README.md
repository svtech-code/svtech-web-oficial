# SVTech Web Oficial

Sitio web corporativo de SVTech desarrollado con Astro, TypeScript y TailwindCSS. Una solución moderna, rápida y optimizada para presentar servicios de tecnología y consultoría IT.

## ✨ Características

- **🚀 Alto rendimiento** - Astro SSG con lazy loading optimizado
- **📱 Responsive** - Diseño adaptativo para todos los dispositivos
- **♿ Accesible** - Cumple estándares de accesibilidad web
- **🔒 Seguro** - Validación con Cloudflare Turnstile
- **📧 Contacto** - Formulario integrado con EmailJS
- **🎨 Animaciones** - Transiciones suaves y micro-interacciones
- **⚡ TypeScript** - Tipado estático para mejor desarrollo

## 🚀 Estructura del Proyecto

```text
/
├── public/
│   ├── fonts/          # Fuentes web optimizadas
│   ├── images/         # Imágenes estáticas (clientes, servicios)
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/         # SVGs y recursos optimizados
│   ├── components/     # Componentes Astro reutilizables
│   │   ├── ui/         # Componentes de UI base
│   │   ├── ContactForm.astro
│   │   ├── CustomerCarousel.astro
│   │   └── ...
│   ├── consts/         # Constantes y configuraciones
│   ├── content/        # Contenido de servicios (Markdown)
│   ├── layouts/        # Layouts de página
│   ├── lib/            # Lógica de negocio y managers
│   │   ├── contact-form-manager.ts
│   │   ├── customer-carousel-manager.ts
│   │   ├── lazy-observer.ts
│   │   └── ...
│   ├── pages/          # Rutas de la aplicación
│   ├── sections/       # Secciones de página principales
│   ├── styles/         # Estilos globales
│   ├── types/          # Definiciones TypeScript
│   └── utils/          # Utilidades helper
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

## 🛠️ Tecnologías

- **[Astro](https://astro.build/)** - Framework web moderno
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utilitario
- **[EmailJS](https://www.emailjs.com/)** - Servicio de email
- **[Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)** - Protección anti-bot

## 📋 Características Técnicas

### Performance

- **Lazy Loading** con `LazyObserver` optimizado
- **Code Splitting** automático por rutas
- **Presets de configuración** para diferentes componentes
- **Animaciones optimizadas** con CSS transforms

### Gestión de Estado

- **Managers Pattern** para lógica compleja (ContactForm, CustomerCarousel)
- **Event Delegation** para mejor performance
- **Cleanup automático** de event listeners

### Formularios

- **Validación en tiempo real** con feedback visual
- **Protección anti-spam** con Turnstile
- **Estados de carga** y modales informativos
- **Retry automático** en caso de errores

### Carrusel de Clientes

- **Renderizado dinámico** desde configuración
- **Animación infinita** con CSS optimizado
- **Interacciones hover** (pause/resume)
- **Gestión de detalles** de cliente integrada

## 🚦 Configuración de Desarrollo

1. **Clona el repositorio**

   ```sh
   git clone <repository-url>
   cd svtech-web-oficial
   ```

2. **Instala dependencias**

   ```sh
   bun install
   ```

3. **Configura variables de entorno**

   ```sh
   cp .env.example .env
   # Edita .env con tus claves de EmailJS y Turnstile
   ```

4. **Inicia el servidor de desarrollo**
   ```sh
   bun dev
   ```

## 📝 Uso de Componentes

### LazyObserver

```typescript
import { LazyObserver } from '../lib/lazy-observer';

// Usando presets predefinidos
LazyObserver.create('#elemento', callback, { preset: 'form' }); // Formularios
LazyObserver.create('#elemento', callback, { preset: 'carousel' }); // Carruseles
LazyObserver.create('#elemento', callback, { preset: 'image' }); // Imágenes

// Configuración personalizada
LazyObserver.create('#elemento', callback, {
  threshold: 0.3,
  rootMargin: '100px 0px',
  timeout: 2000,
});
```

### Managers

```typescript
// Formulario de contacto
import { ContactFormManager } from '../lib/contact-form-manager';
new ContactFormManager('#contact-form');

// Carrusel de clientes
import { CustomerCarouselManager } from '../lib/customer-carousel-manager';
new CustomerCarouselManager('#customers-carousel');
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**SVTech** - Soluciones tecnológicas y consultoría IT

- 🌐 Sitio web: [svtech.cl](https://svtech.cl)
- 📧 Email: contacto@svtech.cl
- 📱 WhatsApp: +56 9 XXXX XXXX
