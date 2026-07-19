import { shuffle } from "../lib/shuffle";
import { INTEGERS } from "./integers";

export type EquationRange = 9 | 20 | 100;
export type EquationOp = "add" | "sub";

export interface EquationItem {
  id: string;
  left: number;
  right: number;
  result: number;
  /** Текст примера на экране, например «2 + 3 = ?» */
  prompt: string;
  /** Фраза для озвучки */
  speakText: string;
}

export const EQUATION_RANGES: readonly EquationRange[] = [9, 20, 100];

export function rangeLabel(max: EquationRange): string {
  if (max === 9) {
    return "0–9";
  }

  return `До ${max}`;
}

function nameRussian(value: number): string {
  return INTEGERS[value]?.name ?? String(value);
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Случайный пример сложения или вычитания в заданном диапазоне */
export function buildEquation(op: EquationOp, max: EquationRange): EquationItem {
  if (op === "add") {
    const left = randomInt(0, max);
    const right = randomInt(0, max - left);
    const result = left + right;

    return {
      id: `${left}+${right}=${result}`,
      left,
      right,
      result,
      prompt: `${left} + ${right} = ?`,
      speakText: `Сколько будет ${nameRussian(left)} плюс ${nameRussian(right)}?`,
    };
  }

  const left = randomInt(0, max);
  const right = randomInt(0, left);
  const result = left - right;

  return {
    id: `${left}-${right}=${result}`,
    left,
    right,
    result,
    prompt: `${left} − ${right} = ?`,
    speakText: `Сколько будет ${nameRussian(left)} минус ${nameRussian(right)}?`,
  };
}

/**
 * Верный ответ + близкие дистракторы в [0, max].
 * Если близких мало — добираем случайными из диапазона.
 */
export function buildAnswerChoices(
  result: number,
  max: EquationRange,
  count = 4,
): number[] {
  const unique = new Set<number>([result]);
  const nearbyOffsets = shuffle([-3, -2, -1, 1, 2, 3, -4, 4, -5, 5]);

  for (const offset of nearbyOffsets) {
    if (unique.size >= count) {
      break;
    }

    const candidate = result + offset;
    if (candidate >= 0 && candidate <= max) {
      unique.add(candidate);
    }
  }

  let guard = 0;
  while (unique.size < count && guard < 50) {
    unique.add(randomInt(0, max));
    guard += 1;
  }

  return shuffle([...unique]).slice(0, count);
}
