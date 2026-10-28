import React, { useState } from 'react';
import { Plus, X, Play } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [description, setDescription] = useState('');
  const [controls, setControls] = useState('');
  const [iframeInput, setIframeInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [previewActive, setPreviewActive] = useState(false);

  if (!isOpen) return null;

  // Extract clean src URL whether user typed URL or full <iframe ...> tag
  let cleanUrl = iframeInput.trim();
  let fullIframeTag = iframeInput.trim();

  if (cleanUrl.startsWith('<iframe')) {
    const match = cleanUrl.match(/src=["'](.*?)["']/);
    if (match && match[1]) {
      cleanUrl = match[1];
    }
  } else if (cleanUrl.length > 0 && !cleanUrl.startsWith('<iframe')) {
    fullIframeTag = `<iframe src="${cleanUrl}" title="${title || 'Game'}" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; gamepad" allowfullscreen></iframe>`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !cleanUrl) return;

    const newGame = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      category,
      description: description.trim() || 'Custom added unblocked game playable via iframe.',
      controls: controls.trim() || 'Click to focus. Standard keyboard / mouse controls.',
      plays: '1',
      rating: 5.0,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean).concat([category]),
      iframeUrl: cleanUrl,
      iframe: fullIframeTag,
      custom: true
    };

    onAddGame(newGame);
    onClose();

    // Reset form
    setTitle('');
    setDescription('');
    setControls('');
    setIframeInput('');
    setTagsInput('');
    setPreviewActive(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Add Game to JSON Roster</h2>
              <p className="text-xs text-slate-400">Embed any HTML5 game using its iframe tag or URL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Game Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Tunnel Rush, Geometry Dash, Drift Hunters"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Action">Action</option>
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Retro">Retro</option>
                <option value="Sports">Sports</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. 3D, Fast, Physics"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Iframe Embed Code OR Direct URL *
            </label>
            <textarea
              required
              rows={3}
              placeholder={`Paste an iframe snippet: \n<iframe src="https://..." width="100%" height="100%"></iframe>\nor enter URL directly: https://...`}
              value={iframeInput}
              onChange={(e) => setIframeInput(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-sky-300 placeholder-slate-600 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Controls
            </label>
            <input
              type="text"
              placeholder="e.g. Arrow keys to steer, Space to jump"
              value={controls}
              onChange={(e) => setControls(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Description
            </label>
            <input
              type="text"
              placeholder="Short description of gameplay"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Test Preview Section */}
          {cleanUrl && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setPreviewActive(!previewActive)}
                className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer mb-2"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{previewActive ? 'Hide Test Preview' : 'Test Iframe Preview'}</span>
              </button>

              {previewActive && (
                <div className="w-full h-44 bg-black rounded-lg border border-slate-800 overflow-hidden">
                  <iframe
                    src={cleanUrl}
                    title="Test Preview"
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; gamepad"
                  />
                </div>
              )}
            </div>
          )}

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Add to Games
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
