<script setup lang="ts">
import PageShell from "../components/PageShell.vue";
</script>

<template>
  <PageShell title="Описание">
    <div class="list">
      <section class="block" aria-labelledby="for-whom-heading">
        <h2 id="for-whom-heading" class="title">Для кого</h2>
        <p class="text">
          Для детей 5–7 лет, которые только начинают читать и считать,
          и для родителей, которые помогают им дома короткими
          занятиями. Это мягкая дошкольная форма подготовки к школе —
          без уроков и оценок, в игровом темпе.
        </p>
      </section>

      <section class="block" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" class="title">Какая польза</h2>
        <p class="text">
          Ребёнок учит буквы, слоги, простые слова, цифры и числа через
          карточки с озвучкой, мини-игры и проверку раздела. Формат без
          таймеров, штрафов и рекламы — можно заниматься спокойно и в своём
          темпе.
        </p>
      </section>
    </div>
  </PageShell>
</template>

<style scoped lang="scss">
.list {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.block {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  text-align: center;
  animation: fadeUp 0.5s var(--ease-out) both;
}

.block:nth-child(2) {
  animation-delay: 0.08s;
}

.title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.25;
}

.text {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-ink-soft);
  line-height: 1.45;
  max-width: 32ch;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .block {
    animation: none;
  }
}
</style>
