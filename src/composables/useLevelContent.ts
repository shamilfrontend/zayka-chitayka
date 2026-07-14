import { computed } from "vue";
import { getLettersForLevel } from "../data/letters";
import { getSyllablesForLevel } from "../data/syllables";
import { getWordsForLevel } from "../data/words";
import { isSectionPassed } from "../lib/progress";
import { useProgress } from "./useProgress";

/** Контент букв / слогов / слов для активного уровня */
export function useLevelContent() {
  const { progress } = useProgress();

  const letters = computed(() => getLettersForLevel(progress.value.level));
  const syllables = computed(() => getSyllablesForLevel(progress.value.level));
  const words = computed(() => getWordsForLevel(progress.value.level));

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
    isSectionPassed(progress.value, progress.value.level, "letters"),
  );

  const syllablesPassed = computed(() =>
    isSectionPassed(progress.value, progress.value.level, "syllables"),
  );

  const wordsPassed = computed(() =>
    isSectionPassed(progress.value, progress.value.level, "words"),
  );

  const sectionsPassedCount = computed(
    () =>
      Number(lettersPassed.value) +
      Number(syllablesPassed.value) +
      Number(wordsPassed.value),
  );

  return {
    level: computed(() => progress.value.level),
    letters,
    syllables,
    words,
    lettersDone,
    syllablesDone,
    wordsDone,
    lettersPassed,
    syllablesPassed,
    wordsPassed,
    sectionsPassedCount,
  };
}
