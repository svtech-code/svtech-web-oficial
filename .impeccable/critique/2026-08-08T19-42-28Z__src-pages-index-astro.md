---
target: src/pages/index.astro (homepage)
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
p2_count: 2
timestamp: 2026-08-08T19-42-28Z
slug: src-pages-index-astro
---
# Crítica de diseño — SV Tech Homepage

Método: dual-agent (A: ses_01d1e4021ffeMStSWtpe1an42f · B: ses_01d1e3001ffeYioSkBgp7B5puR). Visualización en navegador no disponible: ninguna herramienta de browser está expuesta en esta sesión (Assessment B reportó la señal de fallback correspondiente).

## Design Health Score

| # | Heurística | Puntaje | Problema clave |
|---|-----------|-------|----------------|
| 1 | Visibilidad del estado del sistema | 3 | Buen feedback en modal/form, pero sin indicador de sección activa ni marca de logo seleccionado en el marquee |
| 2 | Coincidencia sistema ↔ mundo real | 3 | Español chileno real, pero footer imprime "Home" en inglés y ítems muertos que parecen links |
| 3 | Control y libertad del usuario | 3 | Modal de proyecto: Escape/overlay/X ✓; modal del formulario: sin Escape ni X, atrapa al usuario hasta que resuelve la async |
| 4 | Consistencia y estándares | 2 | El modal del formulario rompe la paleta documentada (blanco + blue-500/green-500/red-500/gray-200); FormButton sin color de texto; botones del modal con texto blanco sobre cian |
| 5 | Prevención de errores | 3 | Validación inline sólida; faltan autocomplete/inputmode; Turnstile lazy 2s → submit rápido da error opaco |
| 6 | Reconocimiento vs. recuerdo | 2 | Dos "Ver más" shimmer idénticos; marquee en movimiento; sin scroll-spy; ítems del footer parecen clicables sin serlo |
| 7 | Flexibilidad y eficiencia | n/a | Superficie Persuade de propósito único |
| 8 | Estética y minimalismo | 2 | Py-40 en todas partes (~7 viewports); 4 animaciones permanentes compiten; subtítulos en cian a md:text-3xl compiten con el H2 |
| 9 | Reconocimiento y recuperación de errores | 3 | Errores específicos y con Reintentar/Cancelar; fallos de red genéricos; sin plazo de respuesta prometido |
| 10 | Ayuda y documentación | n/a | Landing page, no requiere ayuda en-app |
| **Total** | | **21/32** | **Aceptable (65.6%)** |

## Verdicto de especificidad de diseño

**LLM (sin anclaje):** El sistema visual es coherente y disciplinado, pero la *composición y el tratamiento del contenido* son genéricos de categoría. Las firmas visuales (glassmorphism, shimmer, marquee, hero oscuro de 2 CTA) son el vocabulario estándar de cualquier estudio de desarrollo. Lo verdaderamente irremplazable del repo —los proyectos hiperlocales (pre-matrícula del Liceo Valentín Letelier, alerta temprana del CFT Maule, la mecánica de Linares)— no aparece en el Hero, la identidad "Linares/Maule" no está en la primera pantalla, y la "atención humana y directa" se contradice con la imagen de apretón de manos genérico y clientes solo-logotipo. Ejecución específica, composición intercambiable.

**Escaneo determinista:** 3 hallazgos (todos en `src/components`), **0 verdaderos**. `design-system-color` en Modal.astro:42 (rgba(0,0,0,0.5)) y Modal.astro:62 (rgba(0,0,0,0.25)) son excepciones explícitamente documentadas en DESIGN.md; `layout-transition` en NavLink.astro:30 (underline) es elección aceptada documentada en el sidecar. El detector confirma que los tokens del sistema están limpios — pero **no detectó la deriva real de paleta**: `text-blue-500`/`text-green-500`/`text-red-500`/`text-gray-200` en los estados del modal (ModalLoadingState.astro:11, ModalSuccessState.astro:12, ModalErrorState.astro:16) son clases Tailwind que escapan a la regla `design-system-color`. Lo que la revisión humana encontró y el detector no: exactamente ahí es donde el sistema se rompe.

**Overlays visuales:** no disponibles (sin herramienta de navegador; señal de fallback reportada).

## Impresión general

Primera pantalla impactante y sistema visual con firma real — pero la prueba ("¿realmente pueden?") queda escondida tras pliegues, la navegación no llega a Clientes/Contacto, y el pico emocional de todo el embudo (el "¡Mensaje Enviado!") abandona por completo el lenguaje Deepwater en favor de una tarjeta blanca de administrador. La oportunidad más grande: hacer que la identidad local de Linares y la prueba de proyectos reales hablen en la primera pantalla y en el momento de la conversión.

## Lo que funciona

