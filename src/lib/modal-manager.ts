/**
 * Gestiona la visualización y estado de modales para feedback del usuario.
 * Responsabilidad: Controlar estados de carga, éxito y error en modales,
 * manejando la transición entre diferentes contenidos.
 */
export class ModalManager {
  private modal: HTMLDivElement;
  private loadingContent: HTMLDivElement;
  private successContent: HTMLDivElement;
  private errorContent: HTMLDivElement;
  private errorMessage: HTMLParagraphElement;

  // Botones del modal
  private acceptBtn: HTMLButtonElement;
  private retryBtn: HTMLButtonElement;
  private cancelBtn: HTMLButtonElement;

  /**
   * Inicializa el gestor de modal
   * @param modalSelector - Selector CSS del modal (por defecto '#success-modal')
   */
  constructor(modalSelector: string = '#success-modal') {
    this.modal = document.querySelector(modalSelector) as HTMLDivElement;

    if (!this.modal) {
      throw new Error('Modal no encontrado');
    }

    // Elementos del modal
    this.acceptBtn = document.querySelector('#modal-accept-btn') as HTMLButtonElement;
    this.retryBtn = document.querySelector('#modal-retry-btn') as HTMLButtonElement;
    this.cancelBtn = document.querySelector('#modal-cancel-btn') as HTMLButtonElement;

    // Estados del modal
    this.loadingContent = document.querySelector('#loading-content') as HTMLDivElement;
    this.successContent = document.querySelector('#success-content') as HTMLDivElement;
    this.errorContent = document.querySelector('#error-content') as HTMLDivElement;
    this.errorMessage = document.querySelector('#error-message') as HTMLParagraphElement;
  }

  /**
   * Muestra el modal en el estado especificado
   * @param state - Estado del modal ('loading', 'success', 'error')
   * @param message - Mensaje opcional para estado de error
   */
  public show(state: 'loading' | 'success' | 'error', message?: string): void {
    // Actualizar data-state del modal
    this.modal.setAttribute('data-state', state);

    // Ocultar todos los contenidos
    this.loadingContent?.classList.add('hidden');
    this.successContent?.classList.add('hidden');
    this.errorContent?.classList.add('hidden');

    // Mostrar el contenido correspondiente
    switch (state) {
      case 'loading':
        this.loadingContent?.classList.remove('hidden');
        break;
      case 'success':
        this.successContent?.classList.remove('hidden');
        break;
      case 'error':
        this.errorContent?.classList.remove('hidden');
        if (message && this.errorMessage) {
          this.errorMessage.textContent = message;
        }
        break;
    }

    // Mostrar el modal
    this.modal?.classList.remove('hidden');
  }

  /**
   * Oculta el modal
   */
  public hide(): void {
    this.modal?.classList.add('hidden');
  }

  /**
   * Configura los event listeners para los botones del modal
   * @param onRetry - Callback para botón de reintentar
   * @param onCancel - Callback para botón de cancelar
   */
  public setupEventListeners(onRetry: () => void, onCancel: () => void): void {
    // Botón Aceptar (success)
    this.acceptBtn?.addEventListener('click', () => {
      this.hide();
    });

    // Botón Reintentar (error)
    this.retryBtn?.addEventListener('click', () => {
      onRetry();
    });

    // Botón Cancelar (error)
    this.cancelBtn?.addEventListener('click', () => {
      onCancel();
    });
  }
}
