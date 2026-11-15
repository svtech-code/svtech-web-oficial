export type CookieConsentStatus = 'granted' | 'denied';

const CONSENT_STORAGE_KEY = 'svtech_cookie_consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function getSavedConsent(): CookieConsentStatus | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === 'granted' || value === 'denied') {
      return value;
    }
  } catch {
    // localStorage bloqueado por configuración del navegador
  }
  return null;
}

function saveConsent(status: CookieConsentStatus): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch {
    // Ignorar si el almacenamiento está restringido
  }
}

function clearAnalyticsCookies(): void {
  const cookies = document.cookie.split(';');
  const hostParts = window.location.hostname.split('.');
  const domains = ['', window.location.hostname];

  if (hostParts.length >= 2) {
    domains.push(`.${hostParts.slice(-2).join('.')}`);
  }

  for (const rawCookie of cookies) {
    const cookieName = rawCookie.split('=')[0]?.trim();
    if (!cookieName || !cookieName.startsWith('_ga')) continue;

    for (const domain of domains) {
      const domainAttr = domain ? `; domain=${domain}` : '';
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttr}`;
    }
  }
}

function applyConsentUpdate(status: CookieConsentStatus): void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: status,
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  } else {
    window.dataLayer.push([
      'consent',
      'update',
      {
        analytics_storage: status,
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
  }

  if (status === 'denied') {
    clearAnalyticsCookies();
  }
}

function showBanner(banner: HTMLElement): void {
  banner.classList.remove('hidden');
  banner.classList.add('flex');
}

function hideBanner(banner: HTMLElement): void {
  banner.classList.add('hidden');
  banner.classList.remove('flex');
}

export function initCookieBanner(): void {
  const banner = document.getElementById('cookie-consent-banner');
  if (!banner) return;

  const acceptBtn = document.getElementById('cookie-accept-btn');
  const rejectBtn = document.getElementById('cookie-reject-btn');

  const saved = getSavedConsent();
  if (!saved) {
    showBanner(banner);
  } else {
    hideBanner(banner);
  }

  if (banner.dataset.bound !== 'true') {
    banner.dataset.bound = 'true';

    acceptBtn?.addEventListener('click', () => {
      saveConsent('granted');
      applyConsentUpdate('granted');
      hideBanner(banner);
    });

    rejectBtn?.addEventListener('click', () => {
      saveConsent('denied');
      applyConsentUpdate('denied');
      hideBanner(banner);
    });
  }

  const openButtons = document.querySelectorAll<HTMLElement>('[data-open-cookie-settings]');
  openButtons.forEach((btn) => {
    if (btn.dataset.cookieTriggerBound === 'true') return;
    btn.dataset.cookieTriggerBound = 'true';
    btn.addEventListener('click', () => {
      const currentBanner = document.getElementById('cookie-consent-banner');
      if (currentBanner) {
        showBanner(currentBanner);
      }
    });
  });
}
