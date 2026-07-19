<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import BunnyMascot from "../components/BunnyMascot.vue";
import ProgressBar from "../components/ProgressBar.vue";
import { useLevelContent } from "../composables/useLevelContent";
import { useLocale } from "../composables/useLocale";
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
const { locale } = useLocale();

const localeLabel = computed(() =>
  locale.value === "av" ? "Аварский" : "Русский",
);

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

const hubs = computed(() => [
  {
    to: "/learn/words",
    title: "Учить слова",
    subtitle: `Сдано ${wordsPassedCount.value} из 3`,
    variant: "mint" as const,
    passed: wordsPassedCount.value === 3,
  },
  {
    to: "/learn/numbers",
    title: "Учить числа",
    subtitle: `Сдано ${numbersPassedCount.value} из 4`,
    variant: "lilac" as const,
    passed: numbersPassedCount.value === 4,
  },
]);
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

    <div :class="styles.progressBlock">
      <ProgressBar
        :letters-passed="lettersPassed"
        :syllables-passed="syllablesPassed"
        :words-passed="wordsPassed"
        :numbers-passed="numbersPassed"
        :integers-passed="integersPassed"
        :addition-passed="additionPassed"
        :subtraction-passed="subtractionPassed"
      />
      <RouterLink
        to="/settings"
        :class="styles.localeLine"
        :aria-label="`Выбран язык: ${localeLabel}. Открыть настройки`"
      >
        Выбран язык: <strong>{{ localeLabel }}</strong>
      </RouterLink>
    </div>

    <nav :class="styles.hubs" aria-label="Режимы обучения">
      <RouterLink
        v-for="hub in hubs"
        :key="hub.to"
        :to="hub.to"
        :class="[
          modeStyles.mode,
          modeStyles[hub.variant],
          { [modeStyles.modePassed]: hub.passed },
        ]"
      >
        <span :class="modeStyles.modeTitle">{{ hub.title }}</span>
        <span :class="modeStyles.modeSub">{{ hub.subtitle }}</span>
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
