export interface LazyObserverOptions {
  threshold?: number;
  rootMargin?: string;
  timeout?: number;
}

export class LazyObserver {
  private static defaultOptions: LazyObserverOptions = {
    threshold: 0.1,
    rootMargin: '200px 0px',
    timeout: 100,
  };

  // Configuraciones predefinidas por tipo
  private static presets = {
    form: { threshold: 0.1, rootMargin: '200px 0px', timeout: 1000 },
    carousel: { threshold: 0.3, rootMargin: '100px 0px', timeout: 3000 },
    image: { threshold: 0.5, rootMargin: '50px 0px', timeout: 500 },
  };

  public static create(
    selector: string,
    callback: () => void | Promise<void>,
    options: LazyObserverOptions & { preset?: keyof typeof LazyObserver.presets } = {},
  ): IntersectionObserver | null {
    // Obtención del selector
    const element = document.querySelector(selector);

    if (!element) {
      console.warn(`LazyObserver: Element not found for selector: ${selector}`);
      return null;
    }

    // Aplicar preset si se especifica (optimizado con Object.assign)
    const finalOptions = options.preset
      ? Object.assign({}, this.defaultOptions, this.presets[options.preset], options)
      : Object.assign({}, this.defaultOptions, options);

    let executed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !executed) {
            executed = true;
            try {
              const result = callback();
              if (result instanceof Promise) {
                result.catch((error) => console.error('LazyObserver callback error:', error));
              }
            } catch (error) {
              console.error('LazyObserver callback error:', error);
            }
            observer.disconnect();
          }
        });
      },
      {
        threshold: finalOptions.threshold ?? 0.1,
        rootMargin: finalOptions.rootMargin ?? '200px 0px',
      },
    );

    observer.observe(element);

    // Fallback timeout
    setTimeout(() => {
      if (!executed) {
        executed = true;
        try {
          callback();
        } catch (error) {
          console.error('LazyObserver fallback error:', error);
        }
        observer.disconnect();
      }
    }, finalOptions.timeout);

    return observer;
  }
}
