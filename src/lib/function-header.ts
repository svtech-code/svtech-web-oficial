export const functionHeader = () => {
  const target = document.querySelector<HTMLDivElement>('[data-target]');
  const navbarButton = document.querySelector<HTMLElement>('#navbar-button');
  const contentNavbarDesktop = document.querySelector<HTMLDivElement>('#content-navbar-desktop');
  const contentNavbarMobile = document.querySelector<HTMLDivElement>('#content-navbar-mobile');
  const navbarMobile = document.querySelector<HTMLElement>('#navbar-mobile');

  let isTransparent = true;

  // Intersection observer
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

  // Toggle menu movile
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
