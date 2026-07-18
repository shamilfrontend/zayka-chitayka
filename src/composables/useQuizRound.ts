import { computed, onUnmounted, ref, watch, type Ref } from "vue";
import { buildChoices } from "../lib/progress";
import { speakRussian } from "../lib/speech";
import { playSuccess, playTryAgain } from "../lib/sounds";

type QuizFeedback = "idle" | "correct" | "retry";
type ButtonVariant = "mint" | "peach" | "sky" | "cream" | "ghost";

/** Сколько верных ответов нужно на каждый урок раздела */
const CORRECTS_PER_LESSON = 3;

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
 * Мини-игра раздела: 3 верных ответа на каждый урок,
 * прогресс и экран завершения.
 */
export function useQuizRound<T>(options: UseQuizRoundOptions<T>) {
  const idleVariant = options.idleVariant ?? "peach";
  const correctVariant = options.correctVariant ?? "mint";
  const retryVariant = options.retryVariant ?? "cream";

  const winsByKey = ref<Record<string, number>>({});
  const done = ref(false);
  const feedback = ref<QuizFeedback>("idle");
  let advanceTimer: number | undefined;
  let retryTimer: number | undefined;

  const winsOf = (key: string): number => winsByKey.value[key] ?? 0;

  const goal = computed(
    () => Math.max(options.pool().length, 0) * CORRECTS_PER_LESSON,
  );

  const progress = computed(() => {
    const pool = options.pool();
    return pool.reduce((sum, item) => {
      const wins = winsOf(options.getKey(item));
      return sum + Math.min(wins, CORRECTS_PER_LESSON);
    }, 0);
  });

  const counterLabel = computed(() => `${progress.value} / ${goal.value}`);

  const isComplete = (): boolean =>
    goal.value > 0 && progress.value >= goal.value;

  function pickTarget(pool: T[]): T {
    const unfinished = pool.filter(
      (item) => winsOf(options.getKey(item)) < CORRECTS_PER_LESSON,
    );
    const candidates = unfinished.length > 0 ? unfinished : pool;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function nextRound(): QuizRound<T> {
    const pool = options.pool();
    const target = pickTarget(pool);
    const choices = buildChoices(
      target,
      pool,
      options.choiceCount,
      options.getKey,
    );
    return { target, choices };
  }

  const round: Ref<QuizRound<T>> = ref(nextRound()) as Ref<QuizRound<T>>;

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
    if (done.value) {
      return;
    }

    const target = round.value.target;
    if (target) {
      options.onAsk(target);
    }
  };

  watch(
    round,
    (value) => {
      if (done.value) {
        return;
      }

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
    if (done.value || feedback.value === "correct") {
      return;
    }

    const correct =
      options.getKey(item) === options.getKey(round.value.target);

    if (correct) {
      feedback.value = "correct";
      options.onCorrect(item);

      const key = options.getKey(item);
      const current = winsOf(key);
      if (current < CORRECTS_PER_LESSON) {
        winsByKey.value = {
          ...winsByKey.value,
          [key]: current + 1,
        };
      }

      playSuccess();

      const phrase =
        typeof options.successPhrase === "function"
          ? options.successPhrase(item)
          : (options.successPhrase ?? "Молодец!");
      speakRussian(phrase);

      clearTimers();
      advanceTimer = window.setTimeout(() => {
        advanceTimer = undefined;

        if (isComplete()) {
          done.value = true;
          feedback.value = "idle";
          speakRussian("Игра пройдена!");
          return;
        }

        round.value = nextRound();
        feedback.value = "idle";
      }, 1100);
      return;
    }

    feedback.value = "retry";
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
    done,
    progress,
    goal,
    counterLabel,
    ask,
    pick,
    choiceVariant,
  };
}
