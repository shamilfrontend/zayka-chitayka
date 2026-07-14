<template>
  <div
    :class="[styles.wrap, styles[size], styles[mood], className]"
    aria-hidden="true"
  >
    <svg viewBox="0 0 120 140" :class="styles.svg">
      <!-- Long bunny ears -->
      <ellipse
        :class="styles.earLeft"
        cx="36"
        cy="22"
        rx="12"
        ry="38"
        transform="rotate(-16 36 22)"
      />
      <ellipse
        :class="styles.earRight"
        cx="84"
        cy="22"
        rx="12"
        ry="38"
        transform="rotate(16 84 22)"
      />
      <ellipse
        :class="styles.earInnerLeft"
        cx="36"
        cy="24"
        rx="5"
        ry="24"
        transform="rotate(-16 36 24)"
      />
      <ellipse
        :class="styles.earInnerRight"
        cx="84"
        cy="24"
        rx="5"
        ry="24"
        transform="rotate(16 84 24)"
      />
      <ellipse :class="styles.body" cx="60" cy="92" rx="34" ry="38" />
      <ellipse :class="styles.belly" cx="60" cy="98" rx="20" ry="22" />
      <circle :class="styles.head" cx="60" cy="64" r="32" />
      <circle :class="styles.cheek" cx="40" cy="70" r="7" />
      <circle :class="styles.cheek" cx="80" cy="70" r="7" />
      <circle :class="styles.eye" cx="48" cy="60" r="4.5" />
      <circle :class="styles.eye" cx="72" cy="60" r="4.5" />
      <circle :class="styles.eyeShine" cx="46.5" cy="58.5" r="1.5" />
      <circle :class="styles.eyeShine" cx="70.5" cy="58.5" r="1.5" />
      <!-- Small triangle nose — reads as bunny, not snout -->
      <path
        :class="styles.nose"
        d="M60 68 L55.5 73.5 L64.5 73.5 Z"
      />
      <path
        :class="styles.mouth"
        d="M56 76 Q60 80 64 76"
        fill="none"
        stroke-width="2.2"
        stroke-linecap="round"
      />
      <ellipse :class="styles.foot" cx="42" cy="122" rx="14" ry="9" />
      <ellipse :class="styles.foot" cx="78" cy="122" rx="14" ry="9" />
      <!-- Fluffy cottontail -->
      <circle :class="styles.tail" cx="92" cy="100" r="10" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import styles from "./BunnyMascot.module.css";

withDefaults(
  defineProps<{
    mood?: "idle" | "happy" | "cheer";
    size?: "sm" | "md" | "lg";
    className?: string;
  }>(),
  {
    mood: "idle",
    size: "md",
    className: "",
  },
);
</script>
