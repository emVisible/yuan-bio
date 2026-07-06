import type { CardTemplateId, ResumeTemplateId } from "./types";
import {
  defaultCardLayout,
  defaultResumeLayout,
  mergeCardLayout,
  mergeResumeLayout,
} from "./canvas/merge";
import { presetCardBlocks, presetResumeBlocks } from "./canvas/presets";
import type { CardAspectRatio } from "./card-dimensions";
import {
  DEFAULT_BLOCK_GAP,
  DEFAULT_BLOCK_PADDING,
  DEFAULT_HANDLE_HEIGHT,
  DEFAULT_GRID_SIZE,
} from "./canvas/document";

export type BlockId =
  | "header"
  | "photo"
  | "details"
  | "background"
  | "family"
  | "about"
  | "partner"
  | "contact";

export interface BlockRect {
  x: number;
  y: number;
  w: number;
  h?: number;
}

export interface Typography {
  nameSize: number;
  bodySize: number;
  labelSize: number;
  lineHeight: number;
}

/** Shared canvas interaction fields (resume + card). */
export interface CanvasBehavior {
  gridSize: number;
  blockGap: number;
  blockPadding: number;
  handleHeight: number;
  preventOverlap: boolean;
  resizable: boolean;
}

export interface LayoutSettings extends CanvasBehavior {
  blocks: Record<BlockId, BlockRect>;
  typography: Typography;
}

export type CardBlockId = "photo" | "header" | "body" | "contact";

export interface CardLayoutSettings extends CanvasBehavior {
  typography: Typography;
  photoSize: number;
  padding: number;
  aspectRatio: CardAspectRatio;
  exportWidth: number;
  blocks: Record<CardBlockId, BlockRect>;
}

export const GRID_SIZE = DEFAULT_GRID_SIZE;

export const DEFAULT_TYPOGRAPHY: Typography = {
  nameSize: 28,
  bodySize: 11,
  labelSize: 10,
  lineHeight: 1.45,
};

export const DEFAULT_CARD_TYPOGRAPHY: Typography = {
  nameSize: 32,
  bodySize: 13,
  labelSize: 10,
  lineHeight: 1.4,
};

export function snapToGrid(value: number, grid: number = GRID_SIZE): number {
  return Math.round(value / grid) * grid;
}

export {
  defaultResumeLayout,
  defaultCardLayout,
  mergeResumeLayout,
  mergeCardLayout,
  presetCardBlocks,
  presetResumeBlocks,
  DEFAULT_BLOCK_GAP,
  DEFAULT_BLOCK_PADDING,
  DEFAULT_HANDLE_HEIGHT,
};

/** @deprecated */
export function defaultLayoutForTemplate(templateId: ResumeTemplateId): LayoutSettings {
  return defaultResumeLayout(templateId);
}

/** @deprecated */
export function mergeLayout(
  saved: Partial<LayoutSettings> | undefined,
  templateId: ResumeTemplateId,
): LayoutSettings {
  return mergeResumeLayout(saved, templateId);
}
