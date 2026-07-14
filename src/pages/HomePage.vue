<template>
  <div :class="styles.home">
    <div :class="styles.hero">
      <BunnyMascot size="lg" mood="idle" />
      <h1 :class="styles.brand">Зайка-Читайка</h1>
      <p :class="styles.tagline">Давай учиться читать вместе!</p>
    </div>

    <ProgressBar
      :letters-passed="lettersPassed"
      :syllables-passed="syllablesPassed"
      :words-passed="wordsPassed"
    />

    <nav :class="styles.modes" aria-label="Режимы обучения">
      <RouterLink
        v-for="mode in modes"
        :key="mode.to"
        :to="mode.to"
        :class="[
          styles.mode,
          styles[mode.variant],
          { [styles.modePassed]: mode.passed },
        ]"
      >
        <span :class="styles.modeTitle">{{ mode.title }}</span>
        <span :class="styles.modeSub">{{ mode.subtitle }}</span>
      </RouterLink>
    </nav>

    <nav :class="styles.footerLinks" aria-label="Дополнительно">
      <RouterLink :to="'/settings'" :class="styles.footerLink">
        Настройки
      </RouterLink>
      <span :class="styles.footerDot" aria-hidden="true">·</span>
      <RouterLink :to="'/about'" :class="styles.footerLink">
        Об авторе
      </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import BunnyMascot from "../components/BunnyMascot.vue";
import ProgressBar from "../components/ProgressBar.vue";
import { useLevelContent } from "../composables/useLevelContent";
import styles from "./HomePage.module.css";

const {
  letters,
  syllables,
  words,
  lettersDone,
  syllablesDone,
  wordsDone,
  lettersPassed,
  syllablesPassed,
  wordsPassed,
} = useLevelContent();

const modes = computed(() => [
  {
    to: "/letters",
    title: "Буквы",
    subtitle: `Изучено ${lettersDone.value} из ${letters.value.length}`,
    variant: "mint" as const,
    passed: lettersPassed.value,
  },
  {
    to: "/syllables",
    title: "Слоги",
    subtitle: `Изучено ${syllablesDone.value} из ${syllables.value.length}`,
    variant: "peach" as const,
    passed: syllablesPassed.value,
  },
  {
    to: "/words",
    title: "Слова",
    subtitle: `Изучено ${wordsDone.value} из ${words.value.length}`,
    variant: "sky" as const,
    passed: wordsPassed.value,
  },
]);
</script>
