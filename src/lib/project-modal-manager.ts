import type { Project } from '../types/projects';

/**
 * Gestiona la funcionalidad del modal de proyectos.
 * Responsabilidad: Mostrar/ocultar modal, poblar contenido, manejar eventos.
 */
export class ProjectModalManager {
  private modal: HTMLElement;
  private closeButton: HTMLButtonElement;
  private overlay: HTMLElement;
  private isVisible: boolean = false;
  private scrollToTopButton: HTMLElement | null = null;
  private scrollToTopWasVisible: boolean = false;

  // Elementos del modal para inyectar contenido
  private elements: {
    modalContainer: HTMLDivElement;
    image: HTMLImageElement;
    type: HTMLSpanElement;
    typeBadge: HTMLElement;
    title: HTMLHeadingElement;
    // challenges: HTMLUListElement;
    // challengesContainer: HTMLElement;
    asideInfo: HTMLElement;
    status: HTMLSpanElement;
    statusIndicator: HTMLElement;
    customer: HTMLParagraphElement;
    durationContainer: HTMLElement;
    duration: HTMLParagraphElement;
    // technologies: HTMLElement;
    // technologiesContainer: HTMLElement;
    // linksContainer: HTMLElement;
    // linkDemo: HTMLAnchorElement;
    // linkGithub: HTMLAnchorElement;
    // linkWebsite: HTMLAnchorElement;
    articleContent: HTMLElement;
    titleFullDescription: HTMLHeadingElement;
    fullDescription: HTMLParagraphElement;
    featuresContainer: HTMLElement;
    features: HTMLUListElement;
  };

  /**
   * Inicializa el gestor del modal de proyectos
   * @param modalSelector - Selector CSS del modal (por defecto '#project-modal')
   */
  constructor(modalSelector: string = '#project-modal') {
    const modal = document.querySelector(modalSelector) as HTMLElement;
    const closeButton = document.querySelector('#close-project-modal') as HTMLButtonElement;

    if (!modal || !closeButton) {
      throw new Error('Elementos del modal no encontrados');
    }

    this.modal = modal;
    this.closeButton = closeButton;
    this.overlay = modal;

    // Obtener referencia al botón ScrollToTop
    this.scrollToTopButton = document.getElementById('scroll-to-top');

    // Obtener todos los elementos del modal
    this.elements = this.getModalElements();

    this.initialize();
  }

  /**
   * Obtiene todas las referencias a elementos del modal
   */
  private getModalElements() {
    return {
      modalContainer: document.querySelector('#modal-project-container') as HTMLDivElement,
      image: document.querySelector('#modal-project-image') as HTMLImageElement,
      type: document.querySelector('#modal-project-type') as HTMLSpanElement,
      typeBadge: document.querySelector('#modal-project-type-badge') as HTMLElement,
      title: document.querySelector('#modal-title') as HTMLHeadingElement,
      // challenges: document.querySelector('#modal-challenges') as HTMLUListElement,
      // challengesContainer: document.querySelector('#modal-challenges-container') as HTMLElement,
      asideInfo: document.querySelector('#aside-info') as HTMLElement,
      status: document.querySelector('#modal-status') as HTMLSpanElement,
      statusIndicator: document.querySelector('#modal-status-indicator') as HTMLElement,
      customer: document.querySelector('#modal-customer') as HTMLParagraphElement,
      durationContainer: document.querySelector('#modal-duration-container') as HTMLElement,
      duration: document.querySelector('#modal-duration') as HTMLParagraphElement,
      // technologies: document.querySelector('#modal-technologies') as HTMLElement,
      // technologiesContainer: document.querySelector('#modal-technologies-container') as HTMLElement,
      // linksContainer: document.querySelector('#modal-links-container') as HTMLElement,
      // linkDemo: document.querySelector('#modal-link-demo') as HTMLAnchorElement,
      // linkGithub: document.querySelector('#modal-link-github') as HTMLAnchorElement,
      // linkWebsite: document.querySelector('#modal-link-website') as HTMLAnchorElement,
      articleContent: document.querySelector('#article-content') as HTMLElement,
      titleFullDescription: document.querySelector(
        '#modal-title-description',
      ) as HTMLHeadingElement,
      fullDescription: document.querySelector('#modal-full-description') as HTMLParagraphElement,
      featuresContainer: document.querySelector('#modal-features-container') as HTMLElement,
      features: document.querySelector('#modal-features') as HTMLUListElement,
    };
  }

