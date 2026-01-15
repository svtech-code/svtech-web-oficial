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
    imageSrc: path('sistema-prematricula-lvl'),
    imageAlt: 'Imagen que presenta en diferentes dispositivos, la página web de pre-matrícula',
    customer: 'Liceo Valentín Letelier Madariaga',
    fullDescription:
      'Desarrollo FullStack de un sistema web para la gestión del proceso de pre-matrícula en un establecimiento educacional. La plataforma permite a los apoderados(as) y/o estudiantes, registrar los datos requeridos para el proceso de matrícula del establecimiento, reduciendo significativamente los tiempos de espera y mejorando la experiencia durante el proceso de matrícula.',
    technologies: ['postgreSQL', 'PHP', 'ReactJS', 'Axios', 'Zustand'],
    status: 'completado',
    duration: '2 meses',
    features: [
      'Formulario de registro estudiantil intuitivo',
      'Validación de datos existentes',
      'Diseño responsive optimizado',
      'Notificaciones automáticas por e-mail',
    ],
    challenges: [
      'Integración con sistema académico existente',
      'Optimización para alta concurrencia durante períodos de matrícula',
      'Envío de notificaciones por Mail con link para descarga de documentos oficiales',
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
      'Asesoría servicios informáticos en ofimática, diseño, gestión de correo y sistemas web.',
    imageSrc: path('asesoria-mecanica-vasquez'),
    imageAlt: 'Imagen que presenta asesoría en servicios informáticos',
    customer: 'Mecánica Vásquez',
    fullDescription:
      'Asesoría de servicios informáticos, en donde, se proporcionó la creación y configuración de cuentas de correo, diseño e implementación de órdenes de trabajo, asesoría en uso y desarrollo de sistemas web.',
    status: 'completado',
    duration: '2 semanas',
    features: [
      'Creación y configuración de correo',
      'Disñeo de Órdenes de trabajo',
      'Diseño de logo de la marca',
    ],
    challenges: [
      'Integración de diseños con imagen de la marca',
      'Integrar diseño de documentos con requerimientos de la empresa',
    ],
    // links: {
    //   website: 'https://matricula.lvl.cl', // ver agregar demo
    //   demo: 'https://matricula.lvl.cl', // ver agregar demo
    //   github: 'https://github.com/svtech-code/front_matricula_lvl',
    // },
  },
  {
    order: 3,
    type: 'desarrollo',
    title: 'sistema alerta temprana',
    description:
      'Sistema de alerta temprana, para la identificación de estudiantes con riesgo de deserción.',
    imageSrc: path('sistema-alerta-temprana-cft'),
    imageAlt: 'Imagen que presenta en diferentes dispositivos, el sistema de alerta temprana',
    customer: customerName('CFT Maule'),
    fullDescription:
      'Participación como desarrollador FrontEnd, en sistema de alerta temprana, para una institución educacional Técnico Profesional de la Región del Maule. Sistema empleado para la detección y acompañamiento de estudiantes que presentan riesgo de desepción escolar, el cual, efectúa su cálculo, con base en indicadores de riesgos predefinidos por la institución.',
    technologies: ['ReactJS', 'Axios', 'CriptoJS', 'TailwindCSS', 'Clean Arquitecture'],
    status: 'completado',
    duration: '6 meses',
    features: [
      'Control de acceso por cuenta de usuario y tipo de privilegio',
      'Dashboard interactivo en tiempo real',
      'Tablas de datos con filtros de búsqueda y selección',
      'Integración con fuentes de datos externas',
      'Descarga de reportes CSV/PDF',
    ],
    challenges: [
      'Integración de gráficos interactivos',
      'Aplicación de técnicas de seguridad del lado del cliente',
      'Implementación de notificaciones por usuario',
      'Integración con diferentes fuentes de datos',
    ],
    // links: {
    //   website: 'https://matricula.lvl.cl', // ver agregar demo
    //   demo: 'https://matricula.lvl.cl', // ver agregar demo
    //   github: 'https://github.com/svtech-code/front_matricula_lvl',
    // },
  },
  {
    order: 4,
    type: 'servicio',
    title: 'migración servicio hosting',
    description:
      'Migración y configuración de los servicios de hosting, que incluyen; Página web y correos corporativos.',
    imageSrc: path('migracion-hosting-bya'),
    imageAlt: 'Imagen relacionada con el proceso de migración de servicios de hosting',
    customer: customerName('Constructora BYA'),
    fullDescription:
      'Proceso completo de migración de infraestructura digital desde un proveedor anterior hacia una nueva plataforma optimizada. Incluye transferencia segura de datos, configuración de servidores, migración de correos corporativos y optimización de rendimiento.',
    status: 'completado',
    duration: '1 Semana',
    features: [
      'Migración sin tiempo de inactividad',
      'Configuración de certificados SSL',
      'Configuración de correos corporativos',
      'Backup automático implementado',
    ],
    challenges: [
      'Migración sin pérdida de datos',
      'Minimización del downtime durante la transición',
      'Configuración de DNS y propagación',
      'Compatibilidad entre sistemas antiguos y nuevos',
    ],
  },
  {
    order: 5,
    type: 'desarrollo',
    title: 'plantilla Google Sheet automatizada',
    description:
      'Plantilla diseñada en Google Sheet, con automatizaciones programadas en App Script y funciones avanzadas.',
    imageSrc: path('plantilla-samed'),
    imageAlt: 'Imagen que muestra plantillas de Google Sheets y código App Script',
    customer: customerName('SAMED'),
    fullDescription:
      'Diseño y desarrollo de plantilla en Google Sheets, que implementa programación de funcionalidades en App Script y funciones avanzadas de búsqueda mediante queries. Para ser utilizada en el registro y control de venta de planes de telemedicina y su respectivo uso de servicios por plan contratado.',
    technologies: ['App Script'],
    status: 'completado',
    duration: '1 mes',
    features: [
      'Registro de clientes',
      'Dashboard con venta de planes de telemedicina',
      'Registro de contratación de planes',
      'Gestión de uso de servicios del plan contratado',
      'Registro y control de pagos con alerta',
    ],
    challenges: [
      'Registro seguro de información',
      'Conexión entre los datos ingresados',
      'Consultas avanzadas mediante query',
      'Alertas mediante fechas establecidas',
    ],
  },
] as const;
