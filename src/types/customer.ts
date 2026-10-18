export type CustomerId =
  | 'customer-01'
  | 'customer-02'
  | 'customer-03'
  | 'customer-04'
  | 'customer-05'
  | 'customer-06'
  | 'customer-07'
  | 'customer-08';

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
  id: CustomerId;
  name: string;
  shortName: string;
  description: string;
  socialMedia: SocialMedia;
  industry: string;
  location: string;
}
