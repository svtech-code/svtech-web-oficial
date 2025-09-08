import type { Customer } from '../types/customer';
import { CustomerDetailManager } from './customer-detail-manager';
import { executeWhenIdle } from './dom-utils';

export class CustomerCarousel {
  private customersData: Customer[] = [];
  private customerDetailManager: CustomerDetailManager;
  private customerMarquee: HTMLElement | null = null;
  private customerSection: HTMLElement | null = null;

  constructor(sectionSelector: string = '#customers') {
    this.customerSection = document.querySelector<HTMLElement>(sectionSelector);

    if (!this.customerSection) {
      throw new Error('Customer section not found');
    }

    this.customerDetailManager = new CustomerDetailManager();
    this.loadCustomersData();
    this.initializeCarousel();
  }

  private loadCustomersData(): void {
    if (!this.customerSection) return;

    const customersDataAttr = this.customerSection.getAttribute('info-customers');
    if (customersDataAttr) {
      try {
        this.customersData = JSON.parse(customersDataAttr);
      } catch (error) {
        console.error('Error parsing customers data:', error);
        this.customersData = [];
      }
    }
  }

  private initializeCarousel(): void {
    this.customerMarquee = document.querySelector('.customer-marquee');

    if (this.customerMarquee) {
      this.setupEventListeners();
    }
  }

  private setupEventListeners(): void {
    if (!this.customerMarquee) return;

    // ✅ Usar event delegation en lugar de múltiples listeners
    this.customerMarquee.addEventListener('click', this.handleCustomerClick.bind(this));
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

  public static initialize(sectionSelector: string = '#customers'): void {
    executeWhenIdle(() => {
      try {
        new CustomerCarousel(sectionSelector);
      } catch (error) {
        console.error('Error initializing customer carousel:', error);
      }
    });
  }
}
