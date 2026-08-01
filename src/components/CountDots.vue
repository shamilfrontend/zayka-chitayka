<script setup lang="ts">
import { computed } from "vue";

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
  <div :class="['wrap', size]" :aria-label="ariaLabel" role="img">
    <div v-if="count === 0" class="zero">
      <span class="zeroRing" aria-hidden="true" />
      <p v-if="showZeroLabel" class="zeroLabel">пусто</p>
    </div>
    <div v-else class="groups" aria-hidden="true">
      <div
        v-for="(groupSize, groupIndex) in groups"
        :key="`group-${groupIndex}`"
        class="group"
      >
        <span
          v-for="dotIndex in groupSize"
          :key="`dot-${groupIndex}-${dotIndex}`"
          class="dot"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.groups {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  max-width: 280px;
}

.group {
  display: flex;
  gap: 4px;
}

.dot {
  width: var(--dot-size, 14px);
  height: var(--dot-size, 14px);
  border-radius: 50%;
  background: var(--color-mint-dark);
  box-shadow: 0 1px 2px rgba(61, 58, 74, 0.18);
  flex-shrink: 0;
}

.sm {
  --dot-size: 12px;
}

.md {
  --dot-size: 16px;
}

.lg {
  --dot-size: 20px;
}

.zero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-height: 40px;
  justify-content: center;
}

.zeroRing {
  width: calc(var(--dot-size, 14px) * 2.2);
  height: calc(var(--dot-size, 14px) * 2.2);
  border-radius: 50%;
  border: 3px dashed var(--color-ink-soft);
  opacity: 0.55;
}

.zeroLabel {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-ink-soft);
}
</style>
