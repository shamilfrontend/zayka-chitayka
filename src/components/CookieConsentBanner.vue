<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import {
  getAnalyticsConsent,
  loadYandexMetrika,
  setAnalyticsConsent,
  type AnalyticsConsent,
} from "../lib/analytics";

const visible = ref(false);

onMounted(() => {
  const existing = getAnalyticsConsent();
  if (existing === "accepted") {
    loadYandexMetrika();
    return;
  }
  if (existing === null) {
    visible.value = true;
  }
});

const choose = (value: AnalyticsConsent) => {
  setAnalyticsConsent(value);
  visible.value = false;
  if (value === "accepted") {
    loadYandexMetrika();
  }
};
</script>

<template>
  <div
    v-if="visible"
    class="banner"
    role="dialog"
    aria-modal="false"
    aria-labelledby="cookie-consent-title"
    aria-describedby="cookie-consent-desc"
  >
    <div class="inner">
      <h2 id="cookie-consent-title" class="title">Аналитика посещений</h2>
      <p id="cookie-consent-desc" class="text">
        Мы можем использовать Яндекс Метрику, чтобы понимать, как пользуются
        Сайтом. Это персональные данные по 152-ФЗ. Прогресс обучения хранится
        только у вас на устройстве.
        <RouterLink to="/privacy" class="link">
          Политика конфиденциальности
        </RouterLink>
      </p>
      <div class="actions">
        <button type="button" class="accept" @click="choose('accepted')">
          Разрешить
        </button>
        <button type="button" class="decline" @click="choose('declined')">
          Отклонить
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0;
  bottom: 0;
  padding: var(--space-sm) var(--space-md)
    calc(var(--space-sm) + env(safe-area-inset-bottom));
  pointer-events: none;
}

.inner {
  pointer-events: auto;
  max-width: 420px;
  margin: 0 auto;
  padding: var(--space-md);
  border-radius: var(--radius-card);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  animation: slideUp 0.35s var(--ease-out);
}

.title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.3;
}

.text {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--color-ink-soft);
  line-height: 1.45;
}

.link {
  color: var(--color-ink);
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.accept,
.decline {
  font: inherit;
  font-weight: 800;
  border: none;
  border-radius: var(--radius-btn);
  min-height: 48px;
  padding: 0 var(--space-md);
  flex: 1 1 auto;
}

.accept {
  background: var(--color-mint);
  color: var(--color-ink);
  box-shadow: var(--shadow-press);
}

.decline {
  background: var(--color-white);
  color: var(--color-ink-soft);
  box-shadow: var(--shadow-soft);
}

.accept:active,
.decline:active {
  transform: scale(0.97) translateY(2px);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .inner {
    animation: none;
  }
}
</style>
