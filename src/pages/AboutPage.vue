<template>
  <PageShell title="Об авторе">
    <div :class="styles.card">
      <img
        :src="authorSrc"
        alt="Шамиль"
        :class="styles.photo"
        width="160"
        height="160"
      />
      <p :class="styles.text">
        Привет, меня зовут Шамиль. Первоначально я делал «Зайку-Читайку» для
        своего племянника — тогда ему было 5 лет, и я хотел помочь ему
        научиться читать. Подходящих бесплатных приложений не нашлось, поэтому
        сделал своё.
      </p>
      <p :class="styles.text">
        А потом решил выложить, чтобы все желающие могли пользоваться.
      </p>
      <p :class="styles.text">
        Если что-то сломалось или есть идея — напишите мне.
      </p>
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
  </PageShell>
</template>

<script setup lang="ts">
import PageShell from "../components/PageShell.vue";
import styles from "./AboutPage.module.css";

const authorSrc = `${import.meta.env.BASE_URL}author.png`;
</script>
