import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import WordsHubPage from "./pages/WordsHubPage.vue";
import NumbersHubPage from "./pages/NumbersHubPage.vue";
import LettersPage from "./pages/LettersPage.vue";
import LetterQuizPage from "./pages/LetterQuizPage.vue";
import LetterTestPage from "./pages/LetterTestPage.vue";
import NumbersPage from "./pages/NumbersPage.vue";
import NumberQuizPage from "./pages/NumberQuizPage.vue";
import NumberTestPage from "./pages/NumberTestPage.vue";
import IntegersPage from "./pages/IntegersPage.vue";
import IntegerQuizPage from "./pages/IntegerQuizPage.vue";
import IntegerTestPage from "./pages/IntegerTestPage.vue";
import EquationPlayPage from "./pages/EquationPlayPage.vue";
import SyllablesPage from "./pages/SyllablesPage.vue";
import SyllableQuizPage from "./pages/SyllableQuizPage.vue";
import SyllableTestPage from "./pages/SyllableTestPage.vue";
import WordsPage from "./pages/WordsPage.vue";
import WordQuizPage from "./pages/WordQuizPage.vue";
import WordTestPage from "./pages/WordTestPage.vue";
import SettingsPage from "./pages/SettingsPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import PrivacyPage from "./pages/PrivacyPage.vue";
import { trackPageHit } from "./lib/analytics";
import type { EquationOp } from "./data/equations";

const PAGE_TRANSITION_MS = 220;

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomePage },
    { path: "/learn/words", component: WordsHubPage },
    { path: "/learn/numbers", component: NumbersHubPage },
    { path: "/settings", component: SettingsPage },
    { path: "/about", component: AboutPage },
    { path: "/privacy", component: PrivacyPage },
    { path: "/letters", component: LettersPage },
    { path: "/letters/quiz", component: LetterQuizPage },
    { path: "/letters/test", component: LetterTestPage },
    { path: "/syllables", component: SyllablesPage },
    { path: "/syllables/quiz", component: SyllableQuizPage },
    { path: "/syllables/test", component: SyllableTestPage },
    { path: "/words", component: WordsPage },
    { path: "/words/quiz", component: WordQuizPage },
    { path: "/words/test", component: WordTestPage },
    { path: "/numbers", component: NumbersPage },
    { path: "/numbers/quiz", component: NumberQuizPage },
    { path: "/numbers/test", component: NumberTestPage },
    { path: "/integers", component: IntegersPage },
    { path: "/integers/quiz", component: IntegerQuizPage },
    { path: "/integers/test", component: IntegerTestPage },
    {
      path: "/addition",
      component: EquationPlayPage,
      meta: { equationOp: "add" satisfies EquationOp },
    },
    {
      path: "/subtraction",
      component: EquationPlayPage,
      meta: { equationOp: "sub" satisfies EquationOp },
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  // Ждём out-in transition в App.vue, иначе на мобилках остаётся scrollY с прошлой страницы
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(savedPosition), PAGE_TRANSITION_MS);
      });
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve({ top: 0, left: 0 }), PAGE_TRANSITION_MS);
    });
  },
});

router.afterEach(() => {
  trackPageHit(window.location.href);
});
