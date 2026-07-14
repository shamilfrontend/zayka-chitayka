import { ref } from "vue";
import type { LevelId } from "../data/levels";
import {
  addStars,
  isSectionPassed,
  loadProgress,
  markLetterLearned,
  markSectionPassed as persistSectionPassed,
  markSyllableLearned,
  markWordLearned,
  resetProgress as persistReset,
  setLevel as persistLevel,
  type Progress,
  type SectionId,
} from "../lib/progress";

/** Общий стейт прогресса на всё приложение */
const progress = ref<Progress>(loadProgress());

export function useProgress() {
  const refresh = () => {
    progress.value = loadProgress();
  };

  const setLevel = (level: LevelId) => {
    progress.value = persistLevel(level);
  };

  const learnLetter = (char: string) => {
    progress.value = markLetterLearned(char);
  };

  const learnSyllable = (text: string) => {
    progress.value = markSyllableLearned(text);
  };

  const learnWord = (text: string) => {
    progress.value = markWordLearned(text);
  };

  const awardStars = (count: number) => {
    progress.value = addStars(count);
  };

  const passSection = (section: SectionId, level?: LevelId) => {
    const activeLevel = level ?? progress.value.level;
    progress.value = persistSectionPassed(activeLevel, section);
  };

  const sectionPassed = (section: SectionId, level?: LevelId) => {
    const activeLevel = level ?? progress.value.level;
    return isSectionPassed(progress.value, activeLevel, section);
  };

  const reset = () => {
    progress.value = persistReset();
  };

  return {
    progress,
    refresh,
    setLevel,
    learnLetter,
    learnSyllable,
    learnWord,
    awardStars,
    passSection,
    sectionPassed,
    reset,
  };
}
