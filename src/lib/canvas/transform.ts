import type { BlockRect } from "../layout-settings";
import type { CanvasDocument } from "./document";

export function scaleBlock(
  rect: BlockRect,
  refW: number,
  refH: number,
  displayW: number,
  displayH: number,
): BlockRect {
  const sx = displayW / refW;
  const sy = displayH / refH;
  return {
    x: Math.round(rect.x * sx),
    y: Math.round(rect.y * sy),
    w: Math.round(rect.w * sx),
    h: rect.h !== undefined ? Math.round(rect.h * sy) : undefined,
  };
}

export function unscaleBlock(
  rect: BlockRect,
  refW: number,
  refH: number,
  displayW: number,
  displayH: number,
): BlockRect {
  const sx = refW / displayW;
  const sy = refH / displayH;
  return {
    x: Math.round(rect.x * sx),
    y: Math.round(rect.y * sy),
    w: Math.round(rect.w * sx),
    h: rect.h !== undefined ? Math.round(rect.h * sy) : undefined,
  };
}

export function scaleDocument(
  doc: CanvasDocument,
  displayW: number,
  displayH: number,
): CanvasDocument {
  const scaledBlocks: Record<string, BlockRect> = {};
  for (const [id, rect] of Object.entries(doc.blocks)) {
    scaledBlocks[id] = scaleBlock(rect, doc.pageWidth, doc.pageHeight, displayW, displayH);
  }
  return { ...doc, blocks: scaledBlocks, pageWidth: displayW, pageHeight: displayH };
}

export function scaleBlocks(
  blocks: Record<string, BlockRect>,
  refW: number,
  refH: number,
  displayW: number,
  displayH: number,
): Record<string, BlockRect> {
  const out: Record<string, BlockRect> = {};
  for (const [id, rect] of Object.entries(blocks)) {
    out[id] = scaleBlock(rect, refW, refH, displayW, displayH);
  }
  return out;
}
