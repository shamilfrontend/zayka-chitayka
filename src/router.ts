import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import LettersPage from "./pages/LettersPage.vue";
import LetterQuizPage from "./pages/LetterQuizPage.vue";
import LetterTestPage from "./pages/LetterTestPage.vue";
import NumbersPage from "./pages/NumbersPage.vue";
import NumberQuizPage from "./pages/NumberQuizPage.vue";
import NumberTestPage from "./pages/NumberTestPage.vue";
import IntegersPage from "./pages/IntegersPage.vue";
import IntegerQuizPage from "./pages/IntegerQuizPage.vue";
import IntegerTestPage from "./pages/IntegerTestPage.vue";
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

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomePage },
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
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.afterEach(() => {
  trackPageHit(window.location.href);
});
