import React from "react";
import { Sparkles, Download, ZoomIn, ZoomOut, Maximize2, Palette, Eye, Settings2 } from "lucide-react";
import assetsDb from "../data/assets_database.json";
import { ThemePalette } from "../types";

interface NavbarProps {
  zoom: number;
  setZoom: (fn: (prev: number) => number) => void;
  resetZoom: () => void;
  onHolverAIModal: () => void;
  onExport: () => void;
  selectedTheme: ThemePalette;
  onSelectTheme: (theme: ThemePalette) => void;
  isPreview: boolean;
  onTogglePreview: () => void;
  onToggleInspector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  zoom,
  setZoom,
  resetZoom,
  onHolverAIModal,
  onExport,
  selectedTheme,
  onSelectTheme,
  isPreview,
  onTogglePreview,
  onToggleInspector,
}) => {
  return (
    <header className="h-14 border-b border-white/10 bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between z-50 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-700/80 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-300 text-sm">
          WS
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white tracking-tight">Wedding Studio</h1>
          <p className="text-[10px] text-slate-400">AI Canvas Editor</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-800/80 border border-white/10 rounded-md p-0.5">
          <button
            onClick={() => setZoom((z) => Math.max(0.3, +(z - 0.1).toFixed(1)))}
            className="h-7 w-7 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-white/5 active:scale-95 transition"
            title="Perkecil"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-2 text-slate-300 min-w-[42px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.1).toFixed(1)))}
            className="h-7 w-7 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-white/5 active:scale-95 transition"
            title="Perbesar"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetZoom}
            className="h-7 w-7 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-white/5 active:scale-95 transition border-l border-white/10"
            title="Reset"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        <div className="relative flex items-center">
          <Palette className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
          <select
            value={selectedTheme.id}
            onChange={(e) => {
              const theme = assetsDb.themes.find((t) => t.id === e.target.value);
              if (theme) onSelectTheme(theme as ThemePalette);
            }}
            className="h-8 pl-8 pr-3 bg-slate-800/80 border border-white/10 rounded-md text-xs text-slate-200 outline-none hover:border-white/20 focus:border-emerald-500 cursor-pointer transition"
          >
            {assetsDb.themes.map((t) => (
              <option key={t.id} value={t.id} className="bg-slate-900 text-slate-200">
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onHolverAIModal}
          className="h-8 px-3 rounded-md bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-medium flex items-center gap-1.5 transition shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Generate</span>
        </button>

        <button
          onClick={onTogglePreview}
          className={`h-8 px-3 rounded-md border text-xs font-medium flex items-center gap-1.5 transition active:scale-[0.98] ${
            isPreview
              ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
              : "bg-slate-800/80 border-white/10 text-slate-300 hover:bg-white/5"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isPreview ? "Editor" : "Pratinjau"}</span>
        </button>

        <button
          onClick={onExport}
          className="h-8 px-3 rounded-md bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white text-xs font-medium flex items-center gap-1.5 transition shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Unduh ZIP</span>
        </button>

        <button
          onClick={onToggleInspector}
          className="h-8 w-8 rounded-md bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 active:scale-[0.98] transition"
          title="Pengaturan"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
