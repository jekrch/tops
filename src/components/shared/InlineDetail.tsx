import { type FC, useState, useMemo } from "react";
import { type RankItem } from "../../types/RankTypes";
import ImageModal from "./ImageModal";

interface InlineDetailProps {
  item: RankItem;
  isOpen: boolean;
}

const RankInlineDetail: FC<InlineDetailProps> = ({ item, isOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allImages = [item.cover_image, ...item.sample_images];

  const bgImage = useMemo(() => {
    if (item.sample_images.length === 0) return null;
    const idx = Math.floor(Math.random() * item.sample_images.length);
    return item.sample_images[idx];
  }, [item.sample_images]);

  const openModalAtIndex = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  return (
    <>
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="bg-zinc-900/80 border-t border-zinc-800">
          <div className="p-4 space-y-4">
            {/* Cover and Basic Info Row */}
            <div className="flex gap-4">
              {/* Cover Image - Clickable */}
              <button
                onClick={() => openModalAtIndex(0)}
                className="flex-shrink-0 w-24 relative group cursor-zoom-in"
              >
                <div className="aspect-[2/3] overflow-hidden bg-zinc-800">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-t-jk-teal/30 border-l-[20px] border-l-transparent z-2" />
                  <img
                    src={item.cover_image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/50 flex items-center justify-center transition-all duration-200">
                    <svg
                      className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Attributions with Background Sample Image */}
              <div className="flex-1 relative overflow-hidden rounded-r">
                {bgImage && (
                  <div className="absolute inset-0 pointer-events-none">
                    <img
                      src={bgImage}
                      alt=""
                      className="absolute right-0 top-1/2 -translate-y-1/2 h-[440%] w-auto object-cover opacity-25"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent" />
                  </div>
                )}

                <div className="relative space-y-2 text-sm">
                  {item.category && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-zinc-800 text-jk-teal text-xs font-semibold uppercase tracking-wider border-l-2 border-jk-teal">
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
              <div className="w-3 h-3 bg-jk-teal/20 rotate-45" />
              <div className="flex-1 h-px bg-gradient-to-r from-jk-teal/40 to-transparent" />
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
                    className="text-jk-teal/70 hover:text-jk-teal underline underline-offset-2"
                  >
                    {item.description_source.name}
                  </a>
                </p>
              )}
            </div>

            {/* Review Comment */}
            {item.review_comment && (
              <div className="relative bg-zinc-800/50 border-l-2 border-jk-teal/60 p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-jk-teal">
                    J&J
                  </span>
                </div>
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
                      onClick={() => openModalAtIndex(idx + 1)}
                      className="relative w-16 h-20 overflow-hidden ring-1 ring-zinc-700 hover:ring-2 hover:ring-jk-teal transition-all duration-200 group"
                    >
                      <img
                        src={img}
                        alt={`${item.name} sample ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/60 flex items-center justify-center transition-all duration-200">
                        <svg
                          className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
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
              className="block w-full py-2.5 px-4 bg-zinc-800 text-zinc-300 hover:bg-jk-teal hover:text-zinc-900 active:bg-jk-teal active:text-zinc-900 transition-all duration-300 font-semibold text-sm text-center uppercase tracking-wider border-1 border-zinc-700 hover:border-jk-teal group"
            >
              <span className="flex items-center justify-center gap-2">
                Read More
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      <ImageModal
        images={allImages}
        currentIndex={currentIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigate={setCurrentIndex}
        seriesName={item.name}
      />
    </>
  );
};

const AttributionRow: FC<{ label: string; values: string[] }> = ({
  label,
  values,
}) => (
  <div className="flex items-start gap-2">
    <span className="flex-shrink-0 w-14 text-xs font-semibold uppercase tracking-wider text-zinc-500">
      {label}
    </span>
    <span className="text-zinc-300 text-xs">{values.join(", ")}</span>
  </div>
);

export default RankInlineDetail;