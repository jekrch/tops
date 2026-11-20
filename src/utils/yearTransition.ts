import { flushSync } from "react-dom";

export type YearDirection = "older" | "newer";

/** Longest we'll hold the old frame waiting for the new year's images */
const IMAGE_WAIT_MS = 300;

let latestTransition = 0;

/**
 * Wait (briefly) for the images currently in the viewport to be decoded, so
 * the "new" snapshot has them instead of fading into blank tiles that pop in
 * afterwards. Lazy images are switched to eager, since lazy loading is driven
 * by rendering, which is paused while the transition waits.
 */
function visibleImagesReady(): Promise<unknown> {
  const pending = Array.from(document.images)
    .filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0;
    })
    .map((img) => {
      img.loading = "eager";
      return img.decode().catch(() => {});
    });

  if (pending.length === 0) return Promise.resolve();
  return Promise.race([
    Promise.all(pending),
    new Promise((resolve) => setTimeout(resolve, IMAGE_WAIT_MS)),
  ]);
}

/**
 * Apply a year change inside a View Transition so the page animates between
 * years (see yearTransition.css). The direction is exposed to CSS as
 * `html[data-year-direction]` so content moves the way the user is moving.
 *
 * Falls back to an instant update when the browser lacks the View Transitions
 * API or the user prefers reduced motion.
 */
export function runYearTransition(direction: YearDirection, update: () => void) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof document.startViewTransition !== "function" || reduceMotion) {
    update();
    return;
  }

  const id = ++latestTransition;
  const root = document.documentElement;
  root.dataset.yearDirection = direction;

  const transition = document.startViewTransition(async () => {
    // flushSync so React commits the new year before the "new" snapshot is taken
    flushSync(update);
    await visibleImagesReady();
  });

  transition.finished.finally(() => {
    // A newer transition may have started (rapid clicks); leave its direction alone
    if (id === latestTransition) delete root.dataset.yearDirection;
  });
}
