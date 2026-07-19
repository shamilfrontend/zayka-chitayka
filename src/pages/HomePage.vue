<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import BunnyMascot from "../components/BunnyMascot.vue";
import { useLevelContent } from "../composables/useLevelContent";
import {
  dismissOnboarding,
  shouldShowOnboarding,
} from "../lib/onboarding";
import modeStyles from "../styles/mode-cards.module.css";
import styles from "./HomePage.module.css";

const {
  lettersPassed,
  syllablesPassed,
  wordsPassed,
  numbersPassed,
  integersPassed,
  additionPassed,
  subtractionPassed,
} = useLevelContent();

const showOnboarding = ref(false);

onMounted(() => {
  showOnboarding.value = shouldShowOnboarding();
});

const closeOnboarding = () => {
  dismissOnboarding();
  showOnboarding.value = false;
};

const wordsPassedCount = computed(
  () =>
    Number(lettersPassed.value) +
    Number(syllablesPassed.value) +
    Number(wordsPassed.value),
);

const numbersPassedCount = computed(
  () =>
    Number(numbersPassed.value) +
    Number(integersPassed.value) +
    Number(additionPassed.value) +
    Number(subtractionPassed.value),
);

const hubs = computed(() => {
  const wordsDone = wordsPassedCount.value;
  const numbersDone = numbersPassedCount.value;

  return [
    {
      to: "/learn/words",
      title: "Учить слова",
      subtitle: `Сдано ${wordsDone} из 3`,
      variant: "mint" as const,
      done: wordsDone,
      total: 3,
      percent: Math.min(100, Math.round((wordsDone / 3) * 100)),
      passed: wordsDone === 3,
    },
    {
      to: "/learn/numbers",
      title: "Учить числа",
      subtitle: `Сдано ${numbersDone} из 4`,
      variant: "lilac" as const,
      done: numbersDone,
      total: 4,
      percent: Math.min(100, Math.round((numbersDone / 4) * 100)),
      passed: numbersDone === 4,
    },
  ];
});
</script>

<template>
  <div :class="styles.home">
    <div
      v-if="showOnboarding"
      :class="styles.onboarding"
      role="dialog"
      aria-labelledby="onboarding-title"
      aria-modal="true"
    >
      <BunnyMascot size="md" mood="cheer" />
      <h2 id="onboarding-title" :class="styles.onboardingTitle">
        Привет!<br />
        Я Зайка-Читайка
      </h2>
      <p :class="styles.onboardingText">
        Выбери раздел ниже — будем читать и считать вместе. Нажми на карточку
        или кнопку со звуком, чтобы услышать подсказку.
      </p>
      <button
        type="button"
        :class="styles.onboardingBtn"
        @click="closeOnboarding"
      >
        Начать!
      </button>
    </div>

    <div :class="styles.hero">
      <BunnyMascot size="lg" mood="idle" />
      <h1 :class="styles.brand">Зайка-Читайка</h1>
      <p :class="styles.tagline">Давай учиться читать и считать вместе!</p>
    </div>

    <RouterLink
      to="/settings"
      :class="styles.localeLine"
      aria-label="Выбран язык: Русский. Открыть настройки"
    >
      Выбран язык: <strong>Русский</strong>
    </RouterLink>

    <nav :class="styles.hubs" aria-label="Режимы обучения">
      <RouterLink
        v-for="hub in hubs"
        :key="hub.to"
        :to="hub.to"
        :class="[
          modeStyles.mode,
          modeStyles[hub.variant],
          styles.hubCard,
          { [modeStyles.modePassed]: hub.passed },
        ]"
      >
        <span :class="modeStyles.modeTitle">{{ hub.title }}</span>
        <span :class="modeStyles.modeSub">{{ hub.subtitle }}</span>
        <div :class="styles.hubProgress">
          <div
            :class="styles.hubTrack"
            role="progressbar"
            :aria-valuenow="hub.percent"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="`${hub.title}: ${hub.percent}%`"
          >
            <div
              :class="styles.hubFill"
              :style="{ width: `${hub.percent}%` }"
            />
          </div>
          <span :class="styles.hubPercent">{{ hub.percent }}%</span>
        </div>
      </RouterLink>
    </nav>

    <nav :class="styles.footerLinks" aria-label="Дополнительно">
      <RouterLink :to="'/settings'" :class="styles.footerLink">
        Настройки
      </RouterLink>
      <span :class="styles.footerDot" aria-hidden="true">·</span>
      <RouterLink :to="'/description'" :class="styles.footerLink">
        Описание
      </RouterLink>
      <span :class="styles.footerDot" aria-hidden="true">·</span>
      <RouterLink :to="'/about'" :class="styles.footerLink">
        Об авторах
      </RouterLink>
      <span :class="styles.footerDot" aria-hidden="true">·</span>
      <RouterLink :to="'/changelog'" :class="styles.footerLink">
        История изменений
      </RouterLink>
      <span :class="styles.footerDot" aria-hidden="true">·</span>
      <RouterLink :to="'/privacy'" :class="styles.footerLink">
        Конфиденциальность
      </RouterLink>
    </nav>
  </div>
</template>
