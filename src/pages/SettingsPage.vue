<template>
  <PageShell title="Настройки">
    <section :class="styles.section" aria-labelledby="reset-heading">
      <h2 id="reset-heading" :class="styles.sectionTitle">Прогресс</h2>
      <p :class="styles.sectionHint">
        Изученные буквы, слоги, слова и сданные разделы обнулятся.
      </p>

      <div :class="styles.resetZone">
        <button
          v-if="!confirmReset"
          type="button"
          :class="styles.resetBtn"
          @click="confirmReset = true"
        >
          Сбросить прогресс
        </button>
        <div
          v-else
          :class="styles.resetConfirm"
          role="group"
          aria-label="Подтверждение сброса"
        >
          <p :class="styles.resetText">Точно начать заново?</p>
          <div :class="styles.resetActions">
            <button type="button" :class="styles.resetYes" @click="doReset">
              Да, сбросить
            </button>
            <button
              type="button"
              :class="styles.resetNo"
              @click="confirmReset = false"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </section>
  </PageShell>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageShell from "../components/PageShell.vue";
import { useProgress } from "../composables/useProgress";
import styles from "./SettingsPage.module.css";

const { reset } = useProgress();
const confirmReset = ref(false);

const doReset = () => {
  reset();
  confirmReset.value = false;
};
</script>
