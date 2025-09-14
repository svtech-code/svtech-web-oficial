import type { IconName } from 'consts/icons';

export interface ServiceStatic {
  order: number;
  slug: string;
  title: string;
  description: string;
  iconName: IconName;
}
