export interface IntegerItem {
  value: number;
  text: string;
  name: string;
}

const ONES = [
  "",
  "один",
  "два",
  "три",
  "четыре",
  "пять",
  "шесть",
  "семь",
  "восемь",
  "девять",
] as const;

const TEENS = [
  "десять",
  "одиннадцать",
  "двенадцать",
  "тринадцать",
  "четырнадцать",
  "пятнадцать",
  "шестнадцать",
  "семнадцать",
  "восемнадцать",
  "девятнадцать",
] as const;

const TENS = [
  "",
  "",
  "двадцать",
  "тридцать",
  "сорок",
  "пятьдесят",
  "шестьдесят",
  "семьдесят",
  "восемьдесят",
  "девяносто",
] as const;

function nameRussian(value: number): string {
  if (value === 0) {
    return "ноль";
  }

  if (value === 100) {
    return "сто";
  }

  if (value < 10) {
    return ONES[value];
  }

  if (value < 20) {
    return TEENS[value - 10];
  }

  const tens = Math.floor(value / 10);
  const ones = value % 10;

  if (ones === 0) {
    return TENS[tens];
  }

  return `${TENS[tens]} ${ONES[ones]}`;
}

/** Числа от 0 до 100 */
export const INTEGERS: IntegerItem[] = Array.from({ length: 101 }, (_, value) => ({
  value,
  text: String(value),
  name: nameRussian(value),
}));

/** Сколько вопросов в итоговой проверке раздела */
export const INTEGERS_TEST_SIZE = 20;
