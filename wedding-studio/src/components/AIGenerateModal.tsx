import React, { useState } from "react";
import { Sparkles, X, Loader2 } from "lucide-react";
import { generateWeddingProject } from "../lib/ai";
import { WeddingProject, ThemePalette } from "../types";
import assetsDb from "../data/assets_database.json";

interface AIGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyProject: (projectUpdates: Partial<WeddingProject>) => void;
}

const PRESETS = [
  {
    title: "Adat Batak Toba",
    prompt: "Pernikahan adat Batak Toba sakral nan megah bernuansa Gorga merah hitam emas untuk Dicky Sitohang & Agnes Silalahi di Gedung Mulia & Raja Jakarta.",
  },
  {
    title: "Adat Jawa",
    prompt: "Pernikahan adat Jawa klasik nan megah untuk Raden Mas Danang & Raden Ajeng Sekar Arum di Keraton Grand Ballroom Solo.",
  },
  {
    title: "Sage Botanical",
    prompt: "Pernikahan tema outdoor sage green botanical modern untuk Dimas Pratama & Nadia Safira di Pine Hill Lembang.",
  },
  {
    title: "Royal Gold",
    prompt: "Pernikahan mewah nuansa royal gold & ivory untuk Alexander & Catherine di Grand Hyatt Jakarta.",
  },
  {
    title: "Rustic Earth",
    prompt: "Pernikahan santai rustic earth warm & terracotta untuk Bima & Sarah di Hutan Pinus Mangunan Yogyakarta.",
  },
];

export const AIGenerateModal: React.FC<AIGenerateModalProps> = ({
  isOpen,
  onClose,
  onApplyProject,
}) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const result = await generateWeddingProject(prompt);
      
      const matchedTheme = assetsDb.themes.find((t) => t.id === (result as any).themeId) || assetsDb.themes[0];
      const isBatak = matchedTheme.id === "adat-batak" || (result as any).themeId === "adat-batak";

      const batakGallery = [
        "/assets/adat-batak/images/29817-gallery-1676444055.jpg",
        "/assets/adat-batak/images/29817-gallery-1676444135.jpg",
        "/assets/adat-batak/images/29817-gallery-1676444215.jpg",
        "/assets/adat-batak/images/29817-gallery-1676444280.jpg",
      ];

      onApplyProject({
        title: result.title || "The Wedding",
        quote: result.quote,
        quoteSource: result.quoteSource,
        palette: matchedTheme as ThemePalette,
        audioUrl: isBatak ? "/assets/adat-batak/music/tobadream-theme-song-viky-sianipar.mp3" : (matchedTheme as any).audioUrl,
        audioTitle: isBatak ? "Viky Sianipar - Tobadream" : (matchedTheme as any).audioTitle,
        galleryImages: isBatak ? batakGallery : (matchedTheme as any).galleryImages,
        couple: result.couple ? {
          groomName: result.couple.groomName || "",
          groomNick: result.couple.groomNick || "",
          groomParents: result.couple.groomParents || "",
          groomInstagram: result.couple.groomInstagram || "",
          groomPhoto: isBatak
            ? "/assets/adat-batak/images/29817-gallery-1676444055.jpg"
            : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
          brideName: result.couple.brideName || "",
          brideNick: result.couple.brideNick || "",
          brideParents: result.couple.brideParents || "",
          brideInstagram: result.couple.brideInstagram || "",
          bridePhoto: isBatak
            ? "/assets/adat-batak/images/29817-gallery-1676444135.jpg"
            : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        } : undefined,
        event: result.event ? {
          date: result.event.date || "",
          targetTimestamp: result.event.targetTimestamp || "2026-10-25T08:00:00",
          akadTitle: result.event.akadTitle || "Akad Nikah",
          akadTime: result.event.akadTime || "08:00 WIB",
          akadVenue: result.event.akadVenue || "Gedung Utama",
          akadAddress: result.event.akadAddress || "Jakarta",
          resepsiTitle: result.event.resepsiTitle || "Resepsi",
          resepsiTime: result.event.resepsiTime || "11:00 WIB",
          resepsiVenue: result.event.resepsiVenue || "Grand Ballroom",
          resepsiAddress: result.event.resepsiAddress || "Jakarta",
          mapsUrl: result.event.mapsUrl || "https://maps.google.com",
        } : undefined,
        banks: result.banks ? result.banks.map((b: any, i: number) => ({
          id: `bank-${i + 1}`,
          bankName: b.bankName || "BCA",
          accountNumber: b.accountNumber || "1234567890",
          holderName: b.holderName || "Pengantin",
        })) : undefined,
      });

      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || "Gagal membuat undangan. Periksa koneksi atau API Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="h-12 px-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-white">AI Generator</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 active:scale-[0.98] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1.5 font-medium">Contoh Konsep</label>
            <div className="grid grid-cols-2 gap-1.5">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrompt(p.prompt)}
                  className="h-8 px-2.5 rounded-md bg-slate-800/80 hover:bg-slate-800 border border-white/5 hover:border-white/15 text-[11px] text-slate-300 hover:text-white text-left truncate transition active:scale-[0.98]"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1.5 font-medium">Instruksi Desain</label>
            <textarea
              rows={4}
              placeholder="Ide"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 rounded-md bg-slate-950/70 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              {errorMsg}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-[10px] text-slate-500 font-mono">Model: HolverAI</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="h-8 px-3 rounded-md border border-white/10 text-xs text-slate-300 hover:bg-white/5 active:scale-[0.98] transition"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={loading || !prompt.trim()}
                onClick={handleGenerate}
                className="h-8 px-4 rounded-md bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Membuat...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Buat</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
