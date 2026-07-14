export type LevelId = "basic" | "advanced";

export interface LevelMeta {
  id: LevelId;
  title: string;
  subtitle: string;
}

export const LEVELS: LevelMeta[] = [
  {
    id: "basic",
    title: "Базовый",
    subtitle: "12 букв для старта",
  },
  {
    id: "advanced",
    title: "Продвинутый",
    subtitle: "Весь алфавит",
  },
];

export function isLevelId(value: unknown): value is LevelId {
  return value === "basic" || value === "advanced";
}
