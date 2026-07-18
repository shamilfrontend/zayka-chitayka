const LOCALE_KEY = "reader-bunny-locale";

export type Locale = "ru";

const DEFAULT_LOCALE: Locale = "ru";

export function getLocale(): Locale {
  try {
    const value = localStorage.getItem(LOCALE_KEY);
    if (value === "ru") {
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
}
