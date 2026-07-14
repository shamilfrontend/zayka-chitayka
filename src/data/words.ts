import type { LevelId } from "./levels";

export interface Word {
  text: string;
  syllables: string[];
  emoji: string;
  hint: string;
}

/** Короткие слова базового уровня: А О У И М П С Т Н К Л Б */
export const BASIC_WORDS: Word[] = [
  { text: "МАМА", syllables: ["МА", "МА"], emoji: "👩", hint: "мама" },
  { text: "ПАПА", syllables: ["ПА", "ПА"], emoji: "👨", hint: "папа" },
  { text: "КОТ", syllables: ["КОТ"], emoji: "🐱", hint: "кот" },
  { text: "СОМ", syllables: ["СОМ"], emoji: "🐟", hint: "сом" },
  { text: "ЛИСА", syllables: ["ЛИ", "СА"], emoji: "🦊", hint: "лиса" },
  { text: "НОС", syllables: ["НОС"], emoji: "👃", hint: "нос" },
  { text: "ЛУНА", syllables: ["ЛУ", "НА"], emoji: "🌙", hint: "луна" },
  { text: "СУП", syllables: ["СУП"], emoji: "🍲", hint: "суп" },
  { text: "САНИ", syllables: ["СА", "НИ"], emoji: "🛷", hint: "сани" },
  { text: "СЛОН", syllables: ["СЛОН"], emoji: "🐘", hint: "слон" },
  { text: "СТОЛ", syllables: ["СТОЛ"], emoji: "🪵", hint: "стол" },
  { text: "КИНО", syllables: ["КИ", "НО"], emoji: "🎬", hint: "кино" },
];

/** Знакомые слова продвинутого уровня (весь алфавит) */
export const ADVANCED_WORDS: Word[] = [
  ...BASIC_WORDS,
  { text: "ДОМ", syllables: ["ДОМ"], emoji: "🏠", hint: "дом" },
  { text: "РЫБА", syllables: ["РЫ", "БА"], emoji: "🐠", hint: "рыба" },
  { text: "ВОДА", syllables: ["ВО", "ДА"], emoji: "💧", hint: "вода" },
  { text: "ЁЖ", syllables: ["ЁЖ"], emoji: "🦔", hint: "ёж" },
  { text: "ЧАЙ", syllables: ["ЧАЙ"], emoji: "🍵", hint: "чай" },
  { text: "ЮЛА", syllables: ["Ю", "ЛА"], emoji: "🌀", hint: "юла" },
  { text: "ЯБЛОКО", syllables: ["ЯБ", "ЛО", "КО"], emoji: "🍎", hint: "яблоко" },
  { text: "ЖУК", syllables: ["ЖУК"], emoji: "🪲", hint: "жук" },
  { text: "ЗОНТ", syllables: ["ЗОНТ"], emoji: "☂️", hint: "зонт" },
  { text: "ГОРА", syllables: ["ГО", "РА"], emoji: "⛰️", hint: "гора" },
  { text: "СЫР", syllables: ["СЫР"], emoji: "🧀", hint: "сыр" },
  { text: "ШАПКА", syllables: ["ШАП", "КА"], emoji: "🧢", hint: "шапка" },
  { text: "ЦВЕТОК", syllables: ["ЦВЕ", "ТОК"], emoji: "🌸", hint: "цветок" },
  { text: "ХЛЕБ", syllables: ["ХЛЕБ"], emoji: "🍞", hint: "хлеб" },
  { text: "ЩУКА", syllables: ["ЩУ", "КА"], emoji: "🐟", hint: "щука" },
  { text: "ФОНАРЬ", syllables: ["ФО", "НАРЬ"], emoji: "🏮", hint: "фонарь" },
  { text: "ЭХО", syllables: ["Э", "ХО"], emoji: "📢", hint: "эхо" },
  { text: "ЙОГУРТ", syllables: ["ЙО", "ГУРТ"], emoji: "🥛", hint: "йогурт" },
];

/** @deprecated используйте getWordsForLevel */
export const WORDS = BASIC_WORDS;

export function getWordsForLevel(level: LevelId): Word[] {
  return level === "basic" ? BASIC_WORDS : ADVANCED_WORDS;
}

export function getWord(text: string): Word | undefined {
  return ADVANCED_WORDS.find((w) => w.text === text.toUpperCase());
}
