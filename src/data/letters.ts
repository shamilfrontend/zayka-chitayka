import type { LevelId } from "./levels";

export type LetterKind = "vowel" | "consonant" | "sign";

export interface Letter {
  char: string;
  name: string;
  kind: LetterKind;
  hint: string;
}

/** Первая очередь — базовый уровень */
export const BASIC_LETTERS: Letter[] = [
  { char: "А", name: "а", kind: "vowel", hint: "как в Аист" },
  { char: "О", name: "о", kind: "vowel", hint: "как в Облако" },
  { char: "У", name: "у", kind: "vowel", hint: "как в Утка" },
  { char: "И", name: "и", kind: "vowel", hint: "как в Игра" },
  { char: "М", name: "эм", kind: "consonant", hint: "как в Мама" },
  { char: "П", name: "пэ", kind: "consonant", hint: "как в Папа" },
  { char: "С", name: "эс", kind: "consonant", hint: "как в Сок" },
  { char: "Т", name: "тэ", kind: "consonant", hint: "как в Торт" },
  { char: "Н", name: "эн", kind: "consonant", hint: "как в Нос" },
  { char: "К", name: "ка", kind: "consonant", hint: "как в Кот" },
  { char: "Л", name: "эль", kind: "consonant", hint: "как в Луна" },
  { char: "Б", name: "бэ", kind: "consonant", hint: "как в Банка" },
];

/** Весь русский алфавит — продвинутый уровень */
export const ADVANCED_LETTERS: Letter[] = [
  { char: "А", name: "а", kind: "vowel", hint: "как в Аист" },
  { char: "Б", name: "бэ", kind: "consonant", hint: "как в Банка" },
  { char: "В", name: "вэ", kind: "consonant", hint: "как в Вода" },
  { char: "Г", name: "гэ", kind: "consonant", hint: "как в Гора" },
  { char: "Д", name: "дэ", kind: "consonant", hint: "как в Дом" },
  { char: "Е", name: "е", kind: "vowel", hint: "как в Ель" },
  { char: "Ё", name: "ё", kind: "vowel", hint: "как в Ёж" },
  { char: "Ж", name: "жэ", kind: "consonant", hint: "как в Жук" },
  { char: "З", name: "зэ", kind: "consonant", hint: "как в Зонт" },
  { char: "И", name: "и", kind: "vowel", hint: "как в Игра" },
  { char: "Й", name: "и короткое", kind: "consonant", hint: "как в Йогурт" },
  { char: "К", name: "ка", kind: "consonant", hint: "как в Кот" },
  { char: "Л", name: "эль", kind: "consonant", hint: "как в Луна" },
  { char: "М", name: "эм", kind: "consonant", hint: "как в Мама" },
  { char: "Н", name: "эн", kind: "consonant", hint: "как в Нос" },
  { char: "О", name: "о", kind: "vowel", hint: "как в Облако" },
  { char: "П", name: "пэ", kind: "consonant", hint: "как в Папа" },
  { char: "Р", name: "эр", kind: "consonant", hint: "как в Рыба" },
  { char: "С", name: "эс", kind: "consonant", hint: "как в Сок" },
  { char: "Т", name: "тэ", kind: "consonant", hint: "как в Торт" },
  { char: "У", name: "у", kind: "vowel", hint: "как в Утка" },
  { char: "Ф", name: "эф", kind: "consonant", hint: "как в Фонарь" },
  { char: "Х", name: "ха", kind: "consonant", hint: "как в Хлеб" },
  { char: "Ц", name: "цэ", kind: "consonant", hint: "как в Цветок" },
  { char: "Ч", name: "че", kind: "consonant", hint: "как в Чай" },
  { char: "Ш", name: "ша", kind: "consonant", hint: "как в Шапка" },
  { char: "Щ", name: "ща", kind: "consonant", hint: "как в Щука" },
  {
    char: "Ъ",
    name: "твёрдый знак",
    kind: "sign",
    hint: "помогает читать",
  },
  { char: "Ы", name: "ы", kind: "vowel", hint: "как в Сыр" },
  {
    char: "Ь",
    name: "мягкий знак",
    kind: "sign",
    hint: "смягчает букву",
  },
  { char: "Э", name: "э", kind: "vowel", hint: "как в Эхо" },
  { char: "Ю", name: "ю", kind: "vowel", hint: "как в Юла" },
  { char: "Я", name: "я", kind: "vowel", hint: "как в Яблоко" },
];

/** @deprecated используйте getLettersForLevel */
export const LETTERS = BASIC_LETTERS;

export const VOWELS = ADVANCED_LETTERS.filter((l) => l.kind === "vowel");
export const CONSONANTS = ADVANCED_LETTERS.filter((l) => l.kind === "consonant");

export function getLettersForLevel(level: LevelId): Letter[] {
  return level === "basic" ? BASIC_LETTERS : ADVANCED_LETTERS;
}

export function getLetter(char: string): Letter | undefined {
  return ADVANCED_LETTERS.find((l) => l.char === char.toUpperCase());
}
