import type { ContactFormData, EmailJSResponse, ContactFormValidation } from '../types/contact';

// Configuración EmailJS desde variables de entorno
const EMAILJS_CONFIG = {
  publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY,
  serviceId: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
};

// Variable para controlar si EmailJS ya se cargó
let emailjsInstance: any = null;

/**
 * Sanitiza una cadena de texto para prevenir XSS y caracteres peligrosos
 */
function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>]/g, '') // Eliminar < y > para prevenir HTML injection
    .replace(/['"]/g, '') // Eliminar comillas para prevenir SQL injection
    .replace(/javascript:/gi, '') // Eliminar javascript: protocolo
    .replace(/on\w+=/gi, '') // Eliminar event handlers
    .slice(0, 1000); // Limitar longitud máxima
}

/**
 * Verifica el token de Turnstile con el servidor
 */
async function verifyTurnstile(token: string): Promise<boolean> {
  try {
    const response = await fetch('/api/verify-turnstile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error verificando Turnstile:', error);
    return false;
  }
}

/**
 * Valida un campo específico del formulario
 */
export function validateField(fieldName: keyof ContactFormData, value: string): string | null {
  const sanitizedValue = sanitizeString(value);

  switch (fieldName) {
    case 'name':
      if (!sanitizedValue) {
        return 'El nombre es requerido';
      }
      if (sanitizedValue.length < 2) {
        return 'El nombre debe tener al menos 2 caracteres';
      }
      if (sanitizedValue.length > 100) {
        return 'El nombre no puede exceder 100 caracteres';
      }
      if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(sanitizedValue)) {
        return 'El nombre solo puede contener letras y espacios';
      }
      break;

    case 'email':
      if (!sanitizedValue) {
        return 'El email es requerido';
      }
      if (sanitizedValue.length > 320) {
        return 'El email no puede exceder 320 caracteres';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedValue)) {
        return 'Por favor ingresa un email válido';
      }
      break;

    case 'phone':
      // El teléfono es opcional
      if (sanitizedValue && sanitizedValue.length > 0) {
        if (sanitizedValue.length > 20) {
          return 'El teléfono no puede exceder 20 caracteres';
        }
        if (!/^[+\d\s\-()]+$/.test(sanitizedValue)) {
          return 'El teléfono contiene caracteres no válidos';
        }
      }
      break;

    case 'message':
      if (!sanitizedValue) {
        return 'El mensaje es requerido';
      }
      if (sanitizedValue.length < 10) {
        return 'El mensaje debe tener al menos 10 caracteres';
      }
      if (sanitizedValue.length > 2000) {
        return 'El mensaje no puede exceder 2000 caracteres';
      }
      break;

    default:
      return null;
  }

  return null;
}

/**
 * Carga EmailJS de forma lazy (solo cuando se necesita)
 */
async function loadEmailJS(): Promise<any> {
  if (emailjsInstance) return emailjsInstance;

  try {
    // @ts-ignore: Import dinámico desde CDN
    const emailjs = await import('https://cdn.skypack.dev/@emailjs/browser');
    emailjs.default.init(EMAILJS_CONFIG.publicKey);
    emailjsInstance = emailjs.default;
    return emailjsInstance;
  } catch (error) {
    throw new Error('Error al cargar EmailJS');
  }
}

/**
 * Valida los datos del formulario completo
 */
export function validateContactForm(data: ContactFormData): ContactFormValidation {
  const errors: ContactFormValidation['errors'] = {};

  // Validar cada campo usando la validación individual
  const nameError = validateField('name', data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateField('email', data.email);
  if (emailError) errors.email = emailError;

  const messageError = validateField('message', data.message);
  if (messageError) errors.message = messageError;

  // El teléfono es opcional, solo validar si tiene contenido
  if (data.phone && data.phone.trim()) {
    const phoneError = validateField('phone', data.phone);
    if (phoneError) errors.phone = phoneError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitiza todos los datos del formulario antes del envío
 */
function sanitizeContactFormData(data: ContactFormData): ContactFormData {
  return {
    name: sanitizeString(data.name),
    email: sanitizeString(data.email),
    phone: data.phone ? sanitizeString(data.phone) : '',
    message: sanitizeString(data.message),
  };
}

/**
 * Envía el formulario de contacto via EmailJS
 */
export async function sendContactForm(
  data: ContactFormData,
  turnstileToken?: string,
): Promise<EmailJSResponse> {
  // Verificar Turnstile primero si se proporciona token
  if (turnstileToken) {
    const isValidToken = await verifyTurnstile(turnstileToken);
    if (!isValidToken) {
      throw new Error('Verificación de seguridad fallida. Por favor, inténtalo nuevamente.');
    }
  }

  // Sanitizar datos antes del envío
  const sanitizedData = sanitizeContactFormData(data);

  // Validar datos sanitizados
  const validation = validateContactForm(sanitizedData);
  if (!validation.isValid) {
    throw new Error('Los datos del formulario no son válidos');
  }

  const emailjs = await loadEmailJS();

  try {
    const response = await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
      from_name: sanitizedData.name,
      from_email: sanitizedData.email,
      phone: sanitizedData.phone || 'No proporcionado',
      message: sanitizedData.message,
      to_name: 'SV Tech',
    });

    return response;
  } catch (error) {
    throw new Error('Error al enviar el mensaje');
  }
}
