import { type FC, useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { type ComicSeries } from "../types/ComicTypes";
import { topComics2025 } from "../data/topComics2025";
import ComicRankCard from "./shared/ComicRankCard";
import ComicInlineDetail from "./shared/ComicInlineDetail";

const MainTops: FC = () => {
  const [expandedRanks, setExpandedRanks] = useState<Set<number>>(new Set());
  const [bgImages, setBgImages] = useState<string[]>([]);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Sort by rank descending (10 to 1) for the list
  const sortedComics = [...topComics2025].sort((a, b) => b.rank - a.rank);

  // Pick random background images on mount
  useEffect(() => {
    // Collect all available images from comics data
    // Adjust this based on your actual data structure
    const allImages = topComics2025.flatMap((comic) => {
      const images: string[] = [];
      // Add cover if it exists
      // if (typeof comic.cover_image === 'string') {
      //   images.push(comic.cover_image);
      // }
      // Add images array if it exists
      if (Array.isArray(comic.sample_images)) {
        images.push(...comic.sample_images);
      }
      return images;
    });

    // Shuffle and pick 4 random images
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setBgImages(shuffled.slice(0, 4));
  }, []);

  // Find current visible item index based on scroll position
  const getCurrentVisibleIndex = (): number => {
    const scrollTop = window.scrollY;
    let currentIndex = 0;

    for (let i = 0; i < sortedComics.length; i++) {
      const rank = sortedComics[i].rank;
      const el = cardRefs.current.get(rank);
      if (el && el.offsetTop <= scrollTop + 100) {
        currentIndex = i;
      }
    }
    return currentIndex;
  };

  // Navigate to an item: expand it and scroll to it
  const navigateToIndex = (index: number) => {
    const comic = sortedComics[index];
    if (!comic) return;

    // Expand this item (add to set, don't toggle)
    setExpandedRanks((prev) => {
      const next = new Set(prev);
      next.add(comic.rank);
      return next;
    });

    // Scroll to it after a brief delay for expansion animation
    const cardEl = cardRefs.current.get(comic.rank);
    if (cardEl) {
      setTimeout(() => {
        cardEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  // Navigate to previous item (up the list, toward rank 10)
  const goToPrev = () => {
    const currentIndex = getCurrentVisibleIndex();
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : sortedComics.length - 1;
    navigateToIndex(prevIndex);
  };

  // Navigate to next item (down the list, toward rank 1)
  const goToNext = () => {
    const currentIndex = getCurrentVisibleIndex();
    const nextIndex =
      currentIndex < sortedComics.length - 1 ? currentIndex + 1 : 0;
    navigateToIndex(nextIndex);
  };

  // Handle click - toggle expansion and scroll
  const handleCardClick = (comic: ComicSeries) => {
    const isExpanding = !expandedRanks.has(comic.rank);

    setExpandedRanks((prev) => {
      const next = new Set(prev);
      if (next.has(comic.rank)) {
        next.delete(comic.rank);
      } else {
        next.add(comic.rank);
      }
      return next;
    });

    // If expanding a card, scroll to it after animations complete
    if (isExpanding) {
      const cardEl = cardRefs.current.get(comic.rank);
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

  // Store ref for each card
  const setCardRef = (rank: number, el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(rank, el);
    } else {
      cardRefs.current.delete(rank);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 -mb-8">
      {/* Decorative Header Section */}
      <div className="relative bg-zinc-900 border-b border-zinc-800 overflow-hidden">
        {/* Background Comic Images */}
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
            {/* Gradient overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/80 to-zinc-900" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 via-transparent to-zinc-900/50" />
          </div>
        )}

        {/* Fallback Background Pattern (shows briefly before images load) */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-jk-teal rotate-45 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-jk-teal rotate-45 translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col gap-6">
            {/* Title Block */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-2 h-20 bg-jk-teal" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-jk-teal font-semibold">
                    Jenny & Jacob's
                  </p>
                  <h1 className="text-4xl font-black tracking-tight">
                    Top <span className="text-jk-teal">10</span> Comic Series
                  </h1>
                  <p className="text-zinc-400 text-sm mt-1">
                    Our Favorite Reads of{" "}
                    <span className="text-jk-teal font-semibold">2025</span>
                  </p>
                </div>
              </div>

              {/* J&J Badge */}
              <div className="hidden md:flex flex-col items-end gap-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-jk-teal leading-none">
                    J
                  </span>
                  <span className="text-4xl font-black text-zinc-600 leading-none">
                    J
                  </span>
                </div>
                <div className="w-full h-0.5 bg-gradient-to-r from-jk-teal to-zinc-700" />
                <span className="text-zinc-500 text-xs font-mono tracking-[0.3em]">
                  2025
                </span>
              </div>
            </div>

            {/* Intro Note */}
            <div className="max-w-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-700 pl-4">
                Jenny and I read an obnoxious number of comics this year, both
                new and old. For fun--and to soberly reflect on this recent
                obsession--we wrote up a list of the 2025 series that we
                enjoyed. And then we had to narrow that down (!) to a tidy top
                ten in the following order.
              </p>
            </div>
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
                <span className="text-jk-teal text-xs font-bold -rotate-45">
                  10
                </span>
              </div>
              <span className="text-zinc-400 text-sm uppercase tracking-wider">
                to
              </span>
              <div className="w-8 h-8 bg-jk-teal rotate-45 flex items-center justify-center">
                <span className="text-zinc-900 text-xs font-bold -rotate-45">
                  1
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrev}
                className="w-8 h-8 flex items-center justify-center rounded transition-colors bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-jk-teal"
                title="Previous item"
              >
                <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button
                onClick={goToNext}
                className="w-8 h-8 flex items-center justify-center rounded transition-colors bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-jk-teal"
                title="Next item"
              >
                <ChevronDown className="w-4 h-4 " strokeWidth={2.5} />
              </button>
              <span className="text-zinc-600 text-xs font-mono ml-2">
                {expandedRanks.size > 0 ? `` : "tap to expand"}
              </span>
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-zinc-800/50">
          {sortedComics.map((comic) => (
            <div
              key={comic.rank}
              ref={(el) => setCardRef(comic.rank, el)}
              className="scroll-mt-14"
            >
              <ComicRankCard
                comic={comic}
                isSelected={expandedRanks.has(comic.rank)}
                onClick={() => handleCardClick(comic)}
                showExpandIcon={true}
              />
              <ComicInlineDetail
                comic={comic}
                isOpen={expandedRanks.has(comic.rank)}
              />
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="p-8 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-jk-teal/40 rotate-45" />
            <div className="w-3 h-3 bg-jk-teal/60 rotate-45" />
            <div className="w-4 h-4 bg-jk-teal rotate-45" />
            <div className="w-3 h-3 bg-jk-teal/60 rotate-45" />
            <div className="w-2 h-2 bg-jk-teal/40 rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTops;