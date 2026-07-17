const CONSENT_KEY = "reader-bunny-analytics-consent";
const METRIKA_ID = 110739961;

export type AnalyticsConsent = "accepted" | "declined";

export function getAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    if (value === "accepted" || value === "declined") {
      return value;
    }
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

export function setAnalyticsConsent(value: AnalyticsConsent): void {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
}

let metrikaStarted = false;

type YmQueue = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

/** Загружает Яндекс Метрику только после явного согласия (ст. 6 152-ФЗ). */
export function loadYandexMetrika(): void {
  if (typeof window === "undefined" || metrikaStarted) {
    return;
  }
  metrikaStarted = true;

  const scriptUrl = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`;

  const ym: YmQueue = function (...args: unknown[]) {
    (ym.a = ym.a || []).push(args);
  };
  ym.l = Date.now();
  window.ym = ym;

  const existing = document.querySelector(`script[src="${scriptUrl}"]`);
  if (!existing) {
    const script = document.createElement("script");
    script.async = true;
    script.src = scriptUrl;
    document.head.appendChild(script);
  }

  window.ym(METRIKA_ID, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}

export function trackPageHit(url: string): void {
  if (getAnalyticsConsent() !== "accepted") {
    return;
  }
  if (typeof window.ym === "function") {
    window.ym(METRIKA_ID, "hit", url);
  }
}
