<script setup lang="ts">
import PageShell from "../components/PageShell.vue";
import styles from "./AboutPage.module.css";

const authorSrc = `${import.meta.env.BASE_URL}author.png`;
const saidaSrc = `${import.meta.env.BASE_URL}author-saida.png`;
</script>

<template>
  <PageShell title="Об авторах">
    <div :class="styles.list">
      <div :class="styles.card">
        <img
          :src="saidaSrc"
          alt="Саида Алисултанова"
          :class="styles.photo"
          width="160"
          height="160"
        />
        <h2 :class="styles.name">Саида Алисултанова</h2>
        <p :class="styles.role">продуктовое видение</p>
        <p :class="styles.text">
          Делаем игровую методику, чтобы малышам было интересно учиться
          читать. Если что-то сломалось или есть идея — напишите мне.
        </p>
        <a
          href="https://web.max.ru/21905349"
          target="_blank"
          rel="noopener noreferrer"
          :class="styles.link"
        >
          MAX
        </a>
        <a
          href="https://t.me/Saida_Alisultanova"
          target="_blank"
          rel="noopener noreferrer"
          :class="styles.link"
        >
          Telegram
        </a>
      </div>

      <div :class="styles.card">
        <img
          :src="authorSrc"
          alt="Шамиль Алисултанов"
          :class="styles.photo"
          width="160"
          height="160"
        />
        <h2 :class="styles.name">Шамиль Алисултанов</h2>
        <p :class="styles.role">Разработка продукта</p>
        <a
          href="https://t.me/shamilfrontend"
          target="_blank"
          rel="noopener noreferrer"
          :class="styles.link"
        >
          Telegram
        </a>
        <a
          href="https://shamilfrontend.ru"
          target="_blank"
          rel="noopener noreferrer"
          :class="styles.link"
        >
          shamilfrontend.ru
        </a>
      </div>
    </div>
  </PageShell>
</template>
