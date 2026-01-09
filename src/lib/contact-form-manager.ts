import type { ContactFormData, FormState } from '../types/contact';
import { validateField, sendContactForm } from './emailjs-client';
import { TurnstileManager } from './turnstile-manager';
import { ModalManager } from './modal-manager';

/**
 * Gestiona el formulario de contacto con validación, envío y manejo de errores.
 * Responsabilidad: Coordinar validación en tiempo real, integración con Turnstile,
 * manejo de estados de carga y mostrar feedback visual al usuario.
 */
export class ContactFormManager {
  private form: HTMLFormElement;
  private submitBtn: HTMLButtonElement;
  private modalManager: ModalManager;
  private turnstileManager: TurnstileManager;

  private formState: FormState = {
    isLoading: false,
    isSuccess: false,
    error: null,
  };

  private currentFormData: ContactFormData | null = null;
  private fieldErrors: Record<string, string> = {};

  // Elementos del formulario
  private nameInput: HTMLInputElement;
  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;
  private messageTextarea: HTMLTextAreaElement;

  /**
   * Inicializa el gestor del formulario de contacto
   * @param formSelector - Selector CSS del formulario (por defecto '#contact-form')
   */
  constructor(formSelector: string = '#contact-form') {
    const form = document.querySelector(formSelector) as HTMLFormElement;
    const submitBtn = document.querySelector('#submit-btn') as HTMLButtonElement;

    if (!form || !submitBtn) {
      throw new Error('Elementos del formulario no encontrados');
    }

    this.form = form;
    this.submitBtn = submitBtn;
    this.modalManager = new ModalManager();
    this.turnstileManager = new TurnstileManager();

    // Obtener elementos del formulario
    this.nameInput = document.querySelector('#name') as HTMLInputElement;
    this.emailInput = document.querySelector('#email') as HTMLInputElement;
    this.phoneInput = document.querySelector('#phone') as HTMLInputElement;
    this.messageTextarea = document.querySelector('#message') as HTMLTextAreaElement;

    this.initialize();
  }

  /**
   * Inicializa los event listeners, validación y carga de Turnstile
   */
  private initialize(): void {
    this.setupEventListeners();
    this.setupFieldValidation();
    this.initializeTurnstile();
  }

  /**
   * Carga Turnstile de forma lazy después de 2 segundos o al interactuar con el formulario
   */
  private initializeTurnstile(): void {
    // Cargar Turnstile después de 2 segundos O cuando el usuario interactúe
    setTimeout(() => this.turnstileManager.loadOnDemand(), 2000);
    this.form.addEventListener('focusin', () => this.turnstileManager.loadOnDemand(), {
      once: true,
    });
    this.form.addEventListener('click', () => this.turnstileManager.loadOnDemand(), { once: true });
  }

  /**
   * Configura event listeners para submit del formulario y modal
   */
  private setupEventListeners(): void {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.modalManager.setupEventListeners(
      this.handleRetry.bind(this),
      this.handleCancel.bind(this),
    );
  }

