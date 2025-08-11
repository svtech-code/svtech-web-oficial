import type { Customer } from 'types/customer';

export const CUSTOMERS: Customer[] = [
  {
    id: 'customer-01',
    name: 'Constructora BYA Ltda.',
    shortName: 'Constructora BYA',
    description:
      'Empresa especializada en obras de infraestructura como carreteras y vías férreas, entre otros.',
    industry: 'Construcción',
    location: 'Valparaíso, Chile',
    socialMedia: {
      website: 'https://www.construbya.cl',
    },
  },
  {
    id: 'customer-02',
    name: 'Servicios Médicos Gesmedic Limitada',
    shortName: 'Gesmedic',
    description:
      'Empresa vinculada al comercio y distribución de insumos médicos, telemedicina, consultoría y acreditación.',
    industry: 'Salud',
    location: 'Maule, Chile',
    socialMedia: {
      website: 'https://www.gesmedic.cl',
    },
  },
  {
    id: 'customer-03',
    name: 'Servicios médicos domiciliarios SAMED',
    shortName: 'SAMED',
    description: 'Empresa Chilena dedicada al rubro de servicios médicos domiciliarios.',
    industry: 'Telemedicina',
    location: 'Maule y Metropolitana, Chile',
    socialMedia: {
      website: 'https://www.samed.cl',
      whatsApp: 'https://wa.me/56991088675',
    },
  },
  {
    id: 'customer-04',
    name: 'Pro Car Automotriz',
    shortName: 'Pro Car Automotriz',
    description:
      'Taller mecánico especializado en mantenimiento y reparación de vehículos de diferentes marcas.',
    industry: 'Mecánica Automotriz',
    location: 'Maule, Chile',
    socialMedia: {
      whatsApp: 'https://wa.me/56996983055',
    },
  },
  {
    id: 'customer-05',
    name: 'Senderismo Linares',
    shortName: 'Senderismo Linares',
    description:
      'Empresa de turismo aventura especializada en senderismo y actividades outdoor para toda la familia en la región del Maule.',
    industry: 'Turismo',
    location: 'Maule, Chile',
    socialMedia: {
      instagram: 'https://www.instagram.com/senderismolinares/',
      facebook: 'https://www.facebook.com/100063594189647',
    },
  },
  {
    id: 'customer-06',
    name: 'FEEM Feria Empresarial',
    shortName: 'FEEM',
    description:
      'Feria impulsada por jóvenes profesionales de Linares, que buscan impulsar el emprendimiento en la región del Maule.',
    industry: 'Eventos',
    location: 'Maule, Chile',
    socialMedia: {
      website: 'https://www.feem.cl',
      instagram: 'https://www.instagram.com/feem_feria_empresarial_/',
    },
  },
];
