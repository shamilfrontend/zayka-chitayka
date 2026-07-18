<script setup lang="ts">
import { useRouter } from "vue-router";
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

const router = useRouter();
const { words } = useLevelContent();
const { learnWord } = useProgress();

const { round, feedback, done, goal, counterLabel, ask, pick, choiceVariant } =
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

<template>
  <PageShell title="Какое слово?" back-to="/words">
    <div v-if="done" :class="styles.done">
      <BunnyMascot size="md" mood="cheer" />
      <h2 :class="styles.doneTitle">Игра пройдена!</h2>
      <p :class="styles.doneText">Ты сделал {{ goal }} верных ответов.</p>
      <BigButton
        variant="mint"
        size="lg"
        full-width
        @click="router.push('/words')"
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

      <p :class="styles.streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'retry'" :class="styles.retryMsg">Попробуй ещё!</p>
    </template>
  </PageShell>
</template>
