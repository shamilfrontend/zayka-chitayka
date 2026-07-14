<template>
  <PageShell title="Проверка слов" back-to="/words">
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
            @click="router.push('/words')"
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
        <div :class="learnStyles.cardWrap" style="max-width: 200px">
          <div
            :class="learnStyles.wordCard"
            style="min-height: 140px; cursor: default"
          >
            <span :class="learnStyles.emoji" aria-hidden="true">
              {{ target?.emoji }}
            </span>
            <StarBurst
              v-if="burst"
              :show="burst"
              @done="burst = false"
            />
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

<script setup lang="ts">
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import StarBurst from "../components/StarBurst.vue";
import type { Word } from "../data/words";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useSectionTest } from "../composables/useSectionTest";
import { speakRussian } from "../lib/speech";
import { playSuccess } from "../lib/sounds";
import styles from "./Quiz.module.css";
import learnStyles from "./Learn.module.css";

const router = useRouter();
const { words } = useLevelContent();
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
} = useSectionTest<Word>({
  pool: () => words.value,
  getKey: (word) => word.text,
  choiceCount: 3,
  onAsk: (word) => {
    speakRussian(`Какое это слово? ${word.hint}`);
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
