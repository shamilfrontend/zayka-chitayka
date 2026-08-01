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
    <div v-if="done" class="done">
      <BunnyMascot size="md" mood="cheer" />
      <h2 class="doneTitle">Игра пройдена!</h2>
      <p class="doneText">Ты сделал {{ goal }} верных ответов.</p>
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
      <div class="prompt">
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
        <p class="question">
          Где буква <strong>{{ round.target.char }}</strong>?
        </p>
        <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
      </div>

      <div class="grid">
        <div
          v-for="letter in round.choices"
          :key="letter.char"
          class="choiceWrap"
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

      <p class="streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'retry'" class="retryMsg">Попробуй ещё!</p>
    </template>
  </PageShell>
</template>

<style scoped lang="scss">
@use "../styles/quiz";
</style>
