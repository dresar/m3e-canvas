import assetsDb from "../data/assets_database.json";
import { WeddingProject } from "../types";

const DEFAULT_HOLVER_KEY = import.meta.env.VITE_HOLVER_API_KEY || "";
const API_URL = "https://api.holver.web.id/v1/chat/completions";
const MODEL_NAME = "gemini-3.7-flash";

export function getStoredApiKey(): string {
  if (typeof window === "undefined") return DEFAULT_HOLVER_KEY;
  const saved = localStorage.getItem("wedding_studio_ai_key");
  if (saved && saved.trim().length > 5) return saved.trim();
  return DEFAULT_HOLVER_KEY;
}

export function setStoredApiKey(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("wedding_studio_ai_key", key.trim());
  }
}

export async function generateWeddingProject(userPrompt: string, customApiKey?: string): Promise<Partial<WeddingProject>> {
  const apiKey = customApiKey || getStoredApiKey();

  const themesSummary = assetsDb.themes.map((t) => `${t.id} (${t.name}): primary ${t.primary}, secondary ${t.secondary}, accent ${t.accent}`).join("\n");
  const ornamentsSummary = assetsDb.ornaments.map((o) => `${o.id}: ${o.name} (${o.url})`).join("\n");
  const texturesSummary = assetsDb.backgrounds.map((b) => `${b.id}: ${b.name} (${b.url})`).join("\n");

  const systemPrompt = `You are a world-class luxury wedding invitation designer and copywriter.
Generate a structured Indonesian wedding invitation JSON payload based on the user's request.
Strictly return ONLY a valid, parseable JSON object with NO markdown code fences and NO commentary.

Available Themes:
${themesSummary}

Available Ornaments:
${ornamentsSummary}

Available Backgrounds:
${texturesSummary}

JSON schema requirement:
{
  "title": "The Wedding of Groom & Bride",
  "themeId": "sage-botanical | royal-gold | blush-romance | rustic-earth | midnight-navy",
  "quote": "Spiritual Quranic verse or romantic quote in Indonesian",
  "quoteSource": "Ar-Rum: 21 or author",
  "couple": {
    "groomName": "Full Groom Name with Title",
    "groomNick": "Groom Nickname",
    "groomParents": "Putra dari Bpk. ... & Ibu ...",
    "groomInstagram": "@groom",
    "brideName": "Full Bride Name with Title",
    "brideNick": "Bride Nickname",
    "brideParents": "Putri dari Bpk. ... & Ibu ...",
    "brideInstagram": "@bride"
  },
  "event": {
    "date": "Minggu, 25 Oktober 2026",
    "targetTimestamp": "2026-10-25T08:00:00",
    "akadTitle": "Akad Nikah",
    "akadTime": "08:00 - 10:00 WIB",
    "akadVenue": "Masjid / Gedung Name",
    "akadAddress": "Full Street Address",
    "resepsiTitle": "Resepsi Pernikahan",
    "resepsiTime": "11:00 - 14:00 WIB",
    "resepsiVenue": "Ballroom / Venue Name",
    "resepsiAddress": "Full Street Address",
    "mapsUrl": "https://maps.google.com"
  },
  "banks": [
    {
      "bankName": "BCA",
      "accountNumber": "1234567890",
      "holderName": "Nama Pemilik"
    },
    {
      "bankName": "Mandiri",
      "accountNumber": "9876543210",
      "holderName": "Nama Pemilik"
    }
  ]
}`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`AI API Error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content || "";
  const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
  
  return JSON.parse(cleaned);
}
