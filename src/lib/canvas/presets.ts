import type { BlockRect, BlockId, CardBlockId } from "../layout-settings";
import { PAGE_MARGIN } from "../biodata-page";
import { CARD_MARGIN } from "../card-dimensions";
import { PAGE_INNER_HEIGHT, PAGE_INNER_WIDTH, CARD_INNER_HEIGHT, CARD_INNER_WIDTH } from "../layout-margins";
import type { CardTemplateId, ResumeTemplateId } from "../types";
import { DEFAULT_BLOCK_GAP } from "./document";

export type CardLayoutPreset = "grid-2x2" | "split-left" | "banner-columns" | "top-heavy";

export type ResumeLayoutPreset = "standard" | "traditional" | "classical" | "magazine";

const PHOTO_RATIO = 5 / 4;

function filledCardBlocks(preset: CardLayoutPreset): Record<CardBlockId, BlockRect> {
  const M = CARD_MARGIN;
  const IW = CARD_INNER_WIDTH;
  const IH = CARD_INNER_HEIGHT;
  const G = DEFAULT_BLOCK_GAP;

  switch (preset) {
    case "split-left": {
      const photoW = Math.floor(IW * 0.38);
      const rightW = IW - photoW - G;
      const rightX = M + photoW + G;
      const rowH = Math.floor((IH - 2 * G) / 3);
      return {
        photo: { x: M, y: M, w: photoW, h: IH },
        header: { x: rightX, y: M, w: rightW, h: rowH },
        body: { x: rightX, y: M + rowH + G, w: rightW, h: rowH },
        contact: { x: rightX, y: M + 2 * (rowH + G), w: rightW, h: rowH },
      };
    }
    case "banner-columns": {
      const colW = Math.floor((IW - 2 * G) / 3);
      const x1 = M;
      const x2 = M + colW + G;
      const x3 = M + 2 * (colW + G);
      const halfH = Math.floor((IH - G) / 2);
      return {
        photo: { x: x1, y: M, w: colW, h: IH },
        header: { x: x2, y: M, w: colW, h: halfH },
        body: { x: x2, y: M + halfH + G, w: colW, h: halfH },
        contact: { x: x3, y: M, w: colW, h: IH },
      };
    }
    case "top-heavy": {
      const photoW = Math.floor(IW * 0.34);
      const leftW = IW - photoW - G;
      const photoH = Math.floor(IH * 0.42);
      const rowH = Math.floor((IH - 2 * G) / 3);
      return {
        photo: { x: M + leftW + G, y: M, w: photoW, h: photoH },
        header: { x: M, y: M, w: leftW, h: rowH },
        body: { x: M, y: M + rowH + G, w: IW, h: rowH },
        contact: { x: M, y: M + 2 * (rowH + G), w: leftW, h: rowH },
      };
    }
    default: {
      const colW = Math.floor((IW - G) / 2);
      const rowH = Math.floor((IH - G) / 2);
      return {
        photo: { x: M, y: M, w: colW, h: rowH },
        header: { x: M + colW + G, y: M, w: colW, h: rowH },
        body: { x: M, y: M + rowH + G, w: colW, h: rowH },
        contact: { x: M + colW + G, y: M + rowH + G, w: colW, h: rowH },
      };
    }
  }
}

