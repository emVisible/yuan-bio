import type { CardLayoutSettings, LayoutSettings } from "./layout-settings";
import { defaultCardLayout, defaultResumeLayout } from "./layout-settings";
import type { SectionPrefs } from "./section-prefs";
import { DEFAULT_SECTION_PREFS } from "./section-prefs";
import type { CardElementPrefs } from "./card-element-prefs";
import { DEFAULT_CARD_ELEMENT_PREFS } from "./card-element-prefs";

export type ResumeTemplateId =
  | "minimal"
  | "traditional"
  | "modern"
  | "elegant"
  | "sidebar"
  | "magazine"
  | "timeline"
  | "corporate"
  | "warm";

export type CardTemplateId =
  | "minimal"
  | "classic"
  | "split"
  | "polaroid"
  | "bold"
  | "banner"
  | "showcase"
  | "stripe"
  | "ledger";

/** @deprecated use ResumeTemplateId */
export type TemplateId = ResumeTemplateId;

export type Locale = "zh" | "en";

export type ContactPreset =
  | "wechat"
  | "email"
  | "phone"
  | "whatsapp"
  | "line"
  | "instagram"
  | "telegram"
  | "custom";

export interface ContactEntry {
  id: string;
  preset: ContactPreset;
  customLabel?: string;
  value: string;
}

export type { SectionPrefs };
export { DEFAULT_SECTION_PREFS };

export interface BiodataFormData {
  name: string;
  gender: string;
  birthYear: string;
  height: string;
  city: string;
  country: string;
  hometown: string;
  languages: string;
  visaStatus: string;
  education: string;
  school: string;
  occupation: string;
  employer: string;
  incomeRange: string;
  parents: string;
  siblings: string;
  aboutMe: string;
  hobbies: string;
  partnerExpectations: string;
  contacts: ContactEntry[];
  photoDataUrl: string;
}

export interface BiodataState {
  data: BiodataFormData;
  resumeTemplateId: ResumeTemplateId;
  cardTemplateId: CardTemplateId;
  locale: Locale;
  sectionPrefs: SectionPrefs;
  cardElementPrefs: CardElementPrefs;
  resumeLayout: LayoutSettings;
  cardLayout: CardLayoutSettings;
}

export const EMPTY_BIODATA: BiodataFormData = {
  name: "",
  gender: "",
  birthYear: "",
  height: "",
  city: "",
  country: "",
  hometown: "",
  languages: "",
  visaStatus: "",
  education: "",
  school: "",
  occupation: "",
  employer: "",
  incomeRange: "",
  parents: "",
  siblings: "",
  aboutMe: "",
  hobbies: "",
  partnerExpectations: "",
  contacts: [],
  photoDataUrl: "",
};

export const STORAGE_KEY = "matchbiodata-draft-v2";

export { defaultResumeLayout, defaultCardLayout };
