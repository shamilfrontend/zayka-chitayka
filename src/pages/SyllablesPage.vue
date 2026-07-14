<template>
  <PageShell title="Слоги">
    <div v-if="showOffer" :class="styles.offer">
      <BunnyMascot size="md" mood="cheer" />
      <h2 :class="styles.offerTitle">Пора проверить!</h2>
      <p :class="styles.offerText">
        Ты посмотрел все слоги. Пройди тест, чтобы сдать раздел.
      </p>
      <BigButton
        variant="peach"
        size="lg"
        full-width
        @click="router.push('/syllables/test')"
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
          :key="syllable.text"
          type="button"
          :class="styles.syllableCard"
          :aria-label="`Слог ${syllable.text}, произнести`"
          @click="speakRussian(syllable.text.toLowerCase())"
        >
          <span :class="styles.giant">{{ syllable.text }}</span>
          <span :class="styles.hint">
            {{ syllable.consonant }} + {{ syllable.vowel }}
          </span>
          <span v-if="learned" :class="styles.badge">★</span>
        </button>
      </div>

      <p :class="styles.counter">
        {{ index + 1 }} / {{ syllables.length }}
      </p>

      <div :class="styles.row">
        <BigButton variant="cream" aria-label="Предыдущий" @click="goPrev">
          ←
        </BigButton>
        <BigButton
          variant="mint"
          size="lg"
          @click="speakRussian(syllable.text.toLowerCase())"
        >
          Слушать
        </BigButton>
        <BigButton variant="cream" aria-label="Следующий" @click="goNext">
          →
        </BigButton>
      </div>

      <div :class="styles.quizLink">
        <BigButton
          v-if="readyForTest"
          variant="peach"
          size="lg"
          full-width
          @click="router.push('/syllables/test')"
        >
          Проверка
        </BigButton>
        <BigButton
          :variant="readyForTest ? 'cream' : 'peach'"
          size="lg"
          full-width
          @click="router.push('/syllables/quiz')"
        >
          Игра: найди слог
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
const { learnSyllable, progress, sectionPassed } = useProgress();
const { syllables, level } = useLevelContent();

const syllable = computed(() => syllables.value[index.value]);
const learned = computed(() =>
  progress.value.syllablesLearned.includes(syllable.value.text),
);

const allViewed = computed(
  () =>
    syllables.value.length > 0 &&
    syllables.value.every((item) =>
      progress.value.syllablesLearned.includes(item.text),
    ),
);

const passed = computed(() => sectionPassed("syllables"));
const readyForTest = computed(() => allViewed.value && !passed.value);

watch(level, () => {
  index.value = 0;
  showOffer.value = false;
});

watch(
  syllable,
  (value) => {
    if (value && !showOffer.value) {
      speakRussian(value.text.toLowerCase());
    }
  },
  { immediate: true },
);

const goNext = () => {
  const beforeReady = readyForTest.value;
  learnSyllable(syllable.value.text);

  const nowAllViewed =
    syllables.value.length > 0 &&
    syllables.value.every((item) =>
      progress.value.syllablesLearned.includes(item.text),
    );

  if (nowAllViewed && !sectionPassed("syllables") && !beforeReady) {
    showOffer.value = true;
    return;
  }

  index.value = (index.value + 1) % syllables.value.length;
};

const goPrev = () => {
  index.value =
    (index.value - 1 + syllables.value.length) % syllables.value.length;
};
</script>
