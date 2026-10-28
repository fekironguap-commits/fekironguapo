import React, { useState } from 'react';
import { CLOAK_CONFIGS, applyCloak } from '../utils/cloak';
import { Shield, X, Check, AlertTriangle, ExternalLink } from 'lucide-react';

export const TabCloakModal = ({
  isOpen,
  onClose,
  activeCloak,
  onSelectCloak,
  onTriggerDecoy
}) => {
  const [customTitle, setCustomTitle] = useState('');

  if (!isOpen) return null;

  const handleApply = (preset) => {
    applyCloak(preset);
    onSelectCloak(preset);
  };

  const handleCustomApply = (e) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    document.title = customTitle.trim();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Tab Disguise & Panic Mode</h2>
              <p className="text-xs text-slate-400">Camouflage browser tab title & favicon instantly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Quick Presets Grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Select Cloak Preset
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.keys(CLOAK_CONFIGS).map((key) => {
                const conf = CLOAK_CONFIGS[key];
                const isActive = activeCloak === key;

                return (
                  <button
                    key={key}
                    onClick={() => handleApply(key)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sky-500/10 border-sky-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={conf.icon}
                        alt=""
                        className="w-4 h-4 shrink-0 rounded-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div className="truncate">
                        <div className="text-xs font-semibold truncate">{conf.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{conf.title}</div>
                      </div>
                    </div>
                    {isActive && <Check className="w-4 h-4 text-sky-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Title Input */}
          <form onSubmit={handleCustomApply} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Or Custom Tab Title
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. AP Chemistry Homework - Period 3"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Set Title
              </button>
            </div>
          </form>

          {/* Panic Decoy Button */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Instant Panic Screen</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Need to hide games instantly? Click below to immediately switch into a realistic Google Docs essay study screen. Press the Back key on the decoy to return anytime.
            </p>
            <button
              onClick={() => { onClose(); onTriggerDecoy(); }}
              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Trigger Decoy Screen Now</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950/60 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
