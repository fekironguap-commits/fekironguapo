import React from 'react';
import { Gamepad2, Shield, Plus, Code2 } from 'lucide-react';

export const Navbar = ({
  onSelectCategory,
  onOpenCloak,
  onOpenAddGame,
  onOpenJsonViewer,
  activeCloak,
  onGoHome
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand title, single element */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 group-hover:border-sky-400 transition-all">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <span className="font-['Outfit'] font-extrabold tracking-wide uppercase text-base">
            Nova<span className="text-sky-400">Arcade</span>
          </span>
        </button>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => { onGoHome(); onSelectCategory('All'); }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            All Games
          </button>
          <button
            onClick={() => { onGoHome(); onSelectCategory('Favorites'); }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Favorites
          </button>
          <button
            onClick={onOpenCloak}
            className="flex items-center gap-1.5 hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            <span>Tab Cloak {activeCloak !== 'none' && '•'}</span>
          </button>
          <button
            onClick={onOpenJsonViewer}
            className="flex items-center gap-1.5 hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-slate-400" />
            <span>games.json</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAddGame}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm hover:shadow-sky-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Game</span>
          </button>
        </div>

      </div>
    </header>
  );
};
