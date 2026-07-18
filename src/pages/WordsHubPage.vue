<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import PageShell from "../components/PageShell.vue";
import { useLevelContent } from "../composables/useLevelContent";
import modeStyles from "../styles/mode-cards.module.css";

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

<template>
  <PageShell title="Учить слова" back-to="/">
    <nav :class="modeStyles.modes" aria-label="Учить слова">
      <RouterLink
        v-for="mode in modes"
        :key="mode.to"
        :to="mode.to"
        :class="[
          modeStyles.mode,
          modeStyles[mode.variant],
          { [modeStyles.modePassed]: mode.passed },
        ]"
      >
        <span :class="modeStyles.modeTitle">{{ mode.title }}</span>
        <span :class="modeStyles.modeSub">{{ mode.subtitle }}</span>
      </RouterLink>
    </nav>
  </PageShell>
</template>
