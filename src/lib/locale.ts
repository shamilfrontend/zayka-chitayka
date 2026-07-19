const LOCALE_KEY = "reader-bunny-locale";

export type Locale = "ru" | "av";

const DEFAULT_LOCALE: Locale = "ru";

const LISTENERS = new Set<() => void>();

function isLocale(value: unknown): value is Locale {
  return value === "ru" || value === "av";
}

export function getLocale(): Locale {
  try {
    const value = localStorage.getItem(LOCALE_KEY);
    if (isLocale(value)) {
      return value;
    }
  } catch {
    /* private mode / blocked storage */
  }
  return DEFAULT_LOCALE;
}

export function setLocale(value: Locale): void {
  try {
    localStorage.setItem(LOCALE_KEY, value);
  } catch {
    /* ignore */
  }

  for (const listener of LISTENERS) {
    listener();
  }
}

/** Подписка на смену языка изучения (для реактивности вне Vue) */
export function onLocaleChange(listener: () => void): () => void {
  LISTENERS.add(listener);
  return () => {
    LISTENERS.delete(listener);
  };
}
