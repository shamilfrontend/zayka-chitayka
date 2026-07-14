<template>
  <PageShell title="Проверка букв" back-to="/letters">
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
            @click="router.push('/letters')"
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
          <StarBurst
            v-if="burst && letter.char === target?.char"
            :show="burst"
            @done="burst = false"
          />
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

<script setup lang="ts">
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import StarBurst from "../components/StarBurst.vue";
import type { Letter } from "../data/letters";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { useSectionTest } from "../composables/useSectionTest";
import { speakRussian } from "../lib/speech";
import { playSuccess } from "../lib/sounds";
import styles from "./Quiz.module.css";

const router = useRouter();
const { letters } = useLevelContent();
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
} = useSectionTest<Letter>({
  pool: () => letters.value,
  getKey: (letter) => letter.char,
  choiceCount: 4,
  onAsk: (letter) => {
    speakRussian(`Найди букву ${letter.name}`);
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
