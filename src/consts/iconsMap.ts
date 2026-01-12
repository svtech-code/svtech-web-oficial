// Optimización: Usar rutas estáticas en lugar de imports raw para reducir bundle size
// Los SVGs de customers ahora se cargan desde public/images/customers/ como archivos estáticos

import InstagramColor from 'assets/svg/instagram-color.svg?raw';
import FacebookColor from 'assets/svg/facebook-color.svg?raw';
import X from 'assets/svg/x.svg?raw';
import WhatsAppColor from 'assets/svg/whatsApp-color.svg?raw';
import ChromeColor from 'assets/svg/chrome-color.svg?raw';

export const logoSvgMap = {
  'customer-01': '/images/customers/customer-01.svg',
  'customer-02': '/images/customers/customer-02.svg',
  'customer-03': '/images/customers/customer-03.svg',
  'customer-04': '/images/customers/customer-04.svg',
  'customer-05': '/images/customers/customer-05.svg',
  'customer-06': '/images/customers/customer-06.svg',
  'customer-07': '/images/customers/customer-07.svg',
  'customer-08': '/images/customers/customer-08.svg',
} as const;

export const socialIconsMap = {
  'instagram-color': InstagramColor,
  'facebook-color': FacebookColor,
  x: X,
  'chrome-color': ChromeColor,
  'whatsApp-color': WhatsAppColor,
} as const;

export type LogoId = keyof typeof logoSvgMap;
export type SocialPlatform = keyof typeof socialIconsMap;
