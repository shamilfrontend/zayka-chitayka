const LOCALE_KEY = "reader-bunny-locale";

/** Язык изучения. `av` зарезервирован под будущий контент. */
export type Locale = "ru" | "av";

const DEFAULT_LOCALE: Locale = "ru";

const LISTENERS = new Set<() => void>();

function isActiveLocale(value: unknown): value is "ru" {
  return value === "ru";
}

export function getLocale(): Locale {
  try {
    const value = localStorage.getItem(LOCALE_KEY);
    // Аварский пока недоступен — откатываем сохранённый выбор
    if (value === "av") {
      localStorage.setItem(LOCALE_KEY, DEFAULT_LOCALE);
    } else if (isActiveLocale(value)) {
      return value;
    }
  } catch {
    /* private mode / blocked storage */
  }
  return DEFAULT_LOCALE;
}

export function setLocale(value: Locale): void {
  if (value !== "ru") {
    return;
  }

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
