import { useCallback, useEffect, useRef, useState } from "react";
import { defaultYear, isYearNavigable } from "../data/lists";
import { runYearTransition } from "../utils/yearTransition";

function readYearFromUrl(): string {
  const year = new URLSearchParams(window.location.search).get("year");
  return year && isYearNavigable(year) ? year : defaultYear;
}

/**
 * The currently selected list year, kept in sync with the `?year=` URL param
 * so each year is linkable and back/forward navigation works. The default
 * year is represented by the bare URL. Year changes are animated with a
 * View Transition where supported.
 */
export function useSelectedYear(): [string, (year: string) => void] {
  const [year, setYear] = useState(readYearFromUrl);
  const yearRef = useRef(year);

  const transitionTo = useCallback((next: string, beforeRender?: () => void) => {
    const current = yearRef.current;
    if (next === current) return;
    yearRef.current = next;

    runYearTransition(Number(next) < Number(current) ? "older" : "newer", () => {
      beforeRender?.();
      setYear(next);
      window.scrollTo({ top: 0 });
    });
  }, []);

  useEffect(() => {
    const onPopState = () => transitionTo(readYearFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [transitionTo]);

  const selectYear = useCallback(
    (next: string) => {
      if (!isYearNavigable(next)) return;
      transitionTo(next, () => {
        const url = new URL(window.location.href);
        if (next === defaultYear) {
          url.searchParams.delete("year");
        } else {
          url.searchParams.set("year", next);
        }
        window.history.pushState(null, "", url);
      });
    },
    [transitionTo]
  );

  return [year, selectYear];
}
