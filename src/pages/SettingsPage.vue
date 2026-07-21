<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import PageShell from "../components/PageShell.vue";
import { useProgress } from "../composables/useProgress";
import styles from "./SettingsPage.module.css";

const { reset } = useProgress();
const confirmReset = ref(false);

/** Языки в разработке — показываем в списке как «скоро» */
const upcomingLocales = [
  "Аварский",
  "Даргинский",
  "Кумыкский",
  "Лезгинский",
  "Лакский",
  "Табасаранский",
  "Азербайджанский",
  "Чеченский",
  "Агульский",
] as const;

const doReset = () => {
  reset();
  confirmReset.value = false;
};
</script>

<template>
  <PageShell title="Настройки">
    <section
      :class="[styles.section, styles.langSection]"
      aria-labelledby="reset-heading"
    >
      <h2 id="reset-heading" :class="styles.sectionTitle">Прогресс</h2>
      <p :class="styles.sectionHint">
        Изученные буквы, слоги, слова, цифры, числа, сложение, вычитание и
        сданные разделы обнулятся.
      </p>

      <div :class="styles.resetZone">
        <button
          v-if="!confirmReset"
          type="button"
          :class="styles.resetBtn"
          @click="confirmReset = true"
        >
          Сбросить прогресс
        </button>
        <div
          v-else
          :class="styles.resetConfirm"
          role="group"
          aria-label="Подтверждение сброса"
        >
          <p :class="styles.resetText">Точно начать заново?</p>
          <div :class="styles.resetActions">
            <button type="button" :class="styles.resetYes" @click="doReset">
              Да, сбросить
            </button>
            <button
              type="button"
              :class="styles.resetNo"
              @click="confirmReset = false"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </section>

    <section :class="styles.section" aria-labelledby="lang-heading">
      <h2 id="lang-heading" :class="styles.sectionTitle">Язык изучения</h2>
      <div :class="styles.langCopy">
        <p :class="styles.langDream">
          Выберите алфавит, слоги и слова для уроков чтения.
        </p>
        <p :class="styles.sectionHint">
          Интерфейс остаётся на русском. Математика общая для всех языков.
          Если хотите помочь с контентом —
          <RouterLink to="/about" :class="styles.hintLink">напишите нам</RouterLink>.
        </p>
      </div>

      <div
        :class="styles.langList"
        role="radiogroup"
        aria-labelledby="lang-heading"
      >
        <button
          type="button"
          role="radio"
          aria-checked="true"
          :class="[styles.langOption, styles.langOptionActive]"
        >
          Русский
        </button>
        <button
          v-for="name in upcomingLocales"
          :key="name"
          type="button"
          role="radio"
          aria-checked="false"
          disabled
          :class="[styles.langOption, styles.langOptionSoon]"
          :aria-label="`${name}, скоро`"
        >
          {{ name }}
          <span :class="styles.langSoon">скоро</span>
        </button>
      </div>
    </section>
  </PageShell>
</template>
