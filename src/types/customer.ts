export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Customer {
  id: string;
  name: string;
  shortName: string;
  description: string;
  fullDescription: string;
  logo: {
    svg: any;
  };
  url: string;
  socialMedia: SocialMedia;
  industry: string;
  location: string;
}
