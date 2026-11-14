import type {
  QrContrastValidation,
  QrVCardPayloadInput,
  QrWhatsappPayloadInput,
  QrWifiPayloadInput,
} from 'types/qr';

const DEFAULT_FALLBACK_URL = 'https://svtech.cl';

/**
 * Escapa caracteres reservados en tramas estándar WIFI: (\, ;, ,, :)
 */
export function escapeWifiValue(raw: string): string {
  return raw.replace(/([\\;,:])/g, '\\$1');
}

/**
 * Normaliza y valida una URL o enlace de redes sociales.
 */
export function buildUrlPayload(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return DEFAULT_FALLBACK_URL;
  }
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * Construye el enlace oficial directo de WhatsApp (https://wa.me/...)
 */
export function buildWhatsappPayload(input: QrWhatsappPayloadInput): string {
  const cleanPhone = input.phone.replace(/\D/g, '');
  const phone = cleanPhone.length > 0 ? cleanPhone : '56987933282';
  const cleanMessage = input.message.trim();

  if (!cleanMessage) {
    return `https://wa.me/${phone}`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(cleanMessage)}`;
}

/**
 * Construye la trama estándar WIFI:T:{seguridad};S:{ssid};P:{clave};H:{oculta};;
 */
export function buildWifiPayload(input: QrWifiPayloadInput): string {
  const ssid = escapeWifiValue(input.ssid.trim() || 'Red_WiFi_Cliente');
  const encryption = input.encryption;
  const password = encryption === 'nopass' ? '' : escapeWifiValue(input.password);
  const hiddenFlag = input.hidden ? 'true' : 'false';

  return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hiddenFlag};;`;
}

/**
 * Construye una tarjeta de contacto estándar vCard 3.0
 */
export function buildVCardPayload(input: QrVCardPayloadInput): string {
  const fullName = input.fullName.trim() || 'Contacto Comercial';
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${fullName}`,
    `N:${fullName};;;;`,
  ];

  if (input.organization.trim()) {
    lines.push(`ORG:${input.organization.trim()}`);
  }
  if (input.title.trim()) {
    lines.push(`TITLE:${input.title.trim()}`);
  }
  if (input.phone.trim()) {
    lines.push(`TEL;TYPE=CELL:${input.phone.trim()}`);
  }
  if (input.email.trim()) {
    lines.push(`EMAIL:${input.email.trim()}`);
  }
  if (input.website.trim()) {
    lines.push(`URL:${buildUrlPayload(input.website)}`);
  }

  lines.push('END:VCARD');
  return lines.join('\n');
}

/**
 * Convierte un color hexadecimal (#RRGGBB) a luminancia relativa WCAG 2.1 (0.0 a 1.0)
 */
export function getRelativeLuminance(hexColor: string): number {
  const normalized = hexColor.replace('#', '').trim();
  if (normalized.length !== 6) {
    return 0;
  }

  const rHex = normalized.slice(0, 2);
  const gHex = normalized.slice(2, 4);
  const bHex = normalized.slice(4, 6);

  const r8 = Number.parseInt(rHex, 16) / 255;
  const g8 = Number.parseInt(gHex, 16) / 255;
  const b8 = Number.parseInt(bHex, 16) / 255;

  if (Number.isNaN(r8) || Number.isNaN(g8) || Number.isNaN(b8)) {
    return 0;
  }

  const toLinear = (channel: number): number =>
    channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);

  const r = toLinear(r8);
  const g = toLinear(g8);
  const b = toLinear(b8);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Valida el contraste óptico entre los módulos del QR y el color de fondo.
 * Advierte si el contraste es < 3.0:1 o si el fondo es más oscuro que los módulos (QR invertido).
 */
export function evaluateQrContrast(dotsColor: string, bgColor: string): QrContrastValidation {
  const dotsLuminance = getRelativeLuminance(dotsColor);
  const bgLuminance = getRelativeLuminance(bgColor);

  const lighter = Math.max(dotsLuminance, bgLuminance);
  const darker = Math.min(dotsLuminance, bgLuminance);
  const rawRatio = (lighter + 0.05) / (darker + 0.05);
  const contrastRatio = Math.round(rawRatio * 10) / 10;

  const isInverted = bgLuminance < dotsLuminance;
  const hasValidContrast = !isInverted && contrastRatio >= 3.0;

  return {
    hasValidContrast,
    isInverted,
    contrastRatio,
  };
}
