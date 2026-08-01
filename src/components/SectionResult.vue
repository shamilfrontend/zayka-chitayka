<script setup lang="ts">
import { useRouter } from "vue-router";
import BigButton from "./BigButton.vue";
import BunnyMascot from "./BunnyMascot.vue";

defineProps<{
  passed: boolean;
  errors: number;
  failBackTo: string;
}>();

const router = useRouter();
</script>

<template>
  <div class="result">
    <BunnyMascot size="md" :mood="passed ? 'cheer' : 'sad'" />
    <h2 class="resultTitle">
      {{ passed ? "Раздел сдан!" : "Есть ошибки" }}
    </h2>
    <p class="resultText">
      {{
        passed
          ? "Ты верно ответил на все вопросы."
          : `Ошибок: ${errors}. Давай повторим материал.`
      }}
    </p>
    <div class="resultActions">
      <BigButton
        v-if="passed"
        variant="mint"
        size="lg"
        full-width
        @click="router.push('/')"
      >
        На главную
      </BigButton>
      <BigButton
        v-else
        variant="peach"
        size="lg"
        full-width
        @click="router.push(failBackTo)"
      >
        Повторить материал
      </BigButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  text-align: center;
  width: 100%;
  max-width: 420px;
  animation: fadeUp 0.45s ease;
}

.resultTitle {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 6vw, 2.4rem);
  font-weight: 700;
  line-height: 1.15;
}

.resultText {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-ink-soft);
}

.resultActions {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  width: 100%;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .result {
    animation: none;
  }
}
</style>
