<script setup lang="ts">
import PageShell from "../components/PageShell.vue";
import styles from "./DescriptionPage.module.css";
</script>

<template>
  <PageShell title="Описание">
    <div :class="styles.list">
      <section :class="styles.block" aria-labelledby="for-whom-heading">
        <h2 id="for-whom-heading" :class="styles.title">Для кого</h2>
        <p :class="styles.text">
          Для детей 5–7 лет, которые только начинают читать и считать,
          и для родителей, которые помогают им дома короткими
          занятиями.
        </p>
      </section>

      <section :class="styles.block" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" :class="styles.title">Какая польза</h2>
        <p :class="styles.text">
          Ребёнок учит буквы, слоги, простые слова, цифры и числа через
          карточки с озвучкой, мини-игры и проверку раздела. Формат без
          таймеров, штрафов и рекламы — можно заниматься спокойно и в своём
          темпе.
        </p>
      </section>

      <section :class="styles.block" aria-labelledby="parents-heading">
        <h2 id="parents-heading" :class="styles.title">Для родителей</h2>
        <p :class="styles.text">
          Занимайтесь по 10–15 минут в день: сначала карточки, потом короткая
          игра, затем проверка раздела. Прогресс хранится только на
          устройстве.
        </p>
      </section>
    </div>
  </PageShell>
</template>
