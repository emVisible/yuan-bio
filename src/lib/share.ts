import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { migrateContacts } from "./contacts";
import { mergeCardLayout, mergeResumeLayout } from "./layout-settings";
import { DEFAULT_CARD_ELEMENT_PREFS } from "./card-element-prefs";
import { DEFAULT_SECTION_PREFS } from "./section-prefs";
import type { BiodataState, CardTemplateId, ResumeTemplateId } from "./types";

const PREFIX = "v1.";

/** Share links exclude photos to keep URLs short and protect privacy. */
export function stateForShare(state: BiodataState): BiodataState {
  return {
    ...state,
    data: { ...state.data, photoDataUrl: "" },
  };
}

export function encodeSharePayload(state: BiodataState): string {
  const json = JSON.stringify(stateForShare(state));
  return PREFIX + compressToEncodedURIComponent(json);
}

export function decodeSharePayload(code: string): BiodataState | null {
  try {
    const raw = code.startsWith(PREFIX) ? code.slice(PREFIX.length) : code;
    const json = decompressFromEncodedURIComponent(raw);
    if (!json) return null;
    const parsed = JSON.parse(json) as Partial<BiodataState> & {
      templateId?: ResumeTemplateId;
      layoutSettings?: BiodataState["resumeLayout"];
    };
    if (!parsed.data) return null;

    const resumeTemplateId = (parsed.resumeTemplateId ??
      parsed.templateId ??
      "traditional") as ResumeTemplateId;
    const cardTemplateId = (parsed.cardTemplateId ?? "classic") as CardTemplateId;

    return {
      data: {
        ...parsed.data,
        contacts: migrateContacts(parsed.data),
      },
      resumeTemplateId,
      cardTemplateId,
      locale: parsed.locale ?? "zh",
      sectionPrefs: { ...DEFAULT_SECTION_PREFS, ...parsed.sectionPrefs },
      cardElementPrefs: {
        ...DEFAULT_CARD_ELEMENT_PREFS,
        ...parsed.cardElementPrefs,
      },
      resumeLayout: mergeResumeLayout(
        parsed.resumeLayout ?? parsed.layoutSettings,
        resumeTemplateId,
      ),
      cardLayout: mergeCardLayout(parsed.cardLayout, cardTemplateId),
    };
  } catch {
    return null;
  }
}

export function buildShareUrl(state: BiodataState, baseUrl: string): string {
  const encoded = encodeSharePayload(state);
  if (encoded.length > 6000) {
    throw new Error("share_too_long");
  }
  return `${baseUrl}/share/${encoded}`;
}

export function isShareUrlTooLong(state: BiodataState, baseUrl: string): boolean {
  try {
    return buildShareUrl(state, baseUrl).length > 6000;
  } catch {
    return true;
  }
}
