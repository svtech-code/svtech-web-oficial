import type { Service } from 'types/service';

import SoporteInformatico from "assets/services/soporte-informatico.svg";
import DesarrolloWeb from "assets/services/desarrollo-web.svg";
import ConsultoriaTi from "assets/services/consultoria-ti.svg";
import AdministracionHosting from "assets/services/administracion-hosting.svg";
import BaseDatos from "assets/services/base-datos.svg";
import SoportePersonalizado from "assets/services/soporte-personalizado.svg";

export const SERVICE: Service[] = [
  {
    id: 'soporte-informatico',
    title: 'Soporte informático',
    description:
      'Mantenimiento preventivo y correctivo de equipos informáticos, servidores y sistemas operativos.',
    icon: {
      svg: SoporteInformatico,
      width: 50,
      height: 50,
    },
    features: ['Mantenimiento preventivo y correctivo'],
    featured: false,
    content: '',
  },
  {
    id: 'desarrollo-web',
    title: 'Desarrollor web',
    description:
      'Creación de sistemas web y landing page modernas, flexibles, escalables y responsivas.',
    icon: {
      svg: DesarrolloWeb,
      width: 50,
      height: 50,
    },
    features: ['Diseño UX/UI', 'aplicaciones web', 'responsive designe'],
    featured: false,
    content: '',
  },
  {
    id: 'consultoria-ti',
    title: 'Consultoría TI',
    description:
      'Asesoramiento tecnológico para mejorar y optimizar procesos y recursos de tu empresa o emprendimiento.',
    icon: {
      svg: ConsultoriaTi,
      width: 50,
      height: 50,
    },
    features: ['Sistemas', 'Equipos', 'Seguridad'],
    featured: false,
    content: '',
  },
  {
    id: 'administracion-hosting',
    title: 'Administración hosting',
    description:
      'Administración, configuración mantenimiento o migración de servicio de alojamiento web.',
    icon: {
      svg: AdministracionHosting,
      width: 50,
      height: 50,
    },
    features: [],
    featured: false,
    content: '',
  },
  {
    id: 'base-datos',
    title: 'Base datos',
    description:
      'Diseño, implementación y mantenimiento de bases de datos relacionales, para cualquier tipo de negocio.',
    icon: {
      svg: BaseDatos,
      width: 50,
      height: 50,
    },
    features: ["seguridad", "disponibilidad", "integridad"],
    featured: false,
    content: '',
  },
  {
    id: 'soporte-personalizado',
    title: 'Soporte personalizado',
    description:
      'Asesoramiento tecnológico para mejorar y optimizar procesos y recursos de tu empresa o emprendimiento.',
    icon: {
      svg: SoportePersonalizado,
      width: 50,
      height: 50,
    },
    features: ["Continuidad", "Responsabilidad", "Acompañamiento"],
    featured: false,
    content: '',
  },
];
