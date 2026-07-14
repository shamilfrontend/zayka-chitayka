import { computed } from "vue";
import { LETTERS } from "../data/letters";
import { INTRO_SYLLABLES } from "../data/syllables";
import { WORDS } from "../data/words";
import { isSectionPassed } from "../lib/progress";
import { useProgress } from "./useProgress";

/** Контент букв / слогов / слов для обучения */
export function useLevelContent() {
  const { progress } = useProgress();

  const letters = computed(() => LETTERS);
  const syllables = computed(() => INTRO_SYLLABLES);
  const words = computed(() => WORDS);

  const lettersDone = computed(
    () =>
      letters.value.filter((l) =>
        progress.value.lettersLearned.includes(l.char),
      ).length,
  );

  const syllablesDone = computed(
    () =>
      syllables.value.filter((s) =>
        progress.value.syllablesLearned.includes(s.text),
      ).length,
  );

  const wordsDone = computed(
    () =>
      words.value.filter((w) =>
        progress.value.wordsLearned.includes(w.text),
      ).length,
  );

  const lettersPassed = computed(() =>
    isSectionPassed(progress.value, "letters"),
  );

  const syllablesPassed = computed(() =>
    isSectionPassed(progress.value, "syllables"),
  );

  const wordsPassed = computed(() => isSectionPassed(progress.value, "words"));

  return {
    letters,
    syllables,
    words,
    lettersDone,
    syllablesDone,
    wordsDone,
    lettersPassed,
    syllablesPassed,
    wordsPassed,
  };
}
