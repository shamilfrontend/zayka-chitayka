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
    <div v-if="showOffer" class="offer">
      <BunnyMascot size="md" mood="cheer" />
      <h2 class="offerTitle">Пора проверить!</h2>
      <p class="offerText">
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
      <div class="cardWrap">
        <button
          :key="number.digit"
          type="button"
          class="numberCard"
          :aria-label="`Цифра ${number.digit}, ${number.name}, произнести`"
          @click="speakRussian(number.name)"
        >
          <span class="giant">{{ number.digit }}</span>
          <span class="hint">{{ number.name }}</span>
          <CountDots :count="number.value" size="md" />
          <span v-if="learned" class="badge">✓</span>
        </button>
      </div>

      <p class="counter">{{ index + 1 }} / {{ numbers.length }}</p>

      <div class="row">
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

      <div class="quizLink">
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

<style scoped lang="scss">
@use "../styles/learn";
</style>
