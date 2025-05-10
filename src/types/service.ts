export interface Service {
  id: string;
  title: string;
  description: string;
  icon: {
    svg: any;
    width: number;
    height: number;
  };
  features: string[];
  featured: boolean;
  content: string;
}
