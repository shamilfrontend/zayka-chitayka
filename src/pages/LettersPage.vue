<template>
  <PageShell title="Буквы">
    <div v-if="showOffer" :class="styles.offer">
      <BunnyMascot size="md" mood="cheer" />
      <h2 :class="styles.offerTitle">Пора проверить!</h2>
      <p :class="styles.offerText">
        Ты посмотрел все буквы. Пройди тест, чтобы сдать раздел.
      </p>
      <BigButton
        variant="peach"
        size="lg"
        full-width
        @click="router.push('/letters/test')"
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
          :key="letter.char"
          type="button"
          :class="styles.letterCard"
          :aria-label="`Буква ${letter.char}, произнести`"
          @click="speakRussian(letter.name)"
        >
          <span :class="styles.giant">{{ letter.char }}</span>
          <span :class="styles.hint">{{ letter.hint }}</span>
          <span v-if="learned" :class="styles.badge">★</span>
        </button>
      </div>

      <p :class="styles.counter">{{ index + 1 }} / {{ letters.length }}</p>

      <div :class="styles.row">
        <BigButton variant="cream" aria-label="Предыдущая" @click="goPrev">
          ←
        </BigButton>
        <BigButton variant="mint" size="lg" @click="speakRussian(letter.name)">
          Слушать
        </BigButton>
        <BigButton variant="cream" aria-label="Следующая" @click="goNext">
          →
        </BigButton>
      </div>

      <div :class="styles.quizLink">
        <BigButton
          v-if="readyForTest"
          variant="peach"
          size="lg"
          full-width
          @click="router.push('/letters/test')"
        >
          Проверка
        </BigButton>
        <BigButton
          :variant="readyForTest ? 'cream' : 'peach'"
          size="lg"
          full-width
          @click="router.push('/letters/quiz')"
        >
          Игра: найди букву
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
const { learnLetter, progress, sectionPassed } = useProgress();
const { letters, level } = useLevelContent();

const letter = computed(() => letters.value[index.value]);
const learned = computed(() =>
  progress.value.lettersLearned.includes(letter.value.char),
);

const allViewed = computed(
  () =>
    letters.value.length > 0 &&
    letters.value.every((item) =>
      progress.value.lettersLearned.includes(item.char),
    ),
);

const passed = computed(() => sectionPassed("letters"));
const readyForTest = computed(() => allViewed.value && !passed.value);

watch(level, () => {
  index.value = 0;
  showOffer.value = false;
});

watch(
  letter,
  (value) => {
    if (value && !showOffer.value) {
      speakRussian(value.name);
    }
  },
  { immediate: true },
);

const goNext = () => {
  const beforeReady = readyForTest.value;
  learnLetter(letter.value.char);

  const nowAllViewed =
    letters.value.length > 0 &&
    letters.value.every((item) =>
      progress.value.lettersLearned.includes(item.char),
    );

  if (nowAllViewed && !sectionPassed("letters") && !beforeReady) {
    showOffer.value = true;
    return;
  }

  index.value = (index.value + 1) % letters.value.length;
};

const goPrev = () => {
  index.value =
    (index.value - 1 + letters.value.length) % letters.value.length;
};
</script>
