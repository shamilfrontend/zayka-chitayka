<template>
  <PageShell title="Слова">
    <div v-if="showOffer" :class="styles.offer">
      <BunnyMascot size="md" mood="cheer" />
      <h2 :class="styles.offerTitle">Пора проверить!</h2>
      <p :class="styles.offerText">
        Ты посмотрел все слова. Пройди тест, чтобы сдать раздел.
      </p>
      <BigButton
        variant="peach"
        size="lg"
        full-width
        @click="router.push('/words/test')"
      >
        Начать проверку
      </BigButton>
      <BigButton variant="ghost" @click="showOffer = false">
        Позже
      </BigButton>
    </div>

    <template v-else>
      <div :class="styles.cardWrap">
        <button
          :key="word.text"
          type="button"
          :class="styles.wordCard"
          :aria-label="`Слово ${word.text}, произнести`"
          @click="speakRussian(word.hint)"
        >
          <span :class="styles.emoji" aria-hidden="true">{{ word.emoji }}</span>
          <span :class="styles.wordText">{{ word.text }}</span>
          <div :class="styles.syllables">
            <span
              v-for="(part, i) in word.syllables"
              :key="`${part}-${i}`"
              :class="styles.syllableChip"
            >
              {{ part }}
            </span>
          </div>
          <span v-if="learned" :class="styles.badge">★</span>
        </button>
      </div>

      <p :class="styles.counter">{{ index + 1 }} / {{ words.length }}</p>

      <div :class="styles.row">
        <BigButton variant="cream" aria-label="Предыдущее" @click="goPrev">
          ←
        </BigButton>
        <BigButton variant="mint" size="lg" @click="speakRussian(word.hint)">
          Слушать
        </BigButton>
        <BigButton variant="cream" aria-label="Следующее" @click="goNext">
          →
        </BigButton>
      </div>

      <div :class="styles.quizLink">
        <BigButton
          v-if="readyForTest"
          variant="peach"
          size="lg"
          full-width
          @click="router.push('/words/test')"
        >
          Проверка
        </BigButton>
        <BigButton
          :variant="readyForTest ? 'cream' : 'peach'"
          size="lg"
          full-width
          @click="router.push('/words/quiz')"
        >
          Игра: какое слово?
        </BigButton>
      </div>
    </template>
  </PageShell>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { speakRussian } from "../lib/speech";
import styles from "./Learn.module.css";

const router = useRouter();
const index = ref(0);
const showOffer = ref(false);
const { learnWord, progress, sectionPassed } = useProgress();
const { words, level } = useLevelContent();

const word = computed(() => words.value[index.value]);
const learned = computed(() =>
  progress.value.wordsLearned.includes(word.value.text),
);

const allViewed = computed(
  () =>
    words.value.length > 0 &&
    words.value.every((item) =>
      progress.value.wordsLearned.includes(item.text),
    ),
);

const passed = computed(() => sectionPassed("words"));
const readyForTest = computed(() => allViewed.value && !passed.value);

watch(level, () => {
  index.value = 0;
  showOffer.value = false;
});

watch(
  word,
  (value) => {
    if (value && !showOffer.value) {
      speakRussian(value.hint);
    }
  },
  { immediate: true },
);

const goNext = () => {
  const beforeReady = readyForTest.value;
  learnWord(word.value.text);

  const nowAllViewed =
    words.value.length > 0 &&
    words.value.every((item) =>
      progress.value.wordsLearned.includes(item.text),
    );

  if (nowAllViewed && !sectionPassed("words") && !beforeReady) {
    showOffer.value = true;
    return;
  }

  index.value = (index.value + 1) % words.value.length;
};

const goPrev = () => {
  index.value = (index.value - 1 + words.value.length) % words.value.length;
};
</script>
