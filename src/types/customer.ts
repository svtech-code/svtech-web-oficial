import type { IconName } from 'consts/icons';

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  x?: string;
  website?: string;
  whatsApp?: string;
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
