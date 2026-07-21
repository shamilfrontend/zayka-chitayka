import { ref } from "vue";
import {
  getLocale,
  onLocaleChange,
  setLocale as persistLocale,
  type Locale,
} from "../lib/locale";

const locale = ref<Locale>(getLocale());

let subscribed = false;

function ensureSubscription(): void {
  if (subscribed) {
    return;
  }

  subscribed = true;
  onLocaleChange(() => {
    locale.value = getLocale();
  });
}

/** Реактивный язык изучения */
export function useLocale() {
  ensureSubscription();

  const selectLocale = (value: Locale) => {
    persistLocale(value);
    locale.value = value;
  };

  return {
    locale,
    selectLocale,
  };
}
