<script setup lang="ts">
import { RouterLink } from "vue-router";
import styles from "./PageShell.module.css";

withDefaults(
  defineProps<{
    title: string;
    backTo?: string;
  }>(),
  {
    backTo: "/",
  },
);
</script>

<template>
  <div :class="styles.page">
    <header :class="styles.header">
      <RouterLink :to="backTo" :class="styles.back" aria-label="Назад домой">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M19 12H5M12 19l-7-7 7-7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </RouterLink>
      <h1 :class="styles.title">{{ title }}</h1>
      <span :class="styles.spacer" />
    </header>
    <main :class="styles.main">
      <slot />
    </main>
  </div>
</template>
