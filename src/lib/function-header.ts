export const functionHeader = () => {
  const target = document.querySelector<HTMLDivElement>('[data-target]');
  const navbarButton = document.querySelector<HTMLElement>('#navbar-button');
  const contentNavbarDesktop = document.querySelector<HTMLDivElement>('#content-navbar-desktop');
  const contentNavbarMobile = document.querySelector<HTMLDivElement>('#content-navbar-mobile');
  const navbarMobile = document.querySelector<HTMLElement>('#navbar-mobile');
  const navbarMobileLinks = navbarMobile?.querySelectorAll('ul li a');

  const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
    if (!entry.isIntersecting) {
      contentNavbarDesktop?.classList.remove(
        'md:backdrop-blur-none',
        'md:bg-transparent',
        'md:shadow-none',
      );
    } else {
      contentNavbarDesktop?.classList.add(
        'md:backdrop-blur-none',
        'md:bg-transparent',
        'md:shadow-none',
      );
    }
  };

  const createObserver = (target: Element, callback: IntersectionObserverCallback) => {
    const observer = new IntersectionObserver(callback, { threshold: 0.5 });
    observer.observe(target);
    return () => observer.disconnect();
  };

  const toggleMenu = () => {
    navbarButton?.classList.toggle('open');
    contentNavbarMobile?.classList.toggle('w-full');
    const isOpenMenuMobil = navbarMobile?.classList.toggle('w-[60%]');

    navbarMobile?.setAttribute('aria-hidden', `${isOpenMenuMobil}`);
    navbarMobile?.setAttribute('aria-expanded', `${isOpenMenuMobil}`);
  };

  const toggleMenuLinks = () => {
    navbarMobileLinks?.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu();
      });
    });
  };

  if (target) createObserver(target, handleIntersection);

  navbarButton?.addEventListener('click', toggleMenu);
  toggleMenuLinks();
};
