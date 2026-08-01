<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import type { CapitalItem } from "../data/capitals";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useQuizRound } from "../composables/useQuizRound";
import { speakRussian } from "../lib/speech";

const router = useRouter();
const { capitals } = useLevelContent();
const { learnCapital, passSection } = useProgress();

const { round, feedback, done, goal, counterLabel, ask, pick, choiceVariant } =
  useQuizRound<CapitalItem>({
    pool: () => capitals.value,
    getKey: (item) => item.country,
    choiceCount: 4,
    sessionSize: 10,
    correctsPerLesson: 1,
    onAsk: (item) => speakRussian(`Какая столица ${item.country}?`),
    onCorrect: (item) => learnCapital(item.country),
    successPhrase: "Молодец!",
    idleVariant: "peach",
    correctVariant: "mint",
  });

watch(done, (value) => {
  if (value) {
    passSection("capitals");
  }
});
</script>

<template>
  <PageShell title="Столицы стран" back-to="/learn/misc">
    <div v-if="done" class="done">
      <BunnyMascot size="md" mood="cheer" />
      <h2 class="doneTitle">Игра пройдена!</h2>
      <p class="doneText">Ты сделал {{ goal }} верных ответов.</p>
      <BigButton
        variant="mint"
        size="lg"
        full-width
        @click="router.push('/learn/misc')"
      >
        К разделам
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
          Какая столица <strong>{{ round.target.country }}</strong>?
        </p>
        <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
      </div>

      <div :class="['grid', 'choices4']">
        <div
          v-for="item in round.choices"
          :key="item.country"
          class="choiceWrap"
        >
          <BigButton
            size="lg"
            :variant="choiceVariant(item)"
            :aria-label="`Столица ${item.capital}`"
            :disabled="feedback === 'correct'"
            full-width
            @click="pick(item)"
          >
            {{ item.capital }}
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
