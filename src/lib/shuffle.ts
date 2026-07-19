/** Перемешать массив (Fisher–Yates) */
export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const left = copy[i];
    const right = copy[j];
    copy[i] = right;
    copy[j] = left;
  }

  return copy;
}
