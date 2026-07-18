import { computed, onUnmounted, ref, watch, type Ref } from "vue";
import {
  buildAnswerChoices,
  buildEquation,
  type EquationItem,
  type EquationOp,
  type EquationRange,
} from "../data/equations";
import { speakRussian } from "../lib/speech";
import { playSuccess, playTryAgain } from "../lib/sounds";

type QuizFeedback = "idle" | "correct" | "retry";
type ButtonVariant = "mint" | "peach" | "sky" | "cream" | "ghost";

const SESSION_GOAL = 10;

interface EquationRound {
  equation: EquationItem;
  choices: number[];
}

interface UseEquationQuizOptions {
  op: () => EquationOp;
  range: () => EquationRange;
  /** Игра активна (диапазон выбран) — иначе не озвучиваем */
  active: () => boolean;
}

/**
 * Игра «пример → ответ»: 10 верных за сессию, без сохранения прогресса.
 */
export function useEquationQuiz(options: UseEquationQuizOptions) {
  const wins = ref(0);
  const done = ref(false);
  const feedback = ref<QuizFeedback>("idle");
  let advanceTimer: number | undefined;
  let retryTimer: number | undefined;

  const goal = SESSION_GOAL;
  const counterLabel = computed(() => `${wins.value} / ${goal}`);

  function nextRound(): EquationRound {
    const max = options.range();
    const equation = buildEquation(options.op(), max);
    const choices = buildAnswerChoices(equation.result, max);

    return { equation, choices };
  }

  const round: Ref<EquationRound> = ref({
    equation: {
      id: "pending",
      left: 0,
      right: 0,
      result: 0,
      prompt: "",
      speakText: "",
    },
    choices: [],
  });

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
    if (done.value || !options.active()) {
      return;
    }

    speakRussian(round.value.equation.speakText);
  };

  watch(
    round,
    () => {
      if (done.value || !options.active()) {
        return;
      }

      ask();
    },
  );

  onUnmounted(clearTimers);

  const choiceVariant = (answer: number): ButtonVariant => {
    const correct = round.value.equation.result;

    if (feedback.value === "correct" && answer === correct) {
      return "mint";
    }

    if (feedback.value === "retry") {
      return "cream";
    }

    return "peach";
  };

  const pick = (answer: number) => {
    if (done.value || !options.active() || feedback.value === "correct") {
      return;
    }

    if (answer === round.value.equation.result) {
      feedback.value = "correct";
      wins.value += 1;
      playSuccess();
      speakRussian("Молодец!");

      clearTimers();
      advanceTimer = window.setTimeout(() => {
        advanceTimer = undefined;

        if (wins.value >= goal) {
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

  const restart = () => {
    clearTimers();
    wins.value = 0;
    done.value = false;
    feedback.value = "idle";
    round.value = nextRound();
  };

  return {
    round,
    feedback,
    done,
    goal,
    counterLabel,
    ask,
    pick,
    choiceVariant,
    restart,
  };
}