1. **Sistema visual disciplinado y memorable en las secciones principales.** La disciplina de dos acentos (cian = acción, ámbar = escasez), sombras de color, radios graduados por jerarquía y hovers táctiles se ejecutan con consistencia (ServiceCard, ProjectCard, NavbarContactButton). Raro en el trabajo de agencia.
2. **Base de accesibilidad y performance excepcional para la categoría.** `prefers-reduced-motion` global, skip link, landmarks semánticos, ARIA en interactivos, lazy-loading con IntersectionObserver, modal con Escape/overlay-close. Protege la conversión de fallos técnicos.
3. **La prueba real está estructurada y esperando.** Clientes reales con industria y ubicación, cinco proyectos con descripción completa, features, stack y duración — material de confianza listo, solo falta distribuirlo mejor.

## Problemas prioritarios

### P1-1 — El feedback de envío del formulario rompe el sistema de diseño en el pico de la conversión
- **Qué**: El modal loading/success/error es una tarjeta blanca con colores fuera de paleta (Modal.astro:57 `background: white`; ModalLoadingState.astro:11 `text-blue-500`; ModalSuccessState.astro:12 `text-green-500`; :31 `bg-primary … text-white`; ModalErrorState.astro:16 `text-red-500`; :36,42 blanco/`bg-gray-200`). FormButton primario sin color de texto (hereda casi-negro, FormButton.astro:22-27). Viola DESIGN.md:217-218.
- **Por qué importa**: Es la interacción de mayor emoción del sitio; aquí se decide "¿esta empresa cuida la calidad?". Tres colores de texto de botón distintos (negro heredado, blanco explícito, gradiente oscuro) gritan inconsistencia.
- **Fix**: Reconstruir el modal en lenguaje Deepwater — panel de cristal con glow de color, tokens de estado del tema, texto oscuro sobre cian. Unificar el color de texto de FormButton en un solo token, quitar `text-white`.
- **Comando sugerido**: `/impeccable polish`

### P1-2 — Seis servicios con peso idéntico, sin priorización ni camino "no sé"
- **Qué**: Service.astro:36-46 renderiza 6 tarjetas iguales, cada una con su página vía "Saber más →". Sin punto de entrada recomendado ni ruta para quien no se auto-diagnostica.
- **Por qué importa**: El trabajo primario es captar leads; un primerizo que no puede mapear su problema a una categoría rebota. Confirmado por la auditoría de carga cognitiva (fallo en "minimal choices": >4 opciones en 3 puntos).
- **Fix**: Priorizar visualmente los dos servicios ancla (Soporte + Desarrollo) con el acento ámbar, demoter el resto, y agregar un CTA terciario "No sé qué necesito — hablemos" que vaya directo al formulario/WhatsApp.
- **Comando sugerido**: `/impeccable distill`

### P1-3 — La prueba más fuerte (proyectos) queda oculta en móvil y el modal no tiene salida
- **Qué**: En móvil solo se ven 2 de 5 proyectos detrás del mismo shimmer "Ver más" de servicios (Project.astro:27 y Service.astro:48 comparten SeeMoreButton.astro:20). El modal de proyecto no tiene CTA (project-modal-manager.ts:452-524, links comentados).
- **Por qué importa**: Para una pyme local los proyectos son todo el caso de confianza (principio 2 de PRODUCT.md). Esconderlos es "mostrar, invertido". Un visitante convencido dentro del modal no tiene siguiente paso y debe cerrar y hacer scroll ~3 viewports hasta el formulario.
- **Fix**: Distinguir los botones ("Ver más proyectos"/"Ver más servicios") o subir el límite móvil; agregar CTA de contacto/WhatsApp en el footer del modal.
- **Comando sugerido**: `/impeccable layout`

### P2-1 — La navegación no llega a dos secciones y nunca muestra dónde estás
- **Qué**: MENU (consts/menu.ts:3-18) solo tiene Inicio/Servicios/Proyectos/Nosotros — Clientes y Contacto son inalcanzables desde el nav primario; no hay scroll-spy ni estado activo (NavLink.astro, function-header.ts). El footer imprime "Home" en inglés y ítems muertos que escalan al hover (Footer.astro:23,45-48,87-89).
- **Por qué importa**: La prueba de clientes y el punto de conversión solo existen para quien hace scroll completo de ~7 viewports; el usuario que navega con el menú pierde el ancla de ubicación.
- **Fix**: Agregar Clientes + Contacto al MENU y a ENLACES del footer; implementar scroll-spy con IntersectionObserver; convertir los ítems del footer en links reales (o quitarles el hover de "clicable").
- **Comando sugerido**: `/impeccable layout`

