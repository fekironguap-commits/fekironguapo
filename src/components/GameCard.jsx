import React from 'react';
import { Play, Star } from 'lucide-react';

// Visual color theme accent per game category
const CATEGORY_COLORS = {
  Action: 'from-amber-500/20 to-rose-600/20 text-rose-400',
  Arcade: 'from-sky-500/20 to-blue-600/20 text-sky-400',
  Puzzle: 'from-emerald-500/20 to-teal-600/20 text-emerald-400',
  Retro: 'from-purple-500/20 to-indigo-600/20 text-purple-400',
  Sports: 'from-cyan-500/20 to-blue-600/20 text-cyan-400',
  Strategy: 'from-yellow-500/20 to-amber-600/20 text-amber-400'
};

export const GameCard = ({
  game,
  isFavorite,
  onToggleFavorite,
  onSelect
}) => {
  const accent = CATEGORY_COLORS[game.category] || 'from-sky-500/20 to-blue-600/20 text-sky-400';

  return (
    <div
      onClick={() => onSelect(game)}
      className="group relative flex flex-col bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5"
    >
      {/* Thumbnail area with styled CSS canvas and play overlay */}
      <div className={`relative aspect-16/10 w-full overflow-hidden bg-gradient-to-br ${accent} flex items-center justify-center border-b border-slate-800/80`}>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Thematic centerpiece badge */}
        <div className="relative flex flex-col items-center justify-center p-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-700/60 flex items-center justify-center text-white text-xl font-extrabold group-hover:scale-110 group-hover:border-sky-500/50 transition-transform">
            {game.title.charAt(0)}
          </div>
          <span className="mt-2 text-xs font-semibold tracking-wider uppercase text-slate-300">
            {game.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite(game.id, e)}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-md bg-slate-950/70 hover:bg-slate-950 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors cursor-pointer"
        >
          <Star
            className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`}
          />
        </button>

        {/* Hover Play Button Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Content with Zero-Pill Unboxed Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <h3 className="font-semibold text-slate-100 text-base leading-snug group-hover:text-sky-300 transition-colors line-clamp-1">
            {game.title}
          </h3>
          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Clean unboxed metadata with typographic separators */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-slate-300">{game.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="tabular-nums text-amber-400 font-semibold">★ {Number(game.rating).toFixed(1)}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="tabular-nums">{game.plays} plays</span>
          </div>
          <span className="text-sky-400/90 font-medium text-[11px] group-hover:translate-x-0.5 transition-transform">
            Play →
          </span>
        </div>
      </div>
    </div>
  );
};
