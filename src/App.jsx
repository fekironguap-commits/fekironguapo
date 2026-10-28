import React, { useState, useEffect, useMemo } from 'react';
import initialGamesData from './data/games.json';
import { getInitialCloak, applyCloak } from './utils/cloak';
import { Navbar } from './components/Navbar';
import { HeroSpotlight } from './components/HeroSpotlight';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { TabCloakModal } from './components/TabCloakModal';
import { AddGameModal } from './components/AddGameModal';
import { JsonViewerModal } from './components/JsonViewerModal';
import { DecoyScreen } from './components/DecoyScreen';
import { Search } from 'lucide-react';

export default function App() {
  // Load custom added games from localStorage
  const [games, setGames] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('custom_games');
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        return [...initialGamesData, ...parsed];
      }
    } catch (e) {}
    return initialGamesData;
  });

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('game_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Navigation & views
  const [activeGame, setActiveGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Modals & Cloaking
  const [activeCloak, setActiveCloak] = useState(getInitialCloak);
  const [isCloakOpen, setIsCloakOpen] = useState(false);
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);
  const [isJsonViewerOpen, setIsJsonViewerOpen] = useState(false);
  const [isDecoyActive, setIsDecoyActive] = useState(false);

  // Synchronize cloak on mount
  useEffect(() => {
    applyCloak(activeCloak);
  }, [activeCloak]);

  // Handle URL hash deep linking for games (e.g. #game=slope-runner)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#game=')) {
        const gameId = hash.replace('#game=', '');
        const target = games.find(g => g.id === gameId);
        if (target) {
          setActiveGame(target);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [games]);

  // Keyboard shortcut for Panic mode (Esc or ~ key)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '`' || (e.key === 'Escape' && !isCloakOpen && !isAddGameOpen && !isJsonViewerOpen && !isDecoyActive)) {
        setIsDecoyActive(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isCloakOpen, isAddGameOpen, isJsonViewerOpen, isDecoyActive]);

  // Save favorites
  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('game_favorites', JSON.stringify(next));
      return next;
    });
  };

  // Add custom game
  const handleAddGame = (newGame) => {
    setGames(prev => {
      const next = [newGame, ...prev];
      const customOnly = next.filter(g => g.custom);
      localStorage.setItem('custom_games', JSON.stringify(customOnly));
      return next;
    });
    setActiveGame(newGame);
    window.location.hash = `#game=${newGame.id}`;
  };

  const handleSelectGame = (game) => {
    setActiveGame(game);
    window.location.hash = `#game=${game.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveGame(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered & sorted games
  const filteredGames = useMemo(() => {
    return games
      .filter(game => {
        // Category filter
        if (selectedCategory === 'Favorites') {
          if (!favorites.includes(game.id)) return false;
        } else if (selectedCategory !== 'All') {
          if (game.category !== selectedCategory) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = game.title.toLowerCase().includes(q);
          const matchesDesc = game.description.toLowerCase().includes(q);
          const matchesCategory = game.category.toLowerCase().includes(q);
          const matchesTags = game.tags.some(t => t.toLowerCase().includes(q));
          return matchesTitle || matchesDesc || matchesCategory || matchesTags;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        // Most popular (numeric parse of plays string)
        const parsePlays = (p) => parseInt(String(p).replace(/,/g, ''), 10) || 0;
        return parsePlays(b.plays) - parsePlays(a.plays);
      });
  }, [games, selectedCategory, searchQuery, sortBy, favorites]);

  // Spotlight game
  const featuredGame = useMemo(() => {
    return games.find(g => g.featured) || games[0];
  }, [games]);

  // If panic decoy mode is active, render realistic decoy screen
  if (isDecoyActive) {
    return <DecoyScreen onExit={() => setIsDecoyActive(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar Contract (3 zones) */}
      <Navbar
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveGame(null);
        }}
        onOpenCloak={() => setIsCloakOpen(true)}
        onOpenAddGame={() => setIsAddGameOpen(true)}
        onOpenJsonViewer={() => setIsJsonViewerOpen(true)}
        activeCloak={activeCloak}
        activeView={activeGame ? 'player' : 'catalog'}
        onGoHome={handleGoHome}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeGame ? (
          <GamePlayer
            game={activeGame}
            allGames={games}
            isFavorite={favorites.includes(activeGame.id)}
            onToggleFavorite={toggleFavorite}
            onBack={handleGoHome}
            onSelectGame={handleSelectGame}
          />
        ) : (
          <div className="space-y-8">
            {/* Spotlight Banner, Search, and Category Segments */}
            <HeroSpotlight
              featuredGame={featuredGame}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onPlayGame={handleSelectGame}
              favoritesCount={favorites.length}
            />

            {/* Games Grid Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="font-bold font-['Outfit'] text-white">
                    {selectedCategory === 'Favorites' ? 'Your Favorite Games' : `${selectedCategory} Games`}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-xs text-slate-400 tabular-nums">
                    {filteredGames.length} {filteredGames.length === 1 ? 'title' : 'titles'}
                  </span>
                </div>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredGames.map(game => (
                    <GameCard
                      key={game.id}
                      game={game}
                      isFavorite={favorites.includes(game.id)}
                      onToggleFavorite={toggleFavorite}
                      onSelect={handleSelectGame}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">No games found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    {selectedCategory === 'Favorites'
                      ? "You haven't bookmarked any games yet. Click the star on any game card to add it to your favorites."
                      : `No games matched "${searchQuery}". Try searching for something else or add your own custom game.`}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer with clean unboxed text copyright */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Nova Arcade</span>
            <span aria-hidden="true">·</span>
            <span>Unblocked HTML5 Browser Games</span>
            <span aria-hidden="true">·</span>
            <span>JSON Iframe Architecture</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsCloakOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Tab Cloak
            </button>
            <button
              onClick={() => setIsAddGameOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Add Custom Game
            </button>
            <button
              onClick={() => setIsJsonViewerOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              View games.json
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TabCloakModal
        isOpen={isCloakOpen}
        onClose={() => setIsCloakOpen(false)}
        activeCloak={activeCloak}
        onSelectCloak={setActiveCloak}
        onTriggerDecoy={() => setIsDecoyActive(true)}
      />

      <AddGameModal
        isOpen={isAddGameOpen}
        onClose={() => setIsAddGameOpen(false)}
        onAddGame={handleAddGame}
      />

      <JsonViewerModal
        isOpen={isJsonViewerOpen}
        onClose={() => setIsJsonViewerOpen(false)}
        games={games}
      />
    </div>
  );
}
