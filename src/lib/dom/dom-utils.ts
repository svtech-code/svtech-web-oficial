/**
 * Utilidades DOM optimizadas para performance.
 * Responsabilidad: Proveer funciones helper para manipulación DOM eficiente
 * usando patrones como batching, fragments y requestAnimationFrame.
 */

/**
 * Ejecuta operaciones DOM usando requestAnimationFrame para mejor performance
 * @param operation - Operación DOM a ejecutar
 */
export function batchDOMOperation(operation: () => void): void {
  requestAnimationFrame(operation);
}

/**
 * Crea un DocumentFragment para operaciones DOM por lotes
 */
export function createFragment(): DocumentFragment {
  return document.createDocumentFragment();
}

/**
 * Reemplaza el contenido de un elemento usando replaceChildren para mejor performance
 * @param element - Elemento a actualizar
 * @param newContent - Nuevo contenido (Node o DocumentFragment)
 */
export function replaceElementContent(
  element: HTMLElement,
  newContent: Node | DocumentFragment,
): void {
  batchDOMOperation(() => {
    element.replaceChildren(newContent);
  });
}

/**
 * Actualiza el src de una imagen de forma optimizada reutilizando elementos
 * @param element - Contenedor de la imagen
 * @param src - Nueva URL de la imagen
 * @param alt - Nuevo texto alternativo
 */
export function updateImageSrc(element: HTMLElement, src: string, alt: string): void {
  batchDOMOperation(() => {
    const existingImg = element.querySelector('img');
    if (existingImg) {
      // Reutilizar elemento existente para evitar reflow
      existingImg.src = src;
      existingImg.alt = alt;
    } else {
      // Crear nuevo elemento solo si no existe
      const imgElement = document.createElement('img');
      imgElement.src = src;
      imgElement.alt = alt;
      imgElement.loading = 'lazy';
      imgElement.className = 'w-full h-full object-contain';
      element.replaceChildren(imgElement);
    }
  });
}

/**
 * Crea un enlace social optimizado con accesibilidad
 * @param platform - Nombre de la plataforma social
 * @param url - URL del perfil social
 * @param iconSvg - HTML del icono SVG
 */
export function createSocialLink(
  platform: string,
  url: string,
  iconSvg: string,
): HTMLAnchorElement {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'duration-300 hover:scale-105';
  link.setAttribute('aria-label', `Visitanos en ${platform}`);
  link.innerHTML = iconSvg;

  const svgElement = link.querySelector('svg');
  svgElement?.classList.add('h-8', 'w-8');

  return link;
}

/**
 * Ejecuta una función cuando el navegador esté en estado idle
 * @param callback - Función a ejecutar
 * @param timeout - Timeout máximo en milisegundos (por defecto 2000)
 */
export function executeWhenIdle(callback: () => void, timeout = 2000): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout });
  } else {
    // Fallback para browsers que no soportan requestIdleCallback
    setTimeout(callback, 100);
  }
}
