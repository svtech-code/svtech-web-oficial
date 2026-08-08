---
name: SV Tech — Sitio Web Corporativo
description: Sala de control en aguas profundas con cian de señal y ámbar fundido
colors:
  primary: "#0096b8"
  secondary: "#ffffff"
  tertiary: "#ff8810"
  midnight-abyss: "#001217"
  lagoon-depths: "#00252d"
  glow-cyan: "#00D0FF"
  error: "#ef4444"
typography:
  display:
    fontFamily: "Poppins, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.75rem, 4.5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
    textTransform: "uppercase"
  headline:
    fontFamily: "Poppins, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.5rem, 3.5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
    textTransform: "uppercase"
  title:
    fontFamily: "Poppins, system-ui, -apple-system, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Poppins, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: "Poppins, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  section: "10rem"
  card: "1.25rem"
  gap: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.lagoon-depths}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 2.5rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 2.5rem"
  button-glow:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.lagoon-depths}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1.5rem"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1rem"
  card-surface:
    backgroundColor: "{colors.midnight-abyss}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
  badge-project:
    backgroundColor: "{colors.midnight-abyss}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.75rem"
---

# Design System: SV Tech

## Overview

**Creative North Star: "The Deepwater Control Room"**

SV Tech se sumerge en un abismo técnico: el fondo es un degradado fijo de dos azules profundos (de *Midnight Abyss* a *Lagoon Depths*), sobre el que flotan paneles de cristal translúcido. La luz de este mundo nunca es blanca plana: son instrumentos — *Signal Cyan* como el color funcional y activo, *Melted Amber* como el acento cálido que señala, alerta y distingue lo destacado. La página se comporta como la consola de una sala de control submarina: oscura, precisa, con cada elemento encendiéndose y escalando al contacto.

El sitio es una one-page con anclas (Inicio, Servicios, Proyectos, Clientes, Nosotros, Contacto) más páginas de detalle por servicio. La densidad es generosa: secciones de 10rem de respiro vertical, tarjetas centradas, tipografía Poppins en mayúsculas para títulos. Todo respira lentamente; las animaciones (shimmer, shine, marquee, punto del divisor) son constantes pero sutiles, y se apagan por completo bajo `prefers-reduced-motion`.

**Key Characteristics:**
- Superficies de cristal (glassmorphism) sobre un degradado abisal fijo.
- Luz de instrumento: cian como señal funcional, ámbar como acento cálido.
- Bordes de color de 1px y sombras de color difuminadas, nunca grises neutras.
- Títulos Poppins en mayúsculas y negrita; cuerpo en peso 500.
- Componentes táctiles: hover con escala (`scale-1.01`–`1.05`) y encendido.
- Respeto total de `prefers-reduced-motion` en toda animación.

## Colors

Paleta de dos temperaturas sobre un abismo azul: cian frío como sistema, ámbar cálido como excepción. El blanco es texto y cristal, no superficie.

