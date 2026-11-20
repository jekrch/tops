import { type FC, Fragment, useState, useRef, useEffect, useLayoutEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { type RankItem } from "../types/RankTypes";
import { type ListConfig, type ListMeta, fillTemplate } from "../types/ListConfig";
import { backgroundImagesFor } from "../utils/listImages";
import RankCard from "./shared/RankCard";
import RankInlineDetail from "./shared/InlineDetail";

interface MainTopsProps {
  /** The list configuration to display */
  config: ListConfig;
  /** The ranked items to display */
  items: RankItem[];
  /** All available list years, in display order */
  years?: string[];
  /** Years shown in the switcher but not selectable */
  disabledYears?: Set<string>;
  /** The year currently being shown */
  activeYear?: string;
  /** Called when the user picks a different year */
  onSelectYear?: (year: string) => void;
  /** Called when the user hovers or focuses a year, before picking it */
  onPreviewYear?: (year: string) => void;
}

/**
 * Fill a config template, wrapping each occurrence of `token` in an accent span.
 * `firstClassName` is added to the first occurrence only (view-transition
 * names must be unique on the page).
 */
function renderHighlighted(
  template: string,
  token: string,
  meta: ListMeta,
  className: string,
  firstClassName = ""
) {
  const value = fillTemplate(token, meta);
  const parts = template.split(token);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {fillTemplate(part, meta)}
      {i < parts.length - 1 && (
        <span className={i === 0 && firstClassName ? `${className} ${firstClassName}` : className}>
          {value}
        </span>
      )}
    </Fragment>
  ));
}

/** Replace `{tap}` with "tap" on touch screens and "click" with a mouse. */
function renderExpandPrompt(prompt: string) {
  const parts = prompt.split("{tap}");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <>
          <span className="pointer-fine:hidden">tap</span>
          <span className="hidden pointer-fine:inline">click</span>
        </>
      )}
    </Fragment>
  ));
}

