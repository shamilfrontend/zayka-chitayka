<template>
  <div v-if="visible" :class="styles.burst" aria-hidden="true">
    <span
      v-for="(offset, i) in OFFSETS"
      :key="i"
      :class="styles.star"
      :style="{ '--tx': `${offset.x}px`, '--ty': `${offset.y}px` }"
    >
      ★
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import styles from "./StarBurst.module.css";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  done: [];
}>();

const OFFSETS = [
  { x: 0, y: -68 },
  { x: 59, y: -34 },
  { x: 59, y: 34 },
  { x: 0, y: 68 },
  { x: -59, y: 34 },
  { x: -59, y: -34 },
];

const visible = ref(false);
let timer: number | undefined;

watch(
  () => props.show,
  (show) => {
    if (!show) {
      return;
    }

    visible.value = true;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      visible.value = false;
      emit("done");
    }, 900);
  },
);
</script>
