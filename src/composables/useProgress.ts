import { computed, ref } from "vue";
import {
  getReadingProgress,
  isSectionPassed,
  loadProgress,
  markIntegerLearned,
  markLetterLearned,
  markNumberLearned,
  markSectionPassed as persistSectionPassed,
  markSyllableLearned,
  markWordLearned,
  resetProgress as persistReset,
  type Progress,
  type SectionId,
} from "../lib/progress";
import { useLocale } from "./useLocale";

/** Общий стейт прогресса на всё приложение */
const progress = ref<Progress>(loadProgress());

export function useProgress() {
  const { locale } = useLocale();

  const reading = computed(() =>
    getReadingProgress(progress.value, locale.value),
  );

  const learnLetter = (char: string) => {
    progress.value = markLetterLearned(char, locale.value);
  };

  const learnSyllable = (text: string) => {
    progress.value = markSyllableLearned(text, locale.value);
  };

  const learnWord = (text: string) => {
    progress.value = markWordLearned(text, locale.value);
  };

  const learnNumber = (digit: string) => {
    progress.value = markNumberLearned(digit);
  };

  const learnInteger = (text: string) => {
    progress.value = markIntegerLearned(text);
  };

  const passSection = (section: SectionId) => {
    progress.value = persistSectionPassed(section, locale.value);
  };

  const sectionPassed = (section: SectionId) => {
    return isSectionPassed(progress.value, section, locale.value);
  };

  const reset = () => {
    progress.value = persistReset();
  };

  return {
    progress,
    reading,
    learnLetter,
    learnSyllable,
    learnWord,
    learnNumber,
    learnInteger,
    passSection,
    sectionPassed,
    reset,
  };
}
