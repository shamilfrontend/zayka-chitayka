<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import PageShell from "../components/PageShell.vue";
import { useLevelContent } from "../composables/useLevelContent";
import modeStyles from "../styles/mode-cards.module.css";

const {
  numbers,
  integers,
  numbersDone,
  integersDone,
  numbersPassed,
  integersPassed,
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
    subtitle: "Игра: примеры на плюс",
    variant: "mint" as const,
    passed: false,
  },
  {
    to: "/subtraction",
    title: "Вычитание",
    subtitle: "Игра: примеры на минус",
    variant: "sky" as const,
    passed: false,
  },
]);
</script>

<template>
  <PageShell title="Учить числа" back-to="/">
    <nav :class="modeStyles.modes" aria-label="Учить числа">
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
