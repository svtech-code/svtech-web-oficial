export interface FaqItem {
  question: string;
  answer: string;
}

export const QR_FAQ_ITEMS: FaqItem[] = [
  {
    question: '¿Los códigos QR creados en esta herramienta tienen fecha de vencimiento?',
    answer:
      'No. Todos los códigos generados aquí son 100% estáticos: la dirección web, el contacto de WhatsApp o las credenciales Wi-Fi se codifican directamente dentro del dibujo del QR. No pasan por servidores intermedios de SV Tech ni tienen límite de escaneos; funcionarán para siempre mientras el enlace de destino siga activo.',
  },
  {
    question: '¿Es seguro ingresar la contraseña del Wi-Fi de mi local o empresa?',
    answer:
      'Totalmente seguro. La herramienta funciona íntegramente en la memoria de tu propio navegador (Client-Side). Ni las contraseñas Wi-Fi, ni los números de teléfono, ni el logotipo que cargas desde tu dispositivo se envían por internet ni se guardan en bases de datos.',
  },
  {
    question: '¿Qué diferencia hay entre descargar en formato PNG y formato SVG?',
    answer:
      'El formato PNG (1000×1000 píxeles) es ideal para compartir en digital: historias de Instagram, documentos Word/PDF, firmas de correo o pantallas. El formato SVG es un archivo vectorial matemático que puedes ampliar a cualquier tamaño (tarjetas de presentación, adhesivos de mesa, pendones o gigantografías) en imprenta o Illustrator sin que se pixele jamás.',
  },
  {
    question: '¿Por qué el código QR sigue funcionando aunque le ponga mi logo en el centro?',
    answer:
      'Configuramos el motor gráfico con el nivel máximo de corrección de errores Reed-Solomon (Nivel H), que permite recuperar hasta un 30% de la matriz. Además, nuestra herramienta oculta automáticamente los módulos detrás de tu logotipo y calibra su proporción al 28% con margen de seguridad para que cualquier cámara de iPhone o Android lo escanee en menos de un segundo.',
  },
  {
    question: '¿Puedo cambiar el enlace de un código QR estático después de imprimirlo?',
    answer:
      'En un código QR estático la dirección queda grabada directamente en los puntos impresos, por lo que no puede redirigirse a otro dominio una vez impreso. Nuestro consejo profesional para empresas es apuntar el QR hacia una ruta propia bajo tu dominio (por ejemplo, tunegocio.cl/carta o tunegocio.cl/contacto): así puedes actualizar el contenido de esa página web todas las veces que quieras sin volver a imprimir el QR.',
  },
];
