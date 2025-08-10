// Redes sociales svtech
import X from 'assets/svg/x.svg';
import Instagram from 'assets/svg/instagram.svg';
import Discord from 'assets/svg/discord.svg';
import WhatsApp from 'assets/svg/whatsapp.svg';
import Facebook from 'assets/svg/facebook.svg';

// servicios
import SoporteInformatico from 'assets/services/soporte-informatico.svg';

export const icons = {
  // redes sociales
  x: X,
  instagram: Instagram,
  discord: Discord,
  whatsApp: WhatsApp,
  facebook: Facebook,

  // servicios
  'soporte-informatico': SoporteInformatico,
} as const;

export type IconName = keyof typeof icons;
