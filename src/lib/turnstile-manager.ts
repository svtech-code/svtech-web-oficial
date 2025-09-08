export class TurnstileManager {
  private token: string | null = null;
  private loaded: boolean = false;
  private widget: HTMLElement | null = null;

  constructor(widgetSelector: string = '#turnstile-widget') {
    this.widget = document.querySelector(widgetSelector);
  }

  public getToken(): string | null {
    return this.token;
  }

  public loadOnDemand(): void {
    if (this.loaded) return;
    this.loaded = true;
    this.loadTurnstile();
  }

  public reset(): void {
    this.token = null;
    // @ts-ignore
    if (window.turnstile) {
      // @ts-ignore
      window.turnstile.reset('#turnstile-widget');
    }
  }

  private loadTurnstile(): void {
    // Verificar si el script ya existe
    if (document.querySelector('script[src*="turnstile"]')) {
      this.initializeTurnstile();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      this.initializeTurnstile();
    };

    script.onerror = () => {
      console.error('Error al cargar Turnstile');
    };
  }

  private initializeTurnstile(): void {
    // @ts-ignore
    if (!window.turnstile || !this.widget) return;

    // Observar cambios en el widget para aplicar estilos cuando se cree el iframe
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.applyTurnstileStyles();
        }
      });
    });

    observer.observe(this.widget, {
      childList: true,
      subtree: true,
    });

    // @ts-ignore
    window.turnstile.render('#turnstile-widget', {
      sitekey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
      theme: 'dark',
      size: 'flexible',
      appearence: 'always',
      callback: (token: string) => {
        this.token = token;
      },
      'error-callback': () => {
        this.token = null;
        console.error('Error en Turnstile');
      },
      'expired-callback': () => {
        this.token = null;
        console.warn('Token de Turnstile expirado');
      },
    });
  }

  private applyTurnstileStyles(): void {
    if (!this.widget) return;

    const turnstileDiv = this.widget.querySelector('div');
    if (turnstileDiv) {
      turnstileDiv.classList.add(
        'flex',
        'rounded-xl',
        'overflow-hidden',
        'border-primary',
        'border-2',
      );
    }
  }
}
