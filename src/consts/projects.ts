import type { Project } from '../types/projects';
import { CUSTOMERS } from './customers';

const path = (name: string): string => {
  const pathProject = '/images/projects/';
  return `${pathProject}${name}.webp`;
};

const customerName = (name: string): string => {
  const shortName = CUSTOMERS.find((item) => item.shortName === name)?.name || 'N/A';
  return shortName;
};

export const PROJECTS_STATIC: Project[] = [
  {
    order: 1,
    type: 'desarrollo',
    title: 'sistema para pre-matrícula',
    description:
      'Sistema para proceso de pre-matrícula de un establecimiento educacional de Linares.',
    imageSrc: path('sistema-prematricula'),
    imageAlt: 'Imagen que presenta en diferentes dispositivos, la página web de pre-matrícula',
    customer: 'Liceo Valentín Letelier Madariaga',
    fullDescription:
      'Desarrollo FullStack de un sistema web para la gestión del proceso de pre-matrícula en un establecimiento educacional. La plataforma, permite a los apoderados(as) y/o estudiantes, registrar los datos requeridos para el proceso de matrícula del establecimiento, reduciendo significativamente los tiempos de espera y mejorando la experiencia durante el proceso de matrícula.',
    technologies: ['postgreSQL', 'PHP', 'ReactJS', 'Axios', 'Zustand'],
    status: 'completado',
    duration: '2 meses',
    features: [
      'Formulario de registro estudiantil intuitivo',
      'Validación de datos existentes',
      'Diseño responsive optimizado',
      'Notificaciones automáticas por email',
    ],
    challenges: [
      'Integración con sistema académico existente',
      'Optimización para alta concurrencia durante períodos de matrícula',
      'Envio de notificaciones por Mail con link para descarga de documentos oficiales',
    ],
    // links: {
    //   website: 'https://matricula.lvl.cl', // ver agregar demo
    //   demo: 'https://matricula.lvl.cl', // ver agregar demo
    //   github: 'https://github.com/svtech-code/front_matricula_lvl',
    // },
  },
  {
    order: 2,
    type: 'servicio',
    title: 'asesoría en servicios informáticos',
    description:
      'Asesoría en servicios informáticos, considerando ofimática, diseño, gestión de correo y sistemas web.',
    imageSrc: path('sistema-alerta-temprana'),
    imageAlt: 'Imagen que presenta asesoría en servicios informáticos',
    customer: 'Mecánica Vásquez',
    fullDescription:
      'Asesoría en servicios informáticos, en donde, se proporcionó la creación y configuración de cuentas de correo, diseño e implementación de ordenes de trabajo, asesoría en uso y desarrollo de sistemas web.',
    status: 'completado',
    duration: '2 semanas',
    features: [
      'Creación y configuración de correo',
      'Disñeo de Ordenes de trabajo',
      'Diseño de logo de la marca',
    ],
    challenges: [
      'Integración de diseños con imagen de la marca',
      'Integrar disñeo de documentos con requerimientos de la empresa',
    ],
    // links: {
    //   website: 'https://matricula.lvl.cl', // ver agregar demo
    //   demo: 'https://matricula.lvl.cl', // ver agregar demo
    //   github: 'https://github.com/svtech-code/front_matricula_lvl',
    // },
  },
  // {
  //   order: 3,
  //   type: 'desarrollo',
  //   title: 'sistema alerta temprana',
  //   description:
  //     'Sistema de alerta temprana, para la identificacion de estudiantes con riesgo de descerción.',
  //   imageSrc: path('sistema-alerta-temprana'),
  //   imageAlt: 'Imagen que presenta en diferentes dispositivos, el sistema de alerta temprana',
  //   // customer: 'CFT del Maule',
  //   customer: customerName('CFT Maule'),
  //   fullDescription:
  //     'Plataforma de machine learning que analiza patrones de comportamiento estudiantil para identificar tempranamente a estudiantes en riesgo de deserción académica. Utiliza algoritmos predictivos basados en asistencia, calificaciones y otros factores socio-académicos.',
  //   technologies: ['Python', 'Django', 'PostgreSQL', 'Scikit-learn', 'Chart.js', 'Docker'],
  //   status: 'completado',
  //   duration: '4 meses',
  //   features: [
  //     'Algoritmos de machine learning predictivo',
  //     'Dashboard de visualización de datos',
  //     'Sistema de alertas automáticas',
  //     'Análisis de patrones comportamentales',
  //     'Reportes detallados por estudiante',
  //     'Interface para coordinadores académicos',
  //   ],
  //   challenges: [
  //     'Desarrollo de modelos predictivos precisos',
  //     'Procesamiento de grandes volúmenes de datos estudiantiles',
  //     'Implementación de alertas en tiempo real',
  //     'Integración con múltiples fuentes de datos académicos',
  //   ],
  //   // links: {
  //   //   website: 'https://matricula.lvl.cl', // ver agregar demo
  //   //   demo: 'https://matricula.lvl.cl', // ver agregar demo
  //   //   github: 'https://github.com/svtech-code/front_matricula_lvl',
  //   // },
  // },
  // {
  //   order: 4,
  //   type: 'servicio',
  //   title: 'migracion servicio hosting',
  //   description:
  //     'Migración y configuración de los servicios de hosting, que incluyen; Página web y correos corporativos.',
  //   imageSrc: path('migracion-hosting'),
  //   imageAlt: 'Imagen relacionada con el proceso de migración se servicios de hosting',
  //   customer: customerName('Constructora BYA'),
  //   fullDescription:
  //     'Proceso completo de migración de infraestructura digital desde un proveedor anterior hacia una nueva plataforma optimizada. Incluye transferencia segura de datos, configuración de servidores, migración de correos corporativos y optimización de rendimiento.',
  //   status: 'completado',
  //   duration: '1 Semana',
  //   features: [
  //     'Migración sin tiempo de inactividad',
  //     'Configuración de certificados SSL',
  //     'Optimización de bases de datos',
  //     'Configuración de correos corporativos',
  //     'Backup automático implementado',
  //     'Monitoreo de rendimiento 24/7',
  //   ],
  //   challenges: [
  //     'Migración sin pérdida de datos',
  //     'Minimización del downtime durante la transición',
  //     'Configuración de DNS y propagación',
  //     'Compatibilidad entre sistemas antiguos y nuevos',
  //   ],
  // },
] as const;
