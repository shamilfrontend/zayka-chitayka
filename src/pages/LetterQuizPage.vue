<script setup lang="ts">
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import type { Letter } from "../data/letters";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useQuizRound } from "../composables/useQuizRound";
import { speakLetterPrompt } from "../lib/speech";
import styles from "./Quiz.module.css";

const router = useRouter();
const { letters } = useLevelContent();
const { learnLetter } = useProgress();

const { round, feedback, done, goal, counterLabel, ask, pick, choiceVariant } =
  useQuizRound<Letter>({
    pool: () => letters.value,
    getKey: (letter) => letter.char,
    choiceCount: 4,
    sessionSize: 12,
    correctsPerLesson: 1,
    onAsk: (letter) => speakLetterPrompt(letter.char),
    onCorrect: (letter) => learnLetter(letter.char),
    successPhrase: "Молодец!",
    idleVariant: "peach",
    correctVariant: "mint",
  });
</script>

<template>
  <PageShell title="Найди букву" back-to="/letters">
    <div v-if="done" :class="styles.done">
      <BunnyMascot size="md" mood="cheer" />
      <h2 :class="styles.doneTitle">Игра пройдена!</h2>
      <p :class="styles.doneText">Ты сделал {{ goal }} верных ответов.</p>
      <BigButton
        variant="mint"
        size="lg"
        full-width
        @click="router.push('/letters')"
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

      <p :class="styles.streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'retry'" :class="styles.retryMsg">Попробуй ещё!</p>
    </template>
  </PageShell>
</template>
