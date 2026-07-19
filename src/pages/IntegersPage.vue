<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import { useLearnDeck } from "../composables/useLearnDeck";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { speakRussian } from "../lib/speech";
import styles from "./Learn.module.css";

const router = useRouter();
const { learnInteger, progress } = useProgress();
const { integers } = useLevelContent();

const { index, item, learned, showOffer, readyForTest, goNext, goPrev } =
  useLearnDeck({
    items: integers,
    speakItem: (entry) => speakRussian(entry.name),
    markLearned: (entry) => learnInteger(entry.text),
    isItemLearned: (entry) =>
      progress.value.integersLearned.includes(entry.text),
    sectionId: "integers",
  });

const integer = computed(() => item.value!);
</script>

<template>
  <PageShell title="Числа" back-to="/learn/numbers">
    <div v-if="showOffer" :class="styles.offer">
      <BunnyMascot size="md" mood="cheer" />
      <h2 :class="styles.offerTitle">Пора проверить!</h2>
      <p :class="styles.offerText">
        Ты посмотрел все числа. Пройди тест, чтобы сдать раздел.
      </p>
      <BigButton
        variant="peach"
        size="lg"
        full-width
        @click="router.push('/integers/test')"
      >
        Начать проверку
      </BigButton>
      <BigButton variant="ghost" @click="showOffer = false">
        Позже
      </BigButton>
    </div>

    <template v-else>
      <div :class="styles.cardWrap">
        <button
          :key="integer.text"
          type="button"
          :class="styles.integerCard"
          :aria-label="`Число ${integer.text}, ${integer.name}, произнести`"
          @click="speakRussian(integer.name)"
        >
          <span :class="styles.giant">{{ integer.text }}</span>
          <span :class="styles.hint">{{ integer.name }}</span>
          <span v-if="learned" :class="styles.badge">✓</span>
        </button>
      </div>

      <p :class="styles.counter">{{ index + 1 }} / {{ integers.length }}</p>

      <div :class="styles.row">
        <BigButton variant="cream" aria-label="Предыдущее" @click="goPrev">
          ←
        </BigButton>
        <BigButton
          variant="mint"
          size="lg"
          @click="speakRussian(integer.name)"
        >
          Слушать
        </BigButton>
        <BigButton variant="cream" aria-label="Следующее" @click="goNext">
          →
        </BigButton>
      </div>

      <div :class="styles.quizLink">
        <BigButton
          v-if="readyForTest"
          variant="peach"
          size="lg"
          full-width
          @click="router.push('/integers/test')"
        >
          Проверка
        </BigButton>
        <BigButton
          :variant="readyForTest ? 'cream' : 'peach'"
          size="lg"
          full-width
          @click="router.push('/integers/quiz')"
        >
          Игра: найди число
        </BigButton>
      </div>
    </template>
  </PageShell>
</template>
