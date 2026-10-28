import React from 'react';
import { Search, Play, Flame, Star, X } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Favorites',
  'Action',
  'Arcade',
  'Puzzle',
  'Retro',
  'Sports',
  'Strategy'
];

export const HeroSpotlight = ({
  featuredGame,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  onPlayGame,
  favoritesCount
}) => {
  return (
    <div className="space-y-8">
      {/* Featured Spotlight Banner */}
      {featuredGame && !searchQuery && selectedCategory === 'All' && (
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 p-6 md:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Featured Game of the Day</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{featuredGame.category}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
                {featuredGame.title}
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed">
                {featuredGame.description}
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="tabular-nums font-semibold text-amber-400">★ {Number(featuredGame.rating).toFixed(1)} rating</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{featuredGame.plays} plays</span>
                <span aria-hidden="true">·</span>
                <span>Fast Iframe</span>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <button
                onClick={() => onPlayGame(featuredGame)}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all cursor-pointer text-sm"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Play Spotlight</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar & Filtering Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, tag, or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Title (A-Z)</option>
          </select>
        </div>

      </div>

      {/* Category Segmented Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800/80 rounded-xl overflow-x-auto scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat === 'Favorites' && <Star className={`w-3.5 h-3.5 ${isActive ? 'fill-slate-950' : 'fill-amber-400 text-amber-400'}`} />}
              <span>{cat}</span>
              {cat === 'Favorites' && favoritesCount > 0 && (
                <span className={`text-[10px] tabular-nums ${isActive ? 'text-slate-950 font-bold' : 'text-slate-500'}`}>
                  ({favoritesCount})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
