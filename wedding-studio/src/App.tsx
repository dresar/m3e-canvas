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

const INITIAL_PROJECT: WeddingProject = {
  title: "The Wedding of Dimas & Nadia",
  slug: "dimas-nadia-wedding",
  guestName: "Bpk. Eka Maulana",
  quote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
  quoteSource: "QS. Ar-Rum: 21",
  palette: assetsDb.themes[0] as ThemePalette,
  couple: {
    groomName: "Dimas Pratama, S.Kom.",
    groomNick: "Dimas",
    groomParents: "Putra pertama dari Bpk. Ir. Hendra & Ibu Rina",
    groomInstagram: "@dimaspratama",
    groomPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    brideName: "Nadia Safira, M.Ds.",
    brideNick: "Nadia",
    brideParents: "Putri kedua dari Bpk. Dr. Bambang & Ibu Sri",
    brideInstagram: "@nadiasafira",
    bridePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  event: {
    date: "Minggu, 25 Oktober 2026",
    targetTimestamp: "2026-10-25T08:00:00",
    akadTitle: "Akad Nikah",
    akadTime: "08:00 - 10:00 WIB",
    akadVenue: "Masjid Raya Pondok Indah",
    akadAddress: "Jl. Iskandar Muda No. 1, Kebayoran Lama, Jakarta Selatan",
    resepsiTitle: "Resepsi Pernikahan",
    resepsiTime: "11:00 - 14:00 WIB",
    resepsiVenue: "Grand Ballroom Hotel Mulia",
    resepsiAddress: "Jl. Asia Afrika, Senayan, Jakarta Pusat",
    mapsUrl: "https://maps.google.com/?q=Hotel+Mulia+Jakarta",
  },
  banks: [
    {
      id: "bank-1",
      bankName: "BCA",
      accountNumber: "8410293810",
      holderName: "Dimas Pratama",
    },
    {
      id: "bank-2",
      bankName: "Mandiri",
      accountNumber: "1370018928312",
      holderName: "Nadia Safira",
    },
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80",
  ],
  audioUrl: "https://cdn.jsdelivr.net/gh/anars/blank-audio@master/250-milliseconds-of-silence.mp3",
  audioTitle: "Romantic Acoustic Instrument",
  screens: INITIAL_SCREENS,
  wishes: [
    {
      id: "wish-1",
      sender: "Rizky & Maya",
      attendance: "Hadir",
      message: "Selamat untuk Dimas dan Nadia! Semoga menjadi keluarga sakinah mawaddah warahmah.",
      createdAt: "10 menit lalu",
    },
    {
      id: "wish-2",
      sender: "Budi Santoso",
      attendance: "Hadir",
      message: "Happy wedding bro Dimas, lancar sampai hari H!",
      createdAt: "1 jam lalu",
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
        onOpenAiModal={() => setIsAiModalOpen(true)}
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
