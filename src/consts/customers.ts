import type { Customer } from 'types/customer';

import Customer1 from 'assets/customers/customer-01.svg';
import Customer2 from 'assets/customers/customer-02.svg';
import Customer3 from 'assets/customers/customer-03.svg';
import Customer4 from 'assets/customers/customer-04.svg';
import Customer5 from 'assets/customers/customer-05.svg';
import Customer6 from 'assets/customers/customer-06.svg';

export const CUSTOMERS: Customer[] = [
  {
    id: 'customer-01',
    name: 'Constructora BYA Ltda.',
    shortName: 'Constructora BYA',
    description: 'Empresa constructora',
    image: { svg: Customer1 },
    url: 'https.//www.constructorabya.cl',
  },
  {
    id: 'customer-02',
    name: 'Servicios Médicos Gesmedic Limitada',
    shortName: 'Gesmedic',
    description: 'Servicios Médicos',
    image: { svg: Customer2 },
    url: 'https://www.gesmedic.cl',
  },
  {
    id: 'customer-03',
    name: 'Servicios médicos domiciliarios SAMED',
    shortName: 'SAMED',
    description: 'Servicios de telemedicina',
    image: { svg: Customer3 },
    url: 'https://www.samed.cl',
  },
  {
    id: 'customer-04',
    name: 'Pro Car Automotríz',
    shortName: 'Pro Car Automotríz',
    description: 'Taller mecánico automotríz',
    image: { svg: Customer4 },
    url: 'https://wa.me/56987933282',
  },
  {
    id: 'customer-05',
    name: 'Senderismo Linares',
    shortName: 'Senderismo Linares',
    description: 'Viajes familiares y aventuras outdoor',
    image: { svg: Customer5 },
    url: 'link instagram',
  },
  {
    id: 'customer-06',
    name: 'FEEM Feria Emrpesarial',
    shortName: 'FEEM',
    description: 'Feria empresarial y de emprendimientos',
    image: { svg: Customer6 },
    url: 'link instagram',
  },
];
