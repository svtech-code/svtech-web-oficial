import QRCodeStyling, { type Options } from 'qr-code-styling';
import {
  buildUrlPayload,
  buildVCardPayload,
  buildWhatsappPayload,
  buildWifiPayload,
  evaluateQrContrast,
} from 'lib/qr/qr-utils';
import type {
  QrContentMode,
  QrCornerStyle,
  QrDotStyle,
  QrExportFormat,
  QrGeneratorState,
  WifiEncryption,
} from 'types/qr';

let activeLogoObjectUrl: string | null = null;
let colorDebounceTimer: ReturnType<typeof setTimeout> | null = null;

function revokeActiveLogoUrl(): void {
  if (activeLogoObjectUrl) {
    URL.revokeObjectURL(activeLogoObjectUrl);
    activeLogoObjectUrl = null;
  }
}

function buildQrOptions(state: QrGeneratorState): Options {
  const cornerDotType = state.design.cornersType === 'dot' ? 'dot' : 'square';

  return {
    width: 1000,
    height: 1000,
    type: 'svg',
    data: state.rawPayload,
    margin: 24,
    image: state.design.logoObjectUrl ?? '',
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: 'H',
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.28,
      margin: 8,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      color: state.design.dotsColor,
      type: state.design.dotsType,
    },
    cornersSquareOptions: {
      color: state.design.dotsColor,
      type: state.design.cornersType,
    },
    cornersDotOptions: {
      color: state.design.dotsColor,
      type: cornerDotType,
    },
    backgroundOptions: {
      color: state.design.bgColor,
    },
  };
}

