export interface SectionPrefs {
  background: boolean;
  family: boolean;
  income: boolean;
  hobbies: boolean;
  partnerExpectations: boolean;
}

export const DEFAULT_SECTION_PREFS: SectionPrefs = {
  background: true,
  family: true,
  income: false,
  hobbies: true,
  partnerExpectations: true,
};

export type EditorMode = "resume" | "card";

/** @deprecated use EditorMode */
export type PreviewMode = EditorMode;
