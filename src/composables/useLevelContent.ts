import { computed } from "vue";
import { INTRO_SYLLABLES as AV_SYLLABLES } from "../data/av/syllables";
import { LETTERS as AV_LETTERS } from "../data/av/letters";
import { WORDS as AV_WORDS } from "../data/av/words";
import { INTEGERS } from "../data/integers";
import { LETTERS as RU_LETTERS } from "../data/letters";
import { NUMBERS } from "../data/numbers";
import { INTRO_SYLLABLES as RU_SYLLABLES } from "../data/syllables";
import { WORDS as RU_WORDS } from "../data/words";
import { isSectionPassed } from "../lib/progress";
import { useLocale } from "./useLocale";
import { useProgress } from "./useProgress";

/** Контент разделов обучения */
export function useLevelContent() {
  const { progress, reading } = useProgress();
  const { locale } = useLocale();

  const letters = computed(() =>
    locale.value === "av" ? AV_LETTERS : RU_LETTERS,
  );
  const syllables = computed(() =>
    locale.value === "av" ? AV_SYLLABLES : RU_SYLLABLES,
  );
  const words = computed(() => (locale.value === "av" ? AV_WORDS : RU_WORDS));
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
    isSectionPassed(progress.value, "letters", locale.value),
  );

  const syllablesPassed = computed(() =>
    isSectionPassed(progress.value, "syllables", locale.value),
  );

  const wordsPassed = computed(() =>
    isSectionPassed(progress.value, "words", locale.value),
  );

  const numbersPassed = computed(() =>
    isSectionPassed(progress.value, "numbers", locale.value),
  );

  const integersPassed = computed(() =>
    isSectionPassed(progress.value, "integers", locale.value),
  );

  const additionPassed = computed(() =>
    isSectionPassed(progress.value, "addition", locale.value),
  );

  const subtractionPassed = computed(() =>
    isSectionPassed(progress.value, "subtraction", locale.value),
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
