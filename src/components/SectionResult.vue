<template>
  <div :class="styles.result">
    <BunnyMascot size="md" :mood="passed ? 'cheer' : 'sad'" />
    <h2 :class="styles.resultTitle">
      {{ passed ? "Раздел сдан!" : "Есть ошибки" }}
    </h2>
    <p :class="styles.resultText">
      {{
        passed
          ? "Ты верно ответил на все вопросы."
          : `Ошибок: ${errors}. Давай повторим материал.`
      }}
    </p>
    <div :class="styles.resultActions">
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

<script setup lang="ts">
import { useRouter } from "vue-router";
import BigButton from "./BigButton.vue";
import BunnyMascot from "./BunnyMascot.vue";
import styles from "./SectionResult.module.css";

defineProps<{
  passed: boolean;
  errors: number;
  failBackTo: string;
}>();

const router = useRouter();
</script>
