// Redes sociales svtech
import X from 'assets/svg/x.svg';
import Instagram from 'assets/svg/instagram.svg';
import Discord from 'assets/svg/discord.svg';
import WhatsApp from 'assets/svg/whatsapp.svg';
import InstagramColor from 'assets/svg/instagram-color.svg';
import WhatsAppColor from 'assets/svg/whatsApp-color.svg';
import FacebookColor from 'assets/svg/facebook-color.svg';

// others
import IconCheck from 'assets/svg/check.svg';
import Location from 'assets/svg/location.svg';
import ChromeColor from 'assets/svg/chrome-color.svg';
import Clock from 'assets/svg/clock.svg';
import Phone from 'assets/svg/phone.svg';
import Mail from 'assets/svg/mail.svg';
import Calendar from 'assets/svg/calendar.svg';
import Map from 'assets/svg/map.svg';
import Open from 'assets/svg/open.svg';
import OpenVector from 'assets/svg/open-vector.svg';
import CloseVector from 'assets/svg/close-vector.svg';
import UpArrow from 'assets/svg/upArrow.svg';
import Search from 'assets/svg/search.svg';
import Download from 'assets/svg/download.svg';

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

  // others
  check: IconCheck,
  location: Location,
  clock: Clock,
  phone: Phone,
  mail: Mail,
  map: Map,
  calendar: Calendar,
  open: Open,
  'open-vector': OpenVector,
  'close-vector': CloseVector,
  upArrow: UpArrow,
  search: Search,
  download: Download,
} as const;

export type IconName = keyof typeof icons;
