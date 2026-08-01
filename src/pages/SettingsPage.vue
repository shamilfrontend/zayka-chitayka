<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import PageShell from "../components/PageShell.vue";
import { useProgress } from "../composables/useProgress";

const { reset } = useProgress();
const confirmReset = ref(false);

/** Языки в разработке — показываем в списке как «скоро» */
const upcomingLocales = [
  "Аварский",
  // "Даргинский",
  // "Кумыкский",
  // "Лезгинский",
  // "Лакский",
  // "Табасаранский",
  // "Азербайджанский",
  // "Чеченский",
  // "Агульский",
] as const;

const doReset = () => {
  reset();
  confirmReset.value = false;
};
</script>

<template>
  <PageShell title="Настройки">
    <section
      :class="['section', 'langSection']"
      aria-labelledby="reset-heading"
    >
      <h2 id="reset-heading" class="sectionTitle">Прогресс</h2>
      <p class="sectionHint">
        Изученные буквы, слоги, слова, цифры, числа, сложение, вычитание и
        сданные разделы обнулятся.
      </p>

      <div class="resetZone">
        <button
          v-if="!confirmReset"
          type="button"
          class="resetBtn"
          @click="confirmReset = true"
        >
          Сбросить прогресс
        </button>
        <div
          v-else
          class="resetConfirm"
          role="group"
          aria-label="Подтверждение сброса"
        >
          <p class="resetText">Точно начать заново?</p>
          <div class="resetActions">
            <button type="button" class="resetYes" @click="doReset">
              Да, сбросить
            </button>
            <button
              type="button"
              class="resetNo"
              @click="confirmReset = false"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="lang-heading">
      <h2 id="lang-heading" class="sectionTitle">Язык изучения</h2>
      <div class="langCopy">
        <p class="sectionHint">
          Если хотите помочь с контентом
          <RouterLink to="/about" class="hintLink">напишите нам</RouterLink>.
        </p>
      </div>

      <div
        class="langList"
        role="radiogroup"
        aria-labelledby="lang-heading"
      >
        <button
          type="button"
          role="radio"
          aria-checked="true"
          :class="['langOption', 'langOptionActive']"
        >
          Русский
        </button>
        <button
          v-for="name in upcomingLocales"
          :key="name"
          type="button"
          role="radio"
          aria-checked="false"
          disabled
          :class="['langOption', 'langOptionSoon']"
          :aria-label="`${name}, скоро`"
        >
          {{ name }}
          <span class="langSoon">скоро</span>
        </button>
      </div>
    </section>
  </PageShell>
</template>

<style scoped lang="scss">
.section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  animation: fadeUp 0.5s var(--ease-out) backwards;
}

.langSection {
  margin-bottom: var(--space-lg);
}

.sectionTitle {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  text-align: center;
}

.sectionHint {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-ink-soft);
  text-align: center;
  max-width: 36ch;
  line-height: 1.45;
}

.langCopy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}

.langDream {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-ink);
  text-align: center;
  line-height: 1.35;
  max-width: 28ch;
}

.hintLink {
  color: var(--color-ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.hintLink:hover,
.hintLink:focus-visible {
  color: var(--color-ink);
}

.langList {
  width: 100%;
  margin-top: var(--space-xs);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.langOption {
  border: none;
  background: var(--color-white);
  color: var(--color-ink-soft);
  font: inherit;
  font-size: 1rem;
  font-weight: 800;
  min-height: 52px;
  min-width: 200px;
  padding: 0 var(--space-lg);
  border-radius: var(--radius-btn);
  box-shadow: var(--shadow-soft);
}

.langOption:hover,
.langOption:focus-visible {
  color: var(--color-ink);
}

.langOption:active {
  transform: scale(0.97) translateY(2px);
}

.langOptionActive {
  background: var(--color-peach);
  color: var(--color-ink);
  box-shadow: var(--shadow-press);
}

.langOptionSoon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}

.langOptionSoon:hover,
.langOptionSoon:focus-visible,
.langOptionSoon:active {
  color: var(--color-ink-soft);
  transform: none;
}

.langSoon {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: lowercase;
  color: var(--color-ink-soft);
}

.resetZone {
  width: 100%;
  margin-top: var(--space-xs);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resetBtn {
  border: none;
  background: var(--color-white);
  color: var(--color-ink-soft);
  font: inherit;
  font-size: 1rem;
  font-weight: 800;
  min-height: 52px;
  padding: 0 var(--space-lg);
  border-radius: var(--radius-btn);
  box-shadow: var(--shadow-soft);
}

.resetBtn:hover,
.resetBtn:focus-visible {
  color: var(--color-ink);
}

.resetBtn:active {
  transform: scale(0.97) translateY(2px);
}

.resetConfirm {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
  max-width: 320px;
  padding: var(--space-md);
  border-radius: var(--radius-card);
  background: rgba(255, 255, 255, 0.55);
}

.resetText {
  margin: 0;
  font-weight: 800;
  font-size: 1.05rem;
  text-align: center;
}

.resetActions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: center;
  width: 100%;
}

.resetYes,
.resetNo {
  font: inherit;
  font-weight: 800;
  border: none;
  border-radius: var(--radius-btn);
  min-height: 48px;
  padding: 0 var(--space-md);
  box-shadow: var(--shadow-press);
}

.resetYes {
  background: var(--color-peach);
  color: var(--color-ink);
}

.resetNo {
  background: var(--color-white);
  color: var(--color-ink-soft);
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
  .section {
    animation: none;
  }

  .resetBtn,
  .langOption {
    transition: none;
  }
}
</style>
