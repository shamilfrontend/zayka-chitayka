<script setup lang="ts">
import PageShell from "../components/PageShell.vue";
import privacy from "./PrivacyPage.module.css";
import styles from "./ChangelogPage.module.css";

interface ChangelogEntry {
  date: string;
  title: string;
  items: string[];
}

const entries: ChangelogEntry[] = [
  {
    date: "Версия 1.3.0",
    title: "Описание и прогресс",
    items: [
      "Страница «Описание» — для кого приложение и какая польза",
      "Прогресс по разделам прямо на карточках главной",
      "Корректный возврат назад с обучающих карточек",
    ],
  },
  {
    date: "Версия 1.2.0",
    title: "Онбординг и удобство",
    items: [
      "Приветственный экран для первого запуска",
      "Больше слогов и слов в обучающих карточках",
      "Улучшения мини-игр и озвучки",
      "Иконки для установки на домашний экран",
    ],
  },
  {
    date: "Версия 1.1.0",
    title: "Счёт и конфиденциальность",
    items: [
      "Разделы «Цифры» и «Числа» с карточками, игрой и проверкой",
      "Сложение и вычитание по диапазонам",
      "Политика конфиденциальности и согласие на cookies",
      "Блоки «Учить слова» и «Учить числа» на главной",
    ],
  },
  {
    date: "Версия 1.0.0",
    title: "Старт приложения",
    items: [
      "Буквы, слоги и слова с озвучкой",
      "Мини-игры и проверка разделов",
      "Настройки, сброс прогресса и страница об авторах",
      "Прогресс сохраняется только на устройстве",
    ],
  },
];
</script>

<template>
  <PageShell title="История изменений">
    <article :class="styles.article">
      <p :class="privacy.lead">
        Кратко о том, что появилось в «Зайке-Читайке». Обновления для родителей
        и педагогов — без технических деталей.
      </p>

      <section
        v-for="(entry, index) in entries"
        :id="`changelog-${index}`"
        :key="entry.date + entry.title"
        :class="privacy.block"
        :aria-labelledby="`changelog-heading-${index}`"
      >
        <h2 :id="`changelog-heading-${index}`" :class="privacy.heading">
          {{ entry.date }} — {{ entry.title }}
        </h2>
        <p
          v-for="item in entry.items"
          :key="item"
          :class="privacy.text"
        >
          — {{ item }}
        </p>
      </section>
    </article>
  </PageShell>
</template>
