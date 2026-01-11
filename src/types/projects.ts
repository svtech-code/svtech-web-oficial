interface Links {
  demo?: string;
  github?: string;
  website?: string;
}

type TypeProject = 'desarrollo' | 'servicio';

type StatusProject = 'completado' | 'en-progreso' | 'mantenimiento';

export interface Project {
  order: number;
  type: TypeProject;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  customer: string;
  // Información extendida para el modal
  fullDescription?: string;
  technologies?: string[];
  status?: StatusProject;
  duration?: string;
  links?: Links;
  features?: string[];
  challenges?: string[];
}

export interface ProjectModalData {
  project: Project;
  isVisible: boolean;
}
