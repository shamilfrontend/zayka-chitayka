<template>
  <PageShell title="Найди число" back-to="/integers">
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
        Где число <strong>{{ round.target.name }}</strong>?
      </p>
      <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
    </div>

    <div :class="styles.grid">
      <div
        v-for="entry in round.choices"
        :key="entry.text"
        :class="styles.choiceWrap"
      >
        <BigButton
          size="xl"
          :variant="choiceVariant(entry)"
          :aria-label="`Число ${entry.text}`"
          :disabled="feedback === 'correct'"
          @click="pick(entry)"
        >
          {{ entry.text }}
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
import type { IntegerItem } from "../data/integers";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useQuizRound } from "../composables/useQuizRound";
import { speakRussian } from "../lib/speech";
import styles from "./Quiz.module.css";

const { integers } = useLevelContent();
const { learnInteger } = useProgress();

const { round, feedback, streak, ask, pick, choiceVariant } =
  useQuizRound<IntegerItem>({
    pool: () => integers.value,
    getKey: (entry) => entry.text,
    choiceCount: 4,
    onAsk: (entry) => speakRussian(`Где число ${entry.name}?`),
    onCorrect: (entry) => learnInteger(entry.text),
    successPhrase: "Молодец!",
    idleVariant: "peach",
    correctVariant: "mint",
  });
</script>