### Primary
- **Signal Cyan** (#0096b8): El color de la señal activa. Fondo de botones primarios y chips de sección, texto de títulos de servicio, bordes de tarjetas de servicio, focus rings y fondo del fondo del cuerpo del gradiente. Es el color "encendido".

### Secondary
- **Instrument White** (#ffffff): Texto principal sobre el abismo, iconos, texto de títulos. Se usa sobre el fondo oscuro y sobre el cian en chips pequeños (mezclado con *Lagoon Depths* como texto). Nunca como fondo de grandes superficies excepto en el modal de estados del formulario.

### Tertiary
- **Melted Amber** (#ff8810): El acento cálido y escaso. Badges de tipo de proyecto, bordes de tarjetas de proyecto, enlaces "Saber más", el punto animado del divisor del footer, iconos de ubicación y textos de alerta. Su rareza es su fuerza: marca lo destacable.

### Neutral
- **Midnight Abyss** (#001217): Negro azulado, el punto más profundo del degradado de fondo y de los overlays de tarjetas (`bg-gradient-primary/70`).
- **Lagoon Depths** (#00252d): Teal profundo, el color final del degradado de fondo, el panel del navbar en móvil y el texto sobre el cian (efecto "texto de gradiente").
- **Glow Cyan** (#00D0FF): Cian más claro, el punto de máxima luz del degradado shimmer de los botones de cristal luminoso. Nunca se usa solo; siempre dentro del gradiente animado.
- **Error (funcional)** (#ef4444): El único color fuera de la pareja de acentos, reservado en exclusiva para estados de error: validación de campos del formulario (borde y anillo) y el estado de error del modal de envío. No se usa como acento decorativo.

### Named Rules
**The Beacon Rule.** Signal Cyan y Melted Amber son luces de instrumento: viven en bordes, iconos, chips, badges y botones pequeños. Ninguno debe usarse como superficie de gran tamaño; su rareza es lo que los hace funcionar sobre el abismo.

**The No-Neutral-Shadow Rule.** Las sombras siempre llevan color (cian, ámbar o rojo de error), nunca gris neutro. El modal del formulario conserva una sombra oscura de apoyo (`rgba(0,0,0,0.6)`) para despegarse del abismo, pero siempre acompañada de un glow de color (cian en loading/success, rojo en error).

## Typography

**Display Font:** Poppins (Poppins 400/500/700, con fallback system-ui, -apple-system, sans-serif)

**Character:** Poppins es una grotesca geométrica amable y técnica a la vez: redondeada y moderna, con la legibilidad de un panel de instrumentos sin frialdad. Los títulos en mayúsculas y negrita le dan el pulso de "consola"; el cuerpo en peso 500 mantiene la lectura cómoda sobre el fondo oscuro.

### Hierarchy
- **Display** (700, `clamp(1.75rem, 4.5vw, 3.75rem)`, line-height 1.1, UPPERCASE): H1 del Hero ("SOPORTE INFORMÁTICO / DESARROLLO WEB"), dos líneas, con la segunda en cian. Solo en la primera pantalla.
- **Headline** (700, `clamp(1.5rem, 3.5vw, 3rem)`, line-height 1.2, UPPERCASE): H2 de secciones (SERVICIOS, PROYECTOS, NOSOTROS, CONTACTO), centrados o alineados a la izquierda en desktop.
- **Title** (600, 1.375rem, line-height 1.3): Títulos de tarjeta de servicio, encabezados del modal de proyecto, títulos de tarjetas de proyecto (semibold, capitalizadas).
- **Body** (500, 1rem, line-height 1.6): Párrafos; escala hasta `text-2xl`/`text-3xl` en textos destacados de sección y contenido de servicio.
- **Label** (500, 0.875rem, tracking 0.02em): Chips de sección (eyebrows), labels de inputs, badges de tipo de proyecto, texto del footer.

### Named Rules
**The Uppercase Signal Rule.** Todos los H1/H2 se escriben en mayúsculas (tanto en el código como visualmente vía `uppercase`). El cuerpo nunca usa mayúsculas sostenidas.

## Layout

Contenedor único centrado de `max-width: 1200px`, con padding lateral `1rem` (`px-2`). Las secciones respiran con `py-40` (10rem) de margen vertical y separación interna `gap-20` (5rem) entre encabezado y contenido.

Las secciones son columnas centradas en móvil (tarjetas a `w-[80%]`, centradas) que pasan a `flex-row` con `flex-wrap` en `md` (768px) para servicios y proyectos, y a dos columnas reales en `lg` (1024px) para Nosotros (imagen + texto) y Contacto (información + formulario). Los encabezados de sección van centrados; en `lg` Nosotros y Contacto los alinean a la izquierda.

La tarjeta es la unidad rítmica: `w-[380px]` en desktop, apiladas con `gap-4` (1rem). La altura de pantalla se define con `100svh`. El header es `fixed` (80px móvil, 96px desktop, con `lg:top-4` para flotar).

## Elevation & Depth

Cristal sobre abismo. No hay sombras grises ni superficies sólidas: la profundidad se construye con un degradado de fondo fijo (`linear-gradient(180deg, #001217, #00252d)`) y paneles translúcidos con `backdrop-blur` (de `backdrop-blur-xl` a `backdrop-blur-2xl`) que dejan pasar el color del abismo. Los elementos más "superficiales" son los que más blur tienen, no los que más sombra cargan.

### Shadow Vocabulary
- **Card Glow — Cian** (`0 1px 2px 0 rgb(0 150 184 / 0.8)`, `shadow-sm shadow-primary/80`): Tarjetas de servicio y formulario en reposo. Es un resplandor, no una elevación.
- **Card Glow — Ámbar** (`0 1px 2px 0 rgb(255 136 16 / 0.8)`, `shadow-sm shadow-tertiary/80`): Tarjetas de proyecto en reposo.
- **Card Glow — Encendido** (`shadow-lg`, con el mismo color por tipo): Hover de tarjetas; el resplandor se intensifica con la escala.
- **Image Glow** (`0 4px 6px -1px rgb(255 136 16 / 0.6)`, `shadow-md shadow-tertiary/60`): Imagen de cabecera de las páginas de servicio.
- **Navbar Float** (`0 10px 15px -3px rgb(0 0 0 / 1)`, `shadow-lg shadow-black`): El navbar de cristal en móvil, la única sombra negra del sistema.
- **Modal Elevation** (`0 25px 50px -12px rgb(0 0 0 / 0.6)` + `0 0 24px rgb(0 150 184 / 0.28)`): El modal de estados del formulario — un panel de cristal que se despega del abismo con sombra oscura de apoyo y un glow cian; en el estado de error el glow y el borde pasan al rojo de error.

### Named Rules
**The Flat-By-Default Rule.** Las superficies están en reposo con solo el resplandor fino de color. Las sombras grandes y el blur intenso aparecen solo como respuesta al estado (hover, abrir modal, fijar navbar). La elevación nunca es permanente en tarjetas.

## Shapes

Lenguaje de formas suaves y redondeadas, graduado por jerarquía: los controles pequeños son menos redondeados, los contenedores grandes más. Radios observados: `8px` (botones, inputs, badges, divisor de footer), `12px` (superficies internas: overlays, imágenes dentro de tarjetas, chips de icono), `16px` (tarjetas, navbar, formulario, chip de sección, contenedor de imagen de servicio), `9999px` (elementos circulares: botón de scroll-top, botón de cerrar modal, iconos sociales, la "O" del acento del footer).

Los bordes son de 1px de color puro: cian en servicios y formulario, ámbar en proyectos. Las tarjetas de proyecto usan un truco de `border` de 2px disimulado con `p-[2px]` para crear el marco coloreado alrededor de la imagen. Los elementos circulares de contacto (scroll-top, social) llevan `drop-shadow` de color en vez de bordes.

## Components

### Buttons
- **Shape:** `rounded-lg` (8px), relleno generoso; el botón primario del Hero usa `p-2` con `h-10 sm:h-12` y `w-30 sm:w-52`.
- **Primary Solid:** Fondo Signal Cyan, texto Lagoon Depths, `hover:scale-105`. Encabeza el Hero y las CTA principales ("Contáctanos").
- **Ghost / Secondary:** Fondo transparente, borde de 1px Signal Cyan, texto Instrument White ("Ver Servicios"). Mismo comportamiento de escala.
- **Glow Shimmer:** La firma del sistema. Fondo `linear-gradient(90deg, #0096b8, #00D0FF, #0096b8)` con `background-size: 200%` y animación `shimmer 3s linear infinite`, más un barrido diagonal `shine 3s` que cruza el botón cada 3s. Texto Lagoon Depths. Usado en el navbar ("Contacto") y en los "Ver más" de Servicios y Proyectos. Es el único botón con movimiento permanente.
- **FormButton:** Fondo Signal Cyan, texto Lagoon Depths (`text-gradient-secondary`), `py-3 px-6`, `focus:ring-4` con anillo cian, estados `disabled` (opacity 50%) y `loading` con spinner. Variante secundaria: cristal translúcido (`bg-white/10` + borde cian al 40%), texto blanco.

### Cards / Containers
- **ServiceCard:** `rounded-2xl` (16px), borde 1px Signal Cyan, `shadow-sm shadow-primary/80`, hover `scale-[1.01]` + `shadow-lg`. Icono del servicio en chip `bg-tertiary/10` (`hover:bg-tertiary/40`), más un icono decorativo grande rotado 45° y desenfocado (`blur-md`) en la esquina superior. Enlace "Saber más →" en Melted Amber con subrayado que crece al hover. Todas las tarjetas de servicio comparten este mismo tratamiento.
- **ProjectCard:** `rounded-2xl`, borde de color según el tipo de proyecto con `p-[2px]` (cian para tipo servicio, ámbar para tipo desarrollo), imagen a sangre con hover `scale-110`. Footer de cristal `bg-gradient-primary/70 backdrop-blur-xl` que cubre la parte baja; el título cambia a cian o ámbar según el tipo de proyecto. Badge de tipo en esquina superior. El color de borde y título siempre coinciden con el tipo.
- **CustomerCard:** `rounded-2xl`, fondo `bg-secondary/30` (blanco al 30%), hover a `rounded-3xl` y `bg-secondary/40`. Es el logo del cliente sobre cristal.
- **Modal de proyecto:** contenedor `rounded-2xl bg-white/20 backdrop-blur-sm`, imagen superior `rounded-t-xl`, cuerpo `rounded-b-xl bg-gradient-secondary backdrop-blur-2xl`.

### Inputs / Fields
- **Style:** `rounded-lg` (8px), fondo transparente con una capa de cristal detrás (`rgba(255,255,255,0.1)` + `backdrop-filter: blur(10px)`), borde de 1px Signal Cyan, texto blanco.
- **Focus:** borde transparente + `ring-2 ring-primary` (anillo cian de 2px).
- **Error / Disabled:** borde y ring rojo (`#ef4444`) con icono de error; el required marca con asterisco rojo.

### Chips / Badges
- **Eyebrow de sección:** `rounded-2xl`, fondo Signal Cyan, texto Lagoon Depths ("¿Por qué elegirnos?", "¿Tienes una idea?"). Encabeza H2 en Nosotros, Why y Contacto.
- **Badge de tipo de proyecto:** `rounded-lg`, fondo `bg-gradient-primary/70` + `backdrop-blur-2xl`, texto de tipo en Melted Amber (servicio) o Signal Cyan (desarrollo).

### Navigation
- **Desktop:** header fijo de 80–96px; navbar `max-w-[1200px]`. Links con texto en `text-primary` (cyan) en desktop y un subrayado de 2px que crece de 0 a 90% al hover (`::before` animado 300ms). Logo a la izquierda, botón "Contacto" shimmer a la derecha.
- **Móvil:** hamburguesa de 3 líneas cian que se convierte en "X" al abrir (rotación con `group-[.open]`); panel deslizante lateral `bg-primary/70 backdrop-blur-2xl`. Links en `text-gradient-primary` (oscuro sobre el cian translúcido).

### Signature Components
- **Customer Marquee:** cinta infinita de logos con animación `scroll-left 20s linear infinite` (15s en móvil), que se pausa al hover, con desvanecido de los bordes (`linear-gradient(90deg, #00252d, transparent)`).
- **Scroll-to-top:** botón circular `rounded-full bg-primary` de 48–64px, con flecha que flota al hover; aparece con opacidad desde la sección Servicios.
- **Divisor del footer:** línea `bg-tertiary/40` de 3px con un punto ámbar animado (`moveDot 8s ease-in-out infinite`) que la recorre, con `box-shadow` cian y blanco.
- **Modal de formulario:** overlay `rgba(0,0,0,0.6)` + `blur(8px)`; panel de cristal en degradado Midnight Abyss→Lagoon Depths (`rounded-2xl`, borde cian al 45%, `backdrop-blur-2xl`) con glow de color según estado — cian en loading/success, rojo de error en el estado de error. Estados con iconos y botones en lenguaje de sistema: texto Lagoon Depths sobre Signal Cyan, cancelar como cristal ghost.

## Do's and Don'ts

### Do:
- **Do** usar Signal Cyan como el color de acción e interacción, y Melted Amber solo para lo destacable o lo cálido — su escasez es lo que lo hace señalizar.
- **Do** mantener las superficies en cristal translúcido sobre el degradado del abismo; nunca reemplazar el fondo por un gris sólido.
- **Do** escalar tarjetas y botones al hover (`scale-[1.01]`–`1.05`) con `duration-300` y encender sus sombras de color.
- **Do** escribir H1/H2 en mayúsculas con Poppins 700 y respetar el peso 500 para el cuerpo.
- **Do** usar `rounded-8/12/16` según jerarquía: controles → 8px, superficies internas → 12px, tarjetas/paneles → 16px.
- **Do** respetar `prefers-reduced-motion` desactivando todas las animaciones cuando esté activo.

### Don't:
- **Don't** usar sombras grises neutras en tarjetas, botones o paneles — las sombras llevan cian o ámbar. (La excepción confirmada: modal del formulario y navbar móvil.)
- **Don't** pintar superficies grandes con Signal Cyan o Melted Amber; son acentos, no fondos.
- **Don't** romper el cristal: los paneles llevan `backdrop-blur` sobre el degradado; sin blur el sistema pierde su capa de profundidad.
- **Don't** introducir una segunda tipografía; Poppins con sus tres pesos (400/500/700) es el único cuerpo tipográfico.
- **Don't** fabricar una paleta de acentos adicional; cian, ámbar y los dos azules del abismo son toda la paleta.
- **Don't** invertir el texto de los botones cian: sobre Signal Cyan el texto va en Lagoon Depths (oscuro), no en blanco.
