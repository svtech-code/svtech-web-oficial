import { CUSTOMERS } from '../consts/customers';
import type { Customer } from '../types/customer';
import { CustomerDetailManager } from './customer-detail-manager';

export class CustomerCarouselManager {
  private container: HTMLElement;
  private customerDetailManager: CustomerDetailManager;
  private marquee: HTMLElement | null = null;
  private cleanupTasks: (() => void)[] = [];
  private isDestroyed: boolean = false;

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

  private initialize(): void {
    this.renderCarousel();
    this.setupCarousel();
    this.setupEventListeners();
  }

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
            loading="lazy"
            aria-label="${customer.name}"
          />
        </figure>
      </article>
    `;
  }

  private setupCarousel(): void {
    if (!this.marquee) return;

    // Activar animación con requestAnimationFrame optimizado
    requestAnimationFrame(() => {
      this.marquee?.classList.add('active');
    });
  }

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

  private handleCustomerClick(event: Event): void {
    const customerCard = (event.target as HTMLElement).closest('[data-target]') as HTMLElement;

    if (customerCard?.id) {
      const selectedCustomer = CUSTOMERS.find((customer) => customer.id === customerCard.id);
      if (selectedCustomer) {
        this.customerDetailManager.updateCustomerDetail(selectedCustomer);
      }
    }
  }

  private pauseAnimation(): void {
    this.marquee?.style.setProperty('animation-play-state', 'paused');
  }

  private resumeAnimation(): void {
    this.marquee?.style.setProperty('animation-play-state', 'running');
  }

  private addCleanupTask(cleanup: () => void): void {
    this.cleanupTasks.push(cleanup);
  }

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
