type LetterKind = "vowel" | "consonant" | "sign";

export interface Letter {
  char: string;
  name: string;
  kind: LetterKind;
  hint: string;
}

/** Весь русский алфавит */
export const LETTERS: Letter[] = [
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
  { char: "Й", name: "и краткое", kind: "consonant", hint: "как в Йогурт" },
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

export const VOWELS = LETTERS.filter((l) => l.kind === "vowel");
export const CONSONANTS = LETTERS.filter((l) => l.kind === "consonant");
