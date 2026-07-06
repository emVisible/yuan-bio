import type { BiodataFormData } from "../types";
import type { BlockRect, CardBlockId, CardLayoutSettings, LayoutSettings } from "../layout-settings";
import { filledContacts } from "../contacts";
import { CARD_MARGIN } from "../card-dimensions";
import { CARD_INNER_HEIGHT, CARD_INNER_WIDTH } from "../layout-margins";
import type { CardTemplateId } from "../types";
import {
  CARD_TEMPLATE_PRESETS,
  type CardLayoutPreset,
  presetCardBlocks,
} from "./presets";
import { reflowResumeLayout, type ReflowContext } from "./reflow";

const CARD_FLUSH_ORDER: CardBlockId[] = ["photo", "header", "body", "contact"];

function filledCardBlocks(preset: CardLayoutPreset): Record<CardBlockId, BlockRect> {
  const M = CARD_MARGIN;
  const IW = CARD_INNER_WIDTH;
  const IH = CARD_INNER_HEIGHT;
  const G = 12;

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

function stackCardBlocks(visibleIds: CardBlockId[], gap: number): Record<CardBlockId, BlockRect> {
  const ordered = CARD_FLUSH_ORDER.filter((id) => visibleIds.includes(id));
  const n = ordered.length;
  const M = CARD_MARGIN;
  const rowH = Math.floor((CARD_INNER_HEIGHT - (n - 1) * gap) / n);
  let y = M;
  const blocks = {} as Record<CardBlockId, BlockRect>;
  for (const id of ordered) {
    blocks[id] = { x: M, y, w: CARD_INNER_WIDTH, h: rowH };
    y += rowH + gap;
  }
  return blocks;
}

/** Layout card blocks for a subset of visible ids, preserving template style when possible. */
export function flushCardBlocksForVisible(
  templateId: CardTemplateId,
  visibleIds: CardBlockId[],
  gap = 12,
): Partial<Record<CardBlockId, BlockRect>> {
  const preset = CARD_TEMPLATE_PRESETS[templateId];
  const has = (id: CardBlockId) => visibleIds.includes(id);

  if (visibleIds.length === 1 && visibleIds[0] === "header") {
    return {
      header: { x: CARD_MARGIN, y: CARD_MARGIN, w: CARD_INNER_WIDTH, h: CARD_INNER_HEIGHT },
    };
  }

  if (visibleIds.length === 4) {
    return filledCardBlocks(preset);
  }

  const full = filledCardBlocks(preset);
  const M = CARD_MARGIN;
  const IW = CARD_INNER_WIDTH;
  const IH = CARD_INNER_HEIGHT;

  if (preset === "grid-2x2") {
    const colW = Math.floor((IW - gap) / 2);
    const rowH = Math.floor((IH - gap) / 2);

    if (visibleIds.length === 3 && has("photo") && has("header") && has("body") && !has("contact")) {
      return {
        photo: { x: M, y: M, w: colW, h: rowH },
        header: { x: M + colW + gap, y: M, w: colW, h: rowH },
        body: { x: M, y: M + rowH + gap, w: IW, h: rowH },
        contact: full.contact,
      };
    }

    if (visibleIds.length === 3 && has("header") && has("body") && has("contact") && !has("photo")) {
      return {
        photo: full.photo,
        header: { x: M, y: M, w: IW, h: rowH },
        body: { x: M, y: M + rowH + gap, w: colW, h: rowH },
        contact: { x: M + colW + gap, y: M + rowH + gap, w: colW, h: rowH },
      };
    }

    if (visibleIds.length === 2 && has("header") && has("body")) {
      const half = Math.floor((IH - gap) / 2);
      return {
        photo: full.photo,
        header: { x: M, y: M, w: IW, h: half },
        body: { x: M, y: M + half + gap, w: IW, h: half },
        contact: full.contact,
      };
    }

    if (visibleIds.length === 2 && has("photo") && has("header")) {
      return {
        photo: { x: M, y: M, w: colW, h: IH },
        header: { x: M + colW + gap, y: M, w: colW, h: IH },
        body: full.body,
        contact: full.contact,
      };
    }
  }

  if (preset === "split-left" && visibleIds.length === 3 && has("photo") && has("header") && has("body")) {
    const photoW = Math.floor(IW * 0.38);
    const rightW = IW - photoW - gap;
    const rightX = M + photoW + gap;
    const half = Math.floor((IH - gap) / 2);
    return {
      photo: { x: M, y: M, w: photoW, h: IH },
      header: { x: rightX, y: M, w: rightW, h: half },
      body: { x: rightX, y: M + half + gap, w: rightW, h: half },
      contact: full.contact,
    };
  }

  const stacked = stackCardBlocks(visibleIds, gap);
  const out = { ...presetCardBlocks(templateId) };
  for (const id of visibleIds) {
    out[id] = stacked[id];
  }
  return out;
}

export function flushCardLayout(
  layout: CardLayoutSettings,
  templateId: CardTemplateId,
  visibleIds: CardBlockId[],
): CardLayoutSettings {
  const flushed = flushCardBlocksForVisible(templateId, visibleIds, layout.blockGap);
  return {
    ...layout,
    blocks: { ...layout.blocks, ...flushed } as Record<CardBlockId, BlockRect>,
  };
}

/** Resume flush — tight auto layout with all content visible (preview / export). */
export function flushResumeLayout(layout: LayoutSettings, ctx: ReflowContext): LayoutSettings {
  return reflowResumeLayout(layout, { ...ctx, reserveEditChrome: false, flush: true });
}

export function cardHasFlushableContent(data: BiodataFormData): boolean {
  const hasMeta = [data.birthYear, data.gender, data.height, data.city, data.country].some((v) =>
    String(v ?? "").trim(),
  );
  return Boolean(
    hasMeta ||
      data.aboutMe?.trim() ||
      data.occupation?.trim() ||
      data.photoDataUrl ||
      filledContacts(data.contacts).length > 0,
  );
}
