import { shuffle } from "./shuffle";
import { getLocale, type Locale } from "./locale";

const STORAGE_KEY = "reader-bunny-progress";

export { shuffle };

export type ReadingSectionId = "letters" | "syllables" | "words";

export type MathSectionId =
  | "numbers"
  | "integers"
  | "addition"
  | "subtraction";

export type SectionId = ReadingSectionId | MathSectionId;

type ReadingSectionsPassed = Partial<Record<ReadingSectionId, boolean>>;
type MathSectionsPassed = Partial<Record<MathSectionId, boolean>>;

export interface LocaleReadingProgress {
  lettersLearned: string[];
  syllablesLearned: string[];
  wordsLearned: string[];
  sectionsPassed: ReadingSectionsPassed;
}

export interface Progress {
  byLocale: Record<Locale, LocaleReadingProgress>;
  numbersLearned: string[];
  integersLearned: string[];
  sectionsPassed: MathSectionsPassed;
}

const READING_SECTION_IDS: ReadingSectionId[] = [
  "letters",
  "syllables",
  "words",
];

const MATH_SECTION_IDS: MathSectionId[] = [
  "numbers",
  "integers",
  "addition",
  "subtraction",
];

const SECTION_IDS: SectionId[] = [
  ...READING_SECTION_IDS,
  ...MATH_SECTION_IDS,
];

function emptyReadingProgress(): LocaleReadingProgress {
  return {
    lettersLearned: [],
    syllablesLearned: [],
    wordsLearned: [],
    sectionsPassed: {},
  };
}

const DIGIT_KEYS = new Set([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
]);

function isReadingSection(section: SectionId): section is ReadingSectionId {
  return (
    section === "letters" || section === "syllables" || section === "words"
  );
}

function parseStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function parseNumbersLearned(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string" && DIGIT_KEYS.has(item),
  );
}

function parseIntegersLearned(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => {
    if (typeof item !== "string") {
      return false;
    }

    const parsed = Number(item);
    return Number.isInteger(parsed) && parsed >= 0 && parsed <= 100;
  });
}

function parseReadingSectionsPassed(value: unknown): ReadingSectionsPassed {
  if (!value || typeof value !== "object") {
    return {};
  }

  const raw = value as Record<string, unknown>;
  const result: ReadingSectionsPassed = {};

  for (const section of READING_SECTION_IDS) {
    if (raw[section] === true) {
      result[section] = true;
    }
  }

  return result;
}

function parseMathSectionsPassed(value: unknown): MathSectionsPassed {
  if (!value || typeof value !== "object") {
    return {};
  }

  const raw = value as Record<string, unknown>;
  const result: MathSectionsPassed = {};

  for (const section of MATH_SECTION_IDS) {
    if (raw[section] === true) {
      result[section] = true;
      continue;
    }

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

/** Миграция со старого плоского формата + разделов по уровням */
function parseSectionsForMigration(value: unknown): {
  reading: ReadingSectionsPassed;
  math: MathSectionsPassed;
} {
  if (!value || typeof value !== "object") {
    return { reading: {}, math: {} };
  }

  const raw = value as Record<string, unknown>;
  const reading: ReadingSectionsPassed = {};
  const math: MathSectionsPassed = {};

  for (const section of SECTION_IDS) {
    let passed = raw[section] === true;

    if (!passed) {
      const fromBasic =
        raw.basic &&
        typeof raw.basic === "object" &&
        (raw.basic as Record<string, unknown>)[section] === true;
      const fromAdvanced =
        raw.advanced &&
        typeof raw.advanced === "object" &&
        (raw.advanced as Record<string, unknown>)[section] === true;
      passed = Boolean(fromBasic || fromAdvanced);
    }

    if (!passed) {
      continue;
    }

    if (isReadingSection(section)) {
      reading[section] = true;
    } else {
      math[section] = true;
    }
  }

  return { reading, math };
}

function parseLocaleReading(
  value: unknown,
  fallback?: LocaleReadingProgress,
): LocaleReadingProgress {
  if (!value || typeof value !== "object") {
    return fallback ?? emptyReadingProgress();
  }

  const raw = value as Partial<LocaleReadingProgress>;

  return {
    lettersLearned: parseStringList(raw.lettersLearned),
    syllablesLearned: parseStringList(raw.syllablesLearned),
    wordsLearned: parseStringList(raw.wordsLearned),
    sectionsPassed: parseReadingSectionsPassed(raw.sectionsPassed),
  };
}

function normalizeKey(value: string): string {
  return value.toLocaleUpperCase("ru-RU");
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        byLocale: {
          ru: emptyReadingProgress(),
          av: emptyReadingProgress(),
        },
        numbersLearned: [],
        integersLearned: [],
        sectionsPassed: {},
      };
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>;

    if (parsed.byLocale && typeof parsed.byLocale === "object") {
      const byLocaleRaw = parsed.byLocale as Record<string, unknown>;

      return {
        byLocale: {
          ru: parseLocaleReading(byLocaleRaw.ru),
          av: parseLocaleReading(byLocaleRaw.av),
        },
        numbersLearned: parseNumbersLearned(parsed.numbersLearned),
        integersLearned: parseIntegersLearned(parsed.integersLearned),
        sectionsPassed: parseMathSectionsPassed(parsed.sectionsPassed),
      };
    }

    // Старый формат → русский прогресс чтения
    const migrated = parseSectionsForMigration(parsed.sectionsPassed);

    return {
      byLocale: {
        ru: {
          lettersLearned: parseStringList(parsed.lettersLearned),
          syllablesLearned: parseStringList(parsed.syllablesLearned),
          wordsLearned: parseStringList(parsed.wordsLearned),
          sectionsPassed: migrated.reading,
        },
        av: emptyReadingProgress(),
      },
      numbersLearned: parseNumbersLearned(parsed.numbersLearned),
      integersLearned: parseIntegersLearned(parsed.integersLearned),
      sectionsPassed: migrated.math,
    };
  } catch {
    return {
      byLocale: {
        ru: emptyReadingProgress(),
        av: emptyReadingProgress(),
      },
      numbersLearned: [],
      integersLearned: [],
      sectionsPassed: {},
    };
  }
}

