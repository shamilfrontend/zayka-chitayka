<script setup lang="ts">
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import type { Letter } from "../data/letters";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useQuizRound } from "../composables/useQuizRound";
import { speakRussian } from "../lib/speech";
import styles from "./Quiz.module.css";

const { letters } = useLevelContent();
const { learnLetter } = useProgress();

const { round, feedback, streak, ask, pick, choiceVariant } =
  useQuizRound<Letter>({
    pool: () => letters.value,
    getKey: (letter) => letter.char,
    choiceCount: 4,
    onAsk: (letter) => speakRussian(`Где буква ${letter.char}?`),
    onCorrect: (letter) => learnLetter(letter.char),
    successPhrase: "Молодец!",
    idleVariant: "peach",
    correctVariant: "mint",
  });
</script>

<template>
  <PageShell title="Найди букву" back-to="/letters">
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
      <p :class="styles.question">
        Где буква <strong>{{ round.target.char }}</strong>?
      </p>
      <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
    </div>

    <div :class="styles.grid">
      <div
        v-for="letter in round.choices"
        :key="letter.char"
        :class="styles.choiceWrap"
      >
        <BigButton
          size="xl"
          :variant="choiceVariant(letter)"
          :aria-label="`Буква ${letter.char}`"
          :disabled="feedback === 'correct'"
          @click="pick(letter)"
        >
          {{ letter.char }}
        </BigButton>
      </div>
    </div>

    <p :class="styles.streak">Подряд: {{ streak }}</p>
    <p v-if="feedback === 'retry'" :class="styles.retryMsg">Попробуй ещё!</p>
  </PageShell>
</template>
