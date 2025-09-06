import type { IconName } from 'consts/icons';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactFormValidation {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
}

export interface EmailJSResponse {
  status: number;
  text: string;
}

export interface FormState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

// tipado para los datos de atencion de la sección de contacto
export interface Contact {
  icon: IconName;
  label: string;
  description: string;
}
