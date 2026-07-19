<script setup lang="ts">
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import SectionResult from "../components/SectionResult.vue";
import {
  INTEGERS_TEST_SIZE,
  type IntegerItem,
} from "../data/integers";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useSectionTest } from "../composables/useSectionTest";
import { speakRussian } from "../lib/speech";
import { playSuccess } from "../lib/sounds";
import styles from "./Quiz.module.css";

const { integers } = useLevelContent();
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
} = useSectionTest<IntegerItem>({
  pool: () => integers.value,
  getKey: (entry) => entry.text,
  choiceCount: 4,
  questionLimit: INTEGERS_TEST_SIZE,
  onAsk: (entry) => {
    speakRussian(`Где число ${entry.name}?`);
  },
  onFinish: (didPass) => {
    if (didPass) {
      passSection("integers");
      playSuccess();
      speakRussian("Молодец!");
    } else {
      speakRussian("Давай повторим");
    }
  },
});
</script>

<template>
  <PageShell title="Проверка чисел" back-to="/integers">
    <SectionResult
      v-if="phase === 'result'"
      :passed="passed"
      :errors="errors"
      fail-back-to="/integers"
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
          Где число <strong>{{ target?.name }}</strong>?
        </p>
        <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
      </div>

      <div :class="styles.grid">
        <div
          v-for="entry in choices"
          :key="entry.text"
          :class="styles.choiceWrap"
        >
          <BigButton
            size="xl"
            :variant="choiceVariant(entry, 'mint', 'peach')"
            :aria-label="`Число ${entry.text}`"
            :disabled="feedback !== 'idle'"
            @click="pick(entry)"
          >
            {{ entry.text }}
          </BigButton>
        </div>
      </div>

      <p :class="styles.streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'wrong'" :class="styles.retryMsg">Неверно</p>
    </template>
  </PageShell>
</template>
