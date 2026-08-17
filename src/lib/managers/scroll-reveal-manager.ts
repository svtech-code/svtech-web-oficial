import { initCardStagger } from './card-stagger-manager';

/**
 * Manager para la animación de revelado de elementos al hacer scroll (Scroll Reveal).
 * Responsabilidad: Utilizar IntersectionObserver para activar (.active) y desactivar (.exiting-right)
 * las animaciones cuando los elementos entran y salen del viewport.
 */
export class ScrollRevealManager {
  private observer: IntersectionObserver | null = null;

  constructor(threshold = 0.05, rootMargin = '0px 0px 20px 0px') {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            target.classList.remove('exiting-right');
            target.classList.add('active');

            if (target.classList.contains('reveal-card') && target.style.transitionDelay) {
              const clearDelay = () => {
                target.style.transitionDelay = '';
              };
              target.addEventListener('transitionend', clearDelay, { once: true });
              setTimeout(clearDelay, 600);
            }
          } else {
            if (target.classList.contains('active')) {
              target.classList.remove('active');
              target.classList.add('exiting-right');
            }
          }
        });
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );
  }

  /**
   * Inicializa la observación de todos los elementos con clases `.reveal*`
   * que aún no hayan sido observados.
   */
  public observe(): void {
    if (!this.observer) return;

    const elements = document.querySelectorAll<HTMLElement>(
      '.reveal:not([data-reveal-observed]), .reveal-card:not([data-reveal-observed]), .reveal-fade:not([data-reveal-observed]), .reveal-left:not([data-reveal-observed]), .reveal-right:not([data-reveal-observed])',
    );

    elements.forEach((el) => {
      el.setAttribute('data-reveal-observed', 'true');
      this.observer?.observe(el);
    });
  }

  /**
   * Limpia el observer actual.
   */
  public disconnect(): void {
    this.observer?.disconnect();
  }
}

/**
 * Helper global para inicializar ScrollRevealManager en las transiciones de página de Astro.
 */
export function initScrollReveal(): () => void {
  const manager = new ScrollRevealManager();
  manager.observe();
  const stopCardStagger = initCardStagger();

  return () => {
    manager.disconnect();
    stopCardStagger();
  };
}