  /**
   * Inicializa los event listeners del modal
   */
  private initialize(): void {
    this.setupEventListeners();
  }

  /**
   * Configura los event listeners del modal
   */
  private setupEventListeners(): void {
    // Cerrar modal con botón X
    this.closeButton.addEventListener('click', () => this.hide());

    // Cerrar modal al hacer clic en el overlay
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.hide();
      }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });

    // Prevenir scroll del body cuando el modal está abierto
    this.modal.addEventListener('wheel', (e) => {
      e.stopPropagation();
    });
  }

  /**
   * Oculta el botón ScrollToTop y guarda su estado anterior
   */
  private hideScrollToTop(): void {
    if (this.scrollToTopButton) {
      // Guardar si el botón estaba visible antes de abrir el modal
      this.scrollToTopWasVisible = this.scrollToTopButton.classList.contains('opacity-100');

      // Ocultar el botón con transición suave
      this.scrollToTopButton.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
      this.scrollToTopButton.classList.remove('opacity-100', 'pointer-events-auto');
      this.scrollToTopButton.classList.add('opacity-0', 'pointer-events-none');
      this.scrollToTopButton.setAttribute('tabindex', '-1');
    }
  }

  /**
   * Restaura la visibilidad del botón ScrollToTop al estado anterior
   */
  private restoreScrollToTop(): void {
    if (this.scrollToTopButton && this.scrollToTopWasVisible) {
      // Restaurar el botón si estaba visible antes
      setTimeout(() => {
        if (this.scrollToTopButton) {
          this.scrollToTopButton.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
          this.scrollToTopButton.classList.remove('opacity-0', 'pointer-events-none');
          this.scrollToTopButton.classList.add('opacity-100', 'pointer-events-auto');
          this.scrollToTopButton.removeAttribute('tabindex');
        }
      }, 100); // Pequeño delay para que la transición del modal termine primero
    }
  }

  /**
   * Muestra el modal con la información del proyecto
   * @param project - Datos del proyecto a mostrar
   */
  public show(project: Project): void {
    this.populateModal(project);

    // Ocultar ScrollToTop antes de mostrar el modal
    this.hideScrollToTop();

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';

    // Mostrar modal con animación
    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');

    // Focus en el modal para accesibilidad
    setTimeout(() => {
      this.modal.focus();
      this.isVisible = true;
    }, 10);

    // Animación de entrada
    requestAnimationFrame(() => {
      this.modal.style.opacity = '0';
      this.modal.style.transform = 'scale(0.95)';

      requestAnimationFrame(() => {
        this.modal.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        this.modal.style.opacity = '1';
        this.modal.style.transform = 'scale(1)';
      });
    });
  }

  /**
   * Oculta el modal con animación
   */
  public hide(): void {
    if (!this.isVisible) return;

    // Animación de salida
    this.modal.style.transition = 'opacity 0.15s ease-in, transform 0.15s ease-in';
    this.modal.style.opacity = '0';
    this.modal.style.transform = 'scale(0.95)';

    setTimeout(() => {
      this.modal.classList.remove('flex');
      this.modal.classList.add('hidden');

      // Restaurar scroll del body
      document.body.style.overflow = '';

      // Restaurar ScrollToTop
      this.restoreScrollToTop();

      // Reset estilos
      this.modal.style.transition = '';
      this.modal.style.opacity = '';
      this.modal.style.transform = '';

      this.isVisible = false;
    }, 150);
  }

  /**
   * Puebla el modal con la información del proyecto
   * @param project - Datos del proyecto
   */
  private populateModal(project: Project): void {
    // INFORMACIÓN BASIDA DEL MODAL
    this.elements.image.src = project.imageSrc;
    this.elements.image.alt = project.imageAlt;
    this.elements.type.textContent = project.type;

    // Sombra del modal container
    this.updateModalContentColorShadow(project.type);

    // Color del botón de cerrar
    this.updateButtonCloseColor(project.type);

    // Badge del tipo de proyecto
    this.updateProjectTypeBadge(project.type);

    // SECCIÓN DEL ASIDE DE INFORMACIÓN DEL MODAL
    this.elements.customer.textContent = project.customer;

    // Titulos del aside info
    this.updateColorTitle(this.elements.asideInfo, project.type);

    // Estado del proyecto
    this.updateProjectStatus(project.status);

    // Duración (opcional)
    this.updateDuration(project.duration);

    // SECCIÓN PRINCIPAL DEL MODAL
    // Título del modal
    this.updateTitle(project.title, project.type);

    // Títulos del article content
    this.updateColorTitle(this.elements.articleContent, project.type);

    // Titulo de la full description
    this.elements.titleFullDescription.textContent = `Descripción del ${project.type}`;

    // Información básica del contenido del modal
    this.elements.fullDescription.textContent = project.fullDescription;

    // Features del modal
    this.updateFeatures(project.features);

    // Descripción completa (opcional)
    // this.updateFullDescription(project.fullDescription);

    // Características (opcional)
    // this.updateFeatures(project.features);

    // Desafíos (opcional)
    // this.updateChallenges(project.challenges);

    // Tecnologías (opcional)
    // this.updateTechnologies(project.technologies);

    // Enlaces (opcional)
    // this.updateLinks(project.links);
  }

  /**
   * Actualiza el color de la sobra del modal container
   */
  private updateModalContentColorShadow(type: string): void {
    const isService = type === 'servicio';

    // Limpiar las clases
    this.elements.modalContainer.classList.remove('shadow-primary', 'shadow-tertiary');

    // Actualizar la clase del boton para cerra el modal
    if (isService) {
      this.elements.modalContainer.classList.add('shadow-primary');
    } else {
      this.elements.modalContainer.classList.add('shadow-tertiary');
    }
  }

  /**
   * Actualiza el color del botón de cierre del modal
   */
  private updateButtonCloseColor(type: string): void {
    const isService = type === 'servicio';

    // Limpiar las clases
    this.closeButton.classList.remove('text-primary', 'text-tertiary');

    // Actualizar la clase del boton para cerra el modal
    if (isService) {
      this.closeButton.classList.add('text-primary');
    } else {
      this.closeButton.classList.add('text-tertiary');
    }
  }

  /**
   * Actualiza el badge del tipo de proyecto
   */
  private updateProjectTypeBadge(type: string): void {
    const isService = type === 'servicio';

    // Actualizar el texto del tipo
    this.elements.type.textContent = type;

    // Limpiar las clases
    this.elements.type.classList.remove('text-primary', 'text-tertiary');

    // Actualizar las clases del contenedor y texto según el tipo
    if (isService) {
      this.elements.type.classList.add('text-primary');
    } else {
      this.elements.type.classList.add('text-tertiary');
    }
  }

  /**
   * Actualización del color de los títulos h3 del modal
   */
  private updateColorTitle(content: HTMLElement, type: string): void {
    if (content) {
      const headers = content.querySelectorAll<HTMLHeadingElement>('h3');
      const isService = type === 'servicio';

      headers.forEach((header) => {
        // Limpiar las clases
        header.classList.remove('text-primary', 'text-tertiary');

        // Actualizar la clase del boton para cerra el modal
        if (isService) {
          header.classList.add('text-primary');
        } else {
          header.classList.add('text-tertiary');
        }
      });
    }
  }

  /**
   * Actualiza el estado del proyecto
   */
  private updateProjectStatus(status: string): void {
    const statusText = status || 'completado'; // Default to completado si no hay status
    const classForIndicator = {
      completado: 'bg-green-500',
      'en-progreso': 'bg-yellow-500',
      mantenimiento: 'bg-blue-500',
    };

    this.elements.status.textContent = statusText.replace('-', ' ');

    // Remover clases
    // this.elements.statusTitle.classList.remove('text-primary', 'text-tertiary');
    this.elements.statusIndicator.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-blue-500');

    this.elements.statusIndicator.classList.add(
      classForIndicator[statusText as keyof typeof classForIndicator],
    );
  }

  /**
   * Actualiza la duración si existe
   */
  private updateDuration(duration?: string): void {
    if (duration) {
      this.elements.duration.textContent = duration;
      this.elements.durationContainer.classList.remove('hidden');
    } else {
      this.elements.durationContainer.classList.add('hidden');
    }
  }

  /**
   * Actualizar color y tengo del titulo principal del modal
   */
  private updateTitle(title: string, type: string) {
    const isService = type === 'servicio';
    this.elements.title.textContent = title;

    // Limpiar las clases
    this.elements.title.classList.remove('text-primary', 'text-tertiary');

    // Actualizar clases del color del titulo
    if (isService) {
      this.elements.title.classList.add('text-primary');
    } else {
      this.elements.title.classList.add('text-tertiary');
    }
  }

  /**
   * Actualiza las características si existen
   */
  private updateFeatures(features?: string[]): void {
    if (features && features.length > 0) {
      // Limpieza de los elementos
      this.elements.features.innerHTML = '';
      features.forEach((feature) => {
        // Creación de los elementos li
        const li = document.createElement('li');
        li.className = 'flex items-start space-x-2';
        li.innerHTML = `
          <span class="mt-1.5 h-2 w-2 rounded-full bg-secondary flex-shrink-0"></span>
          <span>${feature}</span>
          `;

        // Agergar al elemento UL los li hijos creados
        this.elements.features.appendChild(li);
      });

      this.elements.featuresContainer.classList.remove('hidden');
    } else {
      this.elements.featuresContainer.classList.add('hidden');
    }
  }

  // /**
  //  * Actualiza los desafíos si existen
  //  */
  // private updateChallenges(challenges?: string[]): void {
  //   if (challenges && challenges.length > 0) {
  //     this.elements.challenges.innerHTML = '';
  //     challenges.forEach((challenge) => {
  //       const li = document.createElement('li');
  //       li.className = 'flex items-start space-x-2';
  //       li.innerHTML = `
  //         <span class="mt-1.5 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></span>
  //         <span>${challenge}</span>
  //       `;
  //       this.elements.challenges.appendChild(li);
  //     });
  //     this.elements.challengesContainer.classList.remove('hidden');
  //   } else {
  //     this.elements.challengesContainer.classList.add('hidden');
  //   }
  // }

  // /**
  //  * Actualiza las tecnologías si existen
  //  */
  // private updateTechnologies(technologies?: string[]): void {
  //   if (technologies && technologies.length > 0) {
  //     this.elements.technologies.innerHTML = '';
  //     technologies.forEach((tech) => {
  //       const span = document.createElement('span');
  //       span.className = 'tech-tag';
  //       span.textContent = tech;
  //       this.elements.technologies.appendChild(span);
  //     });
  //     this.elements.technologiesContainer.classList.remove('hidden');
  //   } else {
  //     this.elements.technologiesContainer.classList.add('hidden');
  //   }
  // }

  // /**
  //  * Actualiza los enlaces si existen
  //  */
  // private updateLinks(links?: { demo?: string; github?: string; website?: string }): void {
  //   if (links && Object.keys(links).length > 0) {
  //     // Demo link
  //     if (links.demo) {
  //       this.elements.linkDemo.href = links.demo;
  //       this.elements.linkDemo.classList.remove('hidden');
  //     } else {
  //       this.elements.linkDemo.classList.add('hidden');
  //     }
  //
  //     // GitHub link
  //     if (links.github) {
  //       this.elements.linkGithub.href = links.github;
  //       this.elements.linkGithub.classList.remove('hidden');
  //     } else {
  //       this.elements.linkGithub.classList.add('hidden');
  //     }
  //
  //     // Website link
  //     if (links.website) {
  //       this.elements.linkWebsite.href = links.website;
  //       this.elements.linkWebsite.classList.remove('hidden');
  //     } else {
  //       this.elements.linkWebsite.classList.add('hidden');
  //     }
  //
  //     this.elements.linksContainer.classList.remove('hidden');
  //   } else {
  //     this.elements.linksContainer.classList.add('hidden');
  //   }
  // }

  /**
   * Verifica si el modal está visible
   */
  public isModalVisible(): boolean {
    return this.isVisible;
  }

  /**
   * Inicializa los event listeners para todos los botones de proyecto
   * @param selector - Selector de los botones trigger (default: '.project-modal-trigger')
   */
  public initializeProjectButtons(): void {
    const projectButtons = document.querySelectorAll('.project-modal-trigger');

    projectButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const card = (e.target as HTMLElement).closest('article');

        if (card) {
          const projectData = card.getAttribute('data-project');

          if (projectData) {
            try {
              const project: Project = JSON.parse(projectData);
              this.show(project);
            } catch (error) {
              console.error('Error al parsear datos del proyecto:', error);
            }
          }
        }
      });
    });
  }
}
