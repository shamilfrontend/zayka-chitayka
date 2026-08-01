<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import BigButton from "../components/BigButton.vue";
import BunnyMascot from "../components/BunnyMascot.vue";
import PageShell from "../components/PageShell.vue";
import { useEquationQuiz } from "../composables/useEquationQuiz";
import {
  EQUATION_RANGES,
  rangeLabel,
  type EquationOp,
  type EquationRange,
} from "../data/equations";

const route = useRoute();
const router = useRouter();

const op = (): EquationOp => route.meta.equationOp ?? "add";

const pageTitle = computed(() =>
  op() === "add" ? "Сложение" : "Вычитание",
);

const selectedRange = ref<EquationRange | null>(null);

const rangeOptions = computed(() =>
  EQUATION_RANGES.map((max, index) => ({
    max,
    label: rangeLabel(max),
    variant: (["mint", "sky", "lilac"] as const)[index],
  })),
);

const {
  round,
  feedback,
  done,
  goal,
  counterLabel,
  ask,
  pick,
  choiceVariant,
  restart,
} = useEquationQuiz({
  op,
  range: () => selectedRange.value ?? 9,
  active: () => selectedRange.value !== null,
});

watch(
  () => route.path,
  () => {
    selectedRange.value = null;
  },
);

const startRange = (max: EquationRange) => {
  selectedRange.value = max;
  restart();
};

const playAgain = () => {
  selectedRange.value = null;
};

const backToHub = () => {
  router.push("/learn/numbers");
};
</script>

<template>
  <PageShell :title="pageTitle" back-to="/learn/numbers">
    <nav
      v-if="selectedRange === null"
      class="modes"
      :aria-label="`Диапазон: ${pageTitle}`"
    >
      <button
        v-for="option in rangeOptions"
        :key="option.max"
        type="button"
        :class="['mode', option.variant, 'modeReset']"
        @click="startRange(option.max)"
      >
        <span class="modeTitle">{{ option.label }}</span>
        <span class="modeSub">Выбери и играй</span>
      </button>
    </nav>

    <div v-else-if="done" class="done">
      <BunnyMascot size="md" mood="cheer" />
      <h2 class="doneTitle">Раздел сдан!</h2>
      <p class="doneText">
        Ты сделал {{ goal }} верных ответов. Раздел отмечен в прогрессе.
      </p>
      <BigButton variant="mint" size="lg" full-width @click="playAgain">
        Ещё раз
      </BigButton>
      <BigButton variant="sky" size="lg" full-width @click="backToHub">
        К числам
      </BigButton>
    </div>

    <template v-else>
      <div class="prompt">
        <BunnyMascot
          size="sm"
          :mood="
            feedback === 'correct'
              ? 'cheer'
              : feedback === 'retry'
                ? 'sad'
                : 'think'
          "
        />
        <p class="question">
          <strong>{{ round.equation.prompt }}</strong>
        </p>
        <BigButton variant="ghost" @click="ask">🔊 Ещё раз</BigButton>
      </div>

      <div class="grid">
        <div
          v-for="answer in round.choices"
          :key="`${round.equation.id}-${answer}`"
          class="choiceWrap"
        >
          <BigButton
            size="xl"
            :variant="choiceVariant(answer)"
            :aria-label="`Ответ ${answer}`"
            :disabled="feedback === 'correct'"
            @click="pick(answer)"
          >
            {{ answer }}
          </BigButton>
        </div>
      </div>

      <p class="streak">{{ counterLabel }}</p>
      <p v-if="feedback === 'retry'" class="retryMsg">Попробуй ещё!</p>
    </template>
  </PageShell>
</template>

<style scoped lang="scss">
@use "../styles/quiz";
@use "../styles/mode-cards";

button.modeReset {
  border: none;
  width: 100%;
  color: inherit;
}
</style>
