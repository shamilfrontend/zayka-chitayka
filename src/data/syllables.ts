import type { LevelId } from "./levels";
import { CONSONANTS, VOWELS } from "./letters";

export interface Syllable {
  text: string;
  consonant: string;
  vowel: string;
}

/** Все открытые слоги из согласных × гласных полного алфавита */
export const SYLLABLES: Syllable[] = CONSONANTS.flatMap((c) =>
  VOWELS.map((v) => ({
    text: `${c.char}${v.char}`,
    consonant: c.char,
    vowel: v.char,
  })),
);

export function getSyllable(text: string): Syllable | undefined {
  return SYLLABLES.find((s) => s.text === text.toUpperCase());
}

function resolveSyllables(texts: readonly string[]): Syllable[] {
  return texts.map((text) => {
    const found = getSyllable(text);
    if (!found) {
      throw new Error(`Missing syllable: ${text}`);
    }
    return found;
  });
}

const BASIC_SYLLABLE_TEXTS = [
  "МА",
  "МО",
  "МУ",
  "МИ",
  "ПА",
  "ПО",
  "СА",
  "СУ",
  "ТА",
  "ТО",
  "НА",
  "НО",
  "КА",
  "КО",
  "ЛА",
  "ЛИ",
  "БА",
  "БУ",
] as const;

const ADVANCED_SYLLABLE_TEXTS = [
  "МА",
  "МО",
  "РА",
  "РЫ",
  "ВА",
  "ВЕ",
  "ДА",
  "ДО",
  "ГА",
  "ГУ",
  "ЗО",
  "ЗИ",
  "ЖУ",
  "ЖА",
  "ФА",
  "ФО",
  "ХА",
  "ХО",
  "ЦА",
  "ЦИ",
  "ЧА",
  "ЧУ",
  "ША",
  "ШУ",
  "ЩА",
  "ЩУ",
  "ЛЯ",
  "ЛЮ",
  "МЁ",
  "НЭ",
] as const;

/** Слоги базового уровня */
export const BASIC_SYLLABLES: Syllable[] = resolveSyllables(BASIC_SYLLABLE_TEXTS);

/** Курируемый набор слогов продвинутого уровня */
export const ADVANCED_SYLLABLES: Syllable[] = resolveSyllables(
  ADVANCED_SYLLABLE_TEXTS,
);

/** @deprecated используйте getSyllablesForLevel */
export const INTRO_SYLLABLES = BASIC_SYLLABLES;

export function getSyllablesForLevel(level: LevelId): Syllable[] {
  return level === "basic" ? BASIC_SYLLABLES : ADVANCED_SYLLABLES;
}
