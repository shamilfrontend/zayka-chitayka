/** Короткие игровые звуки через Web Audio API (без внешних файлов). */

let sharedContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") {
    return null;
  }

  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioCtx) {
    return null;
  }

  if (!sharedContext) {
    sharedContext = new AudioCtx();
  }

  if (sharedContext.state === "suspended") {
    void sharedContext.resume();
  }

  return sharedContext;
}

function playTone(
  frequency: number,
  startAt: number,
  duration: number,
  type: OscillatorType = "sine",
  gainValue = 0.12,
): void {
  const ctx = getContext();
  if (!ctx) {
    return;
  }

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime + startAt;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

/** Весёлый аккорд при верном ответе / сдаче раздела */
export function playSuccess(): void {
  playTone(523.25, 0, 0.14, "triangle", 0.1);
  playTone(659.25, 0.08, 0.16, "triangle", 0.1);
  playTone(783.99, 0.16, 0.22, "sine", 0.12);
}

/** Мягкий низкий тон при ошибке */
export function playTryAgain(): void {
  playTone(311.13, 0, 0.18, "sine", 0.08);
  playTone(246.94, 0.1, 0.22, "triangle", 0.07);
}
