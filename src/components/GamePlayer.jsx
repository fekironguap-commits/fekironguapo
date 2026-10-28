import React, { useRef, useState, useEffect } from 'react';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  Star,
  Code,
  Check,
  Keyboard,
  Share2,
  Tv
} from 'lucide-react';
import { GameCard } from './GameCard';

export const GamePlayer = ({
  game,
  allGames,
  isFavorite,
  onToggleFavorite,
  onBack,
  onSelectGame
}) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  const copyIframeSnippet = () => {
    navigator.clipboard.writeText(game.iframe).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    });
  };

  // 4 related games
  const relatedGames = allGames
    .filter(g => g.id !== game.id)
    .slice(0, 4);

  return (
    <div className="py-6 space-y-6">
      {/* Top navigation breadcrumb bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-sky-400 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Games</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{game.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-slate-200 font-medium">{game.title}</span>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isTheater ? 'max-w-full' : 'max-w-5xl'}`}>
        <div
          ref={containerRef}
          className={`relative bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'w-full'
          }`}
        >
          {/* Iframe Viewport */}
          <div
            className={`relative w-full bg-slate-950 ${
              isFullscreen ? 'h-full flex-1' : (isTheater ? 'h-[720px]' : 'h-[540px]')
            }`}
          >
            <iframe
              ref={iframeRef}
              key={iframeKey}
              src={game.iframeUrl}
              title={game.title}
              className="w-full h-full border-0 block"
              allow="autoplay; fullscreen; gamepad"
              allowFullScreen
            />
          </div>

          {/* Under-canvas Player Control Toolbar */}
          <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 flex items-center justify-between gap-4 select-none">
            {/* Left: Title & Favorite */}
            <div className="flex items-center gap-3 min-w-0">
              <h2 className="text-base font-bold text-white truncate">{game.title}</h2>
              <button
                onClick={(e) => onToggleFavorite(game.id, e)}
                className={`p-1.5 rounded-md hover:bg-slate-800 transition-colors cursor-pointer ${
                  isFavorite ? 'text-amber-400' : 'text-slate-400 hover:text-amber-400'
                }`}
                title="Toggle Favorite"
              >
                <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
              </button>
            </div>

            {/* Right: Functional Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleReload}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Restart Game"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {!isFullscreen && (
                <button
                  onClick={() => setIsTheater(!isTheater)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    isTheater ? 'text-sky-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  title={isTheater ? 'Default view' : 'Theater mode'}
                >
                  <Tv className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <a
                href={game.iframeUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Open directly in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setShowCode(!showCode)}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  showCode ? 'bg-sky-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="View iframe code from JSON"
              >
                <Code className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Iframe Code</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Copy share link"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Collapsible Iframe Code Inspector */}
          {showCode && (
            <div className="bg-slate-950 border-t border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Stored iframe snippet in <code className="text-sky-400 font-mono">games.json</code>:</span>
                <button
                  onClick={copyIframeSnippet}
                  className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap select-all">
                {game.iframe}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Game Metadata & Instructions section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Description & Tags */}
        <div className="md:col-span-2 space-y-4 bg-slate-900/60 border border-slate-800 p-6 rounded-xl">
          <div>
            <h1 className="text-2xl font-extrabold text-white font-['Outfit']">{game.title}</h1>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
              <span className="text-sky-400 font-semibold">{game.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-semibold text-amber-400">★ {Number(game.rating).toFixed(1)}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{game.plays} total plays</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {game.description}
          </p>

          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Tags</span>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              {game.tags.map((tag, i) => (
                <span key={tag}>
                  #{tag}
                  {i < game.tags.length - 1 && <span className="text-slate-600 ml-2">/</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Controls Guide */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Keyboard className="w-4 h-4 text-sky-400" />
              <span>How to Play & Controls</span>
            </div>
            <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed font-medium">
              {game.controls}
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Click inside the game window to lock controls or start playing. Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">F</kbd> or the maximize icon for fullscreen.
          </div>
        </div>

      </div>

      {/* Related Games Carousel/Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800/80 space-y-4">
        <h3 className="text-lg font-bold text-white font-['Outfit']">More Unblocked Games</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedGames.map(g => (
            <GameCard
              key={g.id}
              game={g}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectGame}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