function filledResumeBlocks(preset: ResumeLayoutPreset, opts?: { photoW?: number; headerW?: number }): Record<BlockId, BlockRect> {
  const M = PAGE_MARGIN;
  const IW = PAGE_INNER_WIDTH;
  const IH = PAGE_INNER_HEIGHT;
  const G = DEFAULT_BLOCK_GAP;
  const photoW = opts?.photoW ?? 100;
  const headerW = opts?.headerW ?? IW - photoW - G;
  const colW = Math.floor((IW - G) / 2);
  const headerH = 120;
  const photoH = Math.round(photoW * 1.25);
  const rowH = Math.floor((IH - headerH - G * 5) / 5);

  if (preset === "classical") {
    const photoW = opts?.photoW ?? 96;
    const photoH = Math.round(photoW * PHOTO_RATIO);
    const headerH = 108;
    const bodyY = M + headerH + G;
    const rowH = Math.floor((IH - headerH - G * 5) / 5);
    return {
      header: { x: M, y: M + 16, w: IW - photoW - G, h: headerH },
      photo: { x: M + IW - photoW, y: M + 20, w: photoW, h: photoH },
      details: { x: M, y: bodyY, w: colW, h: rowH },
      background: { x: M + colW + G, y: bodyY, w: colW, h: rowH },
      family: { x: M, y: bodyY + rowH + G, w: IW, h: rowH },
      about: { x: M, y: bodyY + 2 * (rowH + G), w: IW, h: rowH },
      partner: { x: M, y: bodyY + 3 * (rowH + G), w: IW, h: rowH },
      contact: { x: M, y: M + IH - rowH, w: IW, h: rowH },
    };
  }

  if (preset === "traditional") {
    const aboutW = IW - photoW - G;
    const rowH = Math.floor((IH - headerH - G * 5) / 5);
    const aboutY = M + headerH + 3 * G + 2 * rowH;
    return {
      header: { x: M, y: M + 8, w: IW, h: headerH },
      photo: { x: M + aboutW + G, y: aboutY, w: photoW, h: photoH },
      details: { x: M, y: M + headerH + G, w: colW, h: rowH },
      background: { x: M + colW + G, y: M + headerH + G, w: colW, h: rowH },
      family: { x: M, y: M + headerH + 2 * G + rowH, w: IW, h: rowH },
      about: { x: M, y: aboutY, w: aboutW, h: rowH },
      partner: { x: M, y: M + headerH + 4 * G + 3 * rowH, w: IW, h: rowH },
      contact: { x: M, y: M + IH - rowH, w: IW, h: rowH },
    };
  }
  if (preset === "magazine") {
    const mastH = 108;
    const bodyY = M + mastH + G;
    const bodyRowH = Math.floor((IH - mastH - G * 4) / 4);
    return {
      header: { x: M, y: M, w: IW, h: mastH },
      photo: { x: M + IW - photoW - 12, y: M + 14, w: photoW, h: Math.min(photoH, mastH - 28) },
      details: { x: M, y: bodyY, w: colW, h: bodyRowH },
      background: { x: M + colW + G, y: bodyY, w: colW, h: bodyRowH },
      family: { x: M, y: bodyY + bodyRowH + G, w: IW, h: bodyRowH },
      about: { x: M, y: bodyY + 2 * (bodyRowH + G), w: IW, h: bodyRowH },
      partner: { x: M, y: bodyY + 3 * (bodyRowH + G), w: IW, h: bodyRowH },
      contact: { x: M, y: M + IH - bodyRowH, w: IW, h: bodyRowH },
    };
  }

  return {
    header: { x: M, y: M + 8, w: headerW, h: headerH },
    photo: { x: M + IW - photoW, y: M, w: photoW, h: photoH },
    details: { x: M, y: M + headerH + G, w: colW, h: rowH },
    background: { x: M + colW + G, y: M + headerH + G, w: colW, h: rowH },
    family: { x: M, y: M + headerH + 2 * G + rowH, w: IW, h: rowH },
    about: { x: M, y: M + headerH + 3 * G + 2 * rowH, w: IW, h: rowH },
    partner: { x: M, y: M + headerH + 4 * G + 3 * rowH, w: IW, h: rowH },
    contact: { x: M, y: M + IH - rowH, w: IW, h: rowH },
  };
}

export const CARD_TEMPLATE_PRESETS: Record<CardTemplateId, CardLayoutPreset> = {
  minimal: "grid-2x2",
  classic: "grid-2x2",
  stripe: "grid-2x2",
  ledger: "grid-2x2",
  polaroid: "grid-2x2",
  split: "split-left",
  bold: "split-left",
  banner: "banner-columns",
  showcase: "grid-2x2",
};

export const RESUME_TEMPLATE_PRESETS: Record<
  ResumeTemplateId,
  { preset: ResumeLayoutPreset; photoW?: number; headerW?: number }
> = {
  minimal: { preset: "standard" },
  traditional: { preset: "traditional" },
  modern: { preset: "standard", photoW: 108, headerW: 300 },
  elegant: { preset: "standard", photoW: 96, headerW: 320 },
  sidebar: { preset: "classical", photoW: 96 },
  magazine: { preset: "magazine" },
  timeline: { preset: "standard" },
  corporate: { preset: "standard", photoW: 96, headerW: 324 },
  warm: { preset: "standard", photoW: 104, headerW: 308 },
};

export function presetCardBlocks(templateId: CardTemplateId): Record<CardBlockId, BlockRect> {
  return filledCardBlocks(CARD_TEMPLATE_PRESETS[templateId]);
}

export function presetResumeBlocks(templateId: ResumeTemplateId): Record<BlockId, BlockRect> {
  const spec = RESUME_TEMPLATE_PRESETS[templateId];
  return filledResumeBlocks(spec.preset, { photoW: spec.photoW, headerW: spec.headerW });
}

export function ensureBlockHeights<T extends string>(
  blocks: Record<T, BlockRect>,
  defaults: Record<T, BlockRect>,
): Record<T, BlockRect> {
  const out = { ...blocks } as Record<T, BlockRect>;
  for (const id of Object.keys(defaults) as T[]) {
    out[id] = { ...defaults[id], ...blocks[id], h: blocks[id]?.h ?? defaults[id].h };
  }
  return out;
}
