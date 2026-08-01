<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import PageShell from "../components/PageShell.vue";
import { useLevelContent } from "../composables/useLevelContent";

const {
  numbers,
  integers,
  numbersDone,
  integersDone,
  numbersPassed,
  integersPassed,
  additionPassed,
  subtractionPassed,
} = useLevelContent();

const modes = computed(() => [
  {
    to: "/numbers",
    title: "Цифры",
    subtitle: `Изучено ${numbersDone.value} из ${numbers.value.length}`,
    variant: "lilac" as const,
    passed: numbersPassed.value,
  },
  {
    to: "/integers",
    title: "Числа",
    subtitle: `Изучено ${integersDone.value} из ${integers.value.length}`,
    variant: "butter" as const,
    passed: integersPassed.value,
  },
  {
    to: "/addition",
    title: "Сложение",
    subtitle: additionPassed.value
      ? "Раздел сдан"
      : "Игра: примеры на плюс",
    variant: "mint" as const,
    passed: additionPassed.value,
  },
  {
    to: "/subtraction",
    title: "Вычитание",
    subtitle: subtractionPassed.value
      ? "Раздел сдан"
      : "Игра: примеры на минус",
    variant: "sky" as const,
    passed: subtractionPassed.value,
  },
]);
</script>

<template>
  <PageShell title="Учить числа" back-to="/">
    <nav class="modes" aria-label="Учить числа">
      <RouterLink
        v-for="mode in modes"
        :key="mode.to"
        :to="mode.to"
        :class="[
          'mode',
          mode.variant,
          { modePassed: mode.passed },
        ]"
      >
        <span class="modeTitle">{{ mode.title }}</span>
        <span class="modeSub">{{ mode.subtitle }}</span>
      </RouterLink>
    </nav>
  </PageShell>
</template>

<style scoped lang="scss">
@use "../styles/mode-cards";
</style>
