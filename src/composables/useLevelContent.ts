import { computed } from "vue";
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

  return {
    letters,
    syllables,
    words,
    numbers,
    integers,
    lettersDone,
    syllablesDone,
    wordsDone,
    numbersDone,
    integersDone,
    lettersPassed,
    syllablesPassed,
    wordsPassed,
    numbersPassed,
    integersPassed,
    additionPassed,
    subtractionPassed,
  };
}
