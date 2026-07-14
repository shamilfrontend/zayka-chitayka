import { isLevelId, type LevelId } from "../data/levels";

const STORAGE_KEY = "reader-bunny-progress";

export type SectionId = "letters" | "syllables" | "words";

export type SectionsPassed = Partial<
  Record<LevelId, Partial<Record<SectionId, boolean>>>
>;

export interface Progress {
  lettersLearned: string[];
  syllablesLearned: string[];
  wordsLearned: string[];
  stars: number;
  level: LevelId;
  sectionsPassed: SectionsPassed;
}

const DEFAULT_PROGRESS: Progress = {
  lettersLearned: [],
  syllablesLearned: [],
  wordsLearned: [],
  stars: 0,
  level: "basic",
  sectionsPassed: {},
};

function parseSectionsPassed(value: unknown): SectionsPassed {
  if (!value || typeof value !== "object") {
    return {};
  }

  return value as SectionsPassed;
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_PROGRESS, sectionsPassed: {} };
    }

    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      lettersLearned: parsed.lettersLearned ?? [],
      syllablesLearned: parsed.syllablesLearned ?? [],
      wordsLearned: parsed.wordsLearned ?? [],
      stars: typeof parsed.stars === "number" ? parsed.stars : 0,
      level: isLevelId(parsed.level) ? parsed.level : "basic",
      sectionsPassed: parseSectionsPassed(parsed.sectionsPassed),
    };
  } catch {
    return { ...DEFAULT_PROGRESS, sectionsPassed: {} };
  }
}

export function saveProgress(progress: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function setLevel(level: LevelId): Progress {
  const progress = loadProgress();
  progress.level = level;
  saveProgress(progress);
  return progress;
}

export function isSectionPassed(
  progress: Progress,
  level: LevelId,
  section: SectionId,
): boolean {
  return progress.sectionsPassed[level]?.[section] === true;
}

export function markSectionPassed(
  level: LevelId,
  section: SectionId,
): Progress {
  const progress = loadProgress();
  const levelPassed = { ...progress.sectionsPassed[level], [section]: true };
  progress.sectionsPassed = {
    ...progress.sectionsPassed,
    [level]: levelPassed,
  };
  saveProgress(progress);
  return progress;
}

export function markLetterLearned(char: string): Progress {
  const progress = loadProgress();
  const upper = char.toUpperCase();

  if (!progress.lettersLearned.includes(upper)) {
    progress.lettersLearned = [...progress.lettersLearned, upper];
    progress.stars += 1;
    saveProgress(progress);
  }

  return progress;
}

export function markSyllableLearned(text: string): Progress {
  const progress = loadProgress();
  const upper = text.toUpperCase();

  if (!progress.syllablesLearned.includes(upper)) {
    progress.syllablesLearned = [...progress.syllablesLearned, upper];
    progress.stars += 1;
    saveProgress(progress);
  }

  return progress;
}

export function markWordLearned(text: string): Progress {
  const progress = loadProgress();
  const upper = text.toUpperCase();

  if (!progress.wordsLearned.includes(upper)) {
    progress.wordsLearned = [...progress.wordsLearned, upper];
    progress.stars += 1;
    saveProgress(progress);
  }

  return progress;
}

export function addStars(count: number): Progress {
  const progress = loadProgress();
  progress.stars += count;
  saveProgress(progress);
  return progress;
}

/** Полный сброс прогресса (сохраняет только выбранный уровень) */
export function resetProgress(): Progress {
  const current = loadProgress();
  const next: Progress = {
    ...DEFAULT_PROGRESS,
    level: current.level,
    lettersLearned: [],
    syllablesLearned: [],
    wordsLearned: [],
    sectionsPassed: {},
  };
  saveProgress(next);
  return next;
}

/** Перемешать массив (Fisher–Yates) */
export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

/** Варианты ответов: правильный + distractors из пула */
export function buildChoices<T>(
  correct: T,
  pool: T[],
  count: number,
  getKey: (item: T) => string,
): T[] {
  const key = getKey(correct);
  const distractors = shuffle(pool.filter((item) => getKey(item) !== key)).slice(
    0,
    Math.max(0, count - 1),
  );

  return shuffle([correct, ...distractors]);
}
