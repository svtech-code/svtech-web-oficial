import type { Social } from "@types/social";

import X from "@assets/svg/x.svg";
import Instagram from "@assets/svg/instagram.svg";
import Discord from "@assets/svg/discord.svg";
import Email from "@assets/svg/email.svg";
import WhatsApp from "@assets/svg/whatsapp.svg";

export const SOCIAL: Social[] = [
  {
    id: "email",
    name: "Email",
    url: "mailto:contacto@svtech.cl",
    label: "Enviar un mensaje a Sv Tech",
    image: {
      logo: Email,
      width: 40,
      height: 40,
    }
  },
  {
    id: "x",
    name: "X",
    url: "https://twitter.com/svtech_code",
    label: "Visitar Twitter de Sv Tech",
    image: {
      logo: X,
      width: 40,
      height: 40,
    }
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/svtech_code/",
    label: "Visitar Instagram de Sv Teh",
    image: {
      logo: Instagram,
      width: 40,
      height: 40,
    }
  },
  {
    id: "discord",
    name: "Discord",
    url: "https://discord.gg/DUhM8uc3HM",
    label: "Únete a la comunidad de discord Sv Tech",
    image: {
      logo: Discord,
      width: 40,
      height: 40,
    }
  },
  {
    id: "whatsApp",
    name: "WhatsApp",
    url: "https://wa.me/56987933282",
    label: "Enviar un mensaje a Sv Tech",
    image: {
      logo: WhatsApp,
      width: 40,
      height: 40,
    }
  }

]


