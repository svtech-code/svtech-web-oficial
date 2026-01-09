/**
 * Inicializa el comportamiento del header con transparencia dinámica y menú móvil.
 * Responsabilidad: Gestionar la transparencia del navbar basada en scroll,
 * manejar el toggle del menú móvil y limpiar event listeners.
 */
export const functionHeader = () => {
  const target = document.querySelector<HTMLDivElement>('[data-target]');
  const navbarButton = document.querySelector<HTMLElement>('#navbar-button');
  const contentNavbarDesktop = document.querySelector<HTMLDivElement>('#content-navbar-desktop');
  const contentNavbarMobile = document.querySelector<HTMLDivElement>('#content-navbar-mobile');
  const navbarMobile = document.querySelector<HTMLElement>('#navbar-mobile');

  let isTransparent = true;

  /**
   * Maneja cambios de intersección para transparencia del navbar
   * @param entry - Entrada del IntersectionObserver
   */
  const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
    const shouldBeTransparent = Boolean(entry?.isIntersecting);

    // Solo modificar DOM si el estado realmente cambió
    if (shouldBeTransparent !== isTransparent) {
      isTransparent = shouldBeTransparent;

      requestAnimationFrame(() => {
        if (contentNavbarDesktop) {
          contentNavbarDesktop.classList.toggle('lg:backdrop-blur-none', isTransparent);
          contentNavbarDesktop.classList.toggle('lg:bg-transparent', isTransparent);
          contentNavbarDesktop.classList.toggle('lg:shadow-none', isTransparent);
        }
      });
    }
  };

  /**
   * Crea y configura un IntersectionObserver optimizado
   * @param target - Elemento a observar
   * @param callback - Función callback para cambios de intersección
   */
  const createObserver = (target: Element, callback: IntersectionObserverCallback) => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0,
      rootMargin: '0px 0px -10px 0px',
    });

    const observe = (): void => observer.observe(target);
    if (document.readyState === 'complete') {
      observe();
    } else if ('requestIdleCallback' in window) {
      (window as Window).requestIdleCallback(observe, { timeout: 200 });
    } else {
      (window as Window).addEventListener('load', observe, { once: true });
    }

    // observer.observe(target);
    return () => observer.disconnect(); // cleanup function
  };

  /**
   * Alterna la visibilidad del menú móvil
   */
  const toggleMenu = () => {
    requestAnimationFrame(() => {
      navbarButton?.classList.toggle('open');
      contentNavbarMobile?.classList.toggle('w-full');
      const isOpenMenuMobile = navbarMobile?.classList.toggle('w-[60%]');
      navbarMobile?.setAttribute('aria-hidden', `${!isOpenMenuMobile}`);
      navbarMobile?.setAttribute('aria-expanded', `${isOpenMenuMobile}`);
    });
  };

  // Enlaces del menu mobile
  const attachedLinks: HTMLAnchorElement[] = [];
  /**
   * Configura event listeners para enlaces del menú móvil
   */
  const attachLinkListeners = () => {
    const links = navbarMobile?.querySelectorAll<HTMLAnchorElement>('ul li a');
    links?.forEach((link) => {
      link.addEventListener('click', toggleMenu, { passive: true });
      attachedLinks.push(link); // guardamos para limpieza
    });
  };

  // Inicialización
  const disconnectObserver = target ? createObserver(target, handleIntersection) : null;
  navbarButton?.addEventListener('click', toggleMenu, { passive: true });
  attachLinkListeners();

  // Función de limpieza
  return () => {
    disconnectObserver?.();
    navbarButton?.removeEventListener('click', toggleMenu);
    attachedLinks.forEach((link) => link.removeEventListener('click', toggleMenu));
  };
};
