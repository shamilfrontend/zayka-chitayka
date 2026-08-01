import { computed } from "vue";
import { CAPITALS } from "../data/capitals";
import { INTEGERS } from "../data/integers";
import { LETTERS } from "../data/letters";
import { NUMBERS } from "../data/numbers";
import { INTRO_SYLLABLES } from "../data/syllables";
import { WORDS } from "../data/words";
import { isSectionPassed } from "../lib/progress";
import { useProgress } from "./useProgress";

/** Контент разделов обучения */
export function useLevelContent() {
  const { progress, reading } = useProgress();

  const letters = computed(() => LETTERS);
  const syllables = computed(() => INTRO_SYLLABLES);
  const words = computed(() => WORDS);
  const numbers = computed(() => NUMBERS);
  const integers = computed(() => INTEGERS);
  const capitals = computed(() => CAPITALS);

  const lettersDone = computed(
    () =>
      letters.value.filter((l) =>
        reading.value.lettersLearned.includes(l.char),
      ).length,
  );

  const syllablesDone = computed(
    () =>
      syllables.value.filter((s) =>
        reading.value.syllablesLearned.includes(s.text),
      ).length,
  );

  const wordsDone = computed(
    () =>
      words.value.filter((w) =>
        reading.value.wordsLearned.includes(w.text),
      ).length,
  );

  const numbersDone = computed(
    () =>
      numbers.value.filter((n) =>
        progress.value.numbersLearned.includes(n.digit),
      ).length,
  );

  const integersDone = computed(
    () =>
      integers.value.filter((n) =>
        progress.value.integersLearned.includes(n.text),
      ).length,
  );

  const capitalsDone = computed(
    () =>
      capitals.value.filter((item) =>
        progress.value.capitalsLearned.includes(item.country),
      ).length,
  );

  const lettersPassed = computed(() =>
    isSectionPassed(progress.value, "letters"),
  );

  const syllablesPassed = computed(() =>
    isSectionPassed(progress.value, "syllables"),
  );

  const wordsPassed = computed(() => isSectionPassed(progress.value, "words"));

  const numbersPassed = computed(() =>
    isSectionPassed(progress.value, "numbers"),
  );

  const integersPassed = computed(() =>
    isSectionPassed(progress.value, "integers"),
  );

  const additionPassed = computed(() =>
    isSectionPassed(progress.value, "addition"),
  );

  const subtractionPassed = computed(() =>
    isSectionPassed(progress.value, "subtraction"),
  );

  const capitalsPassed = computed(() =>
    isSectionPassed(progress.value, "capitals"),
  );

  return {
    letters,
    syllables,
    words,
    numbers,
    integers,
    capitals,
    lettersDone,
    syllablesDone,
    wordsDone,
    numbersDone,
    integersDone,
    capitalsDone,
    lettersPassed,
    syllablesPassed,
    wordsPassed,
    numbersPassed,
    integersPassed,
    additionPassed,
    subtractionPassed,
    capitalsPassed,
  };
}
