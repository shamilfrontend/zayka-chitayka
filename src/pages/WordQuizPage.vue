<template>
  <PageShell title="Какое слово?" back-to="/words">
    <div :class="styles.prompt">
      <BunnyMascot
        size="sm"
        :mood="
          feedback === 'correct'
            ? 'cheer'
            : feedback === 'retry'
              ? 'sad'
              : 'think'
        "
      />
      <p :class="styles.question">Что изображено на картинке?</p>
      <div :class="learnStyles.promptCard">
        <div :class="[learnStyles.wordCard, learnStyles.promptWord]">
          <span :class="learnStyles.emoji" aria-hidden="true">
            {{ round.target.emoji }}
          </span>
        </div>
      </div>
      <BigButton variant="ghost" @click="ask">🔊 Подсказка</BigButton>
    </div>

    <div :class="[styles.grid, styles.choices3]">
      <div
        v-for="word in round.choices"
        :key="word.text"
        :class="styles.choiceWrap"
      >
        <BigButton
          size="lg"
          :variant="choiceVariant(word)"
          :aria-label="`Слово ${word.text}`"
          :disabled="feedback === 'correct'"
          full-width
          @click="pick(word)"
        >
          {{ word.text }}
        </BigButton>
      </div>
    </div>

    <p :class="styles.streak">Подряд: {{ streak }}</p>
    <p v-if="feedback === 'retry'" :class="styles.retryMsg">Попробуй ещё!</p>
  </PageShell>
</template>

<script setup lang="ts">
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import type { Word } from "../data/words";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useQuizRound } from "../composables/useQuizRound";
import { speakRussian } from "../lib/speech";
import styles from "./Quiz.module.css";
import learnStyles from "./Learn.module.css";

const { words } = useLevelContent();
const { learnWord } = useProgress();

const { round, feedback, streak, ask, pick, choiceVariant } =
  useQuizRound<Word>({
    pool: () => words.value,
    getKey: (word) => word.text,
    choiceCount: 3,
    onAsk: () => speakRussian("Что изображено на картинке?"),
    onCorrect: (word) => learnWord(word.text),
    successPhrase: "Супер!",
    idleVariant: "cream",
    correctVariant: "mint",
  });
</script>
