import type { Syllable } from "../syllables";
import { CONSONANTS, VOWELS } from "./letters";

/** Все открытые слоги из согласных × гласных аварского алфавита */
const SYLLABLES: Syllable[] = CONSONANTS.flatMap((c) =>
  VOWELS.map((v) => ({
    text: `${c.char}${v.char}`,
    consonant: c.char,
    vowel: v.char,
  })),
);

function getSyllable(text: string): Syllable | undefined {
  const upper = text.toLocaleUpperCase("ru-RU");
  return SYLLABLES.find((s) => s.text === upper);
}

function resolveSyllables(texts: readonly string[]): Syllable[] {
  return texts.map((text) => {
    const upper = text.toLocaleUpperCase("ru-RU");
    const found = getSyllable(upper);
    if (found) {
      return found;
    }

    const consonant = CONSONANTS.find((c) => upper.startsWith(c.char));
    if (consonant) {
      const rest = upper.slice(consonant.char.length);
      const vowel = VOWELS.find((v) => rest.startsWith(v.char));
      if (vowel) {
        return {
          text: upper,
          consonant: consonant.char,
          vowel: vowel.char,
        };
      }
    }

    if (upper.length >= 2) {
      return {
        text: upper,
        consonant: upper[0] ?? "",
        vowel: upper[1] ?? "",
      };
    }

    throw new Error(`Missing syllable: ${text}`);
  });
}

/** Курируемый набор слогов для обучения аварскому */
const INTRO_SYLLABLE_TEXTS = [
  "МА",
  "МО",
  "МУ",
  "МИ",
  "МЕ",
  "БА",
  "БО",
  "БУ",
  "БИ",
  "ВА",
  "ВО",
  "ВИ",
  "ДА",
  "ДО",
  "ДУ",
  "ДИ",
  "НА",
  "НО",
  "НУ",
  "НИ",
  "КА",
  "КО",
  "КУ",
  "КИ",
  "ЛА",
  "ЛО",
  "ЛУ",
  "ЛИ",
  "РА",
  "РО",
  "РУ",
  "РИ",
  "СА",
  "СО",
  "СУ",
  "СИ",
  "ТА",
  "ТО",
  "ТУ",
  "ТИ",
  "ХА",
  "ХО",
  "ХУ",
  "ХИ",
  "ЧА",
  "ЧИ",
  "ЧУ",
  "ША",
  "ШИ",
  "ШУ",
  "ГЪА",
  "ГЪО",
  "ГЪУ",
  "ГЬА",
  "ГЬО",
  "ГЬУ",
  "ГӀА",
  "ГӀЕ",
  "ГӀУ",
  "КЪА",
  "КЪО",
  "КЪУ",
  "КЬА",
  "КЬО",
  "КӀА",
  "КӀО",
  "КӀУ",
  "ЛЪА",
  "ЛЪИ",
  "ЛЪУ",
  "ТӀА",
  "ТӀО",
  "ТӀУ",
  "ХЪА",
  "ХЪУ",
  "ХЬА",
  "ХЬИ",
  "ХӀА",
  "ХӀИ",
  "ЦӀА",
  "ЦӀО",
  "ЦӀУ",
  "ЧӀА",
  "ЧӀУ",
  "ЧӀИ",
] as const;

export const INTRO_SYLLABLES: Syllable[] = resolveSyllables(INTRO_SYLLABLE_TEXTS);
