<template>
  <div :class="styles.wrap">
    <div :class="styles.top">
      <span :class="styles.title">Ваш прогресс</span>
      <span :class="styles.label">{{ percent }}%</span>
    </div>
    <div
      :class="styles.track"
      role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div :class="styles.fill" :style="{ width: `${percent}%` }" />
    </div>
    <div :class="styles.stats">
      <span>Буквы {{ lettersPassed ? "✓" : "—" }}</span>
      <span>Слоги {{ syllablesPassed ? "✓" : "—" }}</span>
      <span>Слова {{ wordsPassed ? "✓" : "—" }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import styles from "./ProgressBar.module.css";

const props = defineProps<{
  lettersPassed: boolean;
  syllablesPassed: boolean;
  wordsPassed: boolean;
}>();

const SECTIONS_TOTAL = 3;

const percent = computed(() => {
  const done =
    Number(props.lettersPassed) +
    Number(props.syllablesPassed) +
    Number(props.wordsPassed);
  return Math.min(100, Math.round((done / SECTIONS_TOTAL) * 100));
});
</script>
