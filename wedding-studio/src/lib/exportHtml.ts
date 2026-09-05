import JSZip from "jszip";
import { saveAs } from "file-saver";
import { WeddingProject } from "../types";

export function generateHtmlCode(project: WeddingProject): string {
  const { title, couple, event, palette, quote, quoteSource, banks, audioUrl } = project;

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${title}</title>
  <meta name="description" content="Pernikahan ${couple.groomNick} & ${couple.brideNick}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js"></script>
</head>
<body>
  <div class="invitation-container" id="app">
    <!-- Screen 1: Cover Envelope -->
    <section class="screen-section active" id="screen-cover">
      <div class="envelope-card">
        <div class="wax-seal">
          <span>${couple.groomNick[0]}&${couple.brideNick[0]}</span>
        </div>
        <p class="envelope-subtitle">THE WEDDING OF</p>
        <h1 class="couple-title">${couple.groomNick} & ${couple.brideNick}</h1>
        <div class="recipient-box">
          <p class="recipient-label">Kepada Yth:</p>
          <h3 class="recipient-name" id="guest-name-display">Tamu Undangan</h3>
        </div>
        <button class="btn-primary" id="btn-open-invitation">
          Buka Undangan
        </button>
      </div>
    </section>

    <!-- Main Content Flow -->
    <main id="main-flow" class="flow-hidden">
      <!-- Screen 2: Quote -->
      <section class="screen-section" id="screen-quote">
        <div class="card-content">
          <div class="ornament-top"></div>
          <p class="quote-text">"${quote}"</p>
          <span class="quote-source">— ${quoteSource}</span>
          <div class="ornament-bottom"></div>
        </div>
      </section>

      <!-- Screen 3: Mempelai Profile -->
      <section class="screen-section" id="screen-profile">
        <div class="card-content">
          <h2 class="section-title">Mempelai</h2>
          <div class="profile-card">
            <div class="avatar-frame">
              <img src="${couple.groomPhoto}" alt="${couple.groomName}" loading="lazy">
            </div>
            <h3 class="person-name">${couple.groomName}</h3>
            <p class="person-desc">${couple.groomParents}</p>
            ${couple.groomInstagram ? `<a href="https://instagram.com/${couple.groomInstagram.replace('@', '')}" target="_blank" class="social-link">${couple.groomInstagram}</a>` : ''}
          </div>
          <div class="divider-ampersand">&</div>
          <div class="profile-card">
            <div class="avatar-frame">
              <img src="${couple.bridePhoto}" alt="${couple.brideName}" loading="lazy">
            </div>
            <h3 class="person-name">${couple.brideName}</h3>
            <p class="person-desc">${couple.brideParents}</p>
            ${couple.brideInstagram ? `<a href="https://instagram.com/${couple.brideInstagram.replace('@', '')}" target="_blank" class="social-link">${couple.brideInstagram}</a>` : ''}
          </div>
        </div>
      </section>

      <!-- Screen 4: Countdown & Schedule -->
      <section class="screen-section" id="screen-schedule">
        <div class="card-content">
          <h2 class="section-title">Waktu & Tempat</h2>
          <div class="countdown-grid" id="countdown-timer" data-target="${event.targetTimestamp}">
            <div class="countdown-box"><span class="num" id="cd-days">00</span><span class="lbl">Hari</span></div>
            <div class="countdown-box"><span class="num" id="cd-hours">00</span><span class="lbl">Jam</span></div>
            <div class="countdown-box"><span class="num" id="cd-minutes">00</span><span class="lbl">Menit</span></div>
            <div class="countdown-box"><span class="num" id="cd-seconds">00</span><span class="lbl">Detik</span></div>
          </div>
          
          <div class="event-card">
            <h3 class="event-title">${event.akadTitle}</h3>
            <p class="event-time">${event.akadTime}</p>
            <p class="event-venue">${event.akadVenue}</p>
            <p class="event-address">${event.akadAddress}</p>
          </div>

          <div class="event-card">
            <h3 class="event-title">${event.resepsiTitle}</h3>
            <p class="event-time">${event.resepsiTime}</p>
            <p class="event-venue">${event.resepsiVenue}</p>
            <p class="event-address">${event.resepsiAddress}</p>
          </div>

          <a href="${event.mapsUrl}" target="_blank" class="btn-primary btn-block">
            Buka Maps
          </a>
        </div>
      </section>

      <!-- Screen 5: Digital Gift -->
      <section class="screen-section" id="screen-gift">
        <div class="card-content">
          <h2 class="section-title">Tanda Kasih</h2>
          <p class="section-subtitle">Doa restu Anda merupakan karunia terindah bagi kami. Bagi yang ingin memberikan tanda kasih:</p>
          <div class="bank-list">
            ${banks.map(b => `
              <div class="bank-card">
                <div class="bank-info">
                  <span class="bank-name">${b.bankName}</span>
                  <span class="bank-number" id="acc-${b.id}">${b.accountNumber}</span>
                  <span class="bank-holder">a.n ${b.holderName}</span>
                </div>
                <button class="btn-copy" onclick="copyAccount('${b.accountNumber}', this)">
                  Salin
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Screen 6: RSVP & Wishes -->
      <section class="screen-section" id="screen-rsvp">
        <div class="card-content">
          <h2 class="section-title">Konfirmasi Hadir</h2>
          <form id="rsvp-form" class="form-container">
            <input type="text" id="rsvp-name" placeholder="Nama" required class="input-field">
            <select id="rsvp-status" class="input-field">
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
              <option value="Ragu-Ragu">Ragu-Ragu</option>
            </select>
            <textarea id="rsvp-message" placeholder="Ucapan" rows="3" required class="input-field"></textarea>
            <button type="submit" class="btn-primary btn-block">Kirim</button>
          </form>

          <div class="wishes-feed" id="wishes-list">
            <div class="wish-item">
              <div class="wish-header">
                <strong>Dimas & Sekar</strong>
                <span class="badge-hadir">Hadir</span>
              </div>
              <p class="wish-text">Selamat menempuh hidup baru, semoga bahagia selalu!</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Floating Turntable Audio Player -->
    <div class="floating-turntable" id="audio-widget">
      <audio id="bg-audio" loop preload="none">
        <source src="${audioUrl}" type="audio/mp3">
      </audio>
      <div class="vinyl-disc paused" id="vinyl-disc">
        <div class="vinyl-core"></div>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>`;
}

export function generateCssCode(project: WeddingProject): string {
  const { palette } = project;

  return `:root {
  --primary: ${palette.primary};
  --secondary: ${palette.secondary};
  --accent: ${palette.accent};
  --bg: ${palette.background};
  --card: ${palette.card};
  --text: ${palette.text};
  --font-heading: '${palette.fontHeading}', serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.invitation-container {
  width: 100%;
  max-width: 412px;
  min-height: 100vh;
  background-color: var(--bg);
  position: relative;
  overflow-x: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.screen-section {
  padding: 48px 24px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.envelope-card {
  background: var(--card);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 40px 24px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.wax-seal {
  width: 54px;
  height: 54px;
  background: var(--accent);
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 24px;
  font-family: var(--font-heading);
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.envelope-subtitle {
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--secondary);
  margin-bottom: 8px;
}

.couple-title {
  font-family: var(--font-heading);
  font-size: 32px;
  color: var(--primary);
  margin-bottom: 32px;
  line-height: 1.2;
}

.recipient-box {
  background: var(--bg);
  border: 1px dashed var(--secondary);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 32px;
}

.recipient-label {
  font-size: 12px;
  color: var(--secondary);
  margin-bottom: 4px;
}

.recipient-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
}

.btn-primary {
  background: var(--primary);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease;
  display: inline-block;
  text-decoration: none;
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-block {
  width: 100%;
  display: block;
}

.flow-hidden {
  display: none;
}

.card-content {
  background: var(--card);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 32px 20px;
  width: 100%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
}

.section-title {
  font-family: var(--font-heading);
  font-size: 26px;
  color: var(--primary);
  margin-bottom: 24px;
}

.section-subtitle {
  font-size: 12px;
  color: var(--secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

.quote-text {
  font-style: italic;
  font-size: 14px;
  line-height: 1.8;
  color: var(--text);
  margin-bottom: 16px;
}

.quote-source {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
}

.profile-card {
  margin-bottom: 16px;
}

.avatar-frame {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 12px;
  border: 3px solid var(--accent);
}

.avatar-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.person-name {
  font-family: var(--font-heading);
  font-size: 20px;
  color: var(--primary);
  margin-bottom: 4px;
}

.person-desc {
  font-size: 12px;
  color: var(--secondary);
  line-height: 1.4;
}

.social-link {
  display: inline-block;
  font-size: 11px;
  color: var(--accent);
  text-decoration: none;
  margin-top: 4px;
}

.divider-ampersand {
  font-family: var(--font-heading);
  font-size: 24px;
  color: var(--accent);
  margin: 12px 0;
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 24px;
}

.countdown-box {
  background: var(--bg);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 8px 4px;
}

.countdown-box .num {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
  display: block;
}

.countdown-box .lbl {
  font-size: 10px;
  color: var(--secondary);
  text-transform: uppercase;
}

.event-card {
  background: var(--bg);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  text-align: left;
}

.event-title {
  font-family: var(--font-heading);
  font-size: 16px;
  color: var(--primary);
  margin-bottom: 4px;
}

.event-time {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 8px;
}

.event-venue {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 2px;
}

.event-address {
  font-size: 11px;
  color: var(--secondary);
  line-height: 1.4;
}

.bank-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bank-card {
  background: var(--bg);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.bank-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  display: block;
}

.bank-number {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--text);
  display: block;
  margin: 2px 0;
}

.bank-holder {
  font-size: 11px;
  color: var(--secondary);
  display: block;
}

.btn-copy {
  background: var(--card);
  border: 1px solid var(--primary);
  color: var(--primary);
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-copy:active {
  transform: scale(0.98);
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.input-field {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  font-size: 12px;
  font-family: inherit;
  background: var(--bg);
  color: var(--text);
  outline: none;
}

.input-field:focus {
  border-color: var(--primary);
}

.wishes-feed {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 220px;
  overflow-y: auto;
}

.wish-item {
  background: var(--bg);
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 11px;
}

.wish-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.badge-hadir {
  background: rgba(45, 90, 70, 0.1);
  color: var(--primary);
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.floating-turntable {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  cursor: pointer;
}

.vinyl-disc {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle, #1a1a1a 40%, #333 42%, #111 60%, #444 62%, #1a1a1a 70%);
  border: 2px solid var(--accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: vinylSpin 6s linear infinite;
}

.vinyl-core {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
}

.paused {
  animation-play-state: paused !important;
}

@keyframes vinylSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
}

export function generateJsCode(): string {
  return `document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to');
  if (guestParam) {
    const guestElem = document.getElementById('guest-name-display');
    if (guestElem) guestElem.textContent = guestParam;
  }

  const btnOpen = document.getElementById('btn-open-invitation');
  const screenCover = document.getElementById('screen-cover');
  const mainFlow = document.getElementById('main-flow');
  const audio = document.getElementById('bg-audio');
  const vinyl = document.getElementById('vinyl-disc');
  const audioWidget = document.getElementById('audio-widget');

  btnOpen?.addEventListener('click', () => {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#8b1e1e', '#ffffff']
      });
    }
    anime({
      targets: screenCover,
      opacity: [1, 0],
      duration: 600,
      easing: 'easeInOutQuad',
      complete: () => {
        screenCover.style.display = 'none';
        mainFlow.classList.remove('flow-hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        audio?.play().then(() => {
          vinyl?.classList.remove('paused');
        }).catch(() => {});
      }
    });
  });

  audioWidget?.addEventListener('click', () => {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      vinyl?.classList.remove('paused');
    } else {
      audio.pause();
      vinyl?.classList.add('paused');
    }
  });

  const countdownElem = document.getElementById('countdown-timer');
  if (countdownElem) {
    const targetDate = new Date(countdownElem.dataset.target || '').getTime();
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        document.getElementById('cd-days').textContent = '00';
        document.getElementById('cd-hours').textContent = '00';
        document.getElementById('cd-minutes').textContent = '00';
        document.getElementById('cd-seconds').textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const dEl = document.getElementById('cd-days');
      const hEl = document.getElementById('cd-hours');
      const mEl = document.getElementById('cd-minutes');
      const sEl = document.getElementById('cd-seconds');

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
      if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  const rsvpForm = document.getElementById('rsvp-form');
  const wishesList = document.getElementById('wishes-list');

  rsvpForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('rsvp-name')).value;
    const status = (document.getElementById('rsvp-status')).value;
    const msg = (document.getElementById('rsvp-message')).value;

    const item = document.createElement('div');
    item.className = 'wish-item';
    item.innerHTML = \`
      <div class="wish-header">
        <strong>\${name}</strong>
        <span class="badge-hadir">\${status}</span>
      </div>
      <p class="wish-text">\${msg}</p>
    \`;

    wishesList?.prepend(item);
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    rsvpForm.reset();
  });
});

window.copyAccount = function(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.textContent;
    btn.textContent = 'Tersalin!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 1500);
  });
};
`;
}

export async function exportZipBundle(project: WeddingProject): Promise<void> {
  const zip = new JSZip();
  
  const html = generateHtmlCode(project);
  const css = generateCssCode(project);
  const js = generateJsCode();

  zip.file("index.html", html);
  zip.file("style.css", css);
  zip.file("script.js", js);

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${project.slug || "undangan-pernikahan"}.zip`);
}
