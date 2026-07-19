<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import CountDots from "../components/CountDots.vue";
import PageShell from "../components/PageShell.vue";
import { useLearnDeck } from "../composables/useLearnDeck";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { speakRussian } from "../lib/speech";
import styles from "./Learn.module.css";

const router = useRouter();
const { learnNumber, progress } = useProgress();
const { numbers } = useLevelContent();

const { index, item, learned, showOffer, readyForTest, goNext, goPrev } = useLearnDeck({
    items: numbers,
    speakItem: (entry) => speakRussian(entry.name),
    markLearned: (entry) => learnNumber(entry.digit),
    isItemLearned: (entry) =>
      progress.value.numbersLearned.includes(entry.digit),
    sectionId: "numbers",
  });

const number = computed(() => item.value!);
</script>

<template>
  <PageShell title="Цифры" back-to="/learn/numbers">
    <div v-if="showOffer" :class="styles.offer">
      <BunnyMascot size="md" mood="cheer" />
      <h2 :class="styles.offerTitle">Пора проверить!</h2>
      <p :class="styles.offerText">
        Ты посмотрел все цифры. Пройди тест, чтобы сдать раздел.
      </p>
      <BigButton
        variant="peach"
        size="lg"
        full-width
        @click="router.push('/numbers/test')"
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
          :key="number.digit"
          type="button"
          :class="styles.numberCard"
          :aria-label="`Цифра ${number.digit}, ${number.name}, произнести`"
          @click="speakRussian(number.name)"
        >
          <span :class="styles.giant">{{ number.digit }}</span>
          <span :class="styles.hint">{{ number.name }}</span>
          <CountDots :count="number.value" size="md" />
          <span v-if="learned" :class="styles.badge">✓</span>
        </button>
      </div>

      <p :class="styles.counter">{{ index + 1 }} / {{ numbers.length }}</p>

      <div :class="styles.row">
        <BigButton variant="cream" aria-label="Предыдущая" @click="goPrev">
          ←
        </BigButton>
        <BigButton variant="mint" size="lg" @click="speakRussian(number.name)">
          Слушать
        </BigButton>
        <BigButton variant="cream" aria-label="Следующая" @click="goNext">
          →
        </BigButton>
      </div>

      <div :class="styles.quizLink">
        <BigButton
          v-if="readyForTest"
          variant="peach"
          size="lg"
          full-width
          @click="router.push('/numbers/test')"
        >
          Проверка
        </BigButton>
        <BigButton
          :variant="readyForTest ? 'cream' : 'peach'"
          size="lg"
          full-width
          @click="router.push('/numbers/quiz')"
        >
          Игра: найди цифру
        </BigButton>
      </div>
    </template>
  </PageShell>
</template>
