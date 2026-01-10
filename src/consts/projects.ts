const path = (name: string) => {
  const pathProject = '/images/projects/';
  return `${pathProject}${name}.webp`;
};

export const PROJECTS_STATIC = [
  {
    order: 1,
    type: 'desarrollo',
    title: 'sistema para pre-matrícula',
    description:
      'Sistema para proceso de pre-matrícula de un establecimiento educacional de Linares.',
    imageSrc: path('sistema-prematricula'),
    imageAlt: 'Imagen que presenta en diferentes dispositivos, la página web de pre-matrícula',
    customer: 'Liceo Valentín Letelier Madariaga',
  },
  {
    order: 2,
    type: 'desarrollo',
    title: 'sistema alerta temprana',
    description:
      'Sistema de alerta temprana, para la identificacion de estudiantes con riesgo de descerción.',
    imageSrc: path('sistema-alerta-temprana'),
    imageAlt: 'Imagen que presenta en diferentes dispositivos, el sistema de alerta temprana',
    customer: 'CFT del Maule',
  },
  {
    order: 3,
    type: 'servicio',
    title: 'migracion servicio hosting',
    description:
      'Migración y configuración de los servicios de hosting, que incluyen; Página web y correos corporativos.',
    imageSrc: path('migracion-hosting'),
    imageAlt: 'Imagen relacionada con el proceso de migración se servicios de hosting',
    customer: 'Constructora BYA Ltda.',
  },
] as const;