export function initQrGenerator(): void {
  const form = document.getElementById('qr-generator-form') as HTMLFormElement | null;
  const previewContainer = document.getElementById('qr-preview-canvas') as HTMLDivElement | null;

  if (!form || !previewContainer) {
    return;
  }

  revokeActiveLogoUrl();

  const state: QrGeneratorState = {
    mode: 'url',
    rawPayload: 'https://svtech.cl',
    design: {
      dotsColor: '#001217',
      bgColor: '#ffffff',
      dotsType: 'rounded',
      cornersType: 'extra-rounded',
      logoObjectUrl: null,
    },
    validation: evaluateQrContrast('#001217', '#ffffff'),
  };

  previewContainer.innerHTML = '';
  const qrCode = new QRCodeStyling(buildQrOptions(state));
  qrCode.append(previewContainer);

  const tabButtons = form.querySelectorAll<HTMLButtonElement>('[data-qr-tab]');
  const tabPanels = form.querySelectorAll<HTMLElement>('[data-qr-panel]');
  const dotButtons = form.querySelectorAll<HTMLButtonElement>('[data-qr-dot]');
  const cornerButtons = form.querySelectorAll<HTMLButtonElement>('[data-qr-corner]');
  const presetButtons = form.querySelectorAll<HTMLButtonElement>('[data-qr-preset]');

  const dotsColorInput = document.getElementById('qr-dots-color') as HTMLInputElement | null;
  const bgColorInput = document.getElementById('qr-bg-color') as HTMLInputElement | null;
  const dotsColorHex = document.getElementById('qr-dots-color-hex') as HTMLElement | null;
  const bgColorHex = document.getElementById('qr-bg-color-hex') as HTMLElement | null;

  const logoInput = document.getElementById('qr-logo-input') as HTMLInputElement | null;
  const logoRemoveBtn = document.getElementById('qr-logo-remove') as HTMLButtonElement | null;
  const logoFileName = document.getElementById('qr-logo-filename') as HTMLElement | null;

  const contrastAlert = document.getElementById('qr-contrast-alert') as HTMLElement | null;
  const contrastMessage = document.getElementById('qr-contrast-message') as HTMLElement | null;
  const contrastFixBtn = document.getElementById('qr-contrast-fix') as HTMLButtonElement | null;
  const payloadPreview = document.getElementById('qr-payload-preview') as HTMLElement | null;
  const downloadFeedback = document.getElementById('qr-download-feedback') as HTMLElement | null;

  function computePayloadFromDom(): string {
    if (!form) return 'https://svtech.cl';
    const data = new FormData(form);

    switch (state.mode) {
      case 'url': {
        const urlVal = String(data.get('url_input') ?? '');
        return buildUrlPayload(urlVal);
      }
      case 'whatsapp': {
        const phone = String(data.get('wa_phone') ?? '');
        const message = String(data.get('wa_message') ?? '');
        return buildWhatsappPayload({ phone, message });
      }
      case 'wifi': {
        const ssid = String(data.get('wifi_ssid') ?? '');
        const password = String(data.get('wifi_password') ?? '');
        const encryptionRaw = String(data.get('wifi_encryption') ?? 'WPA');
        const encryption: WifiEncryption =
          encryptionRaw === 'WEP' || encryptionRaw === 'nopass' ? encryptionRaw : 'WPA';
        const hidden = data.get('wifi_hidden') === 'on';
        return buildWifiPayload({ ssid, password, encryption, hidden });
      }
      case 'vcard': {
        return buildVCardPayload({
          fullName: String(data.get('vcard_name') ?? ''),
          organization: String(data.get('vcard_org') ?? ''),
          title: String(data.get('vcard_title') ?? ''),
          phone: String(data.get('vcard_phone') ?? ''),
          email: String(data.get('vcard_email') ?? ''),
          website: String(data.get('vcard_web') ?? ''),
        });
      }
    }
  }

  function updateContrastUi(): void {
    state.validation = evaluateQrContrast(state.design.dotsColor, state.design.bgColor);

    if (dotsColorHex) {
      dotsColorHex.textContent = state.design.dotsColor.toUpperCase();
    }
    if (bgColorHex) {
      bgColorHex.textContent = state.design.bgColor.toUpperCase();
    }

    if (!contrastAlert || !contrastMessage) return;

    if (!state.validation.hasValidContrast) {
      contrastAlert.classList.remove('hidden');
      contrastAlert.classList.add('flex');
      if (state.validation.isInverted) {
        contrastMessage.textContent = `Lectura óptica comprometida (contraste ${state.validation.contrastRatio}:1 con colores invertidos). Las cámaras leen mejor puntos oscuros sobre fondo claro.`;
      } else {
        contrastMessage.textContent = `Contraste bajo (${state.validation.contrastRatio}:1 — mínimo recomendado 3.0:1). Incrementa la diferencia entre puntos y fondo para asegurar el escaneo.`;
      }
    } else {
      contrastAlert.classList.add('hidden');
      contrastAlert.classList.remove('flex');
    }
  }

  function syncQrRender(): void {
    state.rawPayload = computePayloadFromDom();
    if (payloadPreview) {
      payloadPreview.textContent =
        state.rawPayload.length > 68 ? `${state.rawPayload.slice(0, 68)}…` : state.rawPayload;
    }
    updateContrastUi();
    qrCode.update(buildQrOptions(state));
  }

  function switchMode(newMode: QrContentMode): void {
    state.mode = newMode;

    tabButtons.forEach((btn) => {
      const isSelected = btn.dataset.qrTab === newMode;
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      if (isSelected) {
        btn.classList.add('border-primary', 'bg-primary', 'text-gradient-secondary');
        btn.classList.remove('border-white/10', 'bg-gradient-primary/60', 'text-secondary/80');
      } else {
        btn.classList.remove('border-primary', 'bg-primary', 'text-gradient-secondary');
        btn.classList.add('border-white/10', 'bg-gradient-primary/60', 'text-secondary/80');
      }
    });

    tabPanels.forEach((panel) => {
      if (panel.dataset.qrPanel === newMode) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });

    syncQrRender();
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.qrTab as QrContentMode | undefined;
      if (mode) {
        switchMode(mode);
      }
    });
  });

  dotButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dotType = btn.dataset.qrDot as QrDotStyle | undefined;
      if (!dotType) return;
      state.design.dotsType = dotType;

      dotButtons.forEach((item) => {
        const active = item.dataset.qrDot === dotType;
        item.setAttribute('aria-pressed', active ? 'true' : 'false');
        item.classList.toggle('border-primary', active);
        item.classList.toggle('bg-primary/20', active);
        item.classList.toggle('text-secondary', active);
        item.classList.toggle('border-white/10', !active);
        item.classList.toggle('bg-gradient-primary/50', !active);
        item.classList.toggle('text-secondary/75', !active);
      });

      syncQrRender();
    });
  });

  cornerButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cornerType = btn.dataset.qrCorner as QrCornerStyle | undefined;
      if (!cornerType) return;
      state.design.cornersType = cornerType;

      cornerButtons.forEach((item) => {
        const active = item.dataset.qrCorner === cornerType;
        item.setAttribute('aria-pressed', active ? 'true' : 'false');
        item.classList.toggle('border-primary', active);
        item.classList.toggle('bg-primary/20', active);
        item.classList.toggle('text-secondary', active);
        item.classList.toggle('border-white/10', !active);
        item.classList.toggle('bg-gradient-primary/50', !active);
        item.classList.toggle('text-secondary/75', !active);
      });

      syncQrRender();
    });
  });

  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dots = btn.dataset.dots;
      const bg = btn.dataset.bg;
      if (!dots || !bg) return;

      state.design.dotsColor = dots;
      state.design.bgColor = bg;
      if (dotsColorInput) dotsColorInput.value = dots;
      if (bgColorInput) bgColorInput.value = bg;
      syncQrRender();
    });
  });

  if (contrastFixBtn) {
    contrastFixBtn.addEventListener('click', () => {
      state.design.dotsColor = '#001217';
      state.design.bgColor = '#ffffff';
      if (dotsColorInput) dotsColorInput.value = '#001217';
      if (bgColorInput) bgColorInput.value = '#ffffff';
      syncQrRender();
    });
  }

  form.addEventListener('input', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    if (target.id === 'qr-dots-color' || target.id === 'qr-bg-color') {
      if (dotsColorInput) state.design.dotsColor = dotsColorInput.value;
      if (bgColorInput) state.design.bgColor = bgColorInput.value;

      if (colorDebounceTimer) {
        clearTimeout(colorDebounceTimer);
      }
      colorDebounceTimer = setTimeout(() => {
        syncQrRender();
      }, 45);
      return;
    }

    syncQrRender();
  });

  form.addEventListener('change', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target || target.id === 'qr-logo-input') return;
    syncQrRender();
  });

  if (logoInput) {
    logoInput.addEventListener('change', () => {
      const file = logoInput.files?.[0];
      if (!file) return;

      revokeActiveLogoUrl();
      activeLogoObjectUrl = URL.createObjectURL(file);
      state.design.logoObjectUrl = activeLogoObjectUrl;

      if (logoFileName) {
        logoFileName.textContent = file.name;
      }
      if (logoRemoveBtn) {
        logoRemoveBtn.classList.remove('hidden');
        logoRemoveBtn.classList.add('inline-flex');
      }

      syncQrRender();
    });
  }

  if (logoRemoveBtn) {
    logoRemoveBtn.addEventListener('click', () => {
      revokeActiveLogoUrl();
      state.design.logoObjectUrl = null;
      if (logoInput) {
        logoInput.value = '';
      }
      if (logoFileName) {
        logoFileName.textContent = 'Sin logotipo (opcional — PNG, SVG, WebP)';
      }
      logoRemoveBtn.classList.add('hidden');
      logoRemoveBtn.classList.remove('inline-flex');

      syncQrRender();
    });
  }

  const downloadButtons = document.querySelectorAll<HTMLButtonElement>('[data-qr-download]');
  downloadButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const format = (btn.dataset.qrDownload as QrExportFormat | undefined) ?? 'png';
      const fileSlug = `qr-svtech-${state.mode}`;
      void qrCode.download({
        name: fileSlug,
        extension: format,
      });

      if (downloadFeedback) {
        downloadFeedback.classList.remove('hidden');
        downloadFeedback.classList.add('flex');
      }
    });
  });

  syncQrRender();
}

export function cleanupQrGenerator(): void {
  if (colorDebounceTimer) {
    clearTimeout(colorDebounceTimer);
    colorDebounceTimer = null;
  }
  revokeActiveLogoUrl();
}
