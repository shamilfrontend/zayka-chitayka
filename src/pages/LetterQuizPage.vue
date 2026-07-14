<template>
  <PageShell title="Найди букву" back-to="/letters">
    <div :class="styles.prompt">
      <BunnyMascot
        size="sm"
        :mood="feedback === 'correct' ? 'cheer' : 'idle'"
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
        <StarBurst
          v-if="burst && letter.char === round.target.char"
          :show="burst"
          @done="burst = false"
        />
        <BigButton
          size="xl"
          :variant="choiceVariant(letter.char)"
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

<script setup lang="ts">
import { ref, watch } from "vue";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import StarBurst from "../components/StarBurst.vue";
import type { Letter } from "../data/letters";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { buildChoices } from "../lib/progress";
import { speakRussian } from "../lib/speech";
import { playSuccess, playTryAgain } from "../lib/sounds";
import styles from "./Quiz.module.css";

type Feedback = "idle" | "correct" | "retry";

const { letters } = useLevelContent();
const { learnLetter, awardStars, progress } = useProgress();

function nextRound() {
  const pool = letters.value;
  const target = pool[Math.floor(Math.random() * pool.length)];
  const choices = buildChoices(target, pool, 4, (l) => l.char);
  return { target, choices };
}

const round = ref(nextRound());
const feedback = ref<Feedback>("idle");
const burst = ref(false);
const streak = ref(0);

const ask = () => {
  speakRussian(`Найди букву ${round.value.target.name}`);
};

watch(round, () => ask(), { immediate: true });

const choiceVariant = (char: string) => {
  if (feedback.value === "correct" && char === round.value.target.char) {
    return "mint" as const;
  }
  if (feedback.value === "retry") {
    return "cream" as const;
  }
  return "peach" as const;
};

const pick = (letter: Letter) => {
  if (feedback.value === "correct") {
    return;
  }

  if (letter.char === round.value.target.char) {
    feedback.value = "correct";
    burst.value = true;
    const before = progress.value.lettersLearned.includes(letter.char);
    learnLetter(letter.char);
    if (before) {
      awardStars(1);
    }
    streak.value += 1;
    playSuccess();
    speakRussian("Молодец!");
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
