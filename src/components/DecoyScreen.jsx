import React, { useEffect } from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

export const DecoyScreen = ({ onExit }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === '`') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onExit]);

  return (
    <div className="fixed inset-0 z-50 bg-[#f9fbfd] text-slate-800 font-sans flex flex-col select-text overflow-y-auto">
      {/* Top Docs Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center text-[#2684fc]">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-slate-800">
                Comparative Analysis: Economic Structures in 19th Century Britain
              </span>
              <span className="text-xs text-slate-400">Saved to Drive</span>
            </div>
            <div className="flex gap-3 text-xs text-slate-600 mt-0.5">
              <span className="hover:text-black cursor-pointer">File</span>
              <span className="hover:text-black cursor-pointer">Edit</span>
              <span className="hover:text-black cursor-pointer">View</span>
              <span className="hover:text-black cursor-pointer">Insert</span>
              <span className="hover:text-black cursor-pointer">Format</span>
              <span className="hover:text-black cursor-pointer">Tools</span>
              <span className="hover:text-black cursor-pointer">Extensions</span>
              <span className="hover:text-black cursor-pointer">Help</span>
            </div>
          </div>
        </div>

        {/* Discrete Return Button */}
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-medium cursor-pointer transition-colors"
          title="Return to Nova Arcade"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Decoy (or press Esc)</span>
        </button>
      </div>

      {/* Docs Toolbar simulator */}
      <div className="bg-[#edf2fa] border-b border-slate-200 px-4 py-1.5 flex items-center gap-3 text-xs text-slate-700">
        <div className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs">Times New Roman</div>
        <div className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs">12</div>
        <div className="flex gap-2 font-bold px-2">
          <span>B</span>
          <span className="italic font-serif">I</span>
          <span className="underline">U</span>
        </div>
        <div className="h-4 w-px bg-slate-300 mx-1" />
        <span className="text-slate-500">100% · Normal text</span>
      </div>

      {/* Paper Page */}
      <div className="flex-1 p-6 md:p-12 flex justify-center bg-[#f0f4f9]">
        <div className="w-full max-w-[800px] min-h-[1050px] bg-white shadow-md border border-slate-200 p-12 md:p-16 font-serif text-[15px] leading-relaxed text-[#202124]">
          <h1 className="text-center font-bold text-lg mb-8">
            The Socio-Economic Ramifications of Industrial Urbanization (1820–1880)
          </h1>
          <p className="text-center text-sm mb-12 italic">
            Department of History & Political Economy<br />
            October 2026
          </p>

          <h2 className="font-bold text-base mt-6 mb-2">1. Abstract</h2>
          <p className="mb-4 text-justify">
            The shift from agrarian communal production to mechanized factory systems during the mid-nineteenth century in Great Britain prompted unprecedented demographic migrations towards northern industrial centers including Manchester, Birmingham, and Leeds. This paper examines the interplay between localized technological diffusion, labor market reorganizations, and legislative interventions—specifically the Factory Acts of 1833 and 1847.
          </p>

          <h2 className="font-bold text-base mt-6 mb-2">2. Capital Intensification and Steam Transition</h2>
          <p className="mb-4 text-justify">
            Prior to the widespread deployment of stationary Watt steam engines, textile manufacturing remained bounded by riparian geography. Water frames and mills required proximity to flowing currents, resulting in distributed, rural production nodes. The subsequent advent of affordable coal transport by inland canal networks decoupled motive power from natural hydrology, enabling centralized urban manufacturing.
          </p>

          <p className="mb-4 text-justify">
            Contemporary demographic census records demonstrate that between 1801 and 1851, the urbanized portion of the British population expanded from 17% to greater than 50%, marking the first historical instance of an urban-majority industrial civilization.
          </p>

          <h2 className="font-bold text-base mt-6 mb-2">3. Primary Regulatory Countermeasures</h2>
          <p className="mb-4 text-justify">
            The initial response from Westminster was marked by laissez-faire hesitance. However, escalating public awareness of working conditions in cotton spinning operations forced the passage of the Ten Hours Act. Modern econometric assessments suggest that rather than reducing net national productivity, these caps catalyzed technological capital substitution.
          </p>
        </div>
      </div>
    </div>
  );
};
