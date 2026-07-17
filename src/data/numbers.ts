export interface NumberItem {
  value: number;
  digit: string;
  name: string;
}

/** Цифры от 0 до 9 */
export const NUMBERS: NumberItem[] = [
  { value: 0, digit: "0", name: "ноль" },
  { value: 1, digit: "1", name: "один" },
  { value: 2, digit: "2", name: "два" },
  { value: 3, digit: "3", name: "три" },
  { value: 4, digit: "4", name: "четыре" },
  { value: 5, digit: "5", name: "пять" },
  { value: 6, digit: "6", name: "шесть" },
  { value: 7, digit: "7", name: "семь" },
  { value: 8, digit: "8", name: "восемь" },
  { value: 9, digit: "9", name: "девять" },
];
