import type { YearList } from "../types/YearList";

/**
 * The year shown when the URL has no `?year=` param.
 * `bun run list:new <year> --default` and `bun run list:default <year>` update this line.
 */
export const DEFAULT_YEAR = "2026";

// Every file in ./lists/ named <year>.ts is picked up automatically.
const modules = import.meta.glob<YearList>("./lists/*.ts", {
  eager: true,
  import: "default",
});

export const yearLists: Record<string, YearList> = Object.fromEntries(
  Object.entries(modules).map(([path, list]) => [
    path.replace(/^.*\/([^/]+)\.ts$/, "$1"),
    list,
  ])
);

/** Available years, newest first. */
export const availableYears: string[] = Object.keys(yearLists).sort(
  (a, b) => Number(b) - Number(a)
);

const isLocalEnv = ["localhost", "127.0.0.1", "[::1]", "::1"].includes(
  window.location.hostname
);

/** Draft years: shown in the switcher but only selectable when running locally. */
export const disabledYears: Set<string> = isLocalEnv
  ? new Set()
  : new Set(availableYears.filter((year) => yearLists[year].draft));

/** Whether a list exists for `year` and it can be viewed in this environment. */
export function isYearNavigable(year: string): boolean {
  return year in yearLists && !disabledYears.has(year);
}

/** DEFAULT_YEAR if it's navigable, otherwise the newest navigable list. */
export const defaultYear: string = isYearNavigable(DEFAULT_YEAR)
  ? DEFAULT_YEAR
  : availableYears.find(isYearNavigable) ?? availableYears[0];