const MainTops: FC<MainTopsProps> = ({
  config,
  items,
  years = [],
  disabledYears,
  activeYear,
  onSelectYear,
  onPreviewYear,
}) => {
  const [expandedRanks, setExpandedRanks] = useState<Set<number>>(new Set());
  // Cached per list, so they're known (and prefetched) before the year
  // switch renders this list and the view transition snapshots it.
  const bgImages = backgroundImagesFor(items);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  // Rank to scroll to once its detail panel finishes opening
  const pendingScrollRank = useRef<number | null>(null);

  const { branding, meta, content, theme } = config;
  const pageTitle = fillTemplate(meta.pageTitle ?? "", meta);
  const hasItems = items.length > 0;

  useEffect(() => {
    if (pageTitle) document.title = pageTitle;
  }, [pageTitle]);

  // Expose the accent as --accent on <html> (the `accent` Tailwind color), so
  // portaled content like the lightbox picks it up too. Layout effect so it's
  // applied before paint and before the year view transition's snapshot.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", theme.accentColor);
    return () => {
      root.style.removeProperty("--accent");
    };
  }, [theme.accentColor]);

  // Sort by rank descending (highest to 1) for the list
  const sortedItems = [...items].sort((a, b) => b.rank - a.rank);

  // Index of the last card whose top has passed the sticky list header
  const getCurrentVisibleIndex = (): number => {
    let currentIndex = 0;
    sortedItems.forEach((rankItem, i) => {
      const el = cardRefs.current.get(rankItem.rank);
      if (el && el.getBoundingClientRect().top <= 100) currentIndex = i;
    });
    return currentIndex;
  };

  const scrollToCard = (rank: number) => {
    cardRefs.current.get(rank)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /**
   * Expand an item and scroll it to the top once its panel has finished
   * opening (near the bottom of the page there isn't room until it has).
   */
  const expandAndScroll = (rank: number) => {
    if (expandedRanks.has(rank)) {
      pendingScrollRank.current = null;
      scrollToCard(rank);
      return;
    }
    pendingScrollRank.current = rank;
    setExpandedRanks((prev) => new Set(prev).add(rank));
  };

  const handleOpened = (rank: number) => {
    if (pendingScrollRank.current !== rank) return;
    pendingScrollRank.current = null;
    scrollToCard(rank);
  };

  // Navigate to an item: expand it and scroll to it. Scroll right away (the
  // card's top doesn't move as it expands) and again once open, in case the
  // page was too short to reach it at first.
  const navigateToIndex = (index: number) => {
    const rankItem = sortedItems[index];
    if (!rankItem) return;
    if (!expandedRanks.has(rankItem.rank)) scrollToCard(rankItem.rank);
    expandAndScroll(rankItem.rank);
  };

  const goToPrev = () => {
    const currentIndex = getCurrentVisibleIndex();
    navigateToIndex(currentIndex > 0 ? currentIndex - 1 : sortedItems.length - 1);
  };

  const goToNext = () => {
    const currentIndex = getCurrentVisibleIndex();
    navigateToIndex(currentIndex < sortedItems.length - 1 ? currentIndex + 1 : 0);
  };

  const handleCardClick = (rank: number) => {
    if (!expandedRanks.has(rank)) {
      expandAndScroll(rank);
      return;
    }
    if (pendingScrollRank.current === rank) pendingScrollRank.current = null;
    setExpandedRanks((prev) => {
      const next = new Set(prev);
      next.delete(rank);
      return next;
    });
  };

  const setCardRef = (rank: number, el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(rank, el);
    } else {
      cardRefs.current.delete(rank);
    }
  };

  // Extract initials for badge display
  const initials = branding.authorInitials?.split("") || [];
  const reviewLabel = content.reviewLabel ?? branding.authorInitials;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 -mb-8">
      {/* Decorative Header Section */}
      <div className="relative bg-zinc-900 border-b border-zinc-800 overflow-hidden vt-year-header">
        {/* Background Random Images */}
        {bgImages.length > 0 && (
          <div className="absolute inset-0 vt-year-backdrop">
            <div className="absolute inset-0 flex">
              {/* <img> rather than CSS backgrounds so the year transition can
                  wait for them to decode before snapshotting */}
              {bgImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  decoding="async"
                  className="flex-1 min-w-0 h-full object-cover opacity-65"
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/80 to-zinc-900" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 via-transparent to-zinc-900/50" />
          </div>
        )}

        {/* Fallback Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rotate-45 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent rotate-45 translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col gap-6">
            {/* Title Block */}
            <div className="flex items-center justify-between vt-year-heading">
              <div className="flex items-center gap-4">
                <div className="w-2 h-20 bg-accent" />
                <div>
                  {branding.authorLink ? (
                    <a
                      href={branding.authorLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-[0.3em] text-accent font-semibold hover:underline"
                    >
                      {branding.authorName}
                    </a>
                  ) : (
                    <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
                      {branding.authorName}
                    </p>
                  )}
                  <h1 className="text-4xl font-black tracking-tight">
                    {renderHighlighted(meta.title, "{n}", meta, "text-accent")}
                  </h1>
                  {meta.subtitle && (
                    <p className="text-zinc-400 text-sm mt-1">
                      {renderHighlighted(
                        meta.subtitle,
                        "{year}",
                        meta,
                        "text-accent font-semibold",
                        "inline-block vt-year-num-subtitle"
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Author Badge */}
              {initials.length >= 2 && (
                <div className="hidden md:flex flex-col items-end gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-accent leading-none">
                      {initials[0]}
                    </span>
                    <span className="text-4xl font-black text-zinc-600 leading-none">
                      {initials[1]}
                    </span>
                  </div>
                  <div className="w-full h-0.5 bg-gradient-to-r from-accent to-zinc-700" />
                  <span className="text-zinc-500 text-xs font-mono tracking-[0.3em] vt-year-num-badge">
                    {meta.year}
                  </span>
                </div>
              )}
            </div>

            {/* Year Switcher */}
            {years.length > 1 && (
              <nav aria-label="List year" className="flex flex-wrap items-center gap-2 vt-year-switcher">
                {years.map((year) => {
                  const isActive = year === activeYear;
                  const isDisabled = !isActive && !!disabledYears?.has(year);
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => onSelectYear?.(year)}
                      onPointerEnter={() => onPreviewYear?.(year)}
                      onFocus={() => onPreviewYear?.(year)}
                      disabled={isDisabled}
                      title={isDisabled ? "Coming soon" : undefined}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative px-3 py-1 text-xs font-mono tracking-[0.2em] border transition-colors duration-300 ${
                        isActive
                          ? "border-transparent text-accent"
                          : isDisabled
                            ? "border-zinc-800 text-zinc-700 cursor-not-allowed"
                            : "border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      {/* Only the active button renders the indicator; its shared
                          view-transition-name makes it glide between years */}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute -inset-px border border-accent bg-zinc-100/5 vt-year-indicator"
                        />
                      )}
                      <span className="relative">{year}</span>
                    </button>
                  );
                })}
              </nav>
            )}

            {/* Intro Note */}
            {content.introText && (
              <div className="max-w-2xl vt-year-intro">
                <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-700 pl-4">
                  {content.introText}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - Accordion Style */}
      <div className="max-w-3xl mx-auto">
        {/* List Header */}
        <div className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800 px-4 py-3 vt-year-listbar">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-800 rotate-45 flex items-center justify-center">
                <span className="text-accent text-xs font-bold -rotate-45">
                  {meta.listSize}
                </span>
              </div>
              <span className="text-zinc-400 text-sm uppercase tracking-wider">
                to
              </span>
              <div className="w-8 h-8 bg-accent rotate-45 flex items-center justify-center">
                <span className="text-zinc-900 text-xs font-bold -rotate-45">
                  1
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            {hasItems && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrev}
                  className="w-8 h-8 flex items-center justify-center rounded transition-colors bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-accent"
                  title="Previous item"
                  aria-label="Previous item"
                >
                  <ChevronUp className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="w-8 h-8 flex items-center justify-center rounded transition-colors bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-accent"
                  title="Next item"
                  aria-label="Next item"
                >
                  <ChevronDown className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                </button>
                <span className="text-zinc-600 text-xs font-mono ml-2">
                  {expandedRanks.size > 0 || !content.expandPrompt
                    ? ""
                    : renderExpandPrompt(content.expandPrompt)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Year Content (animated as one layer on year switch) */}
        <div className="vt-year-list">
          {/* Empty State */}
          {!hasItems && (
            <div className="px-4 py-16 text-center">
              <p className="text-zinc-400 text-sm">
                The <span className="text-accent font-semibold">{meta.year}</span> list is still in the works.
              </p>
              <p className="text-zinc-600 text-xs font-mono mt-2">check back soon</p>
            </div>
          )}

          {/* Accordion List */}
          <div className="divide-y divide-zinc-800/50">
            {sortedItems.map((rankItem: RankItem) => {
              const isOpen = expandedRanks.has(rankItem.rank);
              const detailId = `rank-${rankItem.rank}-detail`;
              return (
                <div
                  key={rankItem.rank}
                  ref={(el) => setCardRef(rankItem.rank, el)}
                  className="scroll-mt-14"
                >
                  <RankCard
                    item={rankItem}
                    isSelected={isOpen}
                    onClick={() => handleCardClick(rankItem.rank)}
                    controls={detailId}
                  />
                  <RankInlineDetail
                    id={detailId}
                    item={rankItem}
                    isOpen={isOpen}
                    reviewLabel={reviewLabel}
                    onOpened={() => handleOpened(rankItem.rank)}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom Decoration */}
          <div className="p-8 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent opacity-40 rotate-45" />
              <div className="w-3 h-3 bg-accent opacity-60 rotate-45" />
              <div className="w-4 h-4 bg-accent rotate-45" />
              <div className="w-3 h-3 bg-accent opacity-60 rotate-45" />
              <div className="w-2 h-2 bg-accent opacity-40 rotate-45" />
            </div>
          </div>
          <div className="flex justify-center">
            <a href="https://jacobkrch.com" target="_blank" rel="noopener noreferrer" className="relative bottom-4 text-zinc-600 hover:text-accent text-xs">
              jacobkrch.com
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainTops;
