import { BIODATA_PAGE_HEIGHT, BIODATA_PAGE_WIDTH, PAGE_MARGIN } from "./biodata-page";
import { CARD_LAYOUT_REF_HEIGHT, CARD_LAYOUT_REF_WIDTH, CARD_MARGIN } from "./card-dimensions";
import type { BlockId, BlockRect } from "./layout-settings";

export const PAGE_INNER_WIDTH = BIODATA_PAGE_WIDTH - PAGE_MARGIN * 2;
export const PAGE_INNER_HEIGHT = BIODATA_PAGE_HEIGHT - PAGE_MARGIN * 2;
export const CARD_INNER_WIDTH = CARD_LAYOUT_REF_WIDTH - CARD_MARGIN * 2;
export const CARD_INNER_HEIGHT = CARD_LAYOUT_REF_HEIGHT - CARD_MARGIN * 2;

/** Standard two-column resume block layout inside page margins. */
export function standardResumeBlocks(opts?: {
  photoW?: number;
  headerW?: number;
  colGap?: number;
}): Record<BlockId, BlockRect> {
  const M = PAGE_MARGIN;
  const IW = PAGE_INNER_WIDTH;
  const photoW = opts?.photoW ?? 100;
  const headerW = opts?.headerW ?? IW - photoW - 16;
  const colW = Math.floor((IW - 12) / 2);

  return {
    header: { x: M, y: M + 8, w: headerW },
    photo: { x: M + IW - photoW, y: M, w: photoW },
    details: { x: M, y: M + 156, w: colW },
    background: { x: M + colW + 12, y: M + 156, w: colW },
    family: { x: M, y: M + 280, w: IW },
    about: { x: M, y: M + 348, w: IW },
    partner: { x: M, y: M + 488, w: IW },
    contact: { x: M, y: M + 680, w: IW },
  };
}