function saveProgress(progress: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getReadingProgress(
  progress: Progress,
  locale: Locale = getLocale(),
): LocaleReadingProgress {
  return progress.byLocale[locale];
}

export function isSectionPassed(
  progress: Progress,
  section: SectionId,
  locale: Locale = getLocale(),
): boolean {
  if (isReadingSection(section)) {
    return progress.byLocale[locale].sectionsPassed[section] === true;
  }

  return progress.sectionsPassed[section] === true;
}

export function markSectionPassed(
  section: SectionId,
  locale: Locale = getLocale(),
): Progress {
  const progress = loadProgress();

  if (isReadingSection(section)) {
    const reading = progress.byLocale[locale];
    progress.byLocale = {
      ...progress.byLocale,
      [locale]: {
        ...reading,
        sectionsPassed: {
          ...reading.sectionsPassed,
          [section]: true,
        },
      },
    };
  } else {
    progress.sectionsPassed = {
      ...progress.sectionsPassed,
      [section]: true,
    };
  }

  saveProgress(progress);
  return progress;
}

export function markLetterLearned(
  char: string,
  locale: Locale = getLocale(),
): Progress {
  const progress = loadProgress();
  const key = normalizeKey(char);
  const reading = progress.byLocale[locale];

  if (!reading.lettersLearned.includes(key)) {
    progress.byLocale = {
      ...progress.byLocale,
      [locale]: {
        ...reading,
        lettersLearned: [...reading.lettersLearned, key],
      },
    };
    saveProgress(progress);
  }

  return progress;
}

export function markSyllableLearned(
  text: string,
  locale: Locale = getLocale(),
): Progress {
  const progress = loadProgress();
  const key = normalizeKey(text);
  const reading = progress.byLocale[locale];

  if (!reading.syllablesLearned.includes(key)) {
    progress.byLocale = {
      ...progress.byLocale,
      [locale]: {
        ...reading,
        syllablesLearned: [...reading.syllablesLearned, key],
      },
    };
    saveProgress(progress);
  }

  return progress;
}

export function markWordLearned(
  text: string,
  locale: Locale = getLocale(),
): Progress {
  const progress = loadProgress();
  const key = normalizeKey(text);
  const reading = progress.byLocale[locale];

  if (!reading.wordsLearned.includes(key)) {
    progress.byLocale = {
      ...progress.byLocale,
      [locale]: {
        ...reading,
        wordsLearned: [...reading.wordsLearned, key],
      },
    };
    saveProgress(progress);
  }

  return progress;
}

export function markNumberLearned(digit: string): Progress {
  const progress = loadProgress();

  if (!progress.numbersLearned.includes(digit)) {
    progress.numbersLearned = [...progress.numbersLearned, digit];
    saveProgress(progress);
  }

  return progress;
}

export function markIntegerLearned(text: string): Progress {
  const progress = loadProgress();

  if (!progress.integersLearned.includes(text)) {
    progress.integersLearned = [...progress.integersLearned, text];
    saveProgress(progress);
  }

  return progress;
}

export function resetProgress(): Progress {
  const next: Progress = {
    byLocale: {
      ru: emptyReadingProgress(),
      av: emptyReadingProgress(),
    },
    numbersLearned: [],
    integersLearned: [],
    sectionsPassed: {},
  };
  saveProgress(next);
  return next;
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
