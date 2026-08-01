<script setup lang="ts">
import PageShell from "../components/PageShell.vue";

const authorSrc = `${import.meta.env.BASE_URL}author.png`;
const saidaSrc = `${import.meta.env.BASE_URL}author-saida.png`;
</script>

<template>
  <PageShell title="Об авторах">
    <div class="list">
      <div class="card">
        <img
          :src="saidaSrc"
          alt="Саида Алисултанова"
          class="photo"
          width="160"
          height="160"
        />
        <h2 class="name">Саида Алисултанова</h2>
        <p class="role">продуктовое видение</p>
        <p class="text">
          Делаем игровую методику, чтобы малышам было интересно учиться
          читать. Если что-то сломалось или есть идея — напишите мне.
        </p>
        <a
          href="https://web.max.ru/21905349"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
        >
          MAX
        </a>
        <a
          href="https://t.me/Saida_Alisultanova"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
        >
          Telegram
        </a>
      </div>

      <div class="card">
        <img
          :src="authorSrc"
          alt="Шамиль Алисултанов"
          class="photo"
          width="160"
          height="160"
        />
        <h2 class="name">Шамиль Алисултанов</h2>
        <p class="role">Разработка продукта</p>
        <a
          href="https://t.me/shamilfrontend"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
        >
          Telegram
        </a>
        <a
          href="https://shamilfrontend.ru"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
        >
          shamilfrontend.ru
        </a>
      </div>
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

.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-lg) var(--space-md);
  border-radius: var(--radius-card);
  background: rgba(255, 255, 255, 0.55);
  box-shadow: var(--shadow-soft);
  text-align: center;
  animation: fadeUp 0.5s var(--ease-out);

  &:nth-child(2) {
    animation-delay: 0.08s;
  }
}

.photo {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: var(--shadow-soft);
  border: 4px solid var(--color-white);
}

.name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-ink);
  line-height: 1.25;
}

.role {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-ink-soft);
  line-height: 1.45;
}

.text {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-ink-soft);
  line-height: 1.45;
  max-width: 28ch;
}

.link {
  margin-top: var(--space-xs);
  color: var(--color-ink);
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 3px;
  opacity: 0.8;

  &:hover,
  &:focus-visible {
    opacity: 1;
  }
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
  .card {
    animation: none;
  }
}
</style>
