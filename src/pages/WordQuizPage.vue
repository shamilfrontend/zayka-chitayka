<template>
  <PageShell title="Какое слово?" back-to="/words">
    <div :class="styles.prompt">
      <BunnyMascot
        size="sm"
        :mood="feedback === 'correct' ? 'cheer' : 'idle'"
      />
      <div :class="learnStyles.cardWrap" style="max-width: 200px">
        <div
          :class="learnStyles.wordCard"
          style="min-height: 140px; cursor: default"
        >
          <span :class="learnStyles.emoji" aria-hidden="true">
            {{ round.target.emoji }}
          </span>
          <StarBurst
            v-if="burst"
            :show="burst"
            @done="burst = false"
          />
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
          :variant="
            feedback === 'correct' && word.text === round.target.text
              ? 'mint'
              : 'cream'
          "
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
import { ref, watch } from "vue";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import StarBurst from "../components/StarBurst.vue";
import type { Word } from "../data/words";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { buildChoices } from "../lib/progress";
import { speakRussian } from "../lib/speech";
import { playSuccess, playTryAgain } from "../lib/sounds";
import styles from "./Quiz.module.css";
import learnStyles from "./Learn.module.css";

type Feedback = "idle" | "correct" | "retry";

const { words } = useLevelContent();
const { learnWord, awardStars, progress } = useProgress();

function nextRound() {
  const pool = words.value;
  const target = pool[Math.floor(Math.random() * pool.length)];
  const choices = buildChoices(target, pool, 3, (w) => w.text);
  return { target, choices };
}

const round = ref(nextRound());
const feedback = ref<Feedback>("idle");
const burst = ref(false);
const streak = ref(0);

const ask = () => {
  speakRussian(`Какое это слово? ${round.value.target.hint}`);
};

watch(round, () => ask(), { immediate: true });

const pick = (word: Word) => {
  if (feedback.value === "correct") {
    return;
  }

  if (word.text === round.value.target.text) {
    feedback.value = "correct";
    burst.value = true;
    const before = progress.value.wordsLearned.includes(word.text);
    learnWord(word.text);
    if (before) {
      awardStars(1);
    }
    streak.value += 1;
    playSuccess();
    speakRussian("Супер!");
    window.setTimeout(() => {
      round.value = nextRound();
      feedback.value = "idle";
    }, 1100);
  } else {
    feedback.value = "retry";
    playTryAgain();
    speakRussian("Попробуй ещё");
    window.setTimeout(() => {
      feedback.value = "idle";
    }, 700);
  }
};
</script>
