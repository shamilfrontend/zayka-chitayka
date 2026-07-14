const STORAGE_KEY = "reader-bunny-progress";

export type SectionId = "letters" | "syllables" | "words";

type SectionsPassed = Partial<Record<SectionId, boolean>>;

export interface Progress {
  lettersLearned: string[];
  syllablesLearned: string[];
  wordsLearned: string[];
  sectionsPassed: SectionsPassed;
}

const DEFAULT_PROGRESS: Progress = {
  lettersLearned: [],
  syllablesLearned: [],
  wordsLearned: [],
  sectionsPassed: {},
};

const SECTION_IDS: SectionId[] = ["letters", "syllables", "words"];

/** Миграция со старого формата sectionsPassed по уровням */
function parseSectionsPassed(value: unknown): SectionsPassed {
  if (!value || typeof value !== "object") {
    return {};
  }

  const raw = value as Record<string, unknown>;
  const result: SectionsPassed = {};

  for (const section of SECTION_IDS) {
    if (raw[section] === true) {
      result[section] = true;
      continue;
    }

    // Старый формат: { basic: { letters: true }, advanced: { ... } }
    const fromBasic =
      raw.basic &&
      typeof raw.basic === "object" &&
      (raw.basic as Record<string, unknown>)[section] === true;
    const fromAdvanced =
      raw.advanced &&
      typeof raw.advanced === "object" &&
      (raw.advanced as Record<string, unknown>)[section] === true;

    if (fromBasic || fromAdvanced) {
      result[section] = true;
    }
  }

  return result;
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
      sectionsPassed: parseSectionsPassed(parsed.sectionsPassed),
    };
  } catch {
    return { ...DEFAULT_PROGRESS, sectionsPassed: {} };
  }
}

function saveProgress(progress: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isSectionPassed(
  progress: Progress,
  section: SectionId,
): boolean {
  return progress.sectionsPassed[section] === true;
}

export function markSectionPassed(section: SectionId): Progress {
  const progress = loadProgress();
  progress.sectionsPassed = {
    ...progress.sectionsPassed,
    [section]: true,
  };
  saveProgress(progress);
  return progress;
}

export function markLetterLearned(char: string): Progress {
  const progress = loadProgress();
  const upper = char.toUpperCase();

  if (!progress.lettersLearned.includes(upper)) {
    progress.lettersLearned = [...progress.lettersLearned, upper];
    saveProgress(progress);
  }

  return progress;
}

export function markSyllableLearned(text: string): Progress {
  const progress = loadProgress();
  const upper = text.toUpperCase();

  if (!progress.syllablesLearned.includes(upper)) {
    progress.syllablesLearned = [...progress.syllablesLearned, upper];
    saveProgress(progress);
  }

  return progress;
}

export function markWordLearned(text: string): Progress {
  const progress = loadProgress();
  const upper = text.toUpperCase();

  if (!progress.wordsLearned.includes(upper)) {
    progress.wordsLearned = [...progress.wordsLearned, upper];
    saveProgress(progress);
  }

  return progress;
}

export function resetProgress(): Progress {
  const next: Progress = {
    ...DEFAULT_PROGRESS,
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
