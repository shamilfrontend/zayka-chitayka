<template>
  <PageShell title="Проверка слогов" back-to="/syllables">
    <SectionResult
      v-if="phase === 'result'"
      :passed="passed"
      :errors="errors"
      fail-back-to="/syllables"
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
          Где слог <strong>{{ target?.text }}</strong>?
        </p>
        <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
      </div>

      <div :class="styles.grid">
        <div
          v-for="syllable in choices"
          :key="syllable.text"
          :class="styles.choiceWrap"
        >
          <BigButton
            size="xl"
            :variant="choiceVariant(syllable, 'mint', 'sky')"
            :aria-label="`Слог ${syllable.text}`"
            :disabled="feedback !== 'idle'"
            @click="pick(syllable)"
          >
            {{ syllable.text }}
          </BigButton>
        </div>
      </div>

      <p :class="styles.streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'wrong'" :class="styles.retryMsg">Неверно</p>
    </template>
  </PageShell>
</template>

<script setup lang="ts">
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import SectionResult from "../components/SectionResult.vue";
import type { Syllable } from "../data/syllables";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useSectionTest } from "../composables/useSectionTest";
import { speakRussian } from "../lib/speech";
import { playSuccess } from "../lib/sounds";
import styles from "./Quiz.module.css";

const { syllables } = useLevelContent();
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
} = useSectionTest<Syllable>({
  pool: () => syllables.value,
  getKey: (syllable) => syllable.text,
  choiceCount: 4,
  onAsk: (syllable) => {
    speakRussian(`Где слог ${syllable.text.toLowerCase()}?`);
  },
  onFinish: (didPass) => {
    if (didPass) {
      passSection("syllables");
      playSuccess();
      speakRussian("Молодец!");
    } else {
      speakRussian("Давай повторим");
    }
  },
});
</script>
