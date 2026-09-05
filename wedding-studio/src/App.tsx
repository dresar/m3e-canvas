import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { CanvasViewport } from "./components/CanvasViewport";
import { Inspector } from "./components/Inspector";
import { AIGenerateModal } from "./components/AIGenerateModal";
import { WeddingProject, ScreenData, ThemePalette } from "./types";
import assetsDb from "./data/assets_database.json";
import { exportZipBundle } from "./lib/exportHtml";

const INITIAL_SCREENS: ScreenData[] = [
  { id: "screen-cover", type: "cover", title: "Amplop Sampul" },
  { id: "screen-quote", type: "quote", title: "Kutipan Suci" },
  { id: "screen-profile", type: "profile", title: "Profil Mempelai" },
  { id: "screen-countdown", type: "countdown", title: "Jadwal & Waktu" },
  { id: "screen-location", type: "location", title: "Peta & Lokasi" },
  { id: "screen-gallery", type: "gallery", title: "Galeri Foto" },
  { id: "screen-gift", type: "gift", title: "Tanda Kasih" },
  { id: "screen-rsvp", type: "rsvp", title: "Konfirmasi Hadir" },
];

const BATAK_THEME = (assetsDb.themes.find((t) => t.id === "theme-batak-gorga") || assetsDb.themes[0]) as ThemePalette;

const INITIAL_PROJECT: WeddingProject = {
  title: "The Wedding of Dicky & Agnes",
  slug: "dicky-agnes-wedding",
  guestName: "Bapak / Ibu / Saudara(i)",
  quote: "Dan di atas semuanya itu: kenakanlah kasih, sebagai pengikat yang mempersatukan dan menyempurnakan.",
  quoteSource: "Kolose 3:14",
  palette: BATAK_THEME,
  couple: {
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
  banks: [
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
  galleryImages: [
    "/assets/adat-batak/images/29817-gallery-1676444055.jpg",
    "/assets/adat-batak/images/29817-gallery-1676444135.jpg",
    "/assets/adat-batak/images/29817-gallery-1676444142.jpg",
    "/assets/adat-batak/images/adat-batak.jpg",
  ],
  audioUrl: "/assets/adat-batak/music/tobadream-theme-song-viky-sianipar.mp3",
  audioTitle: "Viky Sianipar - Tobadream",
  screens: INITIAL_SCREENS,
  wishes: [
    {
      id: "wish-1",
      sender: "St. P. Sitohang / br. Nababan",
      attendance: "Hadir",
      message: "Selamat memasuki hidup baru Dicky & Agnes. Tuhan memberkati rumah tangga kalian sampai maranak marboru.",
      createdAt: "5 menit lalu",
    },
    {
      id: "wish-2",
      sender: "Kel. Silalahi Raja",
      attendance: "Hadir",
      message: "Horas jala gabe! Semoga pesta unjuk berjalan lancar dan penuh sukacita.",
      createdAt: "20 menit lalu",
    },
  ],
};

export default function App() {
  const [project, setProject] = useState<WeddingProject>(INITIAL_PROJECT);
  const [selectedScreenId, setSelectedScreenId] = useState<string>("screen-cover");
  const [zoom, setZoom] = useState<number>(0.8);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  const handleExportZip = async () => {
    await exportZipBundle(project);
  };

  const handleApplyAiUpdates = (updates: Partial<WeddingProject>) => {
    setProject((prev) => ({
      ...prev,
      ...updates,
      couple: updates.couple ? { ...prev.couple, ...updates.couple } : prev.couple,
      event: updates.event ? { ...prev.event, ...updates.event } : prev.event,
      palette: updates.palette || prev.palette,
      banks: updates.banks || prev.banks,
    }));
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 overflow-hidden font-sans select-none">
      <Navbar
        zoom={zoom}
        setZoom={setZoom}
        resetZoom={() => setZoom(0.8)}
        onHolverAIModal={() => setIsAiModalOpen(true)}
        onExport={handleExportZip}
        selectedTheme={project.palette}
        onSelectTheme={(theme) => setProject({ ...project, palette: theme })}
        isPreview={isPreview}
        onTogglePreview={() => setIsPreview(!isPreview)}
        onToggleInspector={() => setIsInspectorOpen(!isInspectorOpen)}
      />

      <div className="flex-1 flex overflow-hidden relative">
        <CanvasViewport
          project={project}
          selectedScreenId={selectedScreenId}
          onSelectScreen={setSelectedScreenId}
          zoom={zoom}
          isPreview={isPreview}
        />

        {!isPreview && (
          <Inspector
            project={project}
            onChangeProject={setProject}
            isOpen={isInspectorOpen}
            onClose={() => setIsInspectorOpen(false)}
          />
        )}
      </div>

      <AIGenerateModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyProject={handleApplyAiUpdates}
      />
    </div>
  );
}
