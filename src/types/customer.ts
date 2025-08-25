import type { IconName } from 'consts/icons';

export interface SocialMedia {
  instagram?: string;
  'instagram-color'?: string;
  facebook?: string;
  'facebook-color'?: string;
  linkedin?: string;
  x?: string;
  chrome?: string;
  'chrome-color'?: string;
  whatsApp?: string;
  'whatsApp-color'?: string;
}

export interface Customer {
  id: IconName;
  name: string;
  shortName: string;
  description: string;
  socialMedia: SocialMedia;
  industry: string;
  location: string;
}
