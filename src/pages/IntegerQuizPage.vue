<script setup lang="ts">
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import type { IntegerItem } from "../data/integers";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useQuizRound } from "../composables/useQuizRound";
import { speakRussian } from "../lib/speech";
import styles from "./Quiz.module.css";

const router = useRouter();
const { integers } = useLevelContent();
const { learnInteger } = useProgress();

const { round, feedback, done, goal, counterLabel, ask, pick, choiceVariant } =
  useQuizRound<IntegerItem>({
    pool: () => integers.value,
    getKey: (entry) => entry.text,
    choiceCount: 4,
    sessionSize: 12,
    correctsPerLesson: 1,
    onAsk: (entry) => speakRussian(`Где число ${entry.name}?`),
    onCorrect: (entry) => learnInteger(entry.text),
    successPhrase: "Молодец!",
    idleVariant: "peach",
    correctVariant: "mint",
  });
</script>

<template>
  <PageShell title="Найди число" back-to="/integers">
    <div v-if="done" :class="styles.done">
      <BunnyMascot size="md" mood="cheer" />
      <h2 :class="styles.doneTitle">Игра пройдена!</h2>
      <p :class="styles.doneText">Ты сделал {{ goal }} верных ответов.</p>
      <BigButton
        variant="mint"
        size="lg"
        full-width
        @click="router.push('/integers')"
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

      <p :class="styles.streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'retry'" :class="styles.retryMsg">Попробуй ещё!</p>
    </template>
  </PageShell>
</template>
