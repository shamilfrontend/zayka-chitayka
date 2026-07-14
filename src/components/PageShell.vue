<template>
  <div :class="styles.page">
    <header :class="styles.header">
      <RouterLink :to="backTo" :class="styles.back" aria-label="Назад домой">
        ←
      </RouterLink>
      <h1 :class="styles.title">{{ title }}</h1>
      <span :class="styles.spacer" />
    </header>
    <main :class="styles.main">
      <slot />
    </main>
  </div>
</template>

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
