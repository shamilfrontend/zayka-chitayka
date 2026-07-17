<script setup lang="ts">
import { ref } from "vue";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import CountDots from "../components/CountDots.vue";
import PageShell from "../components/PageShell.vue";
import SectionResult from "../components/SectionResult.vue";
import type { NumberItem } from "../data/numbers";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useSectionTest } from "../composables/useSectionTest";
import { speakRussian } from "../lib/speech";
import { playSuccess } from "../lib/sounds";
import styles from "./Quiz.module.css";
import quizStyles from "./NumberQuiz.module.css";

type PromptMode = "name" | "count";

const { numbers } = useLevelContent();
const { passSection } = useProgress();
const promptMode = ref<PromptMode>("name");

const pickPromptMode = (): PromptMode =>
  Math.random() < 0.5 ? "name" : "count";

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
} = useSectionTest<NumberItem>({
  pool: () => numbers.value,
  getKey: (entry) => entry.digit,
  choiceCount: 4,
  onNewQuestion: () => {
    promptMode.value = pickPromptMode();
  },
  onAsk: (entry) => {
    if (promptMode.value === "name") {
      speakRussian(`Где цифра ${entry.name}?`);
      return;
    }

    speakRussian("Сколько это? Найди цифру");
  },
  onFinish: (didPass) => {
    if (didPass) {
      passSection("numbers");
      playSuccess();
      speakRussian("Молодец!");
    } else {
      speakRussian("Давай повторим");
    }
  },
});
</script>

<template>
  <PageShell title="Проверка цифр" back-to="/numbers">
    <SectionResult
      v-if="phase === 'result'"
      :passed="passed"
      :errors="errors"
      fail-back-to="/numbers"
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
        <p v-if="promptMode === 'name'" :class="styles.question">
          Где цифра <strong>{{ target?.name }}</strong>?
        </p>
        <div v-else :class="quizStyles.countPrompt">
          <p :class="styles.question">Сколько это?</p>
          <CountDots :count="target?.value ?? 0" size="lg" />
        </div>
        <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
      </div>

      <div :class="styles.grid">
        <div
          v-for="entry in choices"
          :key="entry.digit"
          :class="styles.choiceWrap"
        >
          <BigButton
            size="xl"
            :variant="choiceVariant(entry, 'mint', 'sky')"
            :aria-label="`Цифра ${entry.digit}`"
            :disabled="feedback !== 'idle'"
            @click="pick(entry)"
          >
            {{ entry.digit }}
          </BigButton>
        </div>
      </div>

      <p :class="styles.streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'wrong'" :class="styles.retryMsg">Неверно</p>
    </template>
  </PageShell>
</template>
