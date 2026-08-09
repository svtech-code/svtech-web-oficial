/**
 * Manager para el stagger de aparición de tarjetas agrupado por fila.
 * Responsabilidad: calcular el retardo de transición de cada tarjeta
 * según su fila visual real (offsetTop), agrupando por fila en
 * escritorio/tablet y con stagger secuencial corto en móvil.
 */

const ROW_DELAY_MS = 150;
const MOBILE_CARD_DELAY_MS = 60;
const MOBILE_BREAKPOINT = 768;

const CONTAINER_IDS = ['services-container', 'projects-container'];

function visibleCards(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('.reveal-card')).filter(
    (card) => card.offsetParent !== null,
  );
}

/**
 * Aplica el retardo de transición a las tarjetas de un contenedor.
 * En móvil usa stagger secuencial corto; en escritorio/tablet agrupa
 * el retardo por fila visual real (todas las cards de una fila a la vez).
 */
export function applyRowGroupedStagger(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cards = visibleCards(container);
  if (cards.length === 0) return;

  if (window.innerWidth < MOBILE_BREAKPOINT) {
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * MOBILE_CARD_DELAY_MS}ms`;
    });
    return;
  }

  const rows = new Map<number, HTMLElement[]>();
  cards.forEach((card) => {
    const top = Math.round(card.offsetTop);
    const row = rows.get(top) ?? [];
    row.push(card);
    rows.set(top, row);
  });

  const rowTops = Array.from(rows.keys()).sort((a, b) => a - b);
  rowTops.forEach((top, rowIndex) => {
    const delay = rowIndex * ROW_DELAY_MS;
    rows.get(top)?.forEach((card) => {
      card.style.transitionDelay = `${delay}ms`;
    });
  });
}

/**
 * Inicializa el stagger agrupado por fila para todos los contenedores
 * de tarjetas, re-calculándolo en resize y ante el evento de actualización
 * de visibilidad (Ver más / Ver menos).
 * @returns Función de cleanup para Astro.
 */
export function initCardStagger(): () => void {
  const apply = () => CONTAINER_IDS.forEach(applyRowGroupedStagger);

  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  const handleResize = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(apply, 150);
  };

  const handleStaggerUpdate = () => apply();

  apply();
  window.addEventListener('resize', handleResize);
  window.addEventListener('sv:stagger-update', handleStaggerUpdate);

  return () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('sv:stagger-update', handleStaggerUpdate);
  };
}
