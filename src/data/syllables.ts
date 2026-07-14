import { CONSONANTS, VOWELS } from "./letters";

export interface Syllable {
  text: string;
  consonant: string;
  vowel: string;
}

/** Все открытые слоги из согласных × гласных полного алфавита */
const SYLLABLES: Syllable[] = CONSONANTS.flatMap((c) =>
  VOWELS.map((v) => ({
    text: `${c.char}${v.char}`,
    consonant: c.char,
    vowel: v.char,
  })),
);

function getSyllable(text: string): Syllable | undefined {
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

/** Курируемый набор слогов для обучения */
const INTRO_SYLLABLE_TEXTS = [
  // М
  "МА",
  "МО",
  "МУ",
  "МИ",
  "МЫ",
  "МЕ",
  "МЁ",
  "МЯ",
  // П
  "ПА",
  "ПО",
  "ПУ",
  "ПИ",
  "ПЕ",
  "ПЁ",
  // Б
  "БА",
  "БО",
  "БУ",
  "БИ",
  "БЕ",
  "БЯ",
  // Т
  "ТА",
  "ТО",
  "ТУ",
  "ТИ",
  "ТЕ",
  "ТЁ",
  // Д
  "ДА",
  "ДО",
  "ДУ",
  "ДИ",
  "ДЕ",
  "ДЁ",
  // Н
  "НА",
  "НО",
  "НУ",
  "НИ",
  "НЕ",
  "НЁ",
  "НЭ",
  "НЯ",
  // К
  "КА",
  "КО",
  "КУ",
  "КИ",
  "КЕ",
  // Л
  "ЛА",
  "ЛО",
  "ЛУ",
  "ЛИ",
  "ЛЕ",
  "ЛЁ",
  "ЛЯ",
  "ЛЮ",
  // Р
  "РА",
  "РО",
  "РУ",
  "РИ",
  "РЕ",
  "РЫ",
  "РЯ",
  // С
  "СА",
  "СО",
  "СУ",
  "СИ",
  "СЕ",
  "СЫ",
  "СЯ",
  // В
  "ВА",
  "ВО",
  "ВУ",
  "ВИ",
  "ВЕ",
  "ВЫ",
  // Г
  "ГА",
  "ГО",
  "ГУ",
  "ГИ",
  "ГЕ",
  // З
  "ЗА",
  "ЗО",
  "ЗУ",
  "ЗИ",
  "ЗЕ",
  // Ж
  "ЖА",
  "ЖО",
  "ЖУ",
  "ЖИ",
  // Ф
  "ФА",
  "ФО",
  "ФУ",
  "ФИ",
  // Х
  "ХА",
  "ХО",
  "ХУ",
  "ХИ",
  // Ц
  "ЦА",
  "ЦО",
  "ЦУ",
  "ЦИ",
  // Ч
  "ЧА",
  "ЧО",
  "ЧУ",
  "ЧИ",
  // Ш
  "ША",
  "ШО",
  "ШУ",
  "ШИ",
  // Щ
  "ЩА",
  "ЩО",
  "ЩУ",
  "ЩИ",
  // Й
  "ЙО",
  "ЙА",
  "ЙУ",
] as const;

export const INTRO_SYLLABLES: Syllable[] = resolveSyllables(INTRO_SYLLABLE_TEXTS);
