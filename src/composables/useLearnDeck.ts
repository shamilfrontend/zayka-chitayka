import { computed, ref, watch, type ComputedRef } from "vue";
import type { SectionId } from "../lib/progress";
import { useProgress } from "./useProgress";

interface UseLearnDeckOptions<T> {
  items: ComputedRef<T[]>;
  speakItem: (item: T) => void;
  markLearned: (item: T) => void;
  isItemLearned: (item: T) => boolean;
  sectionId: SectionId;
}

/**
 * Общая логика экрана изучения: карточки, озвучка,
 * отметка «видел» и оффер теста после полного просмотра.
 */
export function useLearnDeck<T>(options: UseLearnDeckOptions<T>) {
  const { sectionPassed } = useProgress();
  const index = ref(0);
  const showOffer = ref(false);

  const item = computed(() => options.items.value[index.value]);

  const learned = computed(() => {
    const current = item.value;
    return current ? options.isItemLearned(current) : false;
  });

  const allViewed = computed(
    () =>
      options.items.value.length > 0 &&
      options.items.value.every((entry) => options.isItemLearned(entry)),
  );

  const passed = computed(() => sectionPassed(options.sectionId));
  const readyForTest = computed(() => allViewed.value && !passed.value);

  watch(
    item,
    (value) => {
      if (value && !showOffer.value) {
        options.speakItem(value);
      }
    },
    { immediate: true },
  );

  const goNext = () => {
    const current = item.value;
    if (!current) {
      return;
    }

    const beforeReady = readyForTest.value;
    options.markLearned(current);

    const nowAllViewed =
      options.items.value.length > 0 &&
      options.items.value.every((entry) => options.isItemLearned(entry));

    if (
      nowAllViewed &&
      !sectionPassed(options.sectionId) &&
      !beforeReady
    ) {
      showOffer.value = true;
      return;
    }

    const length = options.items.value.length;
    if (length > 0) {
      index.value = (index.value + 1) % length;
    }
  };

  const goPrev = () => {
    const length = options.items.value.length;
    if (length > 0) {
      index.value = (index.value - 1 + length) % length;
    }
  };

  return {
    index,
    item,
    learned,
    showOffer,
    readyForTest,
    goNext,
    goPrev,
  };
}
