// Redes sociales svtech
import X from 'assets/svg/x.svg';
import Instagram from 'assets/svg/instagram.svg';
import Discord from 'assets/svg/discord.svg';
import WhatsApp from 'assets/svg/whatsapp.svg';
import Facebook from 'assets/svg/facebook.svg';

// servicios
import SoporteInformatico from 'assets/services/soporte-informatico.svg';
import DesarrolloWeb from 'assets/services/desarrollo-web.svg';
import ConsultoriaTi from 'assets/services/consultoria-ti.svg';
import AdministracionHosting from 'assets/services/administracion-hosting.svg';
import BaseDatos from 'assets/services/base-datos.svg';
import SoportePersonalizado from 'assets/services/soporte-personalizado.svg';

export const icons = {
  // redes sociales
  x: X,
  instagram: Instagram,
  discord: Discord,
  whatsApp: WhatsApp,
  facebook: Facebook,

  // servicios
  'soporte-informatico': SoporteInformatico,
  'desarrollo-web': DesarrolloWeb,
  'consultoria-ti': ConsultoriaTi,
  'administracion-hosting': AdministracionHosting,
  'base-datos': BaseDatos,
  'soporte-personalizado': SoportePersonalizado,
} as const;

export type IconName = keyof typeof icons;
