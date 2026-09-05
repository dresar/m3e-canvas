import React, { useState } from "react";
import { X, User, Calendar, Gift, Key, Sparkles, Sliders, Palette, Plus, Trash2, Music, Check } from "lucide-react";
import { WeddingProject, ThemePalette } from "../types";
import { getStoredApiKey, setStoredApiKey } from "../lib/ai";

interface InspectorProps {
  project: WeddingProject;
  onChangeProject: (updated: WeddingProject) => void;
  isOpen: boolean;
  onClose: () => void;
}

const THEME_PRESETS: ThemePalette[] = [
  {
    id: "theme-batak-gorga",
    name: "Batak Gorga",
    primary: "#8b1e1e",
    secondary: "#2a2a2a",
    accent: "#d4af37",
    background: "#1a1615",
    card: "#241e1c",
    text: "#f5ece4",
    fontHeading: "Cinzel",
    fontBody: "Inter",
  },
  {
    id: "theme-sage",
    name: "Sage Elegance",
    primary: "#556b2f",
    secondary: "#2e3b20",
    accent: "#8fa382",
    background: "#141a12",
    card: "#1e261a",
    text: "#e8efe6",
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
  {
    id: "theme-gold",
    name: "Royal Gold",
    primary: "#c5a059",
    secondary: "#1f1d19",
    accent: "#e5c07b",
    background: "#121110",
    card: "#1e1c18",
    text: "#f7f3eb",
    fontHeading: "Cinzel",
    fontBody: "Inter",
  },
  {
    id: "theme-rustic",
    name: "Rustic Earth",
    primary: "#a05a2c",
    secondary: "#2c221c",
    accent: "#cf8a4e",
    background: "#161311",
    card: "#211b18",
    text: "#f4ede8",
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
  {
    id: "theme-blush",
    name: "Rose Blush",
    primary: "#c25975",
    secondary: "#2a1c22",
    accent: "#e58aa3",
    background: "#171013",
    card: "#23181d",
    text: "#faeef2",
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
];

export const Inspector: React.FC<InspectorProps> = ({
  project,
  onChangeProject,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"couple" | "event" | "theme" | "gift" | "quote" | "api">("couple");
  const [apiKeyInput, setApiKeyInput] = useState(getStoredApiKey());
  const [savedStatus, setSavedStatus] = useState(false);

  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    setStoredApiKey(apiKeyInput);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const handleLoadBatakPreset = () => {
    const batakTheme = THEME_PRESETS[0];
    onChangeProject({
      ...project,
      title: "The Wedding of Dicky & Agnes",
      palette: batakTheme,
      quote: "Dan di atas semuanya itu: kenakanlah kasih, sebagai pengikat yang mempersatukan dan menyempurnakan.",
      quoteSource: "Kolose 3:14",
      couple: {
        ...project.couple,
        groomName: "Dicky Fernando Sitohang, S.T.",
        groomNick: "Dicky",
        groomParents: "Putra ketiga dari Bpk. J. Sitohang & Ibu R. br. Simanjuntak",
        groomInstagram: "@dicky_sitohang",
        groomPhoto: "/assets/adat-batak/images/29817-gallery-1676444055.jpg",
        brideName: "Agnes Patricia Silalahi, S.E.",
        brideNick: "Agnes",
        brideParents: "Putri kedua dari Bpk. M. Silalahi & Ibu H. br. Tobing",
        brideInstagram: "@agnes_silalahi",
        bridePhoto: "/assets/adat-batak/images/29817-gallery-1676444135.jpg",
      },
      event: {
        ...project.event,
        date: "Sabtu, 24 Oktober 2026",
        targetTimestamp: "2026-10-24T09:00:00",
        akadTitle: "Pemberkatan Kudus",
        akadTime: "09:00 - 11:00 WIB",
        akadVenue: "Gereja HKBP Sudirman",
        akadAddress: "Jl. Setiabudi No. 12, Jakarta Selatan",
        resepsiTitle: "Pesta Unjuk Adat Batak",
        resepsiTime: "12:00 - 17:00 WIB",
        resepsiVenue: "Gedung Mulia & Raja",
        resepsiAddress: "Jl. Kebon Nanas No. 70, Jakarta Timur",
        mapsUrl: "https://maps.google.com",
      },
      audioUrl: "/assets/adat-batak/music/tobadream-theme-song-viky-sianipar.mp3",
      audioTitle: "Viky Sianipar - Tobadream",
      banks: project.banks?.length
        ? project.banks
        : [
            {
              id: "bank-1",
              bankName: "BCA",
              accountNumber: "8735019283",
              holderName: "Dicky Fernando Sitohang",
            },
            {
              id: "bank-2",
              bankName: "Mandiri",
              accountNumber: "1320098412891",
              holderName: "Agnes Patricia Silalahi",
            },
          ],
    });
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

  const selectTheme = (palette: ThemePalette) => {
    onChangeProject({
      ...project,
      palette: palette,
    });
  };

  const updateThemeField = (field: keyof ThemePalette, val: string) => {
    if (typeof project.palette === "object" && project.palette !== null) {
      onChangeProject({
        ...project,
        palette: { ...project.palette, [field]: val },
      });
    }
  };

  const handleAddBank = () => {
    const newBank = {
      id: `bank-${Date.now()}`,
      bankName: "BCA",
      accountNumber: "",
      holderName: "",
    };
    onChangeProject({
      ...project,
      banks: [...(project.banks || []), newBank],
    });
  };

  const handleRemoveBank = (index: number) => {
    const updated = (project.banks || []).filter((_, i) => i !== index);
    onChangeProject({
      ...project,
      banks: updated,
    });
  };

  const currentThemeId = typeof project.palette === "object" ? project.palette?.id : project.palette;

  return (
    <aside className="w-80 border-l border-white/10 bg-slate-900/95 backdrop-blur-md flex flex-col h-[calc(100vh-56px)] shrink-0 z-40">
      <div className="h-12 px-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-semibold text-white">Pengaturan Undangan</span>
        </div>
        <button
          onClick={onClose}
          className="h-8 w-8 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 active:scale-[0.98] transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-3 border-b border-white/10 bg-slate-950/60">
        <button
          type="button"
          onClick={handleLoadBatakPreset}
          className="w-full h-9 px-3 rounded-lg bg-gradient-to-r from-red-950 via-amber-950/80 to-red-950 hover:from-red-900 hover:to-amber-900 border border-amber-500/40 text-amber-200 text-xs font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Muat Template Adat Batak</span>
        </button>
      </div>

      <div className="grid grid-cols-6 p-1 bg-slate-950/40 border-b border-white/5 text-[11px]">
        <button
          onClick={() => setActiveTab("couple")}
          className={`h-8 flex flex-col items-center justify-center rounded-md active:scale-[0.98] transition ${
            activeTab === "couple" ? "bg-slate-800 text-white font-medium shadow-sm" : "text-slate-400 hover:text-slate-200"
          }`}
          title="Mempelai"
        >
          <User className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setActiveTab("event")}
          className={`h-8 flex flex-col items-center justify-center rounded-md active:scale-[0.98] transition ${
            activeTab === "event" ? "bg-slate-800 text-white font-medium shadow-sm" : "text-slate-400 hover:text-slate-200"
          }`}
          title="Acara"
        >
          <Calendar className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setActiveTab("theme")}
          className={`h-8 flex flex-col items-center justify-center rounded-md active:scale-[0.98] transition ${
            activeTab === "theme" ? "bg-slate-800 text-white font-medium shadow-sm" : "text-slate-400 hover:text-slate-200"
          }`}
          title="Tema"
        >
          <Palette className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setActiveTab("gift")}
          className={`h-8 flex flex-col items-center justify-center rounded-md active:scale-[0.98] transition ${
            activeTab === "gift" ? "bg-slate-800 text-white font-medium shadow-sm" : "text-slate-400 hover:text-slate-200"
          }`}
          title="Hadiah"
        >
          <Gift className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setActiveTab("quote")}
          className={`h-8 flex flex-col items-center justify-center rounded-md active:scale-[0.98] transition ${
            activeTab === "quote" ? "bg-slate-800 text-white font-medium shadow-sm" : "text-slate-400 hover:text-slate-200"
          }`}
          title="Kutipan"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`h-8 flex flex-col items-center justify-center rounded-md active:scale-[0.98] transition ${
            activeTab === "api" ? "bg-slate-800 text-white font-medium shadow-sm" : "text-slate-400 hover:text-slate-200"
          }`}
          title="API Key"
        >
          <Key className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {activeTab === "couple" && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-medium">Nama Tamu Undangan</label>
              <input
                type="text"
                placeholder="Nama Tamu"
                value={project.guestName || ""}
                onChange={(e) => onChangeProject({ ...project, guestName: e.target.value })}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2">
              <span className="text-[11px] font-semibold text-emerald-400 block">Pengantin Pria</span>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap Beserta Gelar"
                  value={project.couple.groomName}
                  onChange={(e) => updateCouple("groomName", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Nama Panggilan</label>
                <input
                  type="text"
                  placeholder="Nama Panggilan"
                  value={project.couple.groomNick}
                  onChange={(e) => updateCouple("groomNick", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Nama Orang Tua</label>
                <input
                  type="text"
                  placeholder="Putra dari Bpk... & Ibu..."
                  value={project.couple.groomParents}
                  onChange={(e) => updateCouple("groomParents", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Instagram</label>
                <input
                  type="text"
                  placeholder="@username"
                  value={project.couple.groomInstagram || ""}
                  onChange={(e) => updateCouple("groomInstagram", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Tautan Foto Pria</label>
                <input
                  type="text"
                  placeholder="/assets/... atau URL gambar"
                  value={project.couple.groomPhoto || ""}
                  onChange={(e) => updateCouple("groomPhoto", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2">
              <span className="text-[11px] font-semibold text-emerald-400 block">Pengantin Wanita</span>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap Beserta Gelar"
                  value={project.couple.brideName}
                  onChange={(e) => updateCouple("brideName", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Nama Panggilan</label>
                <input
                  type="text"
                  placeholder="Nama Panggilan"
                  value={project.couple.brideNick}
                  onChange={(e) => updateCouple("brideNick", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Nama Orang Tua</label>
                <input
                  type="text"
                  placeholder="Putri dari Bpk... & Ibu..."
                  value={project.couple.brideParents}
                  onChange={(e) => updateCouple("brideParents", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Instagram</label>
                <input
                  type="text"
                  placeholder="@username"
                  value={project.couple.brideInstagram || ""}
                  onChange={(e) => updateCouple("brideInstagram", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Tautan Foto Wanita</label>
                <input
                  type="text"
                  placeholder="/assets/... atau URL gambar"
                  value={project.couple.bridePhoto || ""}
                  onChange={(e) => updateCouple("bridePhoto", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "event" && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-medium">Tanggal Acara Utama</label>
              <input
                type="text"
                placeholder="cth: Sabtu, 24 Oktober 2026"
                value={project.event.date || ""}
                onChange={(e) => updateEvent("date", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-medium">Target Waktu Countdown (ISO)</label>
              <input
                type="text"
                placeholder="2026-10-24T09:00:00"
                value={project.event.targetTimestamp}
                onChange={(e) => updateEvent("targetTimestamp", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2">
              <span className="text-[11px] font-semibold text-emerald-400 block">Akad / Pemberkatan</span>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Nama Acara</label>
                <input
                  type="text"
                  placeholder="Akad Nikah / Pemberkatan Kudus"
                  value={project.event.akadTitle || "Akad Nikah"}
                  onChange={(e) => updateEvent("akadTitle", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Waktu</label>
                <input
                  type="text"
                  placeholder="09:00 - 11:00 WIB"
                  value={project.event.akadTime}
                  onChange={(e) => updateEvent("akadTime", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Tempat / Gedung</label>
                <input
                  type="text"
                  placeholder="Nama Tempat atau Gereja"
                  value={project.event.akadVenue}
                  onChange={(e) => updateEvent("akadVenue", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Alamat Lengkap</label>
                <input
                  type="text"
                  placeholder="Alamat Lokasi Akad"
                  value={project.event.akadAddress}
                  onChange={(e) => updateEvent("akadAddress", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2">
              <span className="text-[11px] font-semibold text-emerald-400 block">Resepsi / Pesta Adat</span>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Nama Acara</label>
                <input
                  type="text"
                  placeholder="Resepsi / Pesta Unjuk Adat"
                  value={project.event.resepsiTitle || "Resepsi Pernikahan"}
                  onChange={(e) => updateEvent("resepsiTitle", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Waktu</label>
                <input
                  type="text"
                  placeholder="12:00 - 17:00 WIB"
                  value={project.event.resepsiTime}
                  onChange={(e) => updateEvent("resepsiTime", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Tempat / Gedung</label>
                <input
                  type="text"
                  placeholder="Nama Ballroom atau Gedung"
                  value={project.event.resepsiVenue}
                  onChange={(e) => updateEvent("resepsiVenue", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Alamat Lengkap</label>
                <input
                  type="text"
                  placeholder="Alamat Lokasi Resepsi"
                  value={project.event.resepsiAddress}
                  onChange={(e) => updateEvent("resepsiAddress", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2">
              <label className="text-[11px] text-slate-400 block font-medium">Tautan Google Maps</label>
              <input
                type="text"
                placeholder="https://maps.google.com/..."
                value={project.event.mapsUrl}
                onChange={(e) => updateEvent("mapsUrl", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-mono text-[11px]"
              />
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2">
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" /> Musik Latar
              </span>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Judul Lagu</label>
                <input
                  type="text"
                  placeholder="Judul Lagu - Artis"
                  value={project.audioTitle || ""}
                  onChange={(e) => onChangeProject({ ...project, audioTitle: e.target.value })}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">URL File Audio (MP3)</label>
                <input
                  type="text"
                  placeholder="/assets/... atau URL audio"
                  value={project.audioUrl || ""}
                  onChange={(e) => onChangeProject({ ...project, audioUrl: e.target.value })}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "theme" && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-slate-400 block mb-2 font-medium">Pilihan Tema Desain</label>
              <div className="space-y-2">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = currentThemeId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => selectTheme(preset)}
                      className={`w-full p-2.5 rounded-lg border flex items-center justify-between text-left active:scale-[0.98] transition ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-950/20 shadow-sm"
                          : "border-white/10 bg-slate-950/40 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center -space-x-1.5">
                          <span
                            className="w-4 h-4 rounded-full border border-black/40 inline-block shadow-sm"
                            style={{ backgroundColor: preset.primary }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/40 inline-block shadow-sm"
                            style={{ backgroundColor: preset.accent }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/40 inline-block shadow-sm"
                            style={{ backgroundColor: preset.background }}
                          />
                        </div>
                        <div>
                          <span className="text-xs font-medium text-white block">{preset.name}</span>
                          <span className="text-[10px] text-slate-400 font-serif">{preset.fontHeading}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {typeof project.palette === "object" && project.palette !== null && (
              <div className="pt-3 border-t border-white/5 space-y-2.5">
                <span className="text-[11px] font-semibold text-emerald-400 block">Kustomisasi Warna Tema</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Warna Utama</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={project.palette.primary || "#8b1e1e"}
                        onChange={(e) => updateThemeField("primary", e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={project.palette.primary || ""}
                        onChange={(e) => updateThemeField("primary", e.target.value)}
                        className="w-full h-8 px-2 rounded-md bg-slate-950/60 border border-white/10 text-white font-mono text-[11px] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Warna Aksen</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={project.palette.accent || "#d4af37"}
                        onChange={(e) => updateThemeField("accent", e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={project.palette.accent || ""}
                        onChange={(e) => updateThemeField("accent", e.target.value)}
                        className="w-full h-8 px-2 rounded-md bg-slate-950/60 border border-white/10 text-white font-mono text-[11px] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Latar Belakang</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={project.palette.background || "#1a1615"}
                        onChange={(e) => updateThemeField("background", e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={project.palette.background || ""}
                        onChange={(e) => updateThemeField("background", e.target.value)}
                        className="w-full h-8 px-2 rounded-md bg-slate-950/60 border border-white/10 text-white font-mono text-[11px] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Warna Kartu</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={project.palette.card || "#241e1c"}
                        onChange={(e) => updateThemeField("card", e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={project.palette.card || ""}
                        onChange={(e) => updateThemeField("card", e.target.value)}
                        className="w-full h-8 px-2 rounded-md bg-slate-950/60 border border-white/10 text-white font-mono text-[11px] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-[10px] text-slate-400 block mb-0.5">Font Judul</label>
                  <select
                    value={project.palette.fontHeading || "Cinzel"}
                    onChange={(e) => updateThemeField("fontHeading", e.target.value)}
                    className="w-full h-8 px-2 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none"
                  >
                    <option value="Cinzel">Cinzel</option>
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="Cormorant Garamond">Cormorant Garamond</option>
                    <option value="Great Vibes">Great Vibes</option>
                    <option value="Montserrat">Montserrat</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "gift" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-400">Daftar Rekening & Amplop</span>
              <button
                type="button"
                onClick={handleAddBank}
                className="h-7 px-2 rounded-md bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 text-emerald-300 text-[11px] flex items-center gap-1 active:scale-[0.98] transition"
              >
                <Plus className="w-3 h-3" />
                <span>Tambah</span>
              </button>
            </div>

            {(project.banks || []).map((bank, index) => (
              <div key={bank.id || index} className="p-3 rounded-lg bg-slate-950/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-300">Rekening {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBank(index)}
                    className="h-6 w-6 rounded-md flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 active:scale-[0.98] transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Nama Bank / e-Wallet</label>
                  <input
                    type="text"
                    placeholder="BCA, Mandiri, Gopay, QRIS"
                    value={bank.bankName}
                    onChange={(e) => {
                      const newBanks = [...(project.banks || [])];
                      newBanks[index] = { ...bank, bankName: e.target.value };
                      onChangeProject({ ...project, banks: newBanks });
                    }}
                    className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Nomor Rekening</label>
                  <input
                    type="text"
                    placeholder="Nomor Rekening / Nomor Ponsel"
                    value={bank.accountNumber}
                    onChange={(e) => {
                      const newBanks = [...(project.banks || [])];
                      newBanks[index] = { ...bank, accountNumber: e.target.value };
                      onChangeProject({ ...project, banks: newBanks });
                    }}
                    className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Atas Nama Pemilik</label>
                  <input
                    type="text"
                    placeholder="Nama Pemilik Rekening"
                    value={bank.holderName}
                    onChange={(e) => {
                      const newBanks = [...(project.banks || [])];
                      newBanks[index] = { ...bank, holderName: e.target.value };
                      onChangeProject({ ...project, banks: newBanks });
                    }}
                    className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "quote" && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-medium">Isi Ayat / Kutipan Cinta</label>
              <textarea
                placeholder="Tuliskan ayat suci atau kutipan romantis..."
                rows={5}
                value={project.quote}
                onChange={(e) => onChangeProject({ ...project, quote: e.target.value })}
                className="w-full p-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 resize-none leading-relaxed"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-medium">Sumber / Rujukan</label>
              <input
                type="text"
                placeholder="cth: Kolose 3:14 / Ar-Rum 21"
                value={project.quoteSource}
                onChange={(e) => onChangeProject({ ...project, quoteSource: e.target.value })}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {activeTab === "api" && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-medium">Holver Gemini API Key</label>
              <input
                type="password"
                placeholder="Ketik API Key Anda..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-950/60 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Model aktif: <span className="font-mono text-emerald-400">HolverAI</span> via Holver AI. Kunci disimpan secara privat pada penyimpanan lokal browser Anda.
            </p>
            <button
              onClick={handleSaveApiKey}
              className="w-full h-9 rounded-md bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-medium transition shadow-sm"
            >
              {savedStatus ? "Kunci API Tersimpan!" : "Simpan API Key"}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
