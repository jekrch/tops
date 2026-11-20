import { type FC, type TransitionEvent, useMemo, useState } from "react";
import { ArrowRight, ZoomIn } from "lucide-react";
import { type RankItem } from "../../types/RankTypes";
import { imageVariant } from "../../utils/imageVariant";
import { useImageLightbox } from "./useImageLightbox";

interface InlineDetailProps {
  /** DOM id, referenced by the card's aria-controls */
  id: string;
  item: RankItem;
  isOpen: boolean;
  /** Label above the review comment */
  reviewLabel?: string;
  /** Called once the open animation has finished */
  onOpened?: () => void;
}

/**
 * Collapsible detail panel under a RankCard. The content mounts the first
 * time the panel opens, so collapsed items don't download their images, and
 * stays mounted afterwards so closing still animates.
 */
const RankInlineDetail: FC<InlineDetailProps> = ({
  id,
  item,
  isOpen,
  reviewLabel,
  onOpened,
}) => {
  const [hasOpened, setHasOpened] = useState(isOpen);
  if (isOpen && !hasOpened) setHasOpened(true);

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (isOpen && e.target === e.currentTarget && e.propertyName === "grid-template-rows") {
      onOpened?.();
    }
  };

  return (
    <div
      id={id}
      inert={!isOpen}
      onTransitionEnd={handleTransitionEnd}
      className={`
        grid transition-[grid-template-rows,opacity] duration-500 ease-in-out
        ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
      `}
    >
      <div className="min-h-0 overflow-hidden">
        {hasOpened && <DetailContent item={item} reviewLabel={reviewLabel} />}
      </div>
    </div>
  );
};

function pickRandom<T>(values: T[]): T | null {
  return values.length > 0 ? values[Math.floor(Math.random() * values.length)] : null;
}

const DetailContent: FC<{ item: RankItem; reviewLabel?: string }> = ({
  item,
  reviewLabel,
}) => {
  const allImages = useMemo(
    () => [item.cover_image, ...item.sample_images],
    [item.cover_image, item.sample_images]
  );
  const lightbox = useImageLightbox(allImages, item.name);

  // Picked once when the content first mounts
  const [bgImage] = useState(() => pickRandom(item.sample_images));

  return (
    <>
      <div className="bg-zinc-900/80 border-t border-zinc-800">
        <div className="p-4 space-y-4">
          {/* Cover and Basic Info Row */}
          <div className="flex gap-4">
            {/* Cover Image - Clickable */}
            <button
              {...lightbox.trigger(0)}
              className="shrink-0 w-24 relative group cursor-zoom-in"
            >
              <div className="aspect-[2/3] overflow-hidden bg-zinc-800">
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-t-accent/30 border-l-[20px] border-l-transparent z-2" />
                <img
                  src={imageVariant(item.cover_image, "sm")}
                  alt={item.name}
                  width={96}
                  height={144}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <ZoomOverlay iconClassName="w-6 h-6" overlayClassName="group-hover:bg-zinc-900/50" />
              </div>
            </button>

            {/* Attributions with Background Sample Image */}
            <div className="flex-1 relative overflow-hidden rounded-r">
              {bgImage && (
                <div className="absolute inset-0 pointer-events-none">
                  <img
                    src={imageVariant(bgImage, "md")}
                    alt=""
                    decoding="async"
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-[440%] w-auto object-cover opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent" />
                </div>
              )}

              <div className="relative space-y-2 text-sm">
                {item.category && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-zinc-800 text-accent text-xs font-semibold uppercase tracking-wider border-l-2 border-accent">
                      {item.category}
                    </span>
                  </div>
                )}
                {item.attributions.map((attr, idx) => (
                  <AttributionRow
                    key={idx}
                    label={attr.label}
                    values={attr.values}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Geometric Divider */}
          <div className="flex items-center gap-2 py-1">
            <div className="w-3 h-3 bg-accent/20 rotate-45" />
            <div className="flex-1 h-px bg-gradient-to-r from-accent/40 to-transparent" />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
            {item.description_source && (
              <p className="text-xs text-zinc-500">
                — via{" "}
                <a
                  href={item.description_source.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent/70 hover:text-accent underline underline-offset-2"
                >
                  {item.description_source.name}
                </a>
              </p>
            )}
          </div>

          {/* Review Comment */}
          {item.review_comment && (
            <div className="relative bg-zinc-800/50 border-l-2 border-accent/60 p-3">
              {reviewLabel && (
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {reviewLabel}
                  </span>
                </div>
              )}
              <p className="text-zinc-300 text-sm leading-relaxed italic whitespace-pre-line">
                "{item.review_comment}"
              </p>
            </div>
          )}

          {/* Sample Gallery */}
          {item.sample_images.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Sample Pages
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.sample_images.map((img, idx) => (
                  <button
                    key={idx}
                    {...lightbox.trigger(idx + 1)}
                    className="relative w-16 h-20 overflow-hidden ring-1 ring-zinc-700 hover:ring-2 hover:ring-accent transition-all duration-200 group"
                  >
                    <img
                      src={imageVariant(img, "sm")}
                      alt={`${item.name} sample ${idx + 1}`}
                      width={64}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <ZoomOverlay iconClassName="w-5 h-5" overlayClassName="group-hover:bg-zinc-900/60" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Link Button */}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2.5 px-4 bg-zinc-800 text-zinc-300 hover:bg-accent hover:text-zinc-900 active:bg-accent active:text-zinc-900 transition-all duration-300 font-semibold text-sm text-center uppercase tracking-wider border-1 border-zinc-700 hover:border-accent group"
          >
            <span className="flex items-center justify-center gap-2">
              Read More
              <ArrowRight
                aria-hidden="true"
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2}
              />
            </span>
          </a>
        </div>
      </div>

      {lightbox.viewer}
    </>
  );
};

/** Darkening overlay with a zoom icon, shown when hovering an image tile. */
const ZoomOverlay: FC<{ iconClassName: string; overlayClassName: string }> = ({
  iconClassName,
  overlayClassName,
}) => (
  <div
    className={`absolute inset-0 bg-zinc-900/0 ${overlayClassName} flex items-center justify-center transition-all duration-200`}
  >
    <ZoomIn
      aria-hidden="true"
      className={`${iconClassName} text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
      strokeWidth={2}
    />
  </div>
);

const AttributionRow: FC<{ label: string; values: string[] }> = ({
  label,
  values,
}) => (
  <div className="flex items-start gap-2">
    <span className="shrink-0 w-14 text-xs font-semibold uppercase tracking-wider text-zinc-500">
      {label}
    </span>
    <span className="text-zinc-300 text-xs">{values.join(", ")}</span>
  </div>
);

export default RankInlineDetail;
