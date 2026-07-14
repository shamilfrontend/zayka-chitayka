<template>
  <PageShell title="Найди слог" back-to="/syllables">
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
        Где слог <strong>{{ round.target.text }}</strong>?
      </p>
      <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
    </div>

    <div :class="[styles.grid, styles.choices4]">
      <div
        v-for="syllable in round.choices"
        :key="syllable.text"
        :class="styles.choiceWrap"
      >
        <BigButton
          size="xl"
          full-width
          :variant="choiceVariant(syllable)"
          :aria-label="`Слог ${syllable.text}`"
          :disabled="feedback === 'correct'"
          @click="pick(syllable)"
        >
          {{ syllable.text }}
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
import type { Syllable } from "../data/syllables";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useQuizRound } from "../composables/useQuizRound";
import { speakRussian } from "../lib/speech";
import styles from "./Quiz.module.css";

const { syllables } = useLevelContent();
const { learnSyllable } = useProgress();

const { round, feedback, streak, ask, pick, choiceVariant } =
  useQuizRound<Syllable>({
    pool: () => syllables.value,
    getKey: (syllable) => syllable.text,
    choiceCount: 4,
    onAsk: (syllable) =>
      speakRussian(`Где слог ${syllable.text.toLowerCase()}?`),
    onCorrect: (syllable) => learnSyllable(syllable.text),
    successPhrase: "Ура!",
    idleVariant: "sky",
    correctVariant: "mint",
    retryVariant: "sky",
  });
</script>
