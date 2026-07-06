import type { BlockRect } from "../layout-settings";
import { snapToGrid } from "../layout-settings";
import { DEFAULT_BLOCK_PADDING, DEFAULT_HANDLE_HEIGHT } from "./document";

export const BLOCK_MIN_W = 72;
export const BLOCK_MIN_H = 56;

export function rectHeight(rect: BlockRect, fallback = BLOCK_MIN_H): number {
  return rect.h ?? fallback;
}

export function rectsOverlap(a: BlockRect, b: BlockRect, gap: number): boolean {
  const ah = rectHeight(a);
  const bh = rectHeight(b);
  return !(
    a.x + a.w + gap <= b.x ||
    b.x + b.w + gap <= a.x ||
    a.y + ah + gap <= b.y ||
    b.y + bh + gap <= a.y
  );
}

export function clampRect(
  rect: BlockRect,
  pageWidth: number,
  pageHeight: number,
  margin: number,
  minW = BLOCK_MIN_W,
  minH = BLOCK_MIN_H,
): BlockRect {
  const h = rectHeight(rect, minH);
  const w = Math.max(minW, Math.min(rect.w, pageWidth - margin * 2));
  const height = Math.max(minH, Math.min(h, pageHeight - margin * 2));
  const x = Math.max(margin, Math.min(rect.x, pageWidth - w - margin));
  const y = Math.max(margin, Math.min(rect.y, pageHeight - height - margin));
  return { x, y, w, h: height };
}

export function snapRect(rect: BlockRect, gridSize: number): BlockRect {
  return {
    x: snapToGrid(rect.x, gridSize),
    y: snapToGrid(rect.y, gridSize),
    w: snapToGrid(rect.w, gridSize),
    h: rect.h !== undefined ? snapToGrid(rect.h, gridSize) : undefined,
  };
}

export function contentBox(
  rect: BlockRect,
  padding: number = DEFAULT_BLOCK_PADDING,
  handleHeight: number = DEFAULT_HANDLE_HEIGHT,
): { width: number; height: number } {
  const h = rectHeight(rect);
  return {
    width: Math.max(16, rect.w - padding * 2),
    height: Math.max(16, h - handleHeight - padding * 2),
  };
}

export function applyBlockChange(
  candidate: BlockRect,
  peers: BlockRect[],
  opts: {
    pageWidth: number;
    pageHeight: number;
    margin: number;
    gridSize: number;
    blockGap: number;
    preventOverlap: boolean;
  },
): BlockRect | null {
  const clamped = clampRect(candidate, opts.pageWidth, opts.pageHeight, opts.margin);
  const snapped = snapRect(clamped, opts.gridSize);
  if (opts.preventOverlap) {
    for (const peer of peers) {
      if (rectsOverlap(snapped, peer, opts.blockGap)) return null;
    }
  }
  return snapped;
}
