import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Howl } from "howler";
import { Copy, Check, MapPin, Calendar, Heart, Music, CheckCircle2 } from "lucide-react";
import { WeddingProject, ScreenData } from "../types";

interface PhoneScreenProps {
  screen: ScreenData;
  project: WeddingProject;
  isActive?: boolean;
  onSelect?: () => void;
  onOpenInvitation?: () => void;
  isOpenState?: boolean;
}

export const PhoneScreen: React.FC<PhoneScreenProps> = ({
  screen,
  project,
  isActive = false,
  onSelect,
  onOpenInvitation,
}) => {
  const { couple, event, palette, quote, quoteSource, banks, galleryImages, wishes } = project;
  const [copiedBankId, setCopiedBankId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [rsvpName, setRsvpName] = useState<string>("");
  const [rsvpStatus, setRsvpStatus] = useState<string>("Hadir");
  const [rsvpMessage, setRsvpMessage] = useState<string>("");
  const [showRsvpToast, setShowRsvpToast] = useState<boolean>(false);

  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    const target = new Date(event.targetTimestamp).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.targetTimestamp]);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#8b1e1e", "#ffffff"],
    });
  };

  const playAudio = () => {
    const audioSrc = (project as any).audioUrl || "/assets/adat-batak/music/tobadream-theme-song-viky-sianipar.mp3";
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [audioSrc],
        html5: true,
        loop: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
      });
    }
    if (!soundRef.current.playing()) {
      soundRef.current.play();
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audioSrc = (project as any).audioUrl || "/assets/adat-batak/music/tobadream-theme-song-viky-sianipar.mp3";
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [audioSrc],
        html5: true,
        loop: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
      });
      soundRef.current.play();
      return;
    }
    if (soundRef.current.playing()) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankId(id);
    setTimeout(() => setCopiedBankId(null), 1500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerConfetti();
    setShowRsvpToast(true);
    setTimeout(() => {
      setShowRsvpToast(false);
    }, 3200);
    setRsvpName("");
    setRsvpMessage("");
  };

  const bgTextureSrc =
    (screen as any).bgTexture || (project as any).bgTexture || "/assets/adat-batak/images/bg.webp";
  const ornamentTopSrc =
    (screen as any).ornamentTop || (project as any).ornamentTop || "/assets/adat-batak/images/frame-tm.webp";
  const ornamentBottomSrc =
    (screen as any).ornamentBottom || (project as any).ornamentBottom || "/assets/adat-batak/images/frame-bm.webp";
  const coverEmblemSrc =
    (screen as any).coverEmblem || (project as any).coverEmblem || "/assets/adat-batak/images/ulos.webp";

  return (
    <div
      onClick={onSelect}
      className={`relative w-[412px] h-[892px] rounded-[36px] border-4 transition-all duration-200 overflow-hidden flex flex-col shadow-2xl shrink-0 cursor-pointer ${
        isActive
          ? "border-emerald-500 ring-4 ring-emerald-500/20"
          : "border-slate-800 hover:border-slate-700"
      }`}
      style={{
        backgroundColor: palette.background,
        color: palette.text,
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={bgTextureSrc}
          alt=""
          className="w-full h-full object-cover opacity-15 mix-blend-multiply"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />
      </div>

      <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 flex justify-center">
        <img
          src={ornamentTopSrc}
          alt=""
          className="w-full max-h-16 object-contain opacity-90"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex justify-center">
        <img
          src={ornamentBottomSrc}
          alt=""
          className="w-full max-h-16 object-contain opacity-90"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-slate-900 rounded-b-2xl z-40 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-slate-950 mr-2"></div>
        <div className="w-10 h-1.5 rounded-full bg-slate-800"></div>
      </div>

      {showRsvpToast && (
        <div className="absolute top-12 left-5 right-5 z-50 bg-slate-900/95 text-white px-4 py-3 rounded-lg shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-left flex-1">
            <p className="text-xs font-semibold text-emerald-300">Konfirmasi Terkirim!</p>
            <p className="text-[11px] text-slate-300">Terima kasih atas doa & konfirmasinya.</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-between text-center relative z-10 pt-12 pb-8">
        {screen.type === "cover" && (
          <div className="flex-1 flex flex-col items-center justify-center w-full my-auto">
            <div className="w-20 h-14 mb-2 flex items-center justify-center">
              <img
                src={coverEmblemSrc}
                alt="Emblem"
                className="max-w-full max-h-full object-contain filter drop-shadow-sm"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
            </div>

            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md mb-4"
              style={{ backgroundColor: palette.accent }}
            >
              {couple.groomNick[0]}&{couple.brideNick[0]}
            </div>

            <p className="text-[11px] uppercase tracking-[3px] font-medium mb-2" style={{ color: palette.secondary }}>
              The Wedding Of
            </p>

            <h2
              className="text-3xl font-bold tracking-tight mb-6"
              style={{ fontFamily: palette.fontHeading, color: palette.primary }}
            >
              {couple.groomNick} & {couple.brideNick}
            </h2>

            <div
              className="w-full max-w-xs rounded-lg p-4 mb-6 border border-dashed"
              style={{ borderColor: palette.secondary, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            >
              <p className="text-xs mb-1 font-medium" style={{ color: palette.secondary }}>
                Kepada Yth:
              </p>
              <h3 className="text-base font-semibold" style={{ color: palette.text }}>
                {project.guestName || "Tamu Undangan"}
              </h3>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerConfetti();
                playAudio();
                if (onOpenInvitation) onOpenInvitation();
              }}
              className="h-10 px-6 rounded-md text-white text-xs font-semibold tracking-wide shadow-md active:scale-[0.98] transition flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: palette.primary }}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Buka Undangan</span>
            </button>
          </div>
        )}

        {screen.type === "quote" && (
          <div className="flex-1 flex flex-col items-center justify-center w-full my-auto px-2">
            <div className="w-12 h-1 rounded-full mb-8 opacity-40" style={{ backgroundColor: palette.accent }} />
            <p className="text-sm italic leading-relaxed mb-4 font-serif" style={{ color: palette.text }}>
              "{quote}"
            </p>
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: palette.accent }}>
              — {quoteSource}
            </span>
            <div className="w-12 h-1 rounded-full mt-8 opacity-40" style={{ backgroundColor: palette.accent }} />
          </div>
        )}

        {screen.type === "profile" && (
          <div className="flex-1 flex flex-col items-center justify-center w-full my-auto">
            <h3
              className="text-2xl font-bold mb-6"
              style={{ fontFamily: palette.fontHeading, color: palette.primary }}
            >
              Mempelai
            </h3>

            <div className="mb-4 flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-full overflow-hidden border-2 mb-3 shadow-md"
                style={{ borderColor: palette.accent }}
              >
                <img src={couple.groomPhoto} alt={couple.groomName} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-bold" style={{ fontFamily: palette.fontHeading, color: palette.primary }}>
                {couple.groomName}
              </h4>
              <p className="text-xs max-w-xs mt-1" style={{ color: palette.secondary }}>
                {couple.groomParents}
              </p>
              {couple.groomInstagram && (
                <span className="text-[11px] mt-1 font-mono font-medium" style={{ color: palette.accent }}>
                  {couple.groomInstagram}
                </span>
              )}
            </div>

            <div className="text-xl font-bold my-2 font-serif" style={{ color: palette.accent }}>
              &
            </div>

            <div className="flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-full overflow-hidden border-2 mb-3 shadow-md"
                style={{ borderColor: palette.accent }}
              >
                <img src={couple.bridePhoto} alt={couple.brideName} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-bold" style={{ fontFamily: palette.fontHeading, color: palette.primary }}>
                {couple.brideName}
              </h4>
              <p className="text-xs max-w-xs mt-1" style={{ color: palette.secondary }}>
                {couple.brideParents}
              </p>
              {couple.brideInstagram && (
                <span className="text-[11px] mt-1 font-mono font-medium" style={{ color: palette.accent }}>
                  {couple.brideInstagram}
                </span>
              )}
            </div>
          </div>
        )}

        {screen.type === "countdown" && (
          <div className="flex-1 flex flex-col items-center justify-center w-full my-auto">
            <h3
              className="text-2xl font-bold mb-6"
              style={{ fontFamily: palette.fontHeading, color: palette.primary }}
            >
              Waktu & Tempat
            </h3>

            <div className="grid grid-cols-4 gap-2 w-full max-w-xs mb-6">
              {[
                { val: timeLeft.days, label: "Hari" },
                { val: timeLeft.hours, label: "Jam" },
                { val: timeLeft.minutes, label: "Menit" },
                { val: timeLeft.seconds, label: "Detik" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg p-2.5 border bg-white/60 backdrop-blur-sm shadow-xs"
                  style={{ borderColor: "rgba(0, 0, 0, 0.06)" }}
                >
                  <span className="text-xl font-bold block" style={{ color: palette.primary }}>
                    {String(item.val).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider" style={{ color: palette.secondary }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full max-w-xs space-y-3 text-left">
              <div
                className="rounded-lg p-4 border bg-white/60 shadow-xs"
                style={{ borderColor: "rgba(0, 0, 0, 0.06)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" style={{ color: palette.accent }} />
                  <h4 className="text-sm font-bold" style={{ color: palette.primary }}>
                    {event.akadTitle}
                  </h4>
                </div>
                <p className="text-xs font-semibold mb-1" style={{ color: palette.accent }}>
                  {event.akadTime}
                </p>
                <p className="text-xs font-medium" style={{ color: palette.text }}>
                  {event.akadVenue}
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: palette.secondary }}>
                  {event.akadAddress}
                </p>
              </div>

              <div
                className="rounded-lg p-4 border bg-white/60 shadow-xs"
                style={{ borderColor: "rgba(0, 0, 0, 0.06)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" style={{ color: palette.accent }} />
                  <h4 className="text-sm font-bold" style={{ color: palette.primary }}>
                    {event.resepsiTitle}
                  </h4>
                </div>
                <p className="text-xs font-semibold mb-1" style={{ color: palette.accent }}>
                  {event.resepsiTime}
                </p>
                <p className="text-xs font-medium" style={{ color: palette.text }}>
                  {event.resepsiVenue}
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: palette.secondary }}>
                  {event.resepsiAddress}
                </p>
              </div>
            </div>
          </div>
        )}

        {screen.type === "location" && (
          <div className="flex-1 flex flex-col items-center justify-center w-full my-auto">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: palette.fontHeading, color: palette.primary }}
            >
              Lokasi Acara
            </h3>

            <div
              className="w-full max-w-xs rounded-xl border p-5 bg-white/60 shadow-xs mb-6 text-left"
              style={{ borderColor: "rgba(0, 0, 0, 0.06)" }}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: palette.accent }} />
                <div>
                  <h4 className="text-sm font-bold mb-1" style={{ color: palette.primary }}>
                    {event.resepsiVenue}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: palette.secondary }}>
                    {event.resepsiAddress}
                  </p>
                </div>
              </div>
            </div>

            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="h-10 px-6 rounded-md text-white text-xs font-semibold tracking-wide shadow-md active:scale-[0.98] transition flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: palette.primary }}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Buka Maps</span>
            </a>
          </div>
        )}

        {screen.type === "gallery" && (
          <div className="flex-1 flex flex-col items-center justify-center w-full my-auto">
            <h3
              className="text-2xl font-bold mb-6"
              style={{ fontFamily: palette.fontHeading, color: palette.primary }}
            >
              Galeri Foto
            </h3>

            <div className="grid grid-cols-2 gap-2.5 w-full max-w-xs">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden h-36 border shadow-xs hover:scale-[1.02] transition"
                  style={{ borderColor: "rgba(0, 0, 0, 0.08)" }}
                >
                  <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {screen.type === "gift" && (
          <div className="flex-1 flex flex-col items-center justify-center w-full my-auto">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: palette.fontHeading, color: palette.primary }}
            >
              Tanda Kasih
            </h3>
            <p className="text-xs max-w-xs mb-6 leading-relaxed" style={{ color: palette.secondary }}>
              Doa restu Anda merupakan karunia terindah bagi kami. Bagi yang ingin memberikan tanda kasih:
            </p>

            <div className="w-full max-w-xs space-y-3">
              {banks.map((b) => (
                <div
                  key={b.id}
                  className="rounded-lg p-3.5 border bg-white/70 shadow-xs flex items-center justify-between text-left"
                  style={{ borderColor: "rgba(0, 0, 0, 0.06)" }}
                >
                  <div>
                    <span className="text-xs font-bold block" style={{ color: palette.primary }}>
                      {b.bankName}
                    </span>
                    <span className="text-sm font-semibold tracking-wider block font-mono" style={{ color: palette.text }}>
                      {b.accountNumber}
                    </span>
                    <span className="text-[11px] block mt-0.5" style={{ color: palette.secondary }}>
                      a.n {b.holderName}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(b.id, b.accountNumber);
                    }}
                    className="h-9 px-3 rounded-md border text-[11px] font-semibold flex items-center gap-1 active:scale-[0.98] transition cursor-pointer"
                    style={{
                      borderColor: palette.primary,
                      color: palette.primary,
                      backgroundColor: copiedBankId === b.id ? "rgba(45, 90, 70, 0.1)" : "transparent",
                    }}
                  >
                    {copiedBankId === b.id ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {screen.type === "rsvp" && (
          <div className="flex-1 flex flex-col items-center justify-center w-full my-auto">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: palette.fontHeading, color: palette.primary }}
            >
              Konfirmasi Hadir
            </h3>

            <form onSubmit={handleRsvpSubmit} className="w-full max-w-xs space-y-2 mb-4 text-left">
              <input
                type="text"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full h-9 px-3 rounded-md border text-xs bg-white/70 outline-none"
                style={{ borderColor: "rgba(0, 0, 0, 0.1)", color: palette.text }}
              />
              <select
                value={rsvpStatus}
                onChange={(e) => setRsvpStatus(e.target.value)}
                className="w-full h-9 px-2 rounded-md border text-xs bg-white/70 outline-none cursor-pointer"
                style={{ borderColor: "rgba(0, 0, 0, 0.1)", color: palette.text }}
              >
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
                <option value="Ragu-Ragu">Ragu-Ragu</option>
              </select>
              <textarea
                required
                value={rsvpMessage}
                onChange={(e) => setRsvpMessage(e.target.value)}
                placeholder="Ucapan & Doa Restu"
                rows={2}
                className="w-full p-2.5 rounded-md border text-xs bg-white/70 outline-none resize-none"
                style={{ borderColor: "rgba(0, 0, 0, 0.1)", color: palette.text }}
              />
              <button
                type="submit"
                className="w-full h-9 rounded-md text-white text-xs font-semibold tracking-wide shadow-sm active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-1.5"
                style={{ backgroundColor: palette.primary }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Kirim</span>
              </button>
            </form>

            <div className="w-full max-w-xs max-h-32 overflow-y-auto space-y-2 text-left pr-1">
              {wishes.slice(0, 3).map((w) => (
                <div
                  key={w.id}
                  className="rounded-md p-2.5 border bg-white/50 text-xs"
                  style={{ borderColor: "rgba(0, 0, 0, 0.05)" }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[11px]" style={{ color: palette.primary }}>
                      {w.sender}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-emerald-600/10 text-emerald-700">
                      {w.attendance}
                    </span>
                  </div>
                  <p className="text-[11px] leading-tight" style={{ color: palette.text }}>
                    {w.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 flex items-center justify-between w-full border-t border-black/5 text-[10px] text-slate-400">
          <span>{screen.title}</span>
          <span>412 x 892 px</span>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleAudio}
        className="absolute bottom-4 right-4 z-30 w-10 h-10 rounded-full border flex items-center justify-center shadow-lg bg-slate-900/90 hover:bg-slate-800 transition active:scale-95 cursor-pointer"
        style={{ borderColor: palette.accent }}
        title={isPlaying ? "Matikan Musik" : "Putar Musik"}
      >
        <div
          className={`w-7 h-7 rounded-full border border-amber-400/50 flex items-center justify-center ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "3s" }}
        >
          <div className="w-2.5 h-2.5 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.accent }}>
            <div className="w-1 h-1 rounded-full bg-slate-900" />
          </div>
        </div>
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center">
            <Music className="w-3 h-3 text-amber-300 animate-pulse" />
          </span>
        )}
      </button>
    </div>
  );
};
