/**
 * Construye un `srcset` con las variantes responsivas de una imagen de proyecto/servicio.
 * Asume que existen `{base}-540.webp` y `{base}-800.webp` junto al original (1000w).
 * @param src - Ruta de la imagen original (p. ej. /images/services/desarrollo-web.webp)
 */
export function imageSrcSet(src: string): string {
  const base = src.replace(/\.webp$/, '');
  return `${base}-540.webp 540w, ${base}-800.webp 800w, ${src} 1000w`;
}