### P2-2 — El Hero infra-vende lo único que diferencia a un proveedor TI local
- **Qué**: La primera pantalla no dice nada de estar en Linares/Maule, nada de atención humana directa, y entierra WhatsApp (canal #1 para pymes chilenas) dentro de los iconos sociales (Hero.astro:30) mientras hace del formulario el CTA hero.
- **Por qué importa**: Una pyme local que escanea "¿están en mi región?" obtiene una promesa genérica; el canal que usa para contactar no es el más visible.
- **Fix**: Poner "Linares, Región del Maule" + un CTA de WhatsApp (con mensaje prefabricado) en o sobre el Hero; adelantar un teaser de la prueba local real.
- **Comando sugerido**: `/impeccable bolder`

## Persona red flags

**Jordan (primerizo confundido, "¿pueden ayudarme?")** — acción primaria: entender servicios.
- No hay "¿quién/quién y dónde están?" en la primera pantalla: ni Linares/Maule, ni teaser de nosotros, ni prueba humana (Hero.astro:14-48).
- 6 tarjetas de servicio iguales, sin recomendación ni camino "no sé". Debe auto-diagnosticarse antes de que el sitio ofrezca ayuda.
- En móvil ve solo 2 tarjetas y un "Ver más" shimmer indistinguible del shimmer "Contacto" del navbar.
- El nav no tiene "Clientes"/"Contacto" — sus dos anclas de confianza solo se alcanzan haciendo scroll.

**Riley (estresador deliberado)** — acción primaria: contactar a SV Tech.
- Enviar antes de que el Turnstile lazy (2s) renderice → modal opaco "Por favor completa la verificación de seguridad" (contact-form-manager.ts:154-157) sin nada en pantalla para completar; el widget `size:'flexible'` mueve el layout al cargar.
- El modal del formulario no tiene Escape ni X; en estado de error hay Reintentar/Cancelar pero el formulario queda bloqueado detrás.
- Al redimensionar desktop→móvil las tarjetas *desaparecen* (la visibilidad se re-evalúa en resize, generic-card-visibility-manager.ts:213-220) — el contenido que se esfuma se siente como falla.
- Footer con callejones: "WhatsApp / Correo Electrónico / Linares" son texto plano que escala como link.

**Casey (móvil distraído)** — acción primaria: ver proyectos / revisar prueba.
- El marquee de logos se mueve; los logos son blancos móviles de ~112px; al tocar, el panel detalla cambia pero nada marca el logo seleccionado — pierde feedback en el scroll.
- La página tiene ~7 viewports; el formulario y la prueba quedan lejos de donde navega.
- El modal de proyecto abre con área de scroll interno sin pista; el color del icono de abrir es impredecible (ProjectCard.astro:56).

## Observaciones menores

- global.css:25 referencia `var(--color-primary-light)` nunca definido → el track del scrollbar cae al default.
- `<mark>` usado como eyebrow de sección (Why.astro:13, About.astro:28, ContactInformation.astro:9) — semánticamente es resaltado; usar `<span>`/`<p>` con role.
- ProjectModal.astro:21 setea `aria-describedby="modal-description"` sin elemento con ese id.
- CustomerCarousel.astro:4 `aria-label` en `div` no interactivo (ignorado); el marquee duplica logos → el lector de pantalla encuentra cada cliente dos veces.
- ProjectCard.astro:48-59 combina `text-primary` condicional e incondicional en el mismo icono.
- Footer `li:hover { scale: 1.2 }` excede el máximo del sistema (scale-105) y aplica a no-links.
- Hero.astro:24 `md:min-w-[780px]` en el párrafo — en viewport 768px exactos desborda el contenedor.
- gtag dispara doble pageview (config en Layout.astro:96 + handler astro:page-load en :98-104).
- Sin `<meta name="theme-color">` en Layout.astro — el chrome del móvil queda claro contra un sitio oscuro.
- Why/About/Footer usan `bg-black/60` plano (contradice ligeramente la regla "no superficies sólidas", DESIGN.md:213-215); la sección Customer usa `py-20` contra el ritmo global `py-40`.

## Preguntas a considerar

1. WhatsApp es el canal #1 para pymes chilenas y está en PRODUCT.md — ¿por qué el formulario es la única conversión visible y WhatsApp está enterrado en iconos? ¿Qué pasa con el embudo si el CTA del hero abre un chat de WhatsApp con "Hola SV Tech, necesito ayuda con…" pre-escrito?
2. Los activos más persuasivos son las historias hiperlocales (pre-matrícula del Liceo Valentín Letelier, alerta temprana del CFT Maule) — ¿cómo se vería la página si una historia de proyecto liderara el Hero en vez de un H1 de dos servicios?
3. Si la "Deepwater Control Room" debe volverse inconfundiblemente *de Linares* en vez de intercambiable con cualquier estudio, ¿qué elemento único (mapa de la región del Maule, banda del ecosistema local, fotos reales del equipo/clientes) haría más trabajo por píxel?
4. El visitante se convence dentro del modal de proyecto, donde no hay siguiente paso — ¿qué secuencia colapsaría el scroll de 7 viewports desde "revisar prueba" hasta "contactar" en una sola acción en contexto?
5. El momento de éxito del embudo es hoy una tarjeta blanca de admin — ¿cómo se vería "Mensaje enviado" en lenguaje Deepwater, y qué se prometería en él ("respondemos en <24h, Lunes-Sábado") para convertir el pico emocional en confianza?
