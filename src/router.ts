import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import LettersPage from "./pages/LettersPage.vue";
import LetterQuizPage from "./pages/LetterQuizPage.vue";
import LetterTestPage from "./pages/LetterTestPage.vue";
import SyllablesPage from "./pages/SyllablesPage.vue";
import SyllableQuizPage from "./pages/SyllableQuizPage.vue";
import SyllableTestPage from "./pages/SyllableTestPage.vue";
import WordsPage from "./pages/WordsPage.vue";
import WordQuizPage from "./pages/WordQuizPage.vue";
import WordTestPage from "./pages/WordTestPage.vue";
import SettingsPage from "./pages/SettingsPage.vue";
import AboutPage from "./pages/AboutPage.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomePage },
    { path: "/settings", component: SettingsPage },
    { path: "/about", component: AboutPage },
    { path: "/letters", component: LettersPage },
    { path: "/letters/quiz", component: LetterQuizPage },
    { path: "/letters/test", component: LetterTestPage },
    { path: "/syllables", component: SyllablesPage },
    { path: "/syllables/quiz", component: SyllableQuizPage },
    { path: "/syllables/test", component: SyllableTestPage },
    { path: "/words", component: WordsPage },
    { path: "/words/quiz", component: WordQuizPage },
    { path: "/words/test", component: WordTestPage },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.afterEach(() => {
  const ym = window.ym;
  if (typeof ym === "function") {
    ym(110739961, "hit", window.location.href);
  }
});
