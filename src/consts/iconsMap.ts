// Optimización: Usar rutas estáticas en lugar de imports raw para reducir bundle size
// Los logos de customers se sirven desde public/images/customers/ como WebP optimizado

import InstagramColor from 'assets/svg/instagram-color.svg?raw';
import FacebookColor from 'assets/svg/facebook-color.svg?raw';
import X from 'assets/svg/x.svg?raw';
import WhatsAppColor from 'assets/svg/whatsApp-color.svg?raw';
import ChromeColor from 'assets/svg/chrome-color.svg?raw';

export const customerLogoMap = {
  'customer-01': '/images/customers/customer-01.webp',
  'customer-02': '/images/customers/customer-02.webp',
  'customer-03': '/images/customers/customer-03.webp',
  'customer-04': '/images/customers/customer-04.webp',
  'customer-05': '/images/customers/customer-05.webp',
  'customer-06': '/images/customers/customer-06.webp',
  'customer-07': '/images/customers/customer-07.webp',
  'customer-08': '/images/customers/customer-08.webp',
} as const;

export const socialIconsMap = {
  'instagram-color': InstagramColor,
  'facebook-color': FacebookColor,
  x: X,
  'chrome-color': ChromeColor,
  'whatsApp-color': WhatsAppColor,
} as const;

export const serviceIconMap = {
  'soporte-informatico': '/images/service-icons/soporte-informatico.webp',
  'desarrollo-web': '/images/service-icons/desarrollo-web.webp',
  'consultoria-ti': '/images/service-icons/consultoria-ti.webp',
  'administracion-hosting': '/images/service-icons/administracion-hosting.webp',
  'base-datos': '/images/service-icons/base-datos.webp',
  'soporte-personalizado': '/images/service-icons/soporte-personalizado.webp',
} as const;

export type SocialPlatform = keyof typeof socialIconsMap;
export type ServiceSlug = keyof typeof serviceIconMap;
