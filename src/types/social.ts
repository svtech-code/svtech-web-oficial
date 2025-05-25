type SocialId = 'x' | 'instagram' | 'whatsApp' | 'linkedin' | 'discord' | 'email';
type SocialName = 'X' | 'Instagram' | 'WhatsApp' | 'LinkedIn' | 'Discord' | 'Email';

export interface Social {
  id: SocialId;
  name: SocialName;
  url: string;
  label: string;
  followers?: string;
  icon: any;
}
