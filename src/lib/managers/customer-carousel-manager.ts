import { CUSTOMERS } from 'consts/customers';
import { CustomerDetailManager } from './customer-detail-manager';

/**
 * Mejora progresivamente el carrusel de clientes renderizado en el servidor.
 * Responsabilidad: duplicar la pista para el bucle continuo (copia decorativa),
 * activar la animación marquee, manejar clicks y limpiar recursos.
 */
export class CustomerCarouselManager {
  private container: HTMLElement;
  private customerDetailManager: CustomerDetailManager;
  private marquee: HTMLElement | null = null;
  private cleanupTasks: (() => void)[] = [];
  private isDestroyed: boolean = false;

  /**
   * Inicializa el gestor del carrusel de clientes
   * @param selectorOrElement - Selector CSS o elemento HTML del contenedor
   */
  constructor(selectorOrElement: string | HTMLElement = '#customers-carousel') {
    // Soporte para selector string o elemento directo
    this.container =
      typeof selectorOrElement === 'string'
        ? document.querySelector<HTMLElement>(selectorOrElement)!
        : selectorOrElement;

    if (!this.container) {
      throw new Error('Customer carousel container not found');
    }

    this.customerDetailManager = new CustomerDetailManager();
    this.initialize();
  }

  /**
   * Inicializa el carrusel duplicando la pista, activando la animación y eventos
   */
  private initialize(): void {
    this.duplicateTrack();
    this.setupCarousel();
    this.setupEventListeners();
  }

  /**
   * Duplica la pista de clientes renderizada en el servidor para el bucle infinito.
   * La copia es decorativa: se oculta a lectores de pantalla y se saca del foco.
   */
  private duplicateTrack(): void {
    const marquee = this.container.querySelector<HTMLElement>('.customer-marquee');
    if (!marquee) return;

    this.marquee = marquee;

    const fragment = document.createDocumentFragment();

    Array.from(marquee.children).forEach((child) => {
      const clone = child.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      fragment.appendChild(clone);
    });

    marquee.appendChild(fragment);
  }

  /**
   * Activa la animación del carrusel
   */
  private setupCarousel(): void {
    if (!this.marquee) return;

    // Activar animación con requestAnimationFrame optimizado
    requestAnimationFrame(() => {
      this.marquee?.classList.add('active');
    });
  }

  /**
   * Configura event listeners con delegation y cleanup automático
   */
  private setupEventListeners(): void {
    if (!this.marquee || this.isDestroyed) return;

    // Event delegation optimizado
    const clickHandler = this.handleCustomerClick.bind(this);
    const mouseEnterHandler = () => this.pauseAnimation();
    const mouseLeaveHandler = () => this.resumeAnimation();

    this.marquee.addEventListener('click', clickHandler);
    this.marquee.addEventListener('mouseenter', mouseEnterHandler);
    this.marquee.addEventListener('mouseleave', mouseLeaveHandler);

    // Registrar cleanup
    this.addCleanupTask(() => {
      this.marquee?.removeEventListener('click', clickHandler);
      this.marquee?.removeEventListener('mouseenter', mouseEnterHandler);
      this.marquee?.removeEventListener('mouseleave', mouseLeaveHandler);
    });
  }

  /**
   * Maneja click en tarjetas de clientes y actualiza el detalle
   * @param event - Evento de click
   */
  private handleCustomerClick(event: Event): void {
    const customerCard = (event.target as HTMLElement).closest<HTMLElement>('[data-customer-id]');
    const customerId = customerCard?.dataset.customerId;

    if (customerId) {
      const selectedCustomer = CUSTOMERS.find((customer) => customer.id === customerId);
      if (selectedCustomer) {
        this.customerDetailManager.updateCustomerDetail(selectedCustomer);
      }
    }
  }

  /**
   * Pausa la animación del carrusel
   */
  private pauseAnimation(): void {
    this.marquee?.style.setProperty('animation-play-state', 'paused');
  }

  /**
   * Reanuda la animación del carrusel
   */
  private resumeAnimation(): void {
    this.marquee?.style.setProperty('animation-play-state', 'running');
  }

  /**
   * Registra una función de limpieza para ejecutar al destruir
   * @param cleanup - Función de limpieza
   */
  private addCleanupTask(cleanup: () => void): void {
    this.cleanupTasks.push(cleanup);
  }

  /**
   * Destruye el carrusel y limpia todos los recursos
   */
  public destroy(): void {
    if (this.isDestroyed) return;

    this.isDestroyed = true;
    this.cleanupTasks.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        console.warn('Cleanup error:', error);
      }
    });

    this.cleanupTasks = [];
    this.marquee = null;
  }
}
