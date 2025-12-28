import { type FC, useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { type RankItem } from "../types/RankTypes";
import { type ListConfig, interpolateConfig } from "../types/ListConfig";
import { rankItems, listConfig } from "../data/rankItems";
import RankCard from "./shared/RankCard";
import RankInlineDetail from "./shared/InlineDetail";

interface MainTopsProps {
  /** Optional override for the list configuration */
  config?: ListConfig;
  /** Optional override for the rank items */
  items?: RankItem[];
}

const MainTops: FC<MainTopsProps> = ({
  config = listConfig,
  items = rankItems,
}) => {
  const [expandedRanks, setExpandedRanks] = useState<Set<number>>(new Set());
  const [bgImages, setBgImages] = useState<string[]>([]);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Interpolate template strings in config
  const { subtitle } = interpolateConfig(config);
  const { branding, meta, content, theme } = config;

  // Dynamic accent color classes
  const accent = {
    bg: `bg-${theme.accentColor}`,
    text: `text-${theme.accentColor}`,
    border: `border-${theme.accentColor}`,
    from: `from-${theme.accentColor}`,
    to: `to-${theme.accentColor}`,
  };

  // Sort by rank descending (highest to 1) for the list
  const sortedItems = [...items].sort((a, b) => b.rank - a.rank);

  // Pick random background images on mount
  useEffect(() => {
    const allImages = items.flatMap((rankItem: RankItem) => {
      const images: string[] = [];
      if (Array.isArray(rankItem.sample_images)) {
        images.push(...rankItem.sample_images);
      }
      return images;
    });

    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setBgImages(shuffled.slice(0, 4));
  }, [items]);

  // Find current visible item index based on scroll position
  const getCurrentVisibleIndex = (): number => {
    const scrollTop = window.scrollY;
    let currentIndex = 0;

    for (let i = 0; i < sortedItems.length; i++) {
      const rank = sortedItems[i].rank;
      const el = cardRefs.current.get(rank);
      if (el && el.offsetTop <= scrollTop + 100) {
        currentIndex = i;
      }
    }
    return currentIndex;
  };

  // Navigate to an item: expand it and scroll to it
  const navigateToIndex = (index: number) => {
    const rankItem = sortedItems[index];
    if (!rankItem) return;

    setExpandedRanks((prev) => {
      const next = new Set(prev);
      next.add(rankItem.rank);
      return next;
    });

    const cardEl = cardRefs.current.get(rankItem.rank);
    if (cardEl) {
      setTimeout(() => {
        cardEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const goToPrev = () => {
    const currentIndex = getCurrentVisibleIndex();
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : sortedItems.length - 1;
    navigateToIndex(prevIndex);
  };

  const goToNext = () => {
    const currentIndex = getCurrentVisibleIndex();
    const nextIndex =
      currentIndex < sortedItems.length - 1 ? currentIndex + 1 : 0;
    navigateToIndex(nextIndex);
  };

  const handleCardClick = (rankItem: RankItem) => {
    const isExpanding = !expandedRanks.has(rankItem.rank);

    setExpandedRanks((prev) => {
      const next = new Set(prev);
      if (next.has(rankItem.rank)) {
        next.delete(rankItem.rank);
      } else {
        next.add(rankItem.rank);
      }
      return next;
    });

    if (isExpanding) {
      const cardEl = cardRefs.current.get(rankItem.rank);
      if (cardEl) {
        setTimeout(() => {
          cardEl.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 500);
      }
    }
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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 -mb-8">
      {/* Decorative Header Section */}
      <div className="relative bg-zinc-900 border-b border-zinc-800 overflow-hidden">
        {/* Background Random Images */}
        {bgImages.length > 0 && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 flex">
              {bgImages.map((img, i) => (
                <div
                  key={i}
                  className="flex-1 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${img})`,
                    opacity: 0.65,
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/80 to-zinc-900" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 via-transparent to-zinc-900/50" />
          </div>
        )}

        {/* Fallback Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute top-0 left-0 w-96 h-96 ${accent.bg} rotate-45 -translate-x-1/2 -translate-y-1/2`} />
          <div className={`absolute bottom-0 right-0 w-64 h-64 ${accent.bg} rotate-45 translate-x-1/2 translate-y-1/2`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col gap-6">
            {/* Title Block */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-20 ${accent.bg}`} />
                <div>
                  {branding.authorLink ? (
                    <a
                      href={branding.authorLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs uppercase tracking-[0.3em] ${accent.text} font-semibold hover:underline`}
                    >
                      {branding.authorName}
                    </a>
                  ) : (
                    <p className={`text-xs uppercase tracking-[0.3em] ${accent.text} font-semibold`}>
                      {branding.authorName}
                    </p>
                  )}
                  <h1 className="text-4xl font-black tracking-tight">
                    Top <span className={accent.text}>{meta.listSize}</span> {meta.subject}
                  </h1>
                  {subtitle && (
                    <p className="text-zinc-400 text-sm mt-1">
                      {subtitle.split(String(meta.year)).map((part, i, arr) =>
                        i < arr.length - 1 ? (
                          <span key={i}>
                            {part}
                            <span className={`${accent.text} font-semibold`}>
                              {meta.year}
                            </span>
                          </span>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Author Badge */}
              {initials.length >= 2 && (
                <div className="hidden md:flex flex-col items-end gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-black ${accent.text} leading-none`}>
                      {initials[0]}
                    </span>
                    <span className="text-4xl font-black text-zinc-600 leading-none">
                      {initials[1]}
                    </span>
                  </div>
                  <div className={`w-full h-0.5 bg-gradient-to-r ${accent.from} to-zinc-700`} />
                  <span className="text-zinc-500 text-xs font-mono tracking-[0.3em]">
                    {meta.year}
                  </span>
                </div>
              )}
            </div>

            {/* Intro Note */}
            {content.introText && (
              <div className="max-w-2xl">
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
        <div className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-800 rotate-45 flex items-center justify-center">
                <span className={`${accent.text} text-xs font-bold -rotate-45`}>
                  {meta.listSize}
                </span>
              </div>
              <span className="text-zinc-400 text-sm uppercase tracking-wider">
                to
              </span>
              <div className={`w-8 h-8 ${accent.bg} rotate-45 flex items-center justify-center`}>
                <span className="text-zinc-900 text-xs font-bold -rotate-45">
                  1
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrev}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:${accent.text}`}
                title="Previous item"
              >
                <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button
                onClick={goToNext}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:${accent.text}`}
                title="Next item"
              >
                <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <span className="text-zinc-600 text-xs font-mono ml-2">
                {expandedRanks.size > 0 ? "" : content.expandPrompt}
              </span>
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-zinc-800/50">
          {sortedItems.map((rankItem: RankItem) => (
            <div
              key={rankItem.rank}
              ref={(el) => setCardRef(rankItem.rank, el)}
              className="scroll-mt-14"
            >
              <RankCard
                item={rankItem}
                isSelected={expandedRanks.has(rankItem.rank)}
                onClick={() => handleCardClick(rankItem)}
                showExpandIcon={true}
              />
              <RankInlineDetail
                item={rankItem}
                isOpen={expandedRanks.has(rankItem.rank)}
              />
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="p-8 flex justify-center">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${accent.bg} opacity-40 rotate-45`} />
            <div className={`w-3 h-3 ${accent.bg} opacity-60 rotate-45`} />
            <div className={`w-4 h-4 ${accent.bg} rotate-45`} />
            <div className={`w-3 h-3 ${accent.bg} opacity-60 rotate-45`} />
            <div className={`w-2 h-2 ${accent.bg} opacity-40 rotate-45`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTops;