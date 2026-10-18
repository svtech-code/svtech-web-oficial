import type { ServiceSlug } from 'consts/iconsMap';

export interface ServiceStatic {
  order: number;
  slug: string;
  title: string;
  description: string;
  iconName: ServiceSlug;
}
