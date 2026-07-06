import type { CardAspectRatio } from "../card-dimensions";
import type { BlockRect, Typography } from "../layout-settings";
import { BIODATA_PAGE_HEIGHT, BIODATA_PAGE_WIDTH, PAGE_MARGIN } from "../biodata-page";
import {
  CARD_LAYOUT_REF_HEIGHT,
  CARD_LAYOUT_REF_WIDTH,
  CARD_MARGIN,
} from "../card-dimensions";

export type CanvasMode = "resume" | "card";

export const DEFAULT_HANDLE_HEIGHT = 24;
export const DEFAULT_BLOCK_GAP = 12;
export const DEFAULT_BLOCK_PADDING = 8;
export const DEFAULT_GRID_SIZE = 8;

export interface CanvasDocument {
  mode: CanvasMode;
  pageWidth: number;
  pageHeight: number;
  margin: number;
  blocks: Record<string, BlockRect>;
  blockOrder: string[];
  typography: Typography;
  gridSize: number;
  blockGap: number;
  blockPadding: number;
  handleHeight: number;
  preventOverlap: boolean;
  resizable: boolean;
  aspectRatio?: CardAspectRatio;
  exportWidth?: number;
}

export const RESUME_BLOCK_ORDER = [
  "header",
  "photo",
  "details",
  "background",
  "family",
  "about",
  "partner",
  "contact",
] as const;

export const CARD_BLOCK_ORDER = ["photo", "header", "body", "contact"] as const;

export function resumePageSpec() {
  return {
    pageWidth: BIODATA_PAGE_WIDTH,
    pageHeight: BIODATA_PAGE_HEIGHT,
    margin: PAGE_MARGIN,
  };
}

export function cardPageSpec() {
  return {
    pageWidth: CARD_LAYOUT_REF_WIDTH,
    pageHeight: CARD_LAYOUT_REF_HEIGHT,
    margin: CARD_MARGIN,
  };
}

export function defaultCanvasBehavior() {
  return {
    gridSize: DEFAULT_GRID_SIZE,
    blockGap: DEFAULT_BLOCK_GAP,
    blockPadding: DEFAULT_BLOCK_PADDING,
    handleHeight: DEFAULT_HANDLE_HEIGHT,
    preventOverlap: false,
    resizable: true,
  };
}
