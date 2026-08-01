<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import PageShell from "../components/PageShell.vue";
import { useLevelContent } from "../composables/useLevelContent";

const { capitals, capitalsDone, capitalsPassed } = useLevelContent();

const modes = computed(() => [
  {
    to: "/capitals",
    title: "Столицы стран",
    subtitle: `Изучено ${capitalsDone.value} из ${capitals.value.length}`,
    variant: "peach" as const,
    passed: capitalsPassed.value,
  },
]);
</script>

<template>
  <PageShell title="Разное" back-to="/">
    <nav class="modes" aria-label="Разное">
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
