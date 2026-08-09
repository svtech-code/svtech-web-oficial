/**
 * FUNCIÓN GENÉRICA PARA MANEJO DE VISIBILIDAD DE TARJETAS
 *
 * Esta función reemplaza y generaliza setupServiceVisibility()
 * permitiendo reutilización en múltiples secciones (services, projects, etc.)
 *
 * Funcionalidades:
 * - Manejo responsive (mobile/tablet/desktop)
 * - Animaciones escalonadas de entrada/salida
 * - Botón "Ver más/menos" dinámico
 * - Scroll automático al colapsar
 * - Cleanup automático en Astro
 * - Performance optimizada con throttling
 */

export interface CardVisibilityConfig {
  sectionName: string; // Nombre de la sección (ej: 'services', 'projects')
  mobileLimit?: number; // Límite en móvil (default: 2)
  tabletLimit?: number; // Límite en tablet (default: 4)
  collapsedLabel?: string; // Texto del botón colapsado (default: 'Ver más')
  expandedLabel?: string; // Texto del botón expandido (default: 'Ver menos')
  animationDelay?: number; // Delay entre animaciones (default: 30ms)
  transitionDuration?: number; // Duración de transición (default: 200ms)
  resizeThrottle?: number; // Throttle para resize (default: 150ms)
}

/**
 * Configura la visibilidad de tarjetas con funcionalidad "Ver más"
 *
 * @param config - Configuración de la sección y límites
 * @returns Función de cleanup para limpieza manual
 */
export function setupCardVisibility(config: CardVisibilityConfig) {
  // Configuración con valores por defecto
  const settings = {
    sectionName: config.sectionName,
    mobileLimit: config.mobileLimit ?? 2,
    tabletLimit: config.tabletLimit ?? 4,
    collapsedLabel: config.collapsedLabel ?? 'Ver más',
    expandedLabel: config.expandedLabel ?? 'Ver menos',
    animationDelay: config.animationDelay ?? 30,
    transitionDuration: config.transitionDuration ?? 200,
    resizeThrottle: config.resizeThrottle ?? 150,
    isExpanded: false,
  };

  // Selectores dinámicos basados en el nombre de la sección
  const selectors = {
    container: `${settings.sectionName}-container`,
    button: `${settings.sectionName}-see-more-btn`,
    section: settings.sectionName,
  };

  // Elementos del DOM
  const container = document.getElementById(selectors.container);
  if (!container) {
    console.warn(`⚠️  Container #${selectors.container} no encontrado`);
    return () => {}; // Retorna cleanup vacío
  }

  const elements = {
    button: document.getElementById(selectors.button),
    container,
    cards: container.querySelectorAll('article') as NodeListOf<HTMLElement>,
    buttonText: null as HTMLElement | null,
    section: document.getElementById(selectors.section),
  };

  // Validación de elementos críticos
  if (!elements.button || elements.cards.length === 0) {
    console.warn(`⚠️  Button #${selectors.button} o cards no encontrados`);
    return () => {};
  }

  elements.buttonText = elements.button.querySelector('.see-more-text') as HTMLElement;
  if (!elements.buttonText) {
    console.warn(`⚠️  Texto del botón (.see-more-text) no encontrado`);
    return () => {};
  }

  // Obtener límites de los data attributes del botón
  const dataLimits = {
    mobile: parseInt(elements.button.dataset.mobileLimit || settings.mobileLimit.toString()),
    tablet: parseInt(elements.button.dataset.tabletLimit || settings.tabletLimit.toString()),
  };

  // Actualizar configuración con valores de data attributes si existen
  settings.mobileLimit = dataLimits.mobile;
  settings.tabletLimit = dataLimits.tablet;

  // Control de timeouts para animaciones
  const animationTimeouts = new Set<ReturnType<typeof setTimeout>>();
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * Limpia todos los timeouts de animación activos
   */
  function clearAllTimeouts() {
    animationTimeouts.forEach((timeout) => clearTimeout(timeout));
    animationTimeouts.clear();
  }

  /**
   * Obtiene el límite de elementos a mostrar según el ancho de pantalla
   */
  function getCurrentLimit(): number | null {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) return settings.mobileLimit;
    if (screenWidth < 1024) return settings.tabletLimit;
    return null; // Desktop - mostrar todos
  }

  /**
   * Actualiza la visibilidad de las tarjetas según el breakpoint actual
   */
  function updateVisibility() {
    const limit = getCurrentLimit();

    // Desktop - mostrar todos
    if (limit === null) {
      showAllCards();
      elements.button && (elements.button.style.display = 'none');
      return;
    }

    // Mobile/Tablet
    const visibleCount = settings.isExpanded ? elements.cards.length : limit;
    showCardsWithAnimation(visibleCount);

    // Actualizar botón
    if (elements.cards.length > limit) {
      elements.button && (elements.button.style.display = 'flex');
      elements.buttonText &&
        (elements.buttonText.textContent = settings.isExpanded
          ? settings.expandedLabel
          : settings.collapsedLabel);
    } else {
      elements.button && (elements.button.style.display = 'none');
    }
  }

  /**
   * Muestra todas las tarjetas sin límites (vista desktop)
   */
  function showAllCards() {
    requestAnimationFrame(() => {
      elements.cards.forEach((card) => {
        card.style.display = 'flex';
      });
      window.dispatchEvent(new Event('sv:stagger-update'));
    });
  }

  /**
   * Muestra un número específico de tarjetas en función de los límites
   * @param visibleCount - Número de tarjetas a mostrar
   */
  function showCardsWithAnimation(visibleCount: number) {
    clearAllTimeouts();

    requestAnimationFrame(() => {
      elements.cards.forEach((card, index) => {
        if (index < visibleCount) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      window.dispatchEvent(new Event('sv:stagger-update'));
    });
  }

  /**
   * Alterna entre mostrar más/menos tarjetas
   */
  function toggleVisibility() {
    const wasExpanded = settings.isExpanded;
    settings.isExpanded = !settings.isExpanded;
    updateVisibility();

    // Scroll solo si se colapsa
    if (wasExpanded && !settings.isExpanded && elements.section) {
      const timeout = setTimeout(() => {
        elements.section?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Focus en el título para accesibilidad
        const sectionTitle = elements.section?.querySelector('h2') as HTMLElement;
        if (sectionTitle) {
          sectionTitle.focus();
        }
      }, 50);

      animationTimeouts.add(timeout);
    }
  }

  /**
   * Maneja el resize de ventana con throttling para optimizar performance
   */
  function handleResize() {
    if (resizeTimeout) clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      updateVisibility();
      resizeTimeout = null;
    }, settings.resizeThrottle);
  }

  // Event listeners
  elements.button.addEventListener('click', toggleVisibility);
  window.addEventListener('resize', handleResize);

  // Función de limpieza
  const cleanup = () => {
    clearAllTimeouts();
    if (resizeTimeout) clearTimeout(resizeTimeout);
    elements.button?.removeEventListener('click', toggleVisibility);
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('astro:before-preparation', cleanup);
    document.removeEventListener('astro:page-load', cleanup);
  };

  // Auto-cleanup en Astro
  document.addEventListener('astro:before-preparation', cleanup);
  document.addEventListener('astro:page-load', cleanup);

  // Inicializar
  updateVisibility();

  // Retornar cleanup para uso manual
  return cleanup;
}
