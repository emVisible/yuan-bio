import type { CardLayoutSettings } from "./layout-settings";
import type { BlockRect, CardBlockId } from "./layout-settings";
import { scaleBlock, unscaleBlock } from "./canvas/transform";

/** Landscape-first ratios common for social profile cards */
export type CardAspectRatio = "3:2" | "16:9" | "5:3" | "2:1" | "1:1";

export const CARD_ASPECT_RATIOS: CardAspectRatio[] = ["3:2", "16:9", "5:3", "2:1", "1:1"];

export const CARD_EXPORT_WIDTHS = [320, 400, 480, 560, 640, 800] as const;

export type CardExportWidth = (typeof CARD_EXPORT_WIDTHS)[number];

const LEGACY_RATIO_MAP: Record<string, CardAspectRatio> = {
  "4:5": "3:2",
  "5:4": "3:2",
  "9:16": "16:9",
  "3:4": "3:2",
};

export function normalizeAspectRatio(ratio: string | undefined): CardAspectRatio {
  if (ratio && CARD_ASPECT_RATIOS.includes(ratio as CardAspectRatio)) {
    return ratio as CardAspectRatio;
  }
  return LEGACY_RATIO_MAP[ratio ?? ""] ?? "3:2";
}

export function normalizeExportWidth(width: number | undefined): CardExportWidth {
  if (!width) return 480;
  const sorted = [...CARD_EXPORT_WIDTHS];
  let best: CardExportWidth = sorted[0];
  for (const w of sorted) {
    best = w;
    if (w >= width) break;
  }
  return best;
}

export function parseAspectRatio(ratio: CardAspectRatio): { w: number; h: number } {
  const [w, h] = ratio.split(":").map(Number);
  return { w, h };
}

export function cardPixelSize(
  aspectRatio: CardAspectRatio,
  exportWidth: number,
): { width: number; height: number } {
  const { w, h } = parseAspectRatio(aspectRatio);
  return {
    width: exportWidth,
    height: Math.round((exportWidth * h) / w),
  };
}

export function cardSizeFromLayout(layout: CardLayoutSettings): { width: number; height: number } {
  return cardPixelSize(layout.aspectRatio, layout.exportWidth);
}

export function isA4Size(width: number, height: number): boolean {
  return width === 595 && height === 842;
}

export const CARD_LAYOUT_REF_WIDTH = 480;
export const CARD_LAYOUT_REF_HEIGHT = 320;
export const CARD_MARGIN = 24;

export function scaleCardBlock(rect: BlockRect, width: number, height: number): BlockRect {
  return scaleBlock(rect, CARD_LAYOUT_REF_WIDTH, CARD_LAYOUT_REF_HEIGHT, width, height);
}

export function unscaleCardBlock(rect: BlockRect, width: number, height: number): BlockRect {
  return unscaleBlock(rect, CARD_LAYOUT_REF_WIDTH, CARD_LAYOUT_REF_HEIGHT, width, height);
}

export function scaleCardBlocks(
  blocks: Record<CardBlockId, BlockRect>,
  width: number,
  height: number,
): Record<CardBlockId, BlockRect> {
  return {
    photo: scaleCardBlock(blocks.photo, width, height),
    header: scaleCardBlock(blocks.header, width, height),
    body: scaleCardBlock(blocks.body, width, height),
    contact: scaleCardBlock(blocks.contact, width, height),
  };
}
