export function setupServiceVisibility() {
  const container = document.getElementById('services-container');
  const elements = {
    button: document.getElementById('services-see-more-btn'),
    container,
    cards: container ? (container.querySelectorAll('article') as NodeListOf<HTMLElement>) : null,
    buttonText: null as HTMLElement | null,
    servicesSection: document.getElementById('services'),
  };

  // Validación de los elementos
  if (!elements.button || !elements.container || elements.cards.length === 0) {
    return;
  }

  elements.buttonText = elements.button.querySelector('.see-more-text') as HTMLElement;
  if (!elements.buttonText) return;

  // Configuración variables responsive
  const config = {
    mobileLimit: parseInt(elements.button.dataset.mobileLimit || '2'),
    tabletLimit: parseInt(elements.button.dataset.tabletLimit || '4'),
    isExpanded: false,
  };

  // Throttle para resize (evita llamadas excesivas)
  let resizeTimeout: number | null = null;

  // Control de timeouts para cancelarlos si es necesario
  const animationTimeouts = new Set<number>();

  function clearAllTimeouts() {
    animationTimeouts.forEach((timeout) => clearTimeout(timeout));
    animationTimeouts.clear();
  }

  function getCurrentLimit(): number | null {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) return config.mobileLimit;
    if (screenWidth < 1024) return config.tabletLimit;
    return null; // Desktop - mostrar todos
  }

  function updateVisibility() {
    const limit = getCurrentLimit();

    // Desktop - mostrar todos
    if (limit === null) {
      showAllCards();
      elements.button && (elements.button.style.display = 'none');
      return;
    }

    // Mobile/Tablet
    const visibleCount = config.isExpanded ? elements.cards.length : limit;
    showCardsWithAnimation(visibleCount);

    // Actualizar botón
    if (elements.cards.length > limit) {
      elements.button && (elements.button.style.display = 'flex');
      elements.buttonText &&
        (elements.buttonText.textContent = config.isExpanded ? 'Ver menos' : 'Ver más');
    } else {
      elements.button && (elements.button.style.display = 'none');
    }
  }

  function showAllCards() {
    // Usar requestAnimationFrame para mejor performance
    requestAnimationFrame(() => {
      elements.cards.forEach((card) => {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      });
    });
  }

  function showCardsWithAnimation(visibleCount: number) {
    clearAllTimeouts(); // Limpiar animaciones previas

    requestAnimationFrame(() => {
      elements.cards.forEach((card, index) => {
        if (index < visibleCount) {
          // Mostrar tarjeta
          card.style.display = 'flex';

          const timeout = setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, index * 30); // Reducido de 50ms a 30ms

          animationTimeouts.add(timeout);
        } else {
          // Ocultar tarjeta
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';

          const timeout = setTimeout(() => {
            card.style.display = 'none';
          }, 200); // Reducido de 300ms a 200ms

          animationTimeouts.add(timeout);
        }
      });
    });
  }

  function toggleVisibility() {
    const wasExpanded = config.isExpanded;
    config.isExpanded = !config.isExpanded;
    updateVisibility();

    // Scroll solo si se colapsa
    if (wasExpanded && !config.isExpanded && elements.servicesSection) {
      const timeout = setTimeout(() => {
        elements.servicesSection &&
          elements.servicesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });

        const sectionTitle =
          elements.servicesSection && (elements.servicesSection.querySelector('h2') as HTMLElement);
        if (sectionTitle) {
          sectionTitle.focus();
        }
      }, 50); // Reducido delay

      animationTimeouts.add(timeout);
    }
  }

  // Throttled resize handler
  function handleResize() {
    if (resizeTimeout) clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      updateVisibility();
      resizeTimeout = null;
    }, 150); // Throttle a 150ms
  }

  // Event listeners
  elements.button.addEventListener('click', toggleVisibility);
  window.addEventListener('resize', handleResize);

  // Cleanup function para cuando se cambie de página
  const cleanup = () => {
    clearAllTimeouts();
    if (resizeTimeout) clearTimeout(resizeTimeout);
    elements.button?.removeEventListener('click', toggleVisibility);
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('astro:before-preparation', cleanup);
    document.removeEventListener('astro:page-load', cleanup);
  };

  // Auto-cleanup en Astro
  document.addEventListener('astro:before-preparation', cleanup);
  document.addEventListener('astro:page-load', cleanup);

  // Inicializar
  updateVisibility();

  // Retornar cleanup para uso manual si es necesario
  return cleanup;
}
