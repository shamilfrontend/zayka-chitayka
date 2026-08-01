<script setup lang="ts">
import { RouterLink } from "vue-router";

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
  <div class="page">
    <header class="header">
      <RouterLink :to="backTo" class="back" aria-label="Назад домой">
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
      <h1 class="title">{{ title }}</h1>
      <span class="spacer" />
    </header>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
  padding-bottom: calc(var(--space-lg) + env(safe-area-inset-bottom));
  max-width: 720px;
  margin-inline: auto;
  overflow-x: clip;
}

.header {
  position: relative;
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  min-height: 44px;
}

.back {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.75);
  color: var(--color-ink);
  box-shadow: var(--shadow-soft);

  &:active {
    transform: scale(0.95);
  }
}

.title {
  position: absolute;
  inset-inline: 0;
  margin: 0;
  padding-inline: 52px;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 4.8vw, 1.8rem);
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  pointer-events: none;
}

.spacer {
  width: 44px;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}
</style>
