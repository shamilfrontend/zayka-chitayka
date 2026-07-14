import { computed, ref, type Ref } from "vue";
import { buildChoices, shuffle } from "../lib/progress";
import { playSuccess, playTryAgain } from "../lib/sounds";

export type TestFeedback = "idle" | "correct" | "wrong";
export type TestPhase = "question" | "result";

interface UseSectionTestOptions<T> {
  pool: () => T[];
  getKey: (item: T) => string;
  choiceCount: number;
  onAsk: (target: T) => void;
  onFinish: (passed: boolean) => void;
}

/**
 * Итоговый тест раздела: один вопрос на каждый элемент,
 * одна попытка, затем экран результата.
 */
export function useSectionTest<T>(options: UseSectionTestOptions<T>) {
  const queue: Ref<T[]> = ref([]);
  const index = ref(0);
  const choices: Ref<T[]> = ref([]);
  const feedback = ref<TestFeedback>("idle");
  const errors = ref(0);
  const phase = ref<TestPhase>("question");
  const burst = ref(false);
  let advanceTimer: number | undefined;

  const total = computed(() => queue.value.length);
  const target = computed(() => queue.value[index.value]);
  const passed = computed(() => errors.value === 0);
  const counterLabel = computed(
    () => `${Math.min(index.value + 1, total.value)} / ${total.value}`,
  );

  const syncChoices = () => {
    const current = queue.value[index.value];
    if (!current) {
      choices.value = [];
      return;
    }
    choices.value = buildChoices(
      current,
      options.pool(),
      options.choiceCount,
      options.getKey,
    );
  };

  const start = () => {
    if (advanceTimer !== undefined) {
      window.clearTimeout(advanceTimer);
      advanceTimer = undefined;
    }
    queue.value = shuffle(options.pool());
    index.value = 0;
    errors.value = 0;
    feedback.value = "idle";
    burst.value = false;
    phase.value = queue.value.length > 0 ? "question" : "result";
    syncChoices();

    if (phase.value === "question") {
      ask();
    }
  };

  const ask = () => {
    const current = target.value;
    if (current && phase.value === "question") {
      options.onAsk(current);
    }
  };

  const finish = () => {
    phase.value = "result";
    options.onFinish(passed.value);
  };

  const goNext = () => {
    feedback.value = "idle";
    burst.value = false;

    if (index.value + 1 >= queue.value.length) {
      finish();
      return;
    }

    index.value += 1;
    syncChoices();
    ask();
  };

  const pick = (item: T) => {
    if (phase.value !== "question" || feedback.value !== "idle") {
      return;
    }

    const current = target.value;
    if (!current) {
      return;
    }

    const correct =
      options.getKey(item) === options.getKey(current);

    if (correct) {
      feedback.value = "correct";
      burst.value = true;
      playSuccess();
    } else {
      feedback.value = "wrong";
      errors.value += 1;
      playTryAgain();
    }

    advanceTimer = window.setTimeout(() => {
      advanceTimer = undefined;
      goNext();
    }, 1100);
  };

  const choiceVariant = (
    item: T,
    correctVariant: "mint" | "peach" | "sky" | "cream",
    idleVariant: "mint" | "peach" | "sky" | "cream",
  ) => {
    const current = target.value;
    if (!current) {
      return idleVariant;
    }

    const isTarget = options.getKey(item) === options.getKey(current);

    if (feedback.value === "correct" && isTarget) {
      return correctVariant;
    }
    if (feedback.value === "wrong" && isTarget) {
      return correctVariant;
    }
    return idleVariant;
  };

  start();

  return {
    target,
    choices,
    feedback,
    errors,
    phase,
    burst,
    total,
    passed,
    counterLabel,
    index,
    ask,
    pick,
    choiceVariant,
    start,
  };
}
