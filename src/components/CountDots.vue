<script setup lang="ts">
import { computed } from "vue";
import styles from "./CountDots.module.css";

const props = withDefaults(
  defineProps<{
    count: number;
    size?: "sm" | "md" | "lg";
    showZeroLabel?: boolean;
  }>(),
  {
    size: "md",
    showZeroLabel: true,
  },
);

const groups = computed(() => {
  const result: number[] = [];
  let remaining = Math.max(0, Math.floor(props.count));

  while (remaining > 0) {
    const size = Math.min(5, remaining);
    result.push(size);
    remaining -= size;
  }

  return result;
});

const ariaLabel = computed(() => {
  if (props.count === 0) {
    return "Ноль предметов";
  }

  return `${props.count} ${props.count === 1 ? "предмет" : "предметов"}`;
});
</script>

<template>
  <div
    :class="[styles.wrap, styles[size]]"
    :aria-label="ariaLabel"
    role="img"
  >
    <div v-if="count === 0" :class="styles.zero">
      <span :class="styles.zeroRing" aria-hidden="true" />
      <p v-if="showZeroLabel" :class="styles.zeroLabel">пусто</p>
    </div>
    <div v-else :class="styles.groups" aria-hidden="true">
      <div
        v-for="(groupSize, groupIndex) in groups"
        :key="`group-${groupIndex}`"
        :class="styles.group"
      >
        <span
          v-for="dotIndex in groupSize"
          :key="`dot-${groupIndex}-${dotIndex}`"
          :class="styles.dot"
        />
      </div>
    </div>
  </div>
</template>
