<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import PageShell from "../components/PageShell.vue";
import { useLocale } from "../composables/useLocale";
import { useProgress } from "../composables/useProgress";
import type { Locale } from "../lib/locale";
import styles from "./SettingsPage.module.css";

const { reset } = useProgress();
const { locale, selectLocale } = useLocale();
const confirmReset = ref(false);

const onSelectLocale = (value: Locale) => {
  selectLocale(value);
};

const doReset = () => {
  reset();
  confirmReset.value = false;
};
</script>

<template>
  <PageShell title="Настройки">
    <section
      :class="[styles.section, styles.langSection]"
      aria-labelledby="lang-heading"
    >
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
          :aria-checked="locale === 'ru'"
          :class="[
            styles.langOption,
            locale === 'ru' ? styles.langOptionActive : '',
          ]"
          @click="onSelectLocale('ru')"
        >
          Русский
        </button>
        <button
          type="button"
          role="radio"
          :aria-checked="locale === 'av'"
          :class="[
            styles.langOption,
            locale === 'av' ? styles.langOptionActive : '',
          ]"
          @click="onSelectLocale('av')"
        >
          Аварский
        </button>
      </div>
    </section>

    <section :class="styles.section" aria-labelledby="reset-heading">
      <h2 id="reset-heading" :class="styles.sectionTitle">Прогресс</h2>
      <p :class="styles.sectionHint">
        Изученные буквы, слоги, слова (для обоих языков), цифры, числа,
        сложение, вычитание и сданные разделы обнулятся.
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
  </PageShell>
</template>
