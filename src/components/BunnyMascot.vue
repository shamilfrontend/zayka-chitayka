<script setup lang="ts">
import styles from "./BunnyMascot.module.css";

type BunnyMood = "idle" | "think" | "cheer" | "sad";

const props = withDefaults(
  defineProps<{
    mood?: BunnyMood;
    size?: "sm" | "md" | "lg";
  }>(),
  {
    mood: "idle",
    size: "md",
  },
);
</script>

<template>
  <div
    :class="[styles.wrap, styles[size], styles[mood]]"
    aria-hidden="true"
  >
    <img
      :src="`/mascot/bunny-${props.mood}.webp`"
      :class="styles.img"
      alt=""
      draggable="false"
    />
  </div>
</template>
