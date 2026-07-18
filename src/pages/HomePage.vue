<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import BunnyMascot from "../components/BunnyMascot.vue";
import ProgressBar from "../components/ProgressBar.vue";
import { useLevelContent } from "../composables/useLevelContent";
import modeStyles from "../styles/mode-cards.module.css";
import styles from "./HomePage.module.css";

const {
  lettersPassed,
  syllablesPassed,
  wordsPassed,
  numbersPassed,
  integersPassed,
} = useLevelContent();

const wordsPassedCount = computed(
  () =>
    Number(lettersPassed.value) +
    Number(syllablesPassed.value) +
    Number(wordsPassed.value),
);

const numbersPassedCount = computed(
  () => Number(numbersPassed.value) + Number(integersPassed.value),
);

const hubs = computed(() => [
  {
    to: "/learn/words",
    title: "Учить слова А-Я",
    subtitle: `Сдано ${wordsPassedCount.value} из 3`,
    variant: "mint" as const,
    passed: wordsPassedCount.value === 3,
  },
  {
    to: "/learn/numbers",
    title: "Учить числа 0-9",
    subtitle: `Сдано ${numbersPassedCount.value} из 2`,
    variant: "lilac" as const,
    passed: numbersPassedCount.value === 2,
  },
]);
</script>

<template>
  <div :class="styles.home">
    <div :class="styles.hero">
      <BunnyMascot size="lg" mood="idle" />
      <h1 :class="styles.brand">Зайка-Читайка</h1>
      <p :class="styles.tagline">Давай учиться читать и считать вместе!</p>
    </div>

    <ProgressBar
      :letters-passed="lettersPassed"
      :syllables-passed="syllablesPassed"
      :words-passed="wordsPassed"
      :numbers-passed="numbersPassed"
      :integers-passed="integersPassed"
    />

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
      <RouterLink :to="'/about'" :class="styles.footerLink">
        Об авторах
      </RouterLink>
      <span :class="styles.footerDot" aria-hidden="true">·</span>
      <RouterLink :to="'/privacy'" :class="styles.footerLink">
        Конфиденциальность
      </RouterLink>
    </nav>
  </div>
</template>
