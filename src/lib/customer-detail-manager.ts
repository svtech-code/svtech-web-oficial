import type { Customer, SocialMedia } from '../types/customer';
import { logoSvgMap, socialIconsMap, type SocialPlatform } from '../consts/iconsMap';
import {
  updateImageSrc,
  createSocialLink,
  createFragment,
  replaceElementContent,
} from './dom-utils';

export class CustomerDetailManager {
  private detailElement: HTMLElement | null = null;
  private nameElement: HTMLElement | null = null;
  private industryElement: HTMLElement | null = null;
  private logoElement: HTMLElement | null = null;
  private descriptionElement: HTMLElement | null = null;
  private locationElement: HTMLElement | null = null;
  private socialElement: HTMLElement | null = null;

  constructor() {
    this.initializeElements();
  }

  private initializeElements(): void {
    this.detailElement = document.querySelector<HTMLElement>("[data-customer='detail-component']");
    this.nameElement = document.querySelector<HTMLElement>("[data-customer='name-customer']");
    this.industryElement = document.querySelector<HTMLElement>(
      "[data-customer='industry-customer']",
    );
    this.logoElement = document.querySelector<HTMLElement>("[data-customer='logo-customer']");
    this.descriptionElement = document.querySelector<HTMLElement>(
      "[data-customer='description-customer']",
    );
    this.locationElement = document.querySelector<HTMLElement>(
      "[data-customer='location-customer']",
    );
    this.socialElement = document.querySelector<HTMLElement>("[data-customer='social-customer']");
  }

  public updateCustomerDetail(customer: Customer): void {
    if (!this.detailElement) return;

    this.detailElement.classList.add('is-changing');

    setTimeout(() => {
      this.updateTextContent(customer);
      this.updateLogo(customer);
      this.updateSocialMedia(customer.socialMedia);
      this.detailElement?.classList.remove('is-changing');
    }, 300);
  }

  private updateTextContent(customer: Customer): void {
    if (this.nameElement) this.nameElement.textContent = customer.name;
    if (this.industryElement) this.industryElement.textContent = customer.industry;
    if (this.descriptionElement) this.descriptionElement.textContent = customer.description;
    if (this.locationElement) this.locationElement.textContent = customer.location;
  }

  private updateLogo(customer: Customer): void {
    if (!this.logoElement) return;

    const logoSrc = logoSvgMap[customer.id as keyof typeof logoSvgMap];
    if (logoSrc) {
      updateImageSrc(this.logoElement, logoSrc, `Logo de ${customer.name}`);
    }
  }

  private updateSocialMedia(socialMedia: SocialMedia): void {
    if (!this.socialElement) return;

    const fragment = createFragment();

    Object.entries(socialMedia).forEach(([platform, url]) => {
      if (url && platform in socialIconsMap) {
        const iconSvg = socialIconsMap[platform as SocialPlatform];
        if (iconSvg) {
          const link = createSocialLink(platform, url, iconSvg);
          fragment.appendChild(link);
        }
      }
    });

    replaceElementContent(this.socialElement, fragment);
  }
}
