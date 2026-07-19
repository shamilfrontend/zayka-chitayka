import type { Letter } from "../letters";

/**
 * Аварский алфавит (кириллица + диграфы).
 * Подсказки на русском — интерфейс остаётся русским.
 */
export const LETTERS: Letter[] = [
  { char: "А", name: "а", kind: "vowel", hint: "как в Аса (небо)" },
  { char: "Б", name: "бэ", kind: "consonant", hint: "как в БацӀ" },
  { char: "В", name: "вэ", kind: "consonant", hint: "как в Вас (сын)" },
  { char: "Г", name: "гэ", kind: "consonant", hint: "как в ГамачӀ" },
  { char: "ГЪ", name: "гъэ", kind: "consonant", hint: "глубокий г, как в ГъветӀ" },
  { char: "ГЬ", name: "гьэ", kind: "consonant", hint: "как h, как в Гьой" },
  { char: "ГӀ", name: "гӀэ", kind: "consonant", hint: "гортанный, как в ГӀеч" },
  { char: "Д", name: "дэ", kind: "consonant", hint: "как в Догьи" },
  { char: "Е", name: "е", kind: "vowel", hint: "как в Еркен" },
  { char: "Ё", name: "ё", kind: "vowel", hint: "как русское ё" },
  { char: "Ж", name: "жэ", kind: "consonant", hint: "как в ЖавгӀа" },
  { char: "З", name: "зэ", kind: "consonant", hint: "как в Заман" },
  { char: "И", name: "и", kind: "vowel", hint: "как в Ицц" },
  { char: "Й", name: "и краткое", kind: "consonant", hint: "как в Йо" },
  { char: "К", name: "ка", kind: "consonant", hint: "как в Кето" },
  { char: "КЪ", name: "къа", kind: "consonant", hint: "как в Къо (день)" },
  { char: "КЬ", name: "кьа", kind: "consonant", hint: "как в Кьо (мост)" },
  { char: "КӀ", name: "кӀа", kind: "consonant", hint: "резкий к, как в КӀал" },
  { char: "Л", name: "эль", kind: "consonant", hint: "как в Лъим" },
  { char: "ЛЪ", name: "лъэ", kind: "consonant", hint: "боковой, как в Лъим" },
  { char: "М", name: "эм", kind: "consonant", hint: "как в МоцӀ" },
  { char: "Н", name: "эн", kind: "consonant", hint: "как в Ниж" },
  { char: "О", name: "о", kind: "vowel", hint: "как в Орден" },
  { char: "П", name: "пэ", kind: "consonant", hint: "как в Палан" },
  { char: "Р", name: "эр", kind: "consonant", hint: "как в Рос" },
  { char: "С", name: "эс", kind: "consonant", hint: "как в СагӀи" },
  { char: "Т", name: "тэ", kind: "consonant", hint: "как в ТалихӀ" },
  { char: "ТӀ", name: "тӀэ", kind: "consonant", hint: "резкий т, как в ТӀагъур" },
  { char: "У", name: "у", kind: "vowel", hint: "как в Ургъи" },
  { char: "Ф", name: "эф", kind: "consonant", hint: "как в Фанар" },
  { char: "Х", name: "ха", kind: "consonant", hint: "как в Хабар" },
  { char: "ХЪ", name: "хъа", kind: "consonant", hint: "как в Хъухъ" },
  { char: "ХЬ", name: "хьа", kind: "consonant", hint: "мягкий х, как в Хьизан" },
  { char: "ХӀ", name: "хӀа", kind: "consonant", hint: "как в ХӀинчӀ" },
  { char: "Ц", name: "цэ", kind: "consonant", hint: "как в Цо" },
  { char: "ЦӀ", name: "цӀэ", kind: "consonant", hint: "резкий ц, как в ЦӀа" },
  { char: "Ч", name: "че", kind: "consonant", hint: "как в Чи" },
  { char: "ЧӀ", name: "чӀе", kind: "consonant", hint: "резкий ч, как в ЧӀужу" },
  { char: "Ш", name: "ша", kind: "consonant", hint: "как в Шагьар" },
  { char: "Щ", name: "ща", kind: "consonant", hint: "как русское щ" },
  {
    char: "Ъ",
    name: "твёрдый знак",
    kind: "sign",
    hint: "в диграфах и словах",
  },
  { char: "Ы", name: "ы", kind: "vowel", hint: "как русское ы" },
  {
    char: "Ь",
    name: "мягкий знак",
    kind: "sign",
    hint: "в диграфах и словах",
  },
  { char: "Э", name: "э", kind: "vowel", hint: "как в Эбел (мама)" },
  { char: "Ю", name: "ю", kind: "vowel", hint: "как русское ю" },
  { char: "Я", name: "я", kind: "vowel", hint: "как в Яс (дочь)" },
];

export const VOWELS = LETTERS.filter((l) => l.kind === "vowel");
export const CONSONANTS = LETTERS.filter((l) => l.kind === "consonant");
