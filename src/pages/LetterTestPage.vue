<script setup lang="ts">
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import SectionResult from "../components/SectionResult.vue";
import type { Letter } from "../data/letters";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useSectionTest } from "../composables/useSectionTest";
import { speakRussian } from "../lib/speech";
import { playSuccess } from "../lib/sounds";
import styles from "./Quiz.module.css";

const { letters } = useLevelContent();
const { passSection } = useProgress();

const {
  target,
  choices,
  feedback,
  errors,
  phase,
  passed,
  counterLabel,
  ask,
  pick,
  choiceVariant,
} = useSectionTest<Letter>({
  pool: () => letters.value,
  getKey: (letter) => letter.char,
  choiceCount: 4,
  onAsk: (letter) => {
    speakRussian(`Где буква ${letter.char}?`);
  },
  onFinish: (didPass) => {
    if (didPass) {
      passSection("letters");
      playSuccess();
      speakRussian("Молодец!");
    } else {
      speakRussian("Давай повторим");
    }
  },
});
</script>

<template>
  <PageShell title="Проверка букв" back-to="/letters">
    <SectionResult
      v-if="phase === 'result'"
      :passed="passed"
      :errors="errors"
      fail-back-to="/letters"
    />

    <template v-else>
      <div :class="styles.prompt">
        <BunnyMascot
          size="sm"
          :mood="
            feedback === 'correct'
              ? 'cheer'
              : feedback === 'wrong'
                ? 'sad'
                : 'think'
          "
        />
        <p :class="styles.question">
          Где буква <strong>{{ target?.char }}</strong>?
        </p>
        <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
      </div>

      <div :class="styles.grid">
        <div
          v-for="letter in choices"
          :key="letter.char"
          :class="styles.choiceWrap"
        >
          <BigButton
            size="xl"
            :variant="choiceVariant(letter, 'mint', 'peach')"
            :aria-label="`Буква ${letter.char}`"
            :disabled="feedback !== 'idle'"
            @click="pick(letter)"
          >
            {{ letter.char }}
          </BigButton>
        </div>
      </div>

      <p :class="styles.streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'wrong'" :class="styles.retryMsg">Неверно</p>
    </template>
  </PageShell>
</template>
