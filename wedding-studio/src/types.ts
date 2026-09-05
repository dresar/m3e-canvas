export interface ThemePalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  fontHeading: string;
  fontBody: string;
}

export interface CoupleProfile {
  groomName: string;
  groomNick: string;
  groomParents: string;
  groomInstagram?: string;
  groomPhoto: string;
  brideName: string;
  brideNick: string;
  brideParents: string;
  brideInstagram?: string;
  bridePhoto: string;
}

export interface EventDetails {
  date: string;
  targetTimestamp: string;
  akadTitle: string;
  akadTime: string;
  akadVenue: string;
  akadAddress: string;
  resepsiTitle: string;
  resepsiTime: string;
  resepsiVenue: string;
  resepsiAddress: string;
  mapsUrl: string;
  mapsEmbedUrl?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  holderName: string;
}

export interface WishItem {
  id: string;
  sender: string;
  attendance: "Hadir" | "Tidak Hadir" | "Ragu-Ragu";
  message: string;
  createdAt: string;
}

export type ScreenType = 
  | "cover" 
  | "quote" 
  | "profile" 
  | "countdown" 
  | "location" 
  | "gallery" 
  | "gift" 
  | "rsvp";

export interface ScreenData {
  id: string;
  type: ScreenType;
  title: string;
  subtitle?: string;
  bgTexture?: string;
  ornamentTop?: string;
  ornamentBottom?: string;
}

export interface WeddingProject {
  title: string;
  slug: string;
  guestName: string;
  quote: string;
  quoteSource: string;
  palette: ThemePalette;
  couple: CoupleProfile;
  event: EventDetails;
  banks: BankAccount[];
  qrisImage?: string;
  galleryImages: string[];
  audioUrl: string;
  audioTitle: string;
  screens: ScreenData[];
  wishes: WishItem[];
}
