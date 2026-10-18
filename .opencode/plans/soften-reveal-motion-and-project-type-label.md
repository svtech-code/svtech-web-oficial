# Plan — Suavizar animaciones de aparición + reubicar tipo de proyecto

Spec: `soften-reveal-motion-and-project-type-label` (ID `c411c81cadc54a73`, pre-flight PASS)
Preset elegido: **Suave (recomendado)** + **incluir `reveal-delay`**.
Decisión badge: **bajo el título, reformateado** como chip.

## A. Suavizar animaciones (3 archivos)

### 1. `src/styles/global.css` (bloque "Sistema de Animaciones Scroll Reveal")

- `.reveal, .reveal-fade, .reveal-left, .reveal-right`
  - `transition` duración `0.55s → 0.8s`
  - easing `cubic-bezier(0.16, 1, 0.3, 1) → cubic-bezier(0.22, 1, 0.36, 1)`
- `.reveal` `translateY(28px) → translateY(16px)`
- `.reveal-left` `translateX(-28px) → translateX(-16px)`
- `.reveal-right` `translateX(28px) → translateX(16px)`
- **Nuevas utilidades** (hoy inactivas):
  ```css
  .reveal-delay-1 { transition-delay: 0.08s; }
  .reveal-delay-2 { transition-delay: 0.16s; }
  ```
- `.reveal-card`
  - `transform translateX(-36px) → translateX(-20px)`
  - `transition` opacity/transform `0.55s → 0.8s` y easing `cubic-bezier(0.22, 1, 0.36, 1)`
  - se conservan las transiciones de interacción (`scale/translate/box-shadow/border-color 0.3s`)
- `.reveal-card.exiting-right` `translateX(36px) → translateX(16px)`

### 2. `src/lib/managers/scroll-reveal-manager.ts`

- Constructor por defecto: `threshold 0.05 → 0.15`, `rootMargin '0px 0px 20px 0px' → '0px 0px -60px 0px'`
- Limpiado de `transitionDelay` tras el reveal: `setTimeout(clearDelay, 600) → 900`

### 3. `src/lib/managers/card-stagger-manager.ts`

- `ROW_DELAY_MS 150 → 110`

> `prefers-reduced-motion` no se toca (sigue desactivando todo).

## B. Tipo de proyecto bajo el título (1 archivo)

### `src/pages/proyectos/[slug].astro`

- Eliminar el import: `import ProjectTypeBadge from 'components/ui/ProjectTypeBadge.astro';`
- Eliminar `<ProjectTypeBadge type={type} />` de **encima** del H1
- Debajo del H1 (antes de la descripción), añadir chip etiquetado:
  ```astro
  <span
    class={`inline-flex w-fit items-center rounded-lg border px-3 py-1 text-xs font-semibold tracking-wide uppercase ${
      isService ? 'border-primary/40 bg-primary/10 text-primary' : 'border-tertiary/40 bg-tertiary/10 text-tertiary'
    }`}
  >
    {isService ? 'Servicio' : 'Proyecto de desarrollo'}
  </span>
  ```

Sin cambios de datos/layout/accesibilidad. El tipo permanece en el JSON-LD (`genre`).

## Verificación

- `bun run lint`
- `bun run build`
- Inspección de `dist/client/proyectos/sistema-pre-matricula/index.html`: chip "Proyecto de desarrollo" bajo el H1, sin badge sobre el título.
- `sv_validate_decision` + `sv_commit_spec` + `sv_graph_diff`.

## Commit sugerido

```
style(ui): soften scroll-reveal motion and relabel project type under title

Slow entrance transitions to 0.8s with a gentler easing, reduce travel to
16/20px, delay the observer trigger and enable the reveal-delay utilities.
On project detail pages, show the type as a labelled chip below the title
instead of an unlabelled badge above it.
```
