<template>
  <PageShell title="Проверка слогов" back-to="/syllables">
    <template v-if="phase === 'result'">
      <div :class="styles.result">
        <BunnyMascot size="md" :mood="passed ? 'cheer' : 'idle'" />
        <h2 :class="styles.resultTitle">
          {{ passed ? "Раздел сдан!" : "Есть ошибки" }}
        </h2>
        <p :class="styles.resultText">
          {{
            passed
              ? "Ты верно ответил на все вопросы."
              : `Ошибок: ${errors}. Давай повторим материал.`
          }}
        </p>
        <div :class="styles.resultActions">
          <BigButton
            v-if="passed"
            variant="mint"
            size="lg"
            full-width
            @click="router.push('/')"
          >
            На главную
          </BigButton>
          <BigButton
            v-else
            variant="peach"
            size="lg"
            full-width
            @click="router.push('/syllables')"
          >
            Повторить материал
          </BigButton>
        </div>
      </div>
    </template>

    <template v-else>
      <div :class="styles.prompt">
        <BunnyMascot
          size="sm"
          :mood="feedback === 'correct' ? 'cheer' : 'idle'"
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
          <StarBurst
            v-if="burst && syllable.text === target?.text"
            :show="burst"
            @done="burst = false"
          />
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
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import StarBurst from "../components/StarBurst.vue";
import type { Syllable } from "../data/syllables";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useSectionTest } from "../composables/useSectionTest";
import { speakRussian } from "../lib/speech";
import { playSuccess } from "../lib/sounds";
import styles from "./Quiz.module.css";

const router = useRouter();
const { syllables } = useLevelContent();
const { passSection } = useProgress();

const {
  target,
  choices,
  feedback,
  errors,
  phase,
  burst,
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
    speakRussian(`Найди слог ${syllable.text.toLowerCase()}`);
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
