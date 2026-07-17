<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import {
  getAnalyticsConsent,
  loadYandexMetrika,
  setAnalyticsConsent,
  type AnalyticsConsent,
} from "../lib/analytics";
import styles from "./CookieConsentBanner.module.css";

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
    :class="styles.banner"
    role="dialog"
    aria-modal="false"
    aria-labelledby="cookie-consent-title"
    aria-describedby="cookie-consent-desc"
  >
    <div :class="styles.inner">
      <h2 id="cookie-consent-title" :class="styles.title">
        Аналитика посещений
      </h2>
      <p id="cookie-consent-desc" :class="styles.text">
        Мы можем использовать Яндекс Метрику, чтобы понимать, как пользуются
        Сайтом. Это персональные данные по 152-ФЗ. Прогресс обучения хранится
        только у вас на устройстве.
        <RouterLink to="/privacy" :class="styles.link">
          Политика конфиденциальности
        </RouterLink>
      </p>
      <div :class="styles.actions">
        <button
          type="button"
          :class="styles.accept"
          @click="choose('accepted')"
        >
          Разрешить
        </button>
        <button
          type="button"
          :class="styles.decline"
          @click="choose('declined')"
        >
          Отклонить
        </button>
      </div>
    </div>
  </div>
</template>
