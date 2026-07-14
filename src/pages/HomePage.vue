<template>
  <div :class="styles.home">
    <div :class="styles.hero">
      <BunnyMascot size="lg" mood="idle" />
      <h1 :class="styles.brand">Зайка-Читайка</h1>
      <p :class="styles.tagline">Давай учиться читать вместе!</p>
    </div>

    <div
      :class="styles.levels"
      role="group"
      aria-label="Уровень сложности"
    >
      <button
        v-for="item in LEVELS"
        :key="item.id"
        type="button"
        :class="[
          styles.level,
          styles[item.id],
          { [styles.levelActive]: progress.level === item.id },
        ]"
        :aria-pressed="progress.level === item.id"
        @click="setLevel(item.id)"
      >
        <span :class="styles.levelTitle">{{ item.title }}</span>
        <span :class="styles.levelSub">{{ item.subtitle }}</span>
      </button>
    </div>

    <ProgressBar
      :stars="progress.stars"
      :letters-passed="lettersPassed"
      :syllables-passed="syllablesPassed"
      :words-passed="wordsPassed"
    />

    <nav :class="styles.modes" aria-label="Режимы обучения">
      <RouterLink
        v-for="mode in modes"
        :key="mode.to"
        :to="mode.to"
        :class="[
          styles.mode,
          styles[mode.variant],
          { [styles.modePassed]: mode.passed },
        ]"
      >
        <span :class="styles.modeTitle">{{ mode.title }}</span>
        <span :class="styles.modeSub">{{ mode.subtitle }}</span>
      </RouterLink>
    </nav>

    <div :class="styles.resetZone">
      <button
        v-if="!confirmReset"
        type="button"
        :class="styles.resetBtn"
        @click="confirmReset = true"
      >
        Сбросить прогресс
      </button>
      <div v-else :class="styles.resetConfirm" role="group" aria-label="Подтверждение сброса">
        <p :class="styles.resetText">Точно начать заново?</p>
        <div :class="styles.resetActions">
          <button type="button" :class="styles.resetYes" @click="doReset">
            Да, сбросить
          </button>
          <button type="button" :class="styles.resetNo" @click="confirmReset = false">
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import BunnyMascot from "../components/BunnyMascot.vue";
import ProgressBar from "../components/ProgressBar.vue";
import { LEVELS } from "../data/levels";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import styles from "./HomePage.module.css";

const { progress, setLevel, reset } = useProgress();
const { lettersPassed, syllablesPassed, wordsPassed } = useLevelContent();
const confirmReset = ref(false);

const doReset = () => {
  reset();
  confirmReset.value = false;
};

const modes = computed(() => [
  {
    to: "/letters",
    title: "Буквы",
    subtitle: lettersPassed.value ? "✓ Сдано!" : "Знакомимся",
    variant: "mint" as const,
    passed: lettersPassed.value,
  },
  {
    to: "/syllables",
    title: "Слоги",
    subtitle: syllablesPassed.value ? "✓ Сдано!" : "Складываем",
    variant: "peach" as const,
    passed: syllablesPassed.value,
  },
  {
    to: "/words",
    title: "Слова",
    subtitle: wordsPassed.value ? "✓ Сдано!" : "Читаем",
    variant: "sky" as const,
    passed: wordsPassed.value,
  },
]);
</script>
