export const functionHeader = () => {
  const target = document.querySelector<HTMLDivElement>('[data-target]');
  const navbarButton = document.querySelector<HTMLElement>('#navbar-button');
  const contentNavbarDesktop = document.querySelector<HTMLDivElement>('#content-navbar-desktop');
  const contentNavbarMobile = document.querySelector<HTMLDivElement>('#content-navbar-mobile');
  const navbarMobile = document.querySelector<HTMLElement>('#navbar-mobile');
  const navbarMobileLinks = navbarMobile?.querySelectorAll('ul li a');

  // ✅ Agregar variable de estado para evitar cambios innecesarios
  let isTransparent = true;

  const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
    const shouldBeTransparent = Boolean(entry?.isIntersecting);

    // ✅ Solo modificar DOM si el estado realmente cambió
    if (shouldBeTransparent !== isTransparent) {
      isTransparent = shouldBeTransparent;

      // ✅ Usar requestAnimationFrame para batching de cambios DOM
      requestAnimationFrame(() => {
        if (contentNavbarDesktop) {
          // ✅ Usar toggle con condition en lugar de add/remove separados
          contentNavbarDesktop.classList.toggle('lg:backdrop-blur-none', isTransparent);
          contentNavbarDesktop.classList.toggle('lg:bg-transparent', isTransparent);
          contentNavbarDesktop.classList.toggle('lg:shadow-none', isTransparent);
        }
      });
    }
  };

  const createObserver = (target: Element, callback: IntersectionObserverCallback) => {
    // ✅ Usar rootMargin para trigger más temprano y threshold optimizado
    const observer = new IntersectionObserver(callback, {
      threshold: 0,
      rootMargin: '0px 0px -10px 0px',
    });
    observer.observe(target);
    return () => observer.disconnect();
  };

  // ✅ Debounce para el toggle del menú móvil
  let toggleTimeout: ReturnType<typeof setTimeout>;
  const toggleMenu = () => {
    clearTimeout(toggleTimeout);
    toggleTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        navbarButton?.classList.toggle('open');
        contentNavbarMobile?.classList.toggle('w-full');
        const isOpenMenuMobile = navbarMobile?.classList.toggle('w-[60%]');

        navbarMobile?.setAttribute('aria-hidden', `${!isOpenMenuMobile}`);
        navbarMobile?.setAttribute('aria-expanded', `${isOpenMenuMobile}`);
      });
    }, 16); // ~60fps
  };

  const toggleMenuLinks = () => {
    navbarMobileLinks?.forEach((link) => {
      link.addEventListener('click', toggleMenu, { passive: true });
    });
  };

  if (target) createObserver(target, handleIntersection);
  navbarButton?.addEventListener('click', toggleMenu, { passive: true });
  toggleMenuLinks();
};
