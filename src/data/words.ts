export interface Word {
  text: string;
  syllables: string[];
  emoji: string;
  hint: string;
}

/** Знакомые слова на весь алфавит */
export const WORDS: Word[] = [
  // Семья и люди
  { text: "МАМА", syllables: ["МА", "МА"], emoji: "👩", hint: "мама" },
  { text: "ПАПА", syllables: ["ПА", "ПА"], emoji: "👨", hint: "папа" },
  { text: "БАБА", syllables: ["БА", "БА"], emoji: "👵", hint: "баба" },
  { text: "ДЕД", syllables: ["ДЕД"], emoji: "👴", hint: "дед" },
  { text: "ДЯДЯ", syllables: ["ДЯ", "ДЯ"], emoji: "🧔", hint: "дядя" },
  { text: "ТЁТЯ", syllables: ["ТЁ", "ТЯ"], emoji: "👩‍🦰", hint: "тётя" },
  { text: "БРАТ", syllables: ["БРАТ"], emoji: "👦", hint: "брат" },
  { text: "СЕСТРА", syllables: ["СЕ", "СТРА"], emoji: "👧", hint: "сестра" },

  // Животные
  { text: "КОТ", syllables: ["КОТ"], emoji: "🐱", hint: "кот" },
  { text: "КОТЯТА", syllables: ["КО", "ТЯ", "ТА"], emoji: "🐈", hint: "котята" },
  { text: "ПЁС", syllables: ["ПЁС"], emoji: "🐶", hint: "пёс" },
  { text: "СОМ", syllables: ["СОМ"], emoji: "🐟", hint: "сом" },
  { text: "ЛИСА", syllables: ["ЛИ", "СА"], emoji: "🦊", hint: "лиса" },
  { text: "ВОЛК", syllables: ["ВОЛК"], emoji: "🐺", hint: "волк" },
  { text: "ЗАЯЦ", syllables: ["ЗА", "ЯЦ"], emoji: "🐇", hint: "заяц" },
  { text: "МЫШЬ", syllables: ["МЫШЬ"], emoji: "🐭", hint: "мышь" },
  { text: "СЛОН", syllables: ["СЛОН"], emoji: "🐘", hint: "слон" },
  { text: "РЫБА", syllables: ["РЫ", "БА"], emoji: "🐠", hint: "рыба" },
  { text: "ЁЖ", syllables: ["ЁЖ"], emoji: "🦔", hint: "ёж" },
  { text: "ЖУК", syllables: ["ЖУК"], emoji: "🪲", hint: "жук" },
  { text: "КОЗА", syllables: ["КО", "ЗА"], emoji: "🐐", hint: "коза" },
  { text: "КОРОВА", syllables: ["КО", "РО", "ВА"], emoji: "🐄", hint: "корова" },
  { text: "КУРИЦА", syllables: ["КУ", "РИ", "ЦА"], emoji: "🐔", hint: "курица" },
  { text: "УТКА", syllables: ["УТ", "КА"], emoji: "🦆", hint: "утка" },
  { text: "ГУСЬ", syllables: ["ГУСЬ"], emoji: "🪿", hint: "гусь" },
  { text: "КОНЬ", syllables: ["КОНЬ"], emoji: "🐴", hint: "конь" },
  { text: "БЕЛКА", syllables: ["БЕЛ", "КА"], emoji: "🐿️", hint: "белка" },
  { text: "МЕДВЕДЬ", syllables: ["МЕД", "ВЕДЬ"], emoji: "🐻", hint: "медведь" },
  { text: "ЩУКА", syllables: ["ЩУ", "КА"], emoji: "🐟", hint: "щука" },
  { text: "СОВА", syllables: ["СО", "ВА"], emoji: "🦉", hint: "сова" },
  { text: "ПТИЦА", syllables: ["ПТИ", "ЦА"], emoji: "🐦", hint: "птица" },

  // Тело
  { text: "НОС", syllables: ["НОС"], emoji: "👃", hint: "нос" },
  { text: "РОТ", syllables: ["РОТ"], emoji: "👄", hint: "рот" },
  { text: "ГЛАЗ", syllables: ["ГЛАЗ"], emoji: "👁️", hint: "глаз" },
  { text: "УХО", syllables: ["У", "ХО"], emoji: "👂", hint: "ухо" },
  { text: "РУКА", syllables: ["РУ", "КА"], emoji: "✋", hint: "рука" },
  { text: "НОГА", syllables: ["НО", "ГА"], emoji: "🦵", hint: "нога" },
  { text: "ЗУБ", syllables: ["ЗУБ"], emoji: "🦷", hint: "зуб" },

  // Дом и вещи
  { text: "ДОМ", syllables: ["ДОМ"], emoji: "🏠", hint: "дом" },
  { text: "СТОЛ", syllables: ["СТОЛ"], emoji: "🪵", hint: "стол" },
  { text: "СТУЛ", syllables: ["СТУЛ"], emoji: "🪑", hint: "стул" },
  { text: "ОКНО", syllables: ["ОК", "НО"], emoji: "🪟", hint: "окно" },
  { text: "ДВЕРЬ", syllables: ["ДВЕРЬ"], emoji: "🚪", hint: "дверь" },
  { text: "ЛАМПА", syllables: ["ЛАМ", "ПА"], emoji: "💡", hint: "лампа" },
  { text: "ФОНАРЬ", syllables: ["ФО", "НАРЬ"], emoji: "🏮", hint: "фонарь" },
  { text: "КНИГА", syllables: ["КНИ", "ГА"], emoji: "📖", hint: "книга" },
  { text: "РУЧКА", syllables: ["РУЧ", "КА"], emoji: "🖊️", hint: "ручка" },
  { text: "МЯЧ", syllables: ["МЯЧ"], emoji: "⚽", hint: "мяч" },
  { text: "КУКЛА", syllables: ["КУК", "ЛА"], emoji: "🪆", hint: "кукла" },
  { text: "ЮЛА", syllables: ["Ю", "ЛА"], emoji: "🌀", hint: "юла" },
  { text: "ШАР", syllables: ["ШАР"], emoji: "🎈", hint: "шар" },
  { text: "ЧАШКА", syllables: ["ЧАШ", "КА"], emoji: "☕", hint: "чашка" },
  { text: "ЛОЖКА", syllables: ["ЛОЖ", "КА"], emoji: "🥄", hint: "ложка" },
  { text: "ВИЛКА", syllables: ["ВИЛ", "КА"], emoji: "🍴", hint: "вилка" },
  { text: "ТАРЕЛКА", syllables: ["ТА", "РЕЛ", "КА"], emoji: "🍽️", hint: "тарелка" },
  { text: "МЫЛО", syllables: ["МЫ", "ЛО"], emoji: "🧼", hint: "мыло" },

  // Еда
  { text: "СУП", syllables: ["СУП"], emoji: "🍲", hint: "суп" },
  { text: "СЫР", syllables: ["СЫР"], emoji: "🧀", hint: "сыр" },
  { text: "ХЛЕБ", syllables: ["ХЛЕБ"], emoji: "🍞", hint: "хлеб" },
  { text: "КАША", syllables: ["КА", "ША"], emoji: "🥣", hint: "каша" },
  { text: "МОЛОКО", syllables: ["МО", "ЛО", "КО"], emoji: "🥛", hint: "молоко" },
  { text: "ЙОГУРТ", syllables: ["ЙО", "ГУРТ"], emoji: "🥛", hint: "йогурт" },
  { text: "ЯБЛОКО", syllables: ["ЯБ", "ЛО", "КО"], emoji: "🍎", hint: "яблоко" },
  { text: "ГРУША", syllables: ["ГРУ", "ША"], emoji: "🍐", hint: "груша" },
  { text: "БАНАН", syllables: ["БА", "НАН"], emoji: "🍌", hint: "банан" },
  { text: "АРБУЗ", syllables: ["АР", "БУЗ"], emoji: "🍉", hint: "арбуз" },
  { text: "ДЫНЯ", syllables: ["ДЫ", "НЯ"], emoji: "🍈", hint: "дыня" },
  { text: "ТОРТ", syllables: ["ТОРТ"], emoji: "🎂", hint: "торт" },
  { text: "МЕД", syllables: ["МЕД"], emoji: "🍯", hint: "мёд" },
  { text: "СОК", syllables: ["СОК"], emoji: "🧃", hint: "сок" },
  { text: "ЧАЙ", syllables: ["ЧАЙ"], emoji: "🍵", hint: "чай" },

  // Природа и мир
  { text: "ЛУНА", syllables: ["ЛУ", "НА"], emoji: "🌙", hint: "луна" },
  { text: "СОЛНЦЕ", syllables: ["СОЛН", "ЦЕ"], emoji: "☀️", hint: "солнце" },
  { text: "ЗВЕЗДА", syllables: ["ЗВЕЗ", "ДА"], emoji: "⭐", hint: "звезда" },
  { text: "НЕБО", syllables: ["НЕ", "БО"], emoji: "🌤️", hint: "небо" },
  { text: "ВОДА", syllables: ["ВО", "ДА"], emoji: "💧", hint: "вода" },
  { text: "РЕКА", syllables: ["РЕ", "КА"], emoji: "🏞️", hint: "река" },
  { text: "ГОРА", syllables: ["ГО", "РА"], emoji: "⛰️", hint: "гора" },
  { text: "ЛЕС", syllables: ["ЛЕС"], emoji: "🌲", hint: "лес" },
  { text: "ЦВЕТОК", syllables: ["ЦВЕ", "ТОК"], emoji: "🌸", hint: "цветок" },
  { text: "ТРАВА", syllables: ["ТРА", "ВА"], emoji: "🌿", hint: "трава" },
  { text: "СНЕГ", syllables: ["СНЕГ"], emoji: "❄️", hint: "снег" },
  { text: "ДОЖДЬ", syllables: ["ДОЖДЬ"], emoji: "🌧️", hint: "дождь" },
  { text: "ЗОНТ", syllables: ["ЗОНТ"], emoji: "☂️", hint: "зонт" },

  // Одежда и обувь
  { text: "ШАПКА", syllables: ["ШАП", "КА"], emoji: "🧢", hint: "шапка" },
  { text: "ШАРФ", syllables: ["ШАРФ"], emoji: "🧣", hint: "шарф" },
  { text: "ПЛАТЬЕ", syllables: ["ПЛА", "ТЬЕ"], emoji: "👗", hint: "платье" },
  { text: "ЮБКА", syllables: ["ЮБ", "КА"], emoji: "👗", hint: "юбка" },
  { text: "САПОГ", syllables: ["СА", "ПОГ"], emoji: "👢", hint: "сапог" },
  { text: "НОСОК", syllables: ["НО", "СОК"], emoji: "🧦", hint: "носок" },

  // Транспорт и игры
  { text: "АВТО", syllables: ["АВ", "ТО"], emoji: "🚗", hint: "авто" },
  { text: "ПОЕЗД", syllables: ["ПО", "ЕЗД"], emoji: "🚂", hint: "поезд" },
  { text: "ЛОДКА", syllables: ["ЛОД", "КА"], emoji: "🛶", hint: "лодка" },
  { text: "САНИ", syllables: ["СА", "НИ"], emoji: "🛷", hint: "сани" },
  { text: "КИНО", syllables: ["КИ", "НО"], emoji: "🎬", hint: "кино" },
  { text: "ИГРА", syllables: ["И", "ГРА"], emoji: "🎮", hint: "игра" },

  // Редкие буквы / закрепление
  { text: "ЭХО", syllables: ["Э", "ХО"], emoji: "📢", hint: "эхо" },
  { text: "ЭКРАН", syllables: ["ЭК", "РАН"], emoji: "📺", hint: "экран" },

  // Цвета
  { text: "КРАСНЫЙ", syllables: ["КРАС", "НЫЙ"], emoji: "🔴", hint: "красный" },
  { text: "СИНИЙ", syllables: ["СИ", "НИЙ"], emoji: "🔵", hint: "синий" },
  { text: "ЖЁЛТЫЙ", syllables: ["ЖЁЛ", "ТЫЙ"], emoji: "🟡", hint: "жёлтый" },
  { text: "ЗЕЛЁНЫЙ", syllables: ["ЗЕ", "ЛЁ", "НЫЙ"], emoji: "🟢", hint: "зелёный" },
  { text: "БЕЛЫЙ", syllables: ["БЕ", "ЛЫЙ"], emoji: "⚪", hint: "белый" },
  { text: "ЧЁРНЫЙ", syllables: ["ЧЁР", "НЫЙ"], emoji: "⚫", hint: "чёрный" },

  // Действия и игры
  { text: "БЕГ", syllables: ["БЕГ"], emoji: "🏃", hint: "бег" },
  { text: "ПРЫГ", syllables: ["ПРЫГ"], emoji: "🤸", hint: "прыг" },
  { text: "ПЕСНЯ", syllables: ["ПЕС", "НЯ"], emoji: "🎵", hint: "песня" },
  { text: "ТАНЕЦ", syllables: ["ТА", "НЕЦ"], emoji: "💃", hint: "танец" },
  { text: "РИСУНОК", syllables: ["РИ", "СУ", "НОК"], emoji: "🎨", hint: "рисунок" },
  { text: "КУБИК", syllables: ["КУ", "БИК"], emoji: "🧱", hint: "кубик" },

  // Погода и время
  { text: "УТРО", syllables: ["УТ", "РО"], emoji: "🌅", hint: "утро" },
  { text: "ВЕЧЕР", syllables: ["ВЕ", "ЧЕР"], emoji: "🌇", hint: "вечер" },
  { text: "НОЧЬ", syllables: ["НОЧЬ"], emoji: "🌃", hint: "ночь" },
  { text: "ВЕТЕР", syllables: ["ВЕ", "ТЕР"], emoji: "💨", hint: "ветер" },
  { text: "ТУЧА", syllables: ["ТУ", "ЧА"], emoji: "☁️", hint: "туча" },
];
