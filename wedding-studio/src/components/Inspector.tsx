import React, { useState } from "react";
import { X, User, Calendar, Gift, Key, Sparkles, Sliders } from "lucide-react";
import { WeddingProject, ThemePalette } from "../types";
import assetsDb from "../data/assets_database.json";
import { getStoredApiKey, setStoredApiKey } from "../lib/ai";

interface InspectorProps {
  project: WeddingProject;
  onChangeProject: (updated: WeddingProject) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Inspector: React.FC<InspectorProps> = ({
  project,
  onChangeProject,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"couple" | "event" | "gift" | "quote" | "api">("couple");
  const [apiKeyInput, setApiKeyInput] = useState(getStoredApiKey());
  const [savedStatus, setSavedStatus] = useState(false);

  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    setStoredApiKey(apiKeyInput);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const updateCouple = (field: keyof typeof project.couple, val: string) => {
    onChangeProject({
      ...project,
      couple: { ...project.couple, [field]: val },
    });
  };

  const updateEvent = (field: keyof typeof project.event, val: string) => {
    onChangeProject({
      ...project,
      event: { ...project.event, [field]: val },
    });
  };

  return (
    <aside className="w-80 border-l border-white/10 bg-slate-900/95 backdrop-blur-md flex flex-col h-[calc(100vh-56px)] shrink-0 z-40">
      <div className="h-12 px-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-semibold text-white">Pengaturan</span>
        </div>
        <button
          onClick={onClose}
          className="h-7 w-7 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 active:scale-95 transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-5 p-1 bg-slate-950/40 border-b border-white/5 text-[11px]">
        <button
          onClick={() => setActiveTab("couple")}
          className={`h-8 flex flex-col items-center justify-center rounded transition ${
            activeTab === "couple" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"
          }`}
          title="Mempelai"
        >
          <User className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setActiveTab("event")}
          className={`h-8 flex flex-col items-center justify-center rounded transition ${
            activeTab === "event" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"
          }`}
          title="Acara"
        >
          <Calendar className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setActiveTab("gift")}
          className={`h-8 flex flex-col items-center justify-center rounded transition ${
            activeTab === "gift" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"
          }`}
          title="Hadiah"
        >
          <Gift className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setActiveTab("quote")}
          className={`h-8 flex flex-col items-center justify-center rounded transition ${
            activeTab === "quote" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"
          }`}
          title="Kutipan"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`h-8 flex flex-col items-center justify-center rounded transition ${
            activeTab === "api" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"
          }`}
          title="API Key"
        >
          <Key className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {activeTab === "couple" && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-medium">Tamu Undangan</label>
              <input
                type="text"
                placeholder="Nama"
                value={project.guestName}
                onChange={(e) => onChangeProject({ ...project, guestName: e.target.value })}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="text-[11px] font-semibold text-emerald-400 block">Pengantin Pria</span>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={project.couple.groomName}
                onChange={(e) => updateCouple("groomName", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="Panggilan"
                value={project.couple.groomNick}
                onChange={(e) => updateCouple("groomNick", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="Orang Tua"
                value={project.couple.groomParents}
                onChange={(e) => updateCouple("groomParents", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="text-[11px] font-semibold text-emerald-400 block">Pengantin Wanita</span>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={project.couple.brideName}
                onChange={(e) => updateCouple("brideName", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="Panggilan"
                value={project.couple.brideNick}
                onChange={(e) => updateCouple("brideNick", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="Orang Tua"
                value={project.couple.brideParents}
                onChange={(e) => updateCouple("brideParents", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {activeTab === "event" && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-medium">Target Waktu (ISO)</label>
              <input
                type="text"
                value={project.event.targetTimestamp}
                onChange={(e) => updateEvent("targetTimestamp", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="text-[11px] font-semibold text-emerald-400 block">Akad Nikah</span>
              <input
                type="text"
                placeholder="Waktu"
                value={project.event.akadTime}
                onChange={(e) => updateEvent("akadTime", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="Tempat"
                value={project.event.akadVenue}
                onChange={(e) => updateEvent("akadVenue", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="Alamat"
                value={project.event.akadAddress}
                onChange={(e) => updateEvent("akadAddress", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="text-[11px] font-semibold text-emerald-400 block">Resepsi</span>
              <input
                type="text"
                placeholder="Waktu"
                value={project.event.resepsiTime}
                onChange={(e) => updateEvent("resepsiTime", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="Tempat"
                value={project.event.resepsiVenue}
                onChange={(e) => updateEvent("resepsiVenue", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="Alamat"
                value={project.event.resepsiAddress}
                onChange={(e) => updateEvent("resepsiAddress", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-2 border-t border-white/5 space-y-2">
              <label className="text-[11px] text-slate-400 block mb-1 font-medium">Tautan Maps</label>
              <input
                type="text"
                placeholder="URL"
                value={project.event.mapsUrl}
                onChange={(e) => updateEvent("mapsUrl", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {activeTab === "gift" && (
          <div className="space-y-4">
            {project.banks.map((bank, index) => (
              <div key={bank.id} className="p-3 rounded-lg bg-slate-950/40 border border-white/10 space-y-2">
                <span className="text-[11px] font-semibold text-emerald-400 block">Rekening {index + 1}</span>
                <input
                  type="text"
                  placeholder="Bank"
                  value={bank.bankName}
                  onChange={(e) => {
                    const newBanks = [...project.banks];
                    newBanks[index] = { ...bank, bankName: e.target.value };
                    onChangeProject({ ...project, banks: newBanks });
                  }}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none"
                />
                <input
                  type="text"
                  placeholder="Nomor"
                  value={bank.accountNumber}
                  onChange={(e) => {
                    const newBanks = [...project.banks];
                    newBanks[index] = { ...bank, accountNumber: e.target.value };
                    onChangeProject({ ...project, banks: newBanks });
                  }}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none font-mono"
                />
                <input
                  type="text"
                  placeholder="Nama"
                  value={bank.holderName}
                  onChange={(e) => {
                    const newBanks = [...project.banks];
                    newBanks[index] = { ...bank, holderName: e.target.value };
                    onChangeProject({ ...project, banks: newBanks });
                  }}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "quote" && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-medium">Isi Kutipan</label>
              <textarea
                placeholder="Kutipan"
                rows={4}
                value={project.quote}
                onChange={(e) => onChangeProject({ ...project, quote: e.target.value })}
                className="w-full p-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 resize-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-medium">Sumber</label>
              <input
                type="text"
                placeholder="Sumber"
                value={project.quoteSource}
                onChange={(e) => onChangeProject({ ...project, quoteSource: e.target.value })}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {activeTab === "api" && (
          <div className="space-y-3">
            <label className="text-[11px] text-slate-400 block mb-1 font-medium">Holver API Key</label>
            <input
              type="password"
              placeholder="API Key"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-mono"
            />
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Model aktif: <span className="font-mono text-emerald-400">gemini-3.7-flash</span> via Holver AI. Disimpan di localStorage peramban Anda.
            </p>
            <button
              onClick={handleSaveApiKey}
              className="w-full h-8 rounded-md bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-medium transition"
            >
              {savedStatus ? "Tersimpan!" : "Simpan"}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
