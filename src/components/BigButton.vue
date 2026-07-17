<script setup lang="ts">
import styles from "./BigButton.module.css";

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    variant?: "mint" | "peach" | "sky" | "cream" | "ghost";
    size?: "md" | "lg" | "xl";
    fullWidth?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    variant: "mint",
    size: "md",
    fullWidth: false,
    type: "button",
    disabled: false,
  },
);

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :type="type"
    :class="[
      styles.btn,
      styles[variant],
      styles[size],
      fullWidth ? styles.full : '',
    ]"
    :disabled="disabled"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
