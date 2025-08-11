import Customer1 from 'assets/customers/customer-01.svg?raw';
import Customer2 from 'assets/customers/customer-02.svg?raw';
import Customer3 from 'assets/customers/customer-03.svg?raw';
import Customer4 from 'assets/customers/customer-04.svg?raw';
import Customer5 from 'assets/customers/customer-05.svg?raw';
import Customer6 from 'assets/customers/customer-06.svg?raw';

import Instagram from 'assets/svg/instagram.svg?raw';
import Facebook from 'assets/svg/facebook.svg?raw';
import X from 'assets/svg/x.svg?raw';
import WhatsApp from 'assets/svg/whatsapp.svg?raw';
import Website from 'assets/svg/chrome.svg?raw';

export const logoSvgMap = {
  'customer-01': Customer1,
  'customer-02': Customer2,
  'customer-03': Customer3,
  'customer-04': Customer4,
  'customer-05': Customer5,
  'customer-06': Customer6,
} as const;

export const socialIconsMap = {
  instagram: Instagram,
  facebook: Facebook,
  x: X,
  website: Website,
  whatsApp: WhatsApp,
} as const;

export type LogoId = keyof typeof logoSvgMap;
export type SocialPlatform = keyof typeof socialIconsMap;
