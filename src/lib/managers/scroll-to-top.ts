/**
 * Utilidad para scroll hacia arriba con aparición automática.
 * Responsabilidad: Crear botón scroll-to-top que aparece basado en posición de trigger element.
 */

interface ScrollTotTopOptions {
  buttonId: string;
  triggerElementId: string;
  scrollBehavior?: 'smooth' | 'auto';
}

/**
 * Crea un botón de scroll hacia arriba con funcionalidad automática
 * @param options - Configuración del scroll to top
 * @param options.buttonId - ID del elemento botón en el DOM
 * @param options.triggerElementId - ID del elemento que activa la aparición del botón
 * @param options.scrollBehavior - Comportamiento del scroll (smooth o auto)
 */
export const initScrollToTop = (options: ScrollTotTopOptions) => {
  const { buttonId, triggerElementId, scrollBehavior = 'smooth' } = options;

  const button = document.getElementById(buttonId);
  const triggerElement = document.getElementById(triggerElementId);

  if (!button || !triggerElement) {
    console.warn('ScrollToTop: Required elements not found');
    return;
  }

  const threshold = triggerElement.offsetTop;
  let ticking = false;

  /**
   * Alterna la visibilidad del botón basado en la posición de scroll
   */
  const toggleButton = () => {
    const scrollY = window.scrollY;

    if (scrollY >= threshold) {
      button.classList.remove('opacity-0', 'pointer-events-none');
      button.classList.add('opacity-100', 'pointer-events-auto');
      button.removeAttribute('tabindex');
    } else {
      button.classList.add('opacity-0', 'pointer-events-none');
      button.classList.remove('opacity-100', 'pointer-events-auto');
      button.setAttribute('tabindex', '-1');
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
};
