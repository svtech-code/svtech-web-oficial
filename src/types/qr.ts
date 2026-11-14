export type QrContentMode = 'url' | 'whatsapp' | 'wifi' | 'vcard';
export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';
export type QrDotStyle = 'square' | 'rounded' | 'dots' | 'classy-rounded';
export type QrCornerStyle = 'square' | 'extra-rounded' | 'dot';
export type QrExportFormat = 'png' | 'svg';

export interface QrWifiPayloadInput {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
  hidden: boolean;
}

export interface QrWhatsappPayloadInput {
  phone: string;
  message: string;
}

export interface QrVCardPayloadInput {
  fullName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  website: string;
}

export interface QrContrastValidation {
  hasValidContrast: boolean;
  isInverted: boolean;
  contrastRatio: number;
}

export interface QrGeneratorState {
  mode: QrContentMode;
  rawPayload: string;
  design: {
    dotsColor: string;
    bgColor: string;
    dotsType: QrDotStyle;
    cornersType: QrCornerStyle;
    logoObjectUrl: string | null;
  };
  validation: QrContrastValidation;
}
