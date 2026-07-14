# Зайка-Читайка

Игровое веб-приложение для детей 5–6 лет: учимся **читать по-русски** — буквы, слоги и простые слова.

## Запуск

```bash
npm install
npm run dev
```

Откройте адрес из терминала (обычно `http://localhost:5173/reader-bunny/`).

## Сборка

```bash
npm run build
npm run preview
```

## Деплой на GitHub Pages

1. Создайте репозиторий с именем **`reader-bunny`** (имя важно: в `vite.config.ts` задан `base: "/reader-bunny/"`).
2. Инициализируйте git и запушьте код:

```bash
git init
git add .
git commit -m "Initial commit: Зайка-Читайка"
git branch -M main
git remote add origin https://github.com/<USER>/reader-bunny.git
git push -u origin main
```

3. В GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. После успешного workflow приложение будет по адресу:

`https://<USER>.github.io/reader-bunny/`

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Что внутри

- **PWA** — можно установить на домашний экран, работает офлайн после первого визита
- **Уровни** — «Базовый» (12 букв) и «Продвинутый» (весь алфавит, 33 буквы)
- **Буквы / слоги / слова** — карточки с озвучкой
- **Мини-игры и проверка раздела** — после сдачи теста раздел отмечается в прогрессе
- **Звуки** — короткие тоны при верных и неверных ответах
- **Сброс** — кнопка «Сбросить прогресс» на главной
- **Прогресс** — в `localStorage`

## Стек

Vue 3, TypeScript, Vite, Vue Router, CSS Modules, vite-plugin-pwa.

## Для ребёнка

Крупные кнопки (тач и мышь), мягкие подсказки при ошибке, без таймеров и штрафов.
