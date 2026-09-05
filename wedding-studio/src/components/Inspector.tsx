import React, { useState } from "react";
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
    background: "#fcf9f6",
    card: "#ffffff",
    text: "#221e1d",
    fontHeading: "Cinzel",
    fontBody: "Inter",
  },
  {
    id: "theme-sage",
    name: "Sage Elegance",
    primary: "#4a6b57",
    secondary: "#2e3b20",
    accent: "#8fa382",
    background: "#f7f9f7",
    card: "#ffffff",
    text: "#24332a",
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
  {
    id: "theme-gold",
    name: "Royal Gold",
    primary: "#b38728",
    secondary: "#2d2415",
    accent: "#d4af37",
    background: "#faf8f2",
    card: "#ffffff",
    text: "#2d2415",
    fontHeading: "Cinzel",
    fontBody: "Inter",
  },
  {
    id: "theme-rustic",
    name: "Rustic Earth",
    primary: "#a2583e",
    secondary: "#3a1f15",
    accent: "#cf8a4e",
    background: "#fdfaf7",
    card: "#ffffff",
    text: "#3a1f15",
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
  {
    id: "theme-blush",
    name: "Rose Blush",
    primary: "#b8697a",
    secondary: "#381a21",
    accent: "#d88a99",
    background: "#fdf8f9",
    card: "#ffffff",
    text: "#381a21",
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
        akadAddress: "Jl. Setiabudi Barat No. 12, Jakarta Selatan",
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
              accountNumber: "8691234567",
              holderName: "Dicky Fernando Sitohang",
            },
            {
              id: "bank-2",
              bankName: "Mandiri",
              accountNumber: "1230009876543",
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
    <aside className="w-80 border-l border-slate-200/90 bg-white flex flex-col h-[calc(100vh-52px)] shrink-0 z-40 shadow-xs select-none">
      <div className="h-12 px-3 sm:px-4 border-b border-slate-200/80 flex items-center justify-between bg-white">
        <span className="text-xs font-semibold text-slate-900 tracking-tight">Pengaturan</span>
        <button
          type="button"
          onClick={onClose}
          className="h-7 px-2.5 rounded-md border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium active:scale-[0.98] transition cursor-pointer"
        >
          Tutup
        </button>
      </div>

      <div className="p-3 border-b border-slate-200/80 bg-slate-50/70">
        <button
          type="button"
          onClick={handleLoadBatakPreset}
          className="w-full h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-semibold flex items-center justify-center active:scale-[0.98] transition shadow-2xs cursor-pointer"
        >
          Template Batak Toba
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1 p-1.5 bg-slate-100/90 border-b border-slate-200/80 text-[11px]">
        {[
          { key: "couple", label: "Mempelai" },
          { key: "event", label: "Acara" },
          { key: "theme", label: "Tema" },
          { key: "gift", label: "Hadiah" },
          { key: "quote", label: "Kutipan" },
          { key: "api", label: "API" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            className={`h-7 rounded-md active:scale-[0.98] transition cursor-pointer text-xs flex items-center justify-center ${
              activeTab === tab.key
                ? "bg-slate-900 text-white font-semibold shadow-2xs"
                : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-medium"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-slate-800 bg-white">
        {activeTab === "couple" && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Tamu Undangan</label>
              <input
                type="text"
                placeholder="Nama Tamu Undangan"
                value={project.guestName || ""}
                onChange={(e) => onChangeProject({ ...project, guestName: e.target.value })}
                className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
              />
            </div>

            <div className="pt-3 border-t border-slate-200/80 space-y-2">
              <span className="text-[11px] font-semibold text-slate-900 block">Pengantin Pria</span>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap Pria"
                  value={project.couple.groomName}
                  onChange={(e) => updateCouple("groomName", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Nama Panggilan</label>
                <input
                  type="text"
                  placeholder="Panggilan"
                  value={project.couple.groomNick}
                  onChange={(e) => updateCouple("groomNick", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Orang Tua / Keluarga</label>
                <input
                  type="text"
                  placeholder="Keluarga / Orang Tua"
                  value={project.couple.groomParents}
                  onChange={(e) => updateCouple("groomParents", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Akun Instagram</label>
                <input
                  type="text"
                  placeholder="@instagram"
                  value={project.couple.groomInstagram || ""}
                  onChange={(e) => updateCouple("groomInstagram", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Foto Pria (URL)</label>
                <input
                  type="text"
                  placeholder="URL Foto"
                  value={project.couple.groomPhoto || ""}
                  onChange={(e) => updateCouple("groomPhoto", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80 space-y-2">
              <span className="text-[11px] font-semibold text-slate-900 block">Pengantin Wanita</span>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap Wanita"
                  value={project.couple.brideName}
                  onChange={(e) => updateCouple("brideName", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Nama Panggilan</label>
                <input
                  type="text"
                  placeholder="Panggilan"
                  value={project.couple.brideNick}
                  onChange={(e) => updateCouple("brideNick", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Orang Tua / Keluarga</label>
                <input
                  type="text"
                  placeholder="Keluarga / Orang Tua"
                  value={project.couple.brideParents}
                  onChange={(e) => updateCouple("brideParents", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Akun Instagram</label>
                <input
                  type="text"
                  placeholder="@instagram"
                  value={project.couple.brideInstagram || ""}
                  onChange={(e) => updateCouple("brideInstagram", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Foto Wanita (URL)</label>
                <input
                  type="text"
                  placeholder="URL Foto"
                  value={project.couple.bridePhoto || ""}
                  onChange={(e) => updateCouple("bridePhoto", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "event" && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Tanggal Acara</label>
              <input
                type="text"
                placeholder="Contoh: Sabtu, 24 Oktober 2026"
                value={project.event.date || ""}
                onChange={(e) => updateEvent("date", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Target Countdown (ISO)</label>
              <input
                type="text"
                placeholder="YYYY-MM-DDTHH:mm:ss"
                value={project.event.targetTimestamp}
                onChange={(e) => updateEvent("targetTimestamp", e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition font-mono"
              />
            </div>

            <div className="pt-3 border-t border-slate-200/80 space-y-2">
              <span className="text-[11px] font-semibold text-slate-900 block">Akad / Pemberkatan</span>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Nama Acara</label>
                <input
                  type="text"
                  placeholder="Pemberkatan Kudus"
                  value={project.event.akadTitle || "Akad Nikah"}
                  onChange={(e) => updateEvent("akadTitle", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Waktu Acara</label>
                <input
                  type="text"
                  placeholder="09:00 - 11:00 WIB"
                  value={project.event.akadTime}
                  onChange={(e) => updateEvent("akadTime", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Nama Tempat</label>
                <input
                  type="text"
                  placeholder="Gereja HKBP Sudirman"
                  value={project.event.akadVenue}
                  onChange={(e) => updateEvent("akadVenue", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Alamat</label>
                <input
                  type="text"
                  placeholder="Alamat Lokasi"
                  value={project.event.akadAddress}
                  onChange={(e) => updateEvent("akadAddress", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80 space-y-2">
              <span className="text-[11px] font-semibold text-slate-900 block">Pesta Adat / Resepsi</span>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Nama Resepsi</label>
                <input
                  type="text"
                  placeholder="Pesta Unjuk Adat Batak"
                  value={project.event.resepsiTitle}
                  onChange={(e) => updateEvent("resepsiTitle", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Waktu Resepsi</label>
                <input
                  type="text"
                  placeholder="12:00 - 17:00 WIB"
                  value={project.event.resepsiTime}
                  onChange={(e) => updateEvent("resepsiTime", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Nama Gedung</label>
                <input
                  type="text"
                  placeholder="Gedung Mulia & Raja"
                  value={project.event.resepsiVenue}
                  onChange={(e) => updateEvent("resepsiVenue", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Alamat Lengkap</label>
                <input
                  type="text"
                  placeholder="Alamat Gedung"
                  value={project.event.resepsiAddress}
                  onChange={(e) => updateEvent("resepsiAddress", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">URL Google Maps</label>
                <input
                  type="text"
                  placeholder="https://maps.google.com"
                  value={project.event.mapsUrl}
                  onChange={(e) => updateEvent("mapsUrl", e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "theme" && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">Preset Tema</label>
              <div className="space-y-1.5">
                {THEME_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => selectTheme(p)}
                    className={`w-full p-2.5 rounded-md border text-left flex items-center justify-between transition cursor-pointer active:scale-[0.98] ${
                      currentThemeId === p.id
                        ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900 font-semibold"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.primary }} />
                        <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.accent }} />
                      </div>
                      <span className="text-xs text-slate-800">{p.name}</span>
                    </div>
                    {currentThemeId === p.id && (
                      <span className="text-[10px] font-bold text-slate-900">Aktif</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {typeof project.palette === "object" && project.palette !== null && (
              <div className="pt-3 border-t border-slate-200/80 space-y-2">
                <span className="text-[11px] font-semibold text-slate-900 block">Kustom Warna</span>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Warna Utama</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={project.palette.primary}
                      onChange={(e) => updateThemeField("primary", e.target.value)}
                      className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={project.palette.primary}
                      onChange={(e) => updateThemeField("primary", e.target.value)}
                      className="flex-1 h-8 px-2 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Warna Aksen</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={project.palette.accent}
                      onChange={(e) => updateThemeField("accent", e.target.value)}
                      className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={project.palette.accent}
                      onChange={(e) => updateThemeField("accent", e.target.value)}
                      className="flex-1 h-8 px-2 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "gift" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-900">Daftar Rekening</span>
              <button
                type="button"
                onClick={handleAddBank}
                className="h-7 px-2.5 rounded-md bg-slate-900 text-white text-xs font-medium active:scale-[0.98] transition cursor-pointer"
              >
                Tambah
              </button>
            </div>

            <div className="space-y-3">
              {(project.banks || []).map((b, idx) => (
                <div key={b.id || idx} className="p-3 rounded-md border border-slate-200 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">Bank #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBank(idx)}
                      className="h-6 px-2 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 text-[10px] font-medium active:scale-[0.98] transition cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Nama Bank</label>
                    <input
                      type="text"
                      placeholder="BCA / Mandiri / BNI"
                      value={b.bankName}
                      onChange={(e) => {
                        const updated = [...(project.banks || [])];
                        updated[idx] = { ...updated[idx], bankName: e.target.value };
                        onChangeProject({ ...project, banks: updated });
                      }}
                      className="w-full h-8 px-2 rounded-md bg-white border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Nomor Rekening</label>
                    <input
                      type="text"
                      placeholder="1234567890"
                      value={b.accountNumber}
                      onChange={(e) => {
                        const updated = [...(project.banks || [])];
                        updated[idx] = { ...updated[idx], accountNumber: e.target.value };
                        onChangeProject({ ...project, banks: updated });
                      }}
                      className="w-full h-8 px-2 rounded-md bg-white border border-slate-200 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Nama Pemilik</label>
                    <input
                      type="text"
                      placeholder="Nama Sesuai Rekening"
                      value={b.holderName}
                      onChange={(e) => {
                        const updated = [...(project.banks || [])];
                        updated[idx] = { ...updated[idx], holderName: e.target.value };
                        onChangeProject({ ...project, banks: updated });
                      }}
                      className="w-full h-8 px-2 rounded-md bg-white border border-slate-200 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "quote" && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Teks Kutipan</label>
              <textarea
                rows={3}
                placeholder="Teks Kutipan / Ayat"
                value={project.quote}
                onChange={(e) => onChangeProject({ ...project, quote: e.target.value })}
                className="w-full p-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition resize-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Sumber Kutipan</label>
              <input
                type="text"
                placeholder="Kolose 3:14"
                value={project.quoteSource}
                onChange={(e) => onChangeProject({ ...project, quoteSource: e.target.value })}
                className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
              />
            </div>
            <div className="pt-3 border-t border-slate-200/80 space-y-2">
              <span className="text-[11px] font-semibold text-slate-900 block">Musik Latar</span>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">Judul Musik</label>
                <input
                  type="text"
                  placeholder="Viky Sianipar - Tobadream"
                  value={project.audioTitle || ""}
                  onChange={(e) => onChangeProject({ ...project, audioTitle: e.target.value })}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5 font-medium">URL File Audio (MP3)</label>
                <input
                  type="text"
                  placeholder="URL Audio"
                  value={project.audioUrl || ""}
                  onChange={(e) => onChangeProject({ ...project, audioUrl: e.target.value })}
                  className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "api" && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">API Key AI Gateway</label>
              <input
                type="password"
                placeholder="sk-..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full h-8 px-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-xs outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition font-mono"
              />
              <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                Disimpan di localStorage browser Anda untuk memanggil AI Generator.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveApiKey}
              className="h-8 px-4 rounded-md bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-medium transition cursor-pointer"
            >
              {savedStatus ? "Tersimpan!" : "Simpan Key"}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
