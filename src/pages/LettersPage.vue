<template>
  <PageShell title="Буквы">
    <div v-if="showOffer" :class="styles.offer">
      <BunnyMascot size="md" mood="cheer" />
      <h2 :class="styles.offerTitle">Пора проверить!</h2>
      <p :class="styles.offerText">
        Ты посмотрел все буквы. Пройди тест, чтобы сдать раздел.
      </p>
      <BigButton
        variant="peach"
        size="lg"
        full-width
        @click="router.push('/letters/test')"
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
          :key="letter.char"
          type="button"
          :class="styles.letterCard"
          :aria-label="`Буква ${letter.char}, произнести`"
          @click="speakRussian(letter.name)"
        >
          <span :class="styles.giant">{{ letter.char }}</span>
          <span :class="styles.hint">{{ letter.hint }}</span>
          <span v-if="learned" :class="styles.badge">✓</span>
        </button>
      </div>

      <p :class="styles.counter">{{ index + 1 }} / {{ letters.length }}</p>

      <div :class="styles.row">
        <BigButton variant="cream" aria-label="Предыдущая" @click="goPrev">
          ←
        </BigButton>
        <BigButton variant="mint" size="lg" @click="speakRussian(letter.name)">
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
          @click="router.push('/letters/test')"
        >
          Проверка
        </BigButton>
        <BigButton
          :variant="readyForTest ? 'cream' : 'peach'"
          size="lg"
          full-width
          @click="router.push('/letters/quiz')"
        >
          Игра: найди букву
        </BigButton>
      </div>
    </template>
  </PageShell>
</template>

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
const { learnLetter, progress } = useProgress();
const { letters } = useLevelContent();

const { index, item, learned, showOffer, readyForTest, goNext, goPrev } =
  useLearnDeck({
    items: letters,
    speakItem: (letter) => speakRussian(letter.name),
    markLearned: (letter) => learnLetter(letter.char),
    isItemLearned: (letter) =>
      progress.value.lettersLearned.includes(letter.char),
    sectionId: "letters",
  });

const letter = computed(() => item.value!);
</script>
