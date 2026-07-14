<template>
  <PageShell title="Найди слог" back-to="/syllables">
    <div :class="styles.prompt">
      <BunnyMascot
        size="sm"
        :mood="feedback === 'correct' ? 'cheer' : 'idle'"
      />
      <p :class="styles.question">
        Где слог <strong>{{ round.target.text }}</strong>?
      </p>
      <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
    </div>

    <div :class="styles.grid">
      <div
        v-for="syllable in round.choices"
        :key="syllable.text"
        :class="styles.choiceWrap"
      >
        <StarBurst
          v-if="burst && syllable.text === round.target.text"
          :show="burst"
          @done="burst = false"
        />
        <BigButton
          size="xl"
          :variant="
            feedback === 'correct' && syllable.text === round.target.text
              ? 'mint'
              : 'sky'
          "
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
import { ref, watch } from "vue";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import StarBurst from "../components/StarBurst.vue";
import type { Syllable } from "../data/syllables";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { buildChoices } from "../lib/progress";
import { speakRussian } from "../lib/speech";
import { playSuccess, playTryAgain } from "../lib/sounds";
import styles from "./Quiz.module.css";

type Feedback = "idle" | "correct" | "retry";

const { syllables } = useLevelContent();
const { learnSyllable, awardStars, progress } = useProgress();

function nextRound() {
  const pool = syllables.value;
  const target = pool[Math.floor(Math.random() * pool.length)];
  const choices = buildChoices(target, pool, 4, (s) => s.text);
  return { target, choices };
}

const round = ref(nextRound());
const feedback = ref<Feedback>("idle");
const burst = ref(false);
const streak = ref(0);

const ask = () => {
  speakRussian(`Найди слог ${round.value.target.text.toLowerCase()}`);
};

watch(round, () => ask(), { immediate: true });

const pick = (syllable: Syllable) => {
  if (feedback.value === "correct") {
    return;
  }

  if (syllable.text === round.value.target.text) {
    feedback.value = "correct";
    burst.value = true;
    const before = progress.value.syllablesLearned.includes(syllable.text);
    learnSyllable(syllable.text);
    if (before) {
      awardStars(1);
    }
    streak.value += 1;
    playSuccess();
    speakRussian("Ура!");
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
