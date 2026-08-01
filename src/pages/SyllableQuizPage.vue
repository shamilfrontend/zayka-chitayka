<script setup lang="ts">
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import type { Syllable } from "../data/syllables";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useQuizRound } from "../composables/useQuizRound";
import { speakSyllablePrompt } from "../lib/speech";

const router = useRouter();
const { syllables } = useLevelContent();
const { learnSyllable } = useProgress();

const { round, feedback, done, goal, counterLabel, ask, pick, choiceVariant } =
  useQuizRound<Syllable>({
    pool: () => syllables.value,
    getKey: (syllable) => syllable.text,
    choiceCount: 4,
    sessionSize: 10,
    correctsPerLesson: 1,
    onAsk: (syllable) => speakSyllablePrompt(syllable.text),
    onCorrect: (syllable) => learnSyllable(syllable.text),
    successPhrase: "Ура!",
    idleVariant: "sky",
    correctVariant: "mint",
    retryVariant: "sky",
  });
</script>

<template>
  <PageShell title="Найди слог" back-to="/syllables">
    <div v-if="done" class="done">
      <BunnyMascot size="md" mood="cheer" />
      <h2 class="doneTitle">Игра пройдена!</h2>
      <p class="doneText">Ты сделал {{ goal }} верных ответов.</p>
      <BigButton
        variant="mint"
        size="lg"
        full-width
        @click="router.push('/syllables')"
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
          Где слог <strong>{{ round.target.text }}</strong>?
        </p>
        <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
      </div>

      <div :class="['grid', 'choices4']">
        <div
          v-for="syllable in round.choices"
          :key="syllable.text"
          class="choiceWrap"
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

      <p class="streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'retry'" class="retryMsg">Попробуй ещё!</p>
    </template>
  </PageShell>
</template>

<style scoped lang="scss">
@use "../styles/quiz";
</style>
