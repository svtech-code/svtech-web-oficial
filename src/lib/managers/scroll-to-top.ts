/**
 * Utilidad para scroll hacia arriba con aparición automática.
 * Responsabilidad: Crear botón scroll-to-top que aparece basado en posición de trigger element.
 */

interface ScrollTotTopOptions {
  buttonId: string;
  triggerElementId?: string;
  fallbackThreshold?: number;
  scrollBehavior?: 'smooth' | 'auto';
}

/**
 * Crea un botón de scroll hacia arriba con funcionalidad automática y coreografía de animación
 * @param options - Configuración del scroll to top
 * @param options.buttonId - ID del elemento botón en el DOM
 * @param options.triggerElementId - ID del elemento que activa la aparición del botón (opcional)
 * @param options.fallbackThreshold - Umbral de scroll en px si el elemento trigger no existe (default: 350)
 * @param options.scrollBehavior - Comportamiento del scroll (smooth o auto)
 */
export const initScrollToTop = (options: ScrollTotTopOptions) => {
  const {
    buttonId,
    triggerElementId,
    fallbackThreshold = 350,
    scrollBehavior = 'smooth',
  } = options;

  const button = document.getElementById(buttonId);

  if (!button) {
    return () => {};
  }

  const triggerElement = triggerElementId ? document.getElementById(triggerElementId) : null;
  const getThreshold = () => (triggerElement ? triggerElement.offsetTop : fallbackThreshold);

  let ticking = false;
  let currentlyVisible: boolean | null = null;

  /**
   * Alterna la visibilidad del botón basado en la posición de scroll
   */
  const toggleButton = () => {
    const scrollY = window.scrollY;
    const threshold = getThreshold();
    const isVisible = scrollY >= threshold;

    if (currentlyVisible !== isVisible) {
      currentlyVisible = isVisible;

      if (isVisible) {
        button.classList.remove('opacity-0', 'pointer-events-none');
        button.classList.add('opacity-100', 'pointer-events-auto', 'is-visible');
        button.removeAttribute('tabindex');
      } else {
        button.classList.add('opacity-0', 'pointer-events-none');
        button.classList.remove('opacity-100', 'pointer-events-auto', 'is-visible');
        button.setAttribute('tabindex', '-1');
      }

      // Notificar cambio de estado para sincronizar elementos flotantes (ej. FAB WhatsApp)
      window.dispatchEvent(
        new CustomEvent('sv:scroll-to-top-toggle', {
          detail: { isVisible },
        })
      );
    }

    ticking = false;
  };

  /**
   * Handler del evento scroll optimizado con requestAnimationFrame
   */
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(toggleButton);
      ticking = true;
    }
  };

  /**
   * Ejecuta scroll suave hacia la parte superior de la página
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior });
  };

  // Event listeners
  window.addEventListener('scroll', onScroll, { passive: true });
  button.addEventListener('click', scrollToTop);

  // Initial state
  toggleButton();

  return () => {
    window.removeEventListener('scroll', onScroll);
    button.removeEventListener('click', scrollToTop);
  };
};
