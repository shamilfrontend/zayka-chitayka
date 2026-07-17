import { ref } from "vue";
import {
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

/** Общий стейт прогресса на всё приложение */
const progress = ref<Progress>(loadProgress());

export function useProgress() {
  const learnLetter = (char: string) => {
    progress.value = markLetterLearned(char);
  };

  const learnSyllable = (text: string) => {
    progress.value = markSyllableLearned(text);
  };

  const learnWord = (text: string) => {
    progress.value = markWordLearned(text);
  };

  const learnNumber = (digit: string) => {
    progress.value = markNumberLearned(digit);
  };

  const learnInteger = (text: string) => {
    progress.value = markIntegerLearned(text);
  };

  const passSection = (section: SectionId) => {
    progress.value = persistSectionPassed(section);
  };

  const sectionPassed = (section: SectionId) => {
    return isSectionPassed(progress.value, section);
  };

  const reset = () => {
    progress.value = persistReset();
  };

  return {
    progress,
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
