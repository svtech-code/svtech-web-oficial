import type { Customer } from '../types/customer';
import { CUSTOMERS } from 'consts/customers';
import { CustomerDetailManager } from './customer-detail-manager';

export class CustomerCarousel {
  private customersData: Customer[] = CUSTOMERS;
  private customerDetailManager: CustomerDetailManager;
  private customerMarquee: HTMLElement | null = null;
  private customerSection: HTMLElement | null = null;
  private cleanupTasks: (() => void)[] = [];
  private isDestroyed: boolean = false;

  constructor(sectionSelector: string = '#customers-carousel') {
    this.customerSection = document.querySelector<HTMLElement>(sectionSelector);

    if (!this.customerSection) {
      throw new Error('Customer section not found');
    }

    // Evitar doble inicialización
    if (this.customerSection.dataset.initialized !== 'true') {
      console.warn('CustomerCarousel initialized without renderAndInitialize');
    }

    this.customerDetailManager = new CustomerDetailManager();

    // Buscar el marquee DESPUÉS de que el HTML esté renderizado
    this.initializeCarousel();
  }

  private initializeCarousel(): void {
    // Buscar el marquee dentro del contenedor específico
    this.customerMarquee = this.customerSection?.querySelector('.customer-marquee') || null;

    console.log('🔍 CustomerCarousel: Looking for .customer-marquee');
    console.log('📍 CustomerCarousel: Found marquee:', !!this.customerMarquee);

    if (this.customerMarquee) {
      // Pequeño delay para asegurar que el DOM esté listo
      requestAnimationFrame(() => {
        console.log('🎨 CustomerCarousel: Adding active class');
        this.customerMarquee?.classList.add('active');

        console.log(
          '✅ CustomerCarousel: Has active class:',
          this.customerMarquee?.classList.contains('active'),
        );
      });

      this.setupEventListeners();
    } else {
      console.error('❌ CustomerCarousel: .customer-marquee not found');
    }
  }

  private setupEventListeners(): void {
    if (!this.customerMarquee || this.isDestroyed) return;

    // Usar event delegation optimizado
    const clickHandler = this.handleCustomerClick.bind(this);
    this.customerMarquee.addEventListener('click', clickHandler);

    // Registrar cleanup
    this.addCleanupTask(() => {
      this.customerMarquee?.removeEventListener('click', clickHandler);
    });

    // Pause/resume en hover para mejor UX
    const mouseEnterHandler = () => {
      this.customerMarquee?.style.setProperty('animation-play-state', 'paused');
    };
    const mouseLeaveHandler = () => {
      this.customerMarquee?.style.setProperty('animation-play-state', 'running');
    };

    this.customerMarquee.addEventListener('mouseenter', mouseEnterHandler);
    this.customerMarquee.addEventListener('mouseleave', mouseLeaveHandler);

    this.addCleanupTask(() => {
      this.customerMarquee?.removeEventListener('mouseenter', mouseEnterHandler);
      this.customerMarquee?.removeEventListener('mouseleave', mouseLeaveHandler);
    });
  }

  private handleCustomerClick(event: Event): void {
    // Buscar el customer card más cercano
    const customerCard = (event.target as HTMLElement).closest('[data-target]') as HTMLElement;

    if (customerCard) {
      const clickedId = customerCard.id;
      const selectedCustomer = this.customersData.find((item: Customer) => item.id === clickedId);

      if (selectedCustomer) {
        this.customerDetailManager.updateCustomerDetail(selectedCustomer);
      }
    }
  }

  private addCleanupTask(cleanup: () => void): void {
    this.cleanupTasks.push(cleanup);
  }

  public destroy(): void {
    if (this.isDestroyed) return;

    this.isDestroyed = true;

    // Ejecutar todas las tareas de limpieza
    this.cleanupTasks.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        console.warn('Error during cleanup:', error);
      }
    });

    this.cleanupTasks = [];

    // Limpiar referencias
    this.customerMarquee = null;
    this.customerSection = null;
  }

  public static initialize(sectionSelector: string = '#customers-carousel'): void {
    try {
      new CustomerCarousel(sectionSelector);
    } catch (error) {
      console.error('Error initializing customer carousel:', error);
    }
  }

  // Método para renderizar dinámicamente (NUEVO)
  private static generateCustomerHTML(customer: Customer): string {
    // Usar la misma estructura que tu CustomerCard.astro
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
            loading="lazy"
            aria-label="${customer.name}"
          />
        </figure>
      </article>
    `;
  }

  // Método principal para renderizado dinámico (NUEVO)
  public static renderAndInitialize(sectionSelector: string = '#customers-carousel'): void {
    const container = document.querySelector<HTMLElement>(sectionSelector);
    if (!container) {
      console.error('Customer carousel container not found');
      return;
    }

    try {
      // 1. Generar HTML de todos los clientes
      const customersHTML = CUSTOMERS.map((customer) => this.generateCustomerHTML(customer)).join(
        '',
      );

      // 2. Crear HTML del carrusel con loop infinito
      const carouselHTML = `
        <div class="customer-marquee flex gap-6 md:gap-8">
          ${customersHTML}${customersHTML}
        </div>
      `;

      // 3. Reemplazar placeholder con contenido real
      container.innerHTML = carouselHTML;

      // 4. Marcar como inicializado para evitar re-renderizado
      container.dataset.initialized = 'true';

      // 5. Inicializar lógica del carrusel
      new CustomerCarousel(sectionSelector);

      console.log('Customer carousel rendered and initialized');
    } catch (error) {
      console.error('Error rendering customer carousel:', error);
    }
  }
}
