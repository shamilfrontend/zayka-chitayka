const ONBOARDING_KEY = "reader-bunny-onboarding-done";

export function shouldShowOnboarding(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_KEY) !== "1";
  } catch {
    return false;
  }
}

export function dismissOnboarding(): void {
  try {
    localStorage.setItem(ONBOARDING_KEY, "1");
  } catch {
    /* private mode / blocked storage */
  }
}
