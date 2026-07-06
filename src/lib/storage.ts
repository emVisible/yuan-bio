import { normalizeGender } from "./gender";
import { migrateContacts } from "./contacts";
import {
  mergeCardLayout,
  mergeResumeLayout,
} from "./layout-settings";
import { applyCanvasFlush } from "./canvas/reflow-state";
import { getSampleBiodata } from "./sample-data";
import { DEFAULT_CARD_ELEMENT_PREFS } from "./card-element-prefs";
import { DEFAULT_SECTION_PREFS } from "./section-prefs";
import {
  EMPTY_BIODATA,
  STORAGE_KEY,
  type BiodataFormData,
  type BiodataState,
  type CardTemplateId,
  type Locale,
  type ResumeTemplateId,
} from "./types";

const LEGACY_STORAGE_KEY = "matchbiodata-draft-v1";

function normalizeData(data: BiodataFormData & {
  wechat?: string;
  email?: string;
  phone?: string;
}): BiodataFormData {
  return {
    ...EMPTY_BIODATA,
    ...data,
    gender: normalizeGender(data.gender),
    contacts: migrateContacts(data),
  };
}

function migrateLegacyDraft(raw: Record<string, unknown>): BiodataState {
  const resumeTemplateId = (raw.resumeTemplateId ??
    raw.templateId ??
    "traditional") as ResumeTemplateId;
  const cardTemplateId = (raw.cardTemplateId ?? "minimal") as CardTemplateId;
  const data = normalizeData(raw.data as BiodataFormData & {
    wechat?: string;
    email?: string;
    phone?: string;
  });

  const locale = (raw.locale as Locale) ?? "zh";
  const sectionPrefs = { ...DEFAULT_SECTION_PREFS, ...(raw.sectionPrefs as object) };
  const cardElementPrefs = {
    ...DEFAULT_CARD_ELEMENT_PREFS,
    ...(raw.cardElementPrefs as object),
  };

  return withReflowedResume({
    data,
    resumeTemplateId,
    cardTemplateId,
    locale,
    sectionPrefs,
    cardElementPrefs,
    resumeLayout: mergeResumeLayout(
      (raw.resumeLayout ?? raw.layoutSettings) as Parameters<typeof mergeResumeLayout>[0],
      resumeTemplateId,
    ),
    cardLayout: mergeCardLayout(
      raw.cardLayout as Parameters<typeof mergeCardLayout>[0],
      cardTemplateId,
    ),
  });
}

function withReflowedResume(state: BiodataState): BiodataState {
  return applyCanvasFlush(state);
}

export function loadDraft(): BiodataState | null {
  if (typeof window === "undefined") return null;
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    }
    if (!raw) return null;
    return migrateLegacyDraft(JSON.parse(raw) as Record<string, unknown>);
  } catch {
    return null;
  }
}

export function saveDraft(state: BiodataState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}

export function createDefaultState(locale: Locale = "zh"): BiodataState {
  const resumeTemplateId: ResumeTemplateId = "minimal";
  const cardTemplateId: CardTemplateId = "minimal";
  return withReflowedResume({
    data: { ...EMPTY_BIODATA },
    resumeTemplateId,
    cardTemplateId,
    locale,
    sectionPrefs: { ...DEFAULT_SECTION_PREFS },
    cardElementPrefs: { ...DEFAULT_CARD_ELEMENT_PREFS },
    resumeLayout: mergeResumeLayout(undefined, resumeTemplateId),
    cardLayout: mergeCardLayout(undefined, cardTemplateId),
  });
}

export function mergeFormData(
  current: BiodataFormData,
  patch: Partial<BiodataFormData>,
): BiodataFormData {
  return { ...current, ...patch };
}

export function readInitialLocale(): Locale {
  if (typeof window === "undefined") return "zh";
  const saved = localStorage.getItem("matchbiodata-locale");
  return saved === "en" ? "en" : "zh";
}

export function readInitialState(): BiodataState {
  const locale = readInitialLocale();
  const draft = loadDraft();
  if (draft) {
    return { ...draft, locale, data: normalizeData(draft.data) };
  }
  const resumeTemplateId: ResumeTemplateId = "traditional";
  const cardTemplateId: CardTemplateId = "minimal";
  return withReflowedResume({
    data: normalizeData(getSampleBiodata(locale)),
    resumeTemplateId,
    cardTemplateId,
    locale,
    sectionPrefs: { ...DEFAULT_SECTION_PREFS },
    cardElementPrefs: { ...DEFAULT_CARD_ELEMENT_PREFS },
    resumeLayout: mergeResumeLayout(undefined, resumeTemplateId),
    cardLayout: mergeCardLayout(undefined, cardTemplateId),
  });
}

export { STORAGE_KEY } from "./types";
