import { onUnmounted, ref, watch, type Ref } from "vue";
import { buildChoices } from "../lib/progress";
import { speakRussian } from "../lib/speech";
import { playSuccess, playTryAgain } from "../lib/sounds";

type QuizFeedback = "idle" | "correct" | "retry";
type ButtonVariant = "mint" | "peach" | "sky" | "cream" | "ghost";

interface QuizRound<T> {
  target: T;
  choices: T[];
}

interface UseQuizRoundOptions<T> {
  pool: () => T[];
  getKey: (item: T) => string;
  choiceCount: number;
  onAsk: (target: T) => void;
  onCorrect: (item: T) => void;
  /** Один раз при старте раунда, до озвучки */
  onNewRound?: (target: T) => void;
  successPhrase?: string | ((item: T) => string);
  idleVariant?: ButtonVariant;
  correctVariant?: ButtonVariant;
  retryVariant?: ButtonVariant;
}

/**
 * Мини-игра раздела: бесконечные раунды, streak, мягкий retry.
 */
export function useQuizRound<T>(options: UseQuizRoundOptions<T>) {
  const idleVariant = options.idleVariant ?? "peach";
  const correctVariant = options.correctVariant ?? "mint";
  const retryVariant = options.retryVariant ?? "cream";

  function nextRound(): QuizRound<T> {
    const pool = options.pool();
    const target = pool[Math.floor(Math.random() * pool.length)];
    const choices = buildChoices(
      target,
      pool,
      options.choiceCount,
      options.getKey,
    );
    return { target, choices };
  }

  const round: Ref<QuizRound<T>> = ref(nextRound()) as Ref<QuizRound<T>>;
  const feedback = ref<QuizFeedback>("idle");
  const streak = ref(0);
  let advanceTimer: number | undefined;
  let retryTimer: number | undefined;

  const clearTimers = () => {
    if (advanceTimer !== undefined) {
      window.clearTimeout(advanceTimer);
      advanceTimer = undefined;
    }
    if (retryTimer !== undefined) {
      window.clearTimeout(retryTimer);
      retryTimer = undefined;
    }
  };

  const ask = () => {
    const target = round.value.target;
    if (target) {
      options.onAsk(target);
    }
  };

  watch(
    round,
    (value) => {
      options.onNewRound?.(value.target);
      ask();
    },
    { immediate: true },
  );

  onUnmounted(clearTimers);

  const choiceVariant = (item: T): ButtonVariant => {
    const key = options.getKey(item);
    const targetKey = options.getKey(round.value.target);

    if (feedback.value === "correct" && key === targetKey) {
      return correctVariant;
    }
    if (feedback.value === "retry") {
      return retryVariant;
    }
    return idleVariant;
  };

  const pick = (item: T) => {
    if (feedback.value === "correct") {
      return;
    }

    const correct =
      options.getKey(item) === options.getKey(round.value.target);

    if (correct) {
      feedback.value = "correct";
      options.onCorrect(item);
      streak.value += 1;
      playSuccess();

      const phrase =
        typeof options.successPhrase === "function"
          ? options.successPhrase(item)
          : (options.successPhrase ?? "Молодец!");
      speakRussian(phrase);

      clearTimers();
      advanceTimer = window.setTimeout(() => {
        advanceTimer = undefined;
        round.value = nextRound();
        feedback.value = "idle";
      }, 1100);
      return;
    }

    feedback.value = "retry";
    streak.value = 0;
    playTryAgain();
    speakRussian("Попробуй ещё");

    clearTimers();
    retryTimer = window.setTimeout(() => {
      retryTimer = undefined;
      feedback.value = "idle";
    }, 700);
  };

  return {
    round,
    feedback,
    streak,
    ask,
    pick,
    choiceVariant,
  };
}
