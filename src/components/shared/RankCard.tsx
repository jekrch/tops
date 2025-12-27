import { type FC } from "react";
import { type RankItem } from "../../types/RankTypes";

interface RankCardProps {
  item: RankItem;
  isSelected: boolean;
  onClick: () => void;
  showExpandIcon?: boolean;
}

const RankCard: FC<RankCardProps> = ({ item, isSelected, onClick, showExpandIcon = false }) => {
  const cardAttributions = item.attributions.filter(attr => attr.showOnCard);

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left group relative
        transition-all duration-300 ease-out
        ${isSelected 
          ? 'bg-jk-teal/20 border-l-4 border-jk-teal' 
          : 'bg-zinc-900/50 border-l-4 border-transparent hover:bg-zinc-800/70 hover:border-jk-teal/50'
        }
      `}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Rank Number */}
        <div className={`
          flex-shrink-0 w-12 h-12
          flex items-center justify-center
          font-bold text-2xl
          clip-diamond
          transition-colors duration-300
          ${isSelected 
            ? 'bg-jk-teal text-zinc-900' 
            : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-jk-teal'
          }
        `}>
          {item.rank}
        </div>

        {/* Cover Thumbnail */}
        <div className={`
          flex-shrink-0 w-16 h-20 overflow-hidden
          transition-transform duration-300
          ${isSelected ? 'ring-2 ring-jk-teal' : 'ring-1 ring-zinc-700'}
          group-hover:scale-105
        `}>
          <img
            src={item.cover_image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Item Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`
            font-bold text-base truncate
            transition-colors duration-300
            ${isSelected ? 'text-jk-teal' : 'text-zinc-100 group-hover:text-jk-teal'}
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

        {/* Selection/Expand Indicator */}
        {showExpandIcon ? (
          <div className={`
            flex-shrink-0 w-6 h-6
            flex items-center justify-center
            transition-all duration-300
            ${isSelected ? 'text-jk-teal' : 'text-zinc-600 group-hover:text-jk-teal/70'}
          `}>
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        ) : (
          <div className={`
            flex-shrink-0 w-2 h-2
            transition-all duration-300
            ${isSelected 
              ? 'bg-jk-teal rotate-45 scale-150' 
              : 'bg-zinc-700 rotate-45 group-hover:bg-jk-teal/50'
            }
          `} />
        )}
      </div>
    </button>
  );
};

export default RankCard;