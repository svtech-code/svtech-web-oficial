export interface Service {
  id: string;
  title: string;
  description: string;
  icon: {
    svg: any;
  };
  features: string[];
  featured: boolean;
  content: string;
}
