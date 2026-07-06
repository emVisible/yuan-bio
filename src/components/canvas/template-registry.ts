import type { ReactNode } from "react";
import type { BiodataFormData, CardTemplateId, Locale, ResumeTemplateId } from "@/lib/types";
import type { CardElementPrefs } from "@/lib/card-element-prefs";
import type { SectionPrefs } from "@/lib/types";
import type { BlockId, BlockRect, CardBlockId, CardLayoutSettings, LayoutSettings } from "@/lib/layout-settings";
import { CARD_THEMES, type CardTheme } from "@/lib/card-themes";
import { RESUME_THEMES, type TemplateTheme } from "@/lib/template-themes";
import {
  CARD_TEMPLATE_PRESETS,
  RESUME_TEMPLATE_PRESETS,
  type CardLayoutPreset,
  type ResumeLayoutPreset,
} from "@/lib/canvas/presets";

export interface CardBlockContext {
  data: BiodataFormData;
  locale: Locale;
  layout: CardLayoutSettings;
  rect: BlockRect;
  elementPrefs: CardElementPrefs;
}

export interface ResumeBlockContext {
  data: BiodataFormData;
  locale: Locale;
  sectionPrefs: SectionPrefs;
  layout: LayoutSettings;
  rect: BlockRect;
}

export interface CardTemplateEntry {
  theme: CardTheme;
  preset: CardLayoutPreset;
  /** Block content renderers — implemented in CardCanvasEngine. */
  blocks?: Partial<Record<CardBlockId, (ctx: CardBlockContext) => ReactNode>>;
  decorations?: (ctx: CardBlockContext & { templateId: CardTemplateId }) => ReactNode;
}

export interface ResumeTemplateEntry {
  theme: TemplateTheme;
  preset: ResumeLayoutPreset;
  blocks?: Partial<Record<BlockId, (ctx: ResumeBlockContext) => ReactNode>>;
  decorations?: (ctx: ResumeBlockContext & { templateId: ResumeTemplateId }) => ReactNode;
}

export const CARD_TEMPLATE_REGISTRY: Record<CardTemplateId, CardTemplateEntry> = {
  minimal: { theme: CARD_THEMES.minimal, preset: CARD_TEMPLATE_PRESETS.minimal },
  classic: { theme: CARD_THEMES.classic, preset: CARD_TEMPLATE_PRESETS.classic },
  split: { theme: CARD_THEMES.split, preset: CARD_TEMPLATE_PRESETS.split },
  polaroid: { theme: CARD_THEMES.polaroid, preset: CARD_TEMPLATE_PRESETS.polaroid },
  bold: { theme: CARD_THEMES.bold, preset: CARD_TEMPLATE_PRESETS.bold },
  banner: { theme: CARD_THEMES.banner, preset: CARD_TEMPLATE_PRESETS.banner },
  showcase: { theme: CARD_THEMES.showcase, preset: CARD_TEMPLATE_PRESETS.showcase },
  stripe: { theme: CARD_THEMES.stripe, preset: CARD_TEMPLATE_PRESETS.stripe },
  ledger: { theme: CARD_THEMES.ledger, preset: CARD_TEMPLATE_PRESETS.ledger },
};

export const RESUME_TEMPLATE_REGISTRY: Record<ResumeTemplateId, ResumeTemplateEntry> = {
  minimal: { theme: RESUME_THEMES.minimal, preset: RESUME_TEMPLATE_PRESETS.minimal.preset },
  traditional: { theme: RESUME_THEMES.traditional, preset: RESUME_TEMPLATE_PRESETS.traditional.preset },
  modern: { theme: RESUME_THEMES.modern, preset: RESUME_TEMPLATE_PRESETS.modern.preset },
  elegant: { theme: RESUME_THEMES.elegant, preset: RESUME_TEMPLATE_PRESETS.elegant.preset },
  sidebar: { theme: RESUME_THEMES.sidebar, preset: RESUME_TEMPLATE_PRESETS.sidebar.preset },
  magazine: { theme: RESUME_THEMES.magazine, preset: RESUME_TEMPLATE_PRESETS.magazine.preset },
  timeline: { theme: RESUME_THEMES.timeline, preset: RESUME_TEMPLATE_PRESETS.timeline.preset },
  corporate: { theme: RESUME_THEMES.corporate, preset: RESUME_TEMPLATE_PRESETS.corporate.preset },
  warm: { theme: RESUME_THEMES.warm, preset: RESUME_TEMPLATE_PRESETS.warm.preset },
};
