/** @deprecated Import from @/lib/canvas/geometry */
export {
  contentBox as blockContentSize,
  rectsOverlap,
  clampRect as clampCardRect,
  BLOCK_MIN_W as CARD_BLOCK_MIN_W,
  BLOCK_MIN_H as CARD_BLOCK_MIN_H,
} from "./canvas/geometry";

export {
  DEFAULT_HANDLE_HEIGHT as CARD_DRAG_HANDLE_HEIGHT,
  DEFAULT_BLOCK_GAP as DEFAULT_CARD_BLOCK_GAP,
  DEFAULT_BLOCK_PADDING as DEFAULT_CARD_BLOCK_PADDING,
} from "./canvas/document";

export {
  presetCardBlocks as filledCardBlocks,
  CARD_TEMPLATE_PRESETS as CARD_LAYOUT_PRESETS,
  ensureBlockHeights as ensureCardBlockHeights,
} from "./canvas/presets";

export type { CardLayoutPreset } from "./canvas/presets";
