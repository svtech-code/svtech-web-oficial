export class LazyLoader {
  static initializeCustomerCarousel(): void {
    const customerSection = document.getElementById('customers');

    if (customerSection && !customerSection.dataset.initialized) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              customerSection.dataset.initialized = 'true';

              import('./customer-carousel').then((module) => {
                module.CustomerCarousel.initialize('#customers');
              });

              observer.unobserve(customerSection);
            }
          });
        },
        {
          rootMargin: '50px',
        },
      );

      observer.observe(customerSection);
    }
  }
}
