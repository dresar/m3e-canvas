# Wedding Studio — Claude Code CLI Master Instructions

Selamat datang di Wedding Studio (`c:\Users\NCN0C\Music\m3e-canvas\wedding-studio`).
Anda bertindak sebagai Autonomous Senior Fullstack & Creative Animation Engineer di bawah komando Eka Syarif Maulana.

## 🎯 MISI UTAMA
Menganalisis secara mendalam (reverse-engineer) template undangan pernikahan referensi di folder:
`c:\Users\NCN0C\Music\m3e-canvas\wedding-studio\adat-batak\`
(baca `ASSET_FORENSIC_REPORT.md`, `component-map.json`, `interaction-map.json`, dan `index.html`)
dan membangun Wedding Canvas Builder interaktif berkualitas tinggi, kaya animasi, dan 100% client-side (zero backend).

---

## 📦 PERLENGKAPAN TOOL & ANIMASI TERPASANG (`package.json`)
Gunakan kombinasi library animasi & UI yang telah terpasang untuk menciptakan efek visual memukau:
1. `framer-motion` (^12.4.7) — Smooth spring physics, layout animations, gesture controls.
2. `gsap` (^3.12.7) — Timelines, stagger reveals, smooth tweens, scroll effects.
3. `animejs` (^3.2.2) — SVG path morphing, micro-interactions, floating loops.
4. `canvas-confetti` (^1.9.4) — Ledakan confetti mewah saat tamu membuka undangan atau mengirim RSVP.
5. `party-js` (^2.2.0) — Partikel sparkles, falling ribbons, and heart bursts.
6. `howler` (^2.2.4) — Audio playback engine terpercaya dengan fade-in/fade-out dan penanganan browser autoplay policy.
7. `swiper` (^11.2.4) — Touch-friendly photo gallery slider & interactive carousel.
8. `lottie-web` (^5.12.2) — Vektor animasi Lottie (cincin kawin, bunga mekar, love seal).
9. `lucide-react` (^1.16.0) — Icon set presisi.
10. `tailwind-merge` & `clsx` — Dynamic utility styling.
11. `jszip` & `file-saver` — 1-click single bundle standalone export (`index.html`, `style.css`, `script.js`).

---

## 🏛️ STRUKTUR FORENSIK DARI `adat-batak/`
Struktur 6-layer z-index dan seksi yang harus diadopsi ke dalam builder:
- **Layer 0**: Background Texture (`bg.webp` / repeating pattern)
- **Layer 1**: Frame Borders (`frame-tm.webp`, `frame-bm.webp`)
- **Layer 2**: Corner / Edge Motifs (`ulos.webp`, `rumah-adat.webp`)
- **Layer 3**: Section Content:
  1. `opening_modal`: Modal pembuka dengan segel emas, nama tamu dinamis `?to=...`, tombol "Buka Undangan" (memicu audio autoplay + confetti).
  2. `ayat_salam`: Ayat suci / kutipan spiritual.
  3. `couple_profile`: Profil pengantin pria & wanita dengan foto bingkai dan bio keluarga.
  4. `event_schedule`: Jadwal Pemberkatan / Akad & Resepsi + Google Maps navigation.
  5. `gallery_slider`: Swiper.js photo gallery + click-to-zoom lightbox.
  6. `love_story_timeline`: Kisah perjalanan cinta (Pertama Bertemu, Lamaran, Menuju Pelaminan).
  7. `wedding_gift`: Tanda kasih digital (BCA / Mandiri / QRIS) dengan tombol "Salin" 1-klik (`navigator.clipboard`).
  8. `instagram_filter`: Tautan kamera filter Instagram pernikahan.
  9. `contact_person`: Narahubung WhatsApp.
  10. `rsvp_comments`: Form kehadiran & live stream ucapan doa.
- **Layer 4**: Floating Dock Navigation & Howler Audio Controller (`tobadream-theme-song-viky-sianipar.mp3`).

---

## 🤖 IN-BROWSER AI ENGINE (GEMINI 3.7 FLASH)
- Endpoint: `https://api.holver.web.id/v1/chat/completions`
- Model: `gemini-3.7-flash` (HANYA model tunggal ini, DILARANG combo).
- API Key: Disimpan aman di `.env.local` (`VITE_HOLVER_API_KEY`) dan dapat dikonfigurasi pengguna di `localStorage`.

---

## 📐 ATURAN KETAT (STRICT RULES)
1. **Strict Nokomen (`/nokomen`)**: Dilarang keras menulis komentar apapun di dalam kode sumber produksi.
2. **Microcopy Singkat (`/ui-ux-text`)**: Placeholder max 1 kata ("Nama", "Pesan", "Cari"). Tombol aksi 1–2 kata ("Simpan", "Buka Undangan", "Salin", "Unduh").
3. **Button & Card Precision (`/button-presisi`, `/precision-card-button-ui`)**:
   - Tinggi tombol/input: 32px - 38px.
   - Border radius: 6px - 10px (`rounded-md` s/d `rounded-lg`).
   - Dilarang keras tombol pill/kapsul bulat lonjong (`rounded-full`) pada tombol aksi standar.
   - Active micro-click: `active:scale-[0.98]`.
4. **Build Verification**: Setiap kali selesai mengedit atau menambahkan fitur, jalankan `npm run build` untuk memastikan 0 error.
