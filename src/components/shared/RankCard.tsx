import { type FC } from "react";
import { ChevronDown } from "lucide-react";
import { type RankItem } from "../../types/RankTypes";
import { imageVariant } from "../../utils/imageVariant";

interface RankCardProps {
  item: RankItem;
  isSelected: boolean;
  onClick: () => void;
  /** id of the detail panel this card expands */
  controls: string;
}

const RankCard: FC<RankCardProps> = ({ item, isSelected, onClick, controls }) => {
  const cardAttributions = item.attributions.filter(attr => attr.showOnCard);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isSelected}
      aria-controls={controls}
      className={`
        w-full text-left group relative
        transition-all duration-300 ease-out
        ${isSelected
          ? 'bg-accent/20 border-l-4 border-accent'
          : 'bg-zinc-900/50 border-l-4 border-transparent hover:bg-zinc-800/70 hover:border-accent/50'
        }
      `}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Rank Number */}
        <div className={`
          shrink-0 w-12 h-12
          flex items-center justify-center
          font-bold text-2xl
          transition-colors duration-300
          ${isSelected
            ? 'bg-accent text-zinc-900'
            : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-accent'
          }
        `}>
          {item.rank}
        </div>

        {/* Cover Thumbnail */}
        <div className={`
          shrink-0 w-16 h-20 overflow-hidden
          transition-transform duration-300
          ${isSelected ? 'ring-2 ring-accent' : 'ring-1 ring-zinc-700'}
          group-hover:scale-105
        `}>
          <img
            src={imageVariant(item.cover_image, "sm")}
            alt={item.name}
            width={64}
            height={80}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Item Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`
            font-bold text-base truncate
            transition-colors duration-300
            ${isSelected ? 'text-accent' : 'text-zinc-100 group-hover:text-accent'}
          `}>
            {item.name}
          </h3>
          {item.category && (
            <p className="text-zinc-500 text-sm truncate">
              {item.category}
            </p>
          )}
          {cardAttributions.length > 0 && (
            <p className="text-zinc-600 text-xs truncate">
              {cardAttributions.map(attr => attr.values.join(", ")).join(" · ")}
            </p>
          )}
        </div>

        {/* Expand Indicator */}
        <div className={`
          shrink-0 w-6 h-6
          flex items-center justify-center
          transition-all duration-300
          ${isSelected ? 'text-accent' : 'text-zinc-600 group-hover:text-accent/70'}
        `}>
          <ChevronDown
            aria-hidden="true"
            className={`w-5 h-5 transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}
            strokeWidth={2}
          />
        </div>
      </div>
    </button>
  );
};

export default RankCard;
