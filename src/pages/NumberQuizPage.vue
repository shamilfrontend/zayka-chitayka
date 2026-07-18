<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import CountDots from "../components/CountDots.vue";
import PageShell from "../components/PageShell.vue";
import type { NumberItem } from "../data/numbers";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useQuizRound } from "../composables/useQuizRound";
import { speakRussian } from "../lib/speech";
import styles from "./Quiz.module.css";
import quizStyles from "./NumberQuiz.module.css";

type PromptMode = "name" | "count";

const router = useRouter();
const { numbers } = useLevelContent();
const { learnNumber } = useProgress();
const promptMode = ref<PromptMode>("name");

const pickPromptMode = (): PromptMode =>
  Math.random() < 0.5 ? "name" : "count";

const { round, feedback, done, goal, counterLabel, ask, pick, choiceVariant } =
  useQuizRound<NumberItem>({
    pool: () => numbers.value,
    getKey: (entry) => entry.digit,
    choiceCount: 4,
    onNewRound: () => {
      promptMode.value = pickPromptMode();
    },
    onAsk: (entry) => {
      if (promptMode.value === "name") {
        speakRussian(`Где цифра ${entry.name}?`);
        return;
      }

      speakRussian("Сколько это? Найди цифру");
    },
    onCorrect: (entry) => learnNumber(entry.digit),
    successPhrase: "Молодец!",
    idleVariant: "sky",
    correctVariant: "mint",
  });
</script>

<template>
  <PageShell title="Найди цифру" back-to="/numbers">
    <div v-if="done" :class="styles.done">
      <BunnyMascot size="md" mood="cheer" />
      <h2 :class="styles.doneTitle">Игра пройдена!</h2>
      <p :class="styles.doneText">Ты сделал {{ goal }} верных ответов.</p>
      <BigButton
        variant="mint"
        size="lg"
        full-width
        @click="router.push('/numbers')"
      >
        К урокам
      </BigButton>
    </div>

    <template v-else>
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
        <p v-if="promptMode === 'name'" :class="styles.question">
          Где цифра <strong>{{ round.target.name }}</strong>?
        </p>
        <div v-else :class="quizStyles.countPrompt">
          <p :class="styles.question">Сколько это?</p>
          <CountDots :count="round.target.value" size="lg" />
        </div>
        <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
      </div>

      <div :class="styles.grid">
        <div
          v-for="entry in round.choices"
          :key="entry.digit"
          :class="styles.choiceWrap"
        >
          <BigButton
            size="xl"
            :variant="choiceVariant(entry)"
            :aria-label="`Цифра ${entry.digit}`"
            :disabled="feedback === 'correct'"
            @click="pick(entry)"
          >
            {{ entry.digit }}
          </BigButton>
        </div>
      </div>

      <p :class="styles.streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'retry'" :class="styles.retryMsg">Попробуй ещё!</p>
    </template>
  </PageShell>
</template>
