import { type FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ViewerContext } from "@jekrch/react-viewport-lightbox/lazy";

/** Render-slot content for the tops lightbox (see useImageLightbox). */

type SlotProps = { ctx: ViewerContext };

const btnBase =
  "flex items-center justify-center bg-zinc-900/80 text-zinc-300 border border-zinc-700 transition-colors duration-200 hover:bg-accent hover:text-zinc-900 hover:border-accent";

export const CounterBox: FC<SlotProps> = ({ ctx }) => (
  // data-zoomed dims the whole top bar while zoomed (see lightbox.css)
  <div
    data-zoomed={ctx.isZoomed || undefined}
    className="inline-block px-3 py-1.5 bg-zinc-900/80 text-zinc-300 text-sm font-mono border border-zinc-700"
  >
    {ctx.index + 1} / {ctx.total}
  </div>
);

export const ZoomHint: FC<SlotProps> = ({ ctx }) => {
  const action = ctx.isTouchDevice ? "double-tap" : "double-click";
  return (
    <span className="hidden sm:block mr-2 text-zinc-500 text-xs">
      {ctx.isZoomed ? `drag to pan • ${action} to reset` : `${action} to zoom`}
    </span>
  );
};

/** Desktop edge arrows and the zoomed-state reset button. */
export const Overlay: FC<SlotProps> = ({ ctx }) => {
  if (ctx.isZoomed) {
    return (
      <button
        type="button"
        onClick={ctx.resetZoom}
        className="absolute left-1/2 -translate-x-1/2 bottom-[max(1.5rem,env(safe-area-inset-bottom))] px-4 py-2 bg-zinc-900/80 text-zinc-400 text-xs border border-zinc-700 hover:bg-zinc-800 transition-colors"
      >
        Reset zoom
      </button>
    );
  }
  if (ctx.total < 2) return null;

  // Center vertically in the space between the top and bottom bars.
  const top = `calc(${ctx.topBarHeight}px + (100% - ${ctx.topBarHeight + ctx.bottomBarHeight}px) / 2)`;
  const arrow = `hidden md:flex absolute w-12 h-12 -translate-y-1/2 ${btnBase}`;

  return (
    <>
      <button
        type="button"
        onClick={ctx.goPrev}
        className={`${arrow} left-4`}
        style={{ top }}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={ctx.goNext}
        className={`${arrow} right-4`}
        style={{ top }}
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" strokeWidth={2} />
      </button>
    </>
  );
};

/** Thumbnail strip and keyboard hint, desktop only. Mobile uses the nav row. */
export const DesktopFooter: FC<SlotProps> = ({ ctx }) => (
  <div
    className={`hidden md:flex flex-col items-center gap-3 mx-auto w-fit transition-opacity duration-200 ${
      ctx.isZoomed ? "opacity-0 pointer-events-none" : "opacity-100"
    }`}
  >
    {ctx.total > 1 && (
      <div className="flex gap-2 p-2 bg-zinc-900/60 border border-zinc-800">
        {ctx.items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => ctx.goTo(idx)}
            aria-label={`Go to image ${idx + 1}`}
            aria-current={idx === ctx.index || undefined}
            className={`w-12 h-16 overflow-hidden flex-shrink-0 transition-all duration-200 ${
              idx === ctx.index
                ? "ring-2 ring-accent scale-105"
                : "ring-1 ring-zinc-700 opacity-60 hover:opacity-100 hover:ring-accent/50"
            }`}
          >
            <img src={item.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    )}
    <p className="text-zinc-600 text-xs">Use arrow keys to navigate • Esc to close</p>
  </div>
);