  /**
   * Configura validación en tiempo real para todos los campos del formulario
   */
  private setupFieldValidation(): void {
    // Validación al perder el foco (onBlur)
    this.nameInput?.addEventListener('blur', (e) => {
      const target = e.target as HTMLInputElement;
      this.validateSingleField('name', target.value);
    });

    this.emailInput?.addEventListener('blur', (e) => {
      const target = e.target as HTMLInputElement;
      this.validateSingleField('email', target.value);
    });

    this.phoneInput?.addEventListener('blur', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.value.trim()) {
        this.validateSingleField('phone', target.value);
      } else {
        this.clearFieldError('phone');
      }
    });

    this.messageTextarea?.addEventListener('blur', (e) => {
      const target = e.target as HTMLTextAreaElement;
      this.validateSingleField('message', target.value);
    });

    // Limpiar errores al empezar a escribir (onInput)
    this.nameInput?.addEventListener('input', () => this.clearFieldError('name'));
    this.emailInput?.addEventListener('input', () => this.clearFieldError('email'));
    this.phoneInput?.addEventListener('input', () => this.clearFieldError('phone'));
    this.messageTextarea?.addEventListener('input', () => this.clearFieldError('message'));
  }

  /**
   * Maneja el envío del formulario con validación completa y verificación Turnstile
   * @param e - Evento de submit del formulario
   */
  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const formData = new FormData(this.form);
    const contactData: ContactFormData = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    };

    // Validar todos los campos
    let isValid = true;
    isValid = this.validateSingleField('name', contactData.name) && isValid;
    isValid = this.validateSingleField('email', contactData.email) && isValid;
    isValid = this.validateSingleField('message', contactData.message) && isValid;

    // Validar teléfono solo si tiene contenido
    if (contactData.phone && contactData.phone.trim()) {
      isValid = this.validateSingleField('phone', contactData.phone) && isValid;
    }

    // Validar Turnstile
    const turnstileToken = this.turnstileManager.getToken();
    if (!turnstileToken) {
      this.modalManager.show('error', 'Por favor completa la verificación de seguridad');
      return;
    }

    if (!isValid) {
      this.scrollToFirstError();
      return;
    }

    // Guardar datos para posible reintento
    this.currentFormData = contactData;

    // Manejar envío
    await this.handleFormSubmit(contactData, turnstileToken);
  }

  /**
   * Envía los datos del formulario a través de EmailJS con manejo de estados
   * @param contactData - Datos del formulario validados
   * @param turnstileToken - Token de verificación Turnstile
   */
  private async handleFormSubmit(
    contactData: ContactFormData,
    turnstileToken: string,
  ): Promise<void> {
    // Mostrar modal en loading inmediatamente
    this.modalManager.show('loading');

    // Deshabilitar botón y cambiar estado
    this.setFormState({ isLoading: true, isSuccess: false, error: null });
    this.updateSubmitButton();

    try {
      // Enviar formulario con token de Turnstile
      await sendContactForm(contactData, turnstileToken);

      // Éxito: cambiar a estado success
      this.setFormState({ isLoading: false, isSuccess: true, error: null });
      this.modalManager.show('success');
      this.resetForm();
    } catch (error) {
      // Error: cambiar a estado error
      const errorMsg =
        error instanceof Error
          ? error.message
          : 'Hubo un error al enviar el mensaje. Inténtalo nuevamente.';

      this.setFormState({
        isLoading: false,
        isSuccess: false,
        error: errorMsg,
      });
      this.modalManager.show('error', errorMsg);
      this.turnstileManager.reset();
    }

    this.updateSubmitButton();
  }

  /**
   * Reintenta el envío del formulario con los datos previamente capturados
   */
  private handleRetry(): void {
    if (this.currentFormData) {
      const turnstileToken = this.turnstileManager.getToken();
      if (turnstileToken) {
        this.handleFormSubmit(this.currentFormData, turnstileToken);
      } else {
        this.modalManager.show(
          'error',
          'Por favor completa la verificación de seguridad nuevamente',
        );
      }
    }
  }

  /**
   * Cancela la operación actual y resetea el estado del formulario
   */
  private handleCancel(): void {
    this.modalManager.hide();
    this.setFormState({ isLoading: false, isSuccess: false, error: null });
    this.updateSubmitButton();
    this.currentFormData = null;
  }

  /**
   * Limpia completamente el formulario y resetea todos los errores
   */
  private resetForm(): void {
    this.form.reset();
    this.fieldErrors = {};
    ['name', 'email', 'phone', 'message'].forEach((field) => this.updateFieldDisplay(field));
    this.turnstileManager.reset();
  }

  /**
   * Valida un campo individual del formulario
   * @param fieldName - Nombre del campo a validar
   * @param value - Valor del campo
   */
  private validateSingleField(fieldName: keyof ContactFormData, value: string): boolean {
    const error = validateField(fieldName, value);
    if (error) {
      this.showFieldError(fieldName, error);
      return false;
    } else {
      this.clearFieldError(fieldName);
      return true;
    }
  }

  /**
   * Muestra un mensaje de error para un campo específico
   * @param fieldName - Nombre del campo
   * @param errorMsg - Mensaje de error a mostrar
   */
  private showFieldError(fieldName: string, errorMsg: string): void {
    this.fieldErrors[fieldName] = errorMsg;
    this.updateFieldDisplay(fieldName);
  }

  /**
   * Limpia el error de un campo específico
   * @param fieldName - Nombre del campo a limpiar
   */
  private clearFieldError(fieldName: string): void {
    delete this.fieldErrors[fieldName];
    this.updateFieldDisplay(fieldName);
  }

  /**
   * Actualiza la visualización de un campo (error/normal) en el DOM
   * @param fieldName - Nombre del campo a actualizar
   */
  private updateFieldDisplay(fieldName: string): void {
    const fieldElement = document.querySelector(`#${fieldName}`) as
      | HTMLInputElement
      | HTMLTextAreaElement;
    const fieldContainer = fieldElement?.closest('.space-y-2');

    if (!fieldElement || !fieldContainer) return;

    // Remover error previo
    const existingError = fieldContainer.querySelector('.field-error-message');
    existingError?.remove();

    if (this.fieldErrors[fieldName]) {
      this.updateFieldState(fieldElement, true);

      // Crear mensaje de error
      const errorElement = document.createElement('p');
      errorElement.className = 'mt-1 text-sm text-red-600 flex items-center field-error-message';
      errorElement.innerHTML = `
        <svg class="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        ${this.fieldErrors[fieldName]}
      `;

      fieldContainer.appendChild(errorElement);
    } else {
      this.updateFieldState(fieldElement, false);
    }
  }

  /**
   * Cambia el estado visual de un campo (normal/error)
   * @param fieldElement - Elemento del campo a actualizar
   * @param hasError - Si el campo tiene error
   */
  private updateFieldState(fieldElement: HTMLElement, hasError: boolean): void {
    requestAnimationFrame(() => {
      if (hasError) {
        fieldElement.className = fieldElement.className
          .replace(/border-primary|focus:ring-primary/g, '')
          .concat(' border-red-500 focus:ring-red-500')
          .replace(/\s+/g, ' ')
          .trim();
      } else {
        fieldElement.className = fieldElement.className
          .replace(/border-red-500|focus:ring-red-500/g, '')
          .concat(' border-primary focus:ring-primary')
          .replace(/\s+/g, ' ')
          .trim();
      }
    });
  }

  /**
   * Hace scroll suave hasta el primer campo con error
   */
  private scrollToFirstError(): void {
    requestAnimationFrame(() => {
      const firstErrorField = document.querySelector('.border-red-500') as HTMLElement;
      if (firstErrorField) {
        firstErrorField.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    });
  }

  /**
   * Actualiza el estado visual del botón de envío (loading/normal)
   */
  private updateSubmitButton(): void {
    if (this.submitBtn) {
      this.submitBtn.disabled = this.formState.isLoading;

      if (this.formState.isLoading) {
        this.submitBtn.innerHTML = `
          <span class="flex items-center justify-center">
            <svg class="-ml-1 mr-3 h-5 w-5 animate-spin text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </span>
        `;
      } else {
        this.submitBtn.innerHTML = '<span>Enviar mensaje</span>';
      }
    }
  }

  /**
   * Actualiza el estado interno del formulario
   * @param newState - Nuevo estado parcial a aplicar
   */
  private setFormState(newState: Partial<FormState>): void {
    this.formState = { ...this.formState, ...newState };
  }
}
