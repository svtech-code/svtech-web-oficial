export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  url?: string;
  github?: string;
  feature: boolean;
  content: string;
}
