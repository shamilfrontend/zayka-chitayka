import { createRouter, createWebHistory } from "vue-router";
import { trackPageHit } from "./lib/analytics";
import type { EquationOp } from "./data/equations";

const PAGE_TRANSITION_MS = 220;

function pageTransitionDelay(): number {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return 0;
  }

  return PAGE_TRANSITION_MS;
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("./pages/HomePage.vue") },
    {
      path: "/learn/words",
      component: () => import("./pages/WordsHubPage.vue"),
    },
    {
      path: "/learn/numbers",
      component: () => import("./pages/NumbersHubPage.vue"),
    },
    {
      path: "/learn/misc",
      component: () => import("./pages/MiscHubPage.vue"),
    },
    {
      path: "/settings",
      component: () => import("./pages/SettingsPage.vue"),
    },
    { path: "/about", component: () => import("./pages/AboutPage.vue") },
    {
      path: "/description",
      component: () => import("./pages/DescriptionPage.vue"),
    },
    {
      path: "/changelog",
      component: () => import("./pages/ChangelogPage.vue"),
    },
    {
      path: "/privacy",
      component: () => import("./pages/PrivacyPage.vue"),
    },
    { path: "/letters", component: () => import("./pages/LettersPage.vue") },
    {
      path: "/letters/quiz",
      component: () => import("./pages/LetterQuizPage.vue"),
    },
    {
      path: "/letters/test",
      component: () => import("./pages/LetterTestPage.vue"),
    },
    {
      path: "/syllables",
      component: () => import("./pages/SyllablesPage.vue"),
    },
    {
      path: "/syllables/quiz",
      component: () => import("./pages/SyllableQuizPage.vue"),
    },
    {
      path: "/syllables/test",
      component: () => import("./pages/SyllableTestPage.vue"),
    },
    { path: "/words", component: () => import("./pages/WordsPage.vue") },
    {
      path: "/words/quiz",
      component: () => import("./pages/WordQuizPage.vue"),
    },
    {
      path: "/words/test",
      component: () => import("./pages/WordTestPage.vue"),
    },
    { path: "/numbers", component: () => import("./pages/NumbersPage.vue") },
    {
      path: "/numbers/quiz",
      component: () => import("./pages/NumberQuizPage.vue"),
    },
    {
      path: "/numbers/test",
      component: () => import("./pages/NumberTestPage.vue"),
    },
    {
      path: "/integers",
      component: () => import("./pages/IntegersPage.vue"),
    },
    {
      path: "/integers/quiz",
      component: () => import("./pages/IntegerQuizPage.vue"),
    },
    {
      path: "/integers/test",
      component: () => import("./pages/IntegerTestPage.vue"),
    },
    {
      path: "/addition",
      component: () => import("./pages/EquationPlayPage.vue"),
      meta: { equationOp: "add" satisfies EquationOp },
    },
    {
      path: "/subtraction",
      component: () => import("./pages/EquationPlayPage.vue"),
      meta: { equationOp: "sub" satisfies EquationOp },
    },
    {
      path: "/capitals",
      component: () => import("./pages/CapitalQuizPage.vue"),
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  // Ждём out-in transition в App.vue, иначе на мобилках остаётся scrollY с прошлой страницы
  scrollBehavior(_to, _from, savedPosition) {
    const delay = pageTransitionDelay();

    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(savedPosition), delay);
      });
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve({ top: 0, left: 0 }), delay);
    });
  },
});

router.afterEach(() => {
  trackPageHit(window.location.href);
});
