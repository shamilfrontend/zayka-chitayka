<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import { useLearnDeck } from "../composables/useLearnDeck";
import { useLevelContent } from "../composables/useLevelContent";
import { useProgress } from "../composables/useProgress";
import { speakContent } from "../lib/speech";
import styles from "./Learn.module.css";

const router = useRouter();
const { learnSyllable, reading } = useProgress();
const { syllables } = useLevelContent();

const { index, item, learned, showOffer, readyForTest, goNext, goPrev } =
  useLearnDeck({
    items: syllables,
    speakItem: (syllable) => speakContent(syllable.text.toLowerCase()),
    markLearned: (syllable) => learnSyllable(syllable.text),
    isItemLearned: (syllable) =>
      reading.value.syllablesLearned.includes(syllable.text),
    sectionId: "syllables",
  });

const syllable = computed(() => item.value!);
</script>

<template>
  <PageShell title="Слоги" back-to="/learn/words">
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
          @click="speakContent(syllable.text.toLowerCase())"
        >
          <span :class="styles.giant">{{ syllable.text }}</span>
          <span :class="styles.hint">
            {{ syllable.consonant }} + {{ syllable.vowel }}
          </span>
          <span v-if="learned" :class="styles.badge">✓</span>
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
          @click="speakContent(syllable.text.toLowerCase())"
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
