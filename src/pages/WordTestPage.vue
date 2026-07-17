<script setup lang="ts">
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import SectionResult from "../components/SectionResult.vue";
import type { Word } from "../data/words";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useSectionTest } from "../composables/useSectionTest";
import { speakRussian } from "../lib/speech";
import { playSuccess } from "../lib/sounds";
import styles from "./Quiz.module.css";
import learnStyles from "./Learn.module.css";

const { words } = useLevelContent();
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
} = useSectionTest<Word>({
  pool: () => words.value,
  getKey: (word) => word.text,
  choiceCount: 3,
  onAsk: () => {
    speakRussian("Что изображено на картинке?");
  },
  onFinish: (didPass) => {
    if (didPass) {
      passSection("words");
      playSuccess();
      speakRussian("Молодец!");
    } else {
      speakRussian("Давай повторим");
    }
  },
});
</script>

<template>
  <PageShell title="Проверка слов" back-to="/words">
    <SectionResult
      v-if="phase === 'result'"
      :passed="passed"
      :errors="errors"
      fail-back-to="/words"
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
        <p :class="styles.question">Что изображено на картинке?</p>
        <div :class="learnStyles.promptCard">
          <div :class="[learnStyles.wordCard, learnStyles.promptWord]">
            <span :class="learnStyles.emoji" aria-hidden="true">
              {{ target?.emoji }}
            </span>
          </div>
        </div>
        <BigButton variant="ghost" @click="ask">🔊 Подсказка</BigButton>
      </div>

      <div :class="[styles.grid, styles.choices3]">
        <div
          v-for="word in choices"
          :key="word.text"
          :class="styles.choiceWrap"
        >
          <BigButton
            size="lg"
            :variant="choiceVariant(word, 'mint', 'cream')"
            :aria-label="`Слово ${word.text}`"
            :disabled="feedback !== 'idle'"
            full-width
            @click="pick(word)"
          >
            {{ word.text }}
          </BigButton>
        </div>
      </div>

      <p :class="styles.streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'wrong'" :class="styles.retryMsg">Неверно</p>
    </template>
  </PageShell>
</template>
