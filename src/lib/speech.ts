/** Озвучка на русском через Web Speech API */

let voicesReady = false;

function ensureVoices(): void {
  if (voicesReady || typeof window === "undefined" || !window.speechSynthesis) {
    return;
  }

  const load = () => {
    voicesReady = window.speechSynthesis.getVoices().length > 0;
  };

  load();
  window.speechSynthesis.addEventListener("voiceschanged", load, { once: true });
}

function pickRussianVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  const ru =
    voices.find((v) => v.lang === "ru-RU") ??
    voices.find((v) => v.lang.startsWith("ru"));

  return ru ?? null;
}

/** Есть ли поддержка озвучки в браузере */
export function canSpeakRussian(): boolean {
  return typeof window !== "undefined" && !!window.speechSynthesis;
}

/**
 * Произнести текст по-русски.
 * @returns false, если Speech API недоступен
 */
export function speakRussian(text: string, rate = 0.85): boolean {
  if (!canSpeakRussian()) {
    return false;
  }

  ensureVoices();
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ru-RU";
  utterance.rate = rate;
  utterance.pitch = 1.05;

  const voice = pickRussianVoice();
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
  return true;
}
