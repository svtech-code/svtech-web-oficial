// Redes sociales svtech
import X from 'assets/svg/x.svg';
import Instagram from 'assets/svg/instagram.svg';
import Discord from 'assets/svg/discord.svg';
import WhatsApp from 'assets/svg/whatsapp.svg';
import InstagramColor from 'assets/svg/instagram-color.svg';
import WhatsAppColor from 'assets/svg/whatsApp-color.svg';
import FacebookColor from 'assets/svg/facebook-color.svg';

// servicios
import SoporteInformatico from 'assets/services/soporte-informatico.svg';
import DesarrolloWeb from 'assets/services/desarrollo-web.svg';
import ConsultoriaTi from 'assets/services/consultoria-ti.svg';
import AdministracionHosting from 'assets/services/administracion-hosting.svg';
import BaseDatos from 'assets/services/base-datos.svg';
import SoportePersonalizado from 'assets/services/soporte-personalizado.svg';

// customers
import Customer1 from 'assets/customers/customer-01.svg';
import Customer2 from 'assets/customers/customer-02.svg';
import Customer3 from 'assets/customers/customer-03.svg';
import Customer4 from 'assets/customers/customer-04.svg';
import Customer5 from 'assets/customers/customer-05.svg';
import Customer6 from 'assets/customers/customer-06.svg';

// others
import IconCheck from 'assets/svg/check.svg';
import Location from 'assets/svg/location.svg';
import ChromeColor from 'assets/svg/chrome-color.svg';
import Clock from 'assets/svg/clock.svg';
import Phone from 'assets/svg/phone.svg';
import Mail from 'assets/svg/mail.svg';
import Calendar from 'assets/svg/calendar.svg';
import Map from 'assets/svg/map.svg';

export const icons = {
  // redes sociales
  x: X,
  instagram: Instagram,
  discord: Discord,
  whatsApp: WhatsApp,
  'instagram-color': InstagramColor,
  'whatsApp-color': WhatsAppColor,
  'facebook-color': FacebookColor,
  'chrome-color': ChromeColor,

  // servicios
  'soporte-informatico': SoporteInformatico,
  'desarrollo-web': DesarrolloWeb,
  'consultoria-ti': ConsultoriaTi,
  'administracion-hosting': AdministracionHosting,
  'base-datos': BaseDatos,
  'soporte-personalizado': SoportePersonalizado,

  // customers
  'customer-01': Customer1,
  'customer-02': Customer2,
  'customer-03': Customer3,
  'customer-04': Customer4,
  'customer-05': Customer5,
  'customer-06': Customer6,

  // others
  check: IconCheck,
  location: Location,
  clock: Clock,
  phone: Phone,
  mail: Mail,
  map: Map,
  calendar: Calendar,
} as const;

export type IconName = keyof typeof icons;
