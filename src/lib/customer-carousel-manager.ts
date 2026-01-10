import { CUSTOMERS } from '../consts/customers';
import type { Customer } from '../types/customer';
import { CustomerDetailManager } from './customer-detail-manager';

/**
 * Gestiona el carrusel infinito de clientes con interacción y detalle.
 * Responsabilidad: Renderizar carrusel con animación marquee, manejar clicks,
 * coordinar con CustomerDetailManager y limpiar recursos.
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
   * Inicializa el carrusel con renderizado y configuración de eventos
   */
  private initialize(): void {
    this.renderCarousel();
    this.setupCarousel();
    this.setupEventListeners();
  }

  /**
   * Renderiza el HTML del carrusel con loop infinito
   */
  private renderCarousel(): void {
    // Generar HTML optimizado
    const customersHTML = CUSTOMERS.map(this.generateCustomerHTML).join('');

    // Crear carrusel con loop infinito
    this.container.innerHTML = `
      <div class="customer-marquee flex gap-6 md:gap-8">
        ${customersHTML}${customersHTML}
      </div>
    `;

    this.marquee = this.container.querySelector('.customer-marquee');
  }

  /**
   * Genera HTML para un cliente individual
   * @param customer - Datos del cliente
   */
  private generateCustomerHTML(customer: Customer): string {
    return `
      <article
        class="flex min-w-[120px] shrink-0 cursor-pointer items-center justify-center md:min-w-[200px]"
        id="${customer.id}"
        data-target
        aria-label="Cliente: ${customer.name}"
      >
        <figure class="bg-secondary/30 hover:bg-secondary/40 relative rounded-2xl duration-300 hover:rounded-3xl">
          <img
            src="/images/customers/${customer.id}.svg"
            alt="${customer.name}"
            class="h-auto w-28 object-contain p-4 duration-300 hover:scale-110 sm:w-40 md:hover:scale-125"
            width=112
            height=112
            loading="lazy"
            aria-label="${customer.name}"
          />
        </figure>
      </article>
    `;
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
    const customerCard = (event.target as HTMLElement).closest('[data-target]') as HTMLElement;

    if (customerCard?.id) {
      const selectedCustomer = CUSTOMERS.find((customer) => customer.id === customerCard.id);
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
