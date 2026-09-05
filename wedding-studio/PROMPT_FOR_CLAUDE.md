# Instruksi untuk Claude Code CLI di Wedding Studio

Halo Claude! 

Anda berada di direktori `c:\Users\NCN0C\Music\m3e-canvas\wedding-studio`.
Tugas Anda adalah:
1. **Analisis Forensik Template Referensi `adat-batak/`**:
   - Baca dan pelajari file `adat-batak/ASSET_FORENSIC_REPORT.md`, `adat-batak/component-map.json`, `adat-batak/interaction-map.json`, dan `adat-batak/index.html`.
   - Perhatikan struktur fixed virtual canvas (414x736), penataan frame (`frame-tm.webp`, `frame-bm.webp`), motif adat (`ulos.webp`, `rumah-adat.webp`), dan musik latar (`tobadream-theme-song-viky-sianipar.mp3`).

2. **Perkaya Fitur & Animasi pada Wedding Builder**:
   - Manfaatkan tool animasi lengkap yang sudah terpasang di `package.json`:
     * `framer-motion` untuk transisi layout dan spring physics.
     * `gsap` untuk timeline dan stagger animation.
     * `canvas-confetti` untuk efek ledakan confetti mewah saat klik "Buka Undangan".
     * `party-js` untuk efek partikel kilau / taburan bunga.
     * `howler` untuk kontrol audio musik latar dengan fade-in otomatis.
     * `swiper` untuk touch slider galeri foto 13 slot.
     * `lottie-web` untuk vektor animasi cincin/bunga.
   - Sambungkan template Adat Batak ke dalam pilihan tema studio di `src/data/assets_database.json` dan `src/App.tsx`.
   - Pastikan export standalone ZIP tetap berfungsi mulus menghasilkan `index.html`, `style.css`, dan `script.js` mandiri.

3. **Aturan Standar**:
   - **Strict Nokomen (`/nokomen`)**: 0 komentar di dalam kode sumber produksi.
   - **Microcopy (`/ui-ux-text`)**: Placeholder max 1 kata, tombol 1-2 kata.
   - **Button Precision (`/button-presisi`)**: Tinggi 32-38px, `rounded-md` s/d `rounded-lg`, no pill `rounded-full`.
   - Jalankan `npm run build` dan pastikan Exit Code 0.
