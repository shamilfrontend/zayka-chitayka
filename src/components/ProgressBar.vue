<script setup lang="ts">
import { computed } from "vue";
import styles from "./ProgressBar.module.css";

const props = defineProps<{
  lettersPassed: boolean;
  syllablesPassed: boolean;
  wordsPassed: boolean;
  numbersPassed: boolean;
  integersPassed: boolean;
}>();

const SECTIONS_TOTAL = 5;

const percent = computed(() => {
  const done =
    Number(props.lettersPassed) +
    Number(props.syllablesPassed) +
    Number(props.wordsPassed) +
    Number(props.numbersPassed) +
    Number(props.integersPassed);
  return Math.min(100, Math.round((done / SECTIONS_TOTAL) * 100));
});
</script>

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
  </div>
</template>
