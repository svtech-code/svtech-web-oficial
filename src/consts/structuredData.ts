export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: 'SV Tech',
      alternateName: 'SVTech',
      '@id': 'https://svtech.cl/#localbusiness',
      url: 'https://svtech.cl',
      telephone: '+56987933282',
      email: 'contacto@svtech.cl',
      priceRange: '$$',
      slogan: 'Transformando ideas en realidades digitales',
      description:
        'Servicios de soporte informático, mantenimiento de equipos y desarrollo web a medida para empresas en Chile.',
      image: 'https://svtech.cl/og.png',
      logo: {
        '@type': 'ImageObject',
        url: 'https://svtech.cl/favicon.svg',
      },
      sameAs: [
        'https://twitter.com/svtech_code',
        'https://www.instagram.com/svtech_code/',
        'https://discord.gg/DUhM8uc3HM',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Linares',
        addressRegion: 'Maule',
        addressCountry: 'CL',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Chile',
      },
      availableLanguage: ['Spanish'],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '14:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '15:00',
          closes: '20:00',
        },
      ],
      knowsAbout: [
        'Soporte Informático',
        'Desarrollo Web',
        'Consultoría TI',
        'Administración de Hosting',
        'Bases de Datos',
        'Google Apps Script',
        'Google Sheets',
        'Automatización de procesos',
        'React',
        'Astro',
        'PHP',
        'PostgreSQL',
        'TailwindCSS',
        'Administración de servidores y correo corporativo',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de SV Tech',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Soporte Informático',
              url: 'https://svtech.cl/services/soporte-informatico',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Desarrollo web',
              url: 'https://svtech.cl/services/desarrollo-web',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Consultoría TI',
              url: 'https://svtech.cl/services/consultoria-ti',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Administración Hosting',
              url: 'https://svtech.cl/services/administracion-hosting',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Base de Datos',
              url: 'https://svtech.cl/services/base-datos',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Soporte Personalizado',
              url: 'https://svtech.cl/services/soporte-personalizado',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://svtech.cl/#website',
      url: 'https://svtech.cl',
      name: 'SV Tech',
      inLanguage: 'es-CL',
      publisher: {
        '@id': 'https://svtech.cl/#localbusiness',
      },
    },
  ],
};
