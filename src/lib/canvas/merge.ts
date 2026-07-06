import { BIODATA_PAGE_HEIGHT } from "../biodata-page";
import { normalizeAspectRatio, normalizeExportWidth } from "../card-dimensions";
import type {
  BlockId,
  BlockRect,
  CardBlockId,
  CardLayoutSettings,
  LayoutSettings,
  Typography,
} from "../layout-settings";
import {
  DEFAULT_CARD_TYPOGRAPHY,
  DEFAULT_TYPOGRAPHY,
  GRID_SIZE,
} from "../layout-settings";
import type { CardTemplateId, ResumeTemplateId } from "../types";
import {
  CARD_BLOCK_ORDER,
  defaultCanvasBehavior,
  cardPageSpec,
  resumePageSpec,
  type CanvasDocument,
  type CanvasMode,
  RESUME_BLOCK_ORDER,
} from "./document";
import { ensureBlockHeights, presetCardBlocks, presetResumeBlocks } from "./presets";

/** Migrate legacy combined `extra` block into separate background + family blocks. */
function migrateResumeBlocks(
  blocks: Record<string, BlockRect>,
  defaults: Record<BlockId, BlockRect>,
): Record<string, BlockRect> {
  const raw = { ...blocks };
  const legacy = raw.extra;
  if (legacy && !raw.background && !raw.family) {
    raw.background = { ...legacy };
    const gap = 12;
    raw.family = {
      ...defaults.family,
      x: defaults.family?.x ?? legacy.x,
      y: (legacy.y ?? 0) + (legacy.h ?? 120) + gap,
      w: defaults.family?.w ?? defaults.about?.w ?? legacy.w,
      h: defaults.family?.h ?? legacy.h,
    };
    delete raw.extra;
  }
  return raw;
}

export function layoutSettingsToCanvas(layout: LayoutSettings): CanvasDocument {
  const page = resumePageSpec();
  return {
    mode: "resume",
    ...page,
    blocks: { ...layout.blocks },
    blockOrder: [...RESUME_BLOCK_ORDER],
    typography: { ...layout.typography },
    gridSize: layout.gridSize ?? GRID_SIZE,
    blockGap: layout.blockGap ?? defaultCanvasBehavior().blockGap,
    blockPadding: layout.blockPadding ?? defaultCanvasBehavior().blockPadding,
    handleHeight: layout.handleHeight ?? defaultCanvasBehavior().handleHeight,
    preventOverlap: layout.preventOverlap ?? false,
    resizable: layout.resizable ?? true,
  };
}

export function cardLayoutSettingsToCanvas(layout: CardLayoutSettings): CanvasDocument {
  const page = cardPageSpec();
  return {
    mode: "card",
    ...page,
    blocks: { ...layout.blocks },
    blockOrder: [...CARD_BLOCK_ORDER],
    typography: { ...layout.typography },
    gridSize: GRID_SIZE,
    blockGap: layout.blockGap,
    blockPadding: layout.blockPadding,
    handleHeight: layout.handleHeight ?? defaultCanvasBehavior().handleHeight,
    preventOverlap: layout.preventOverlap ?? false,
    resizable: layout.resizable ?? true,
    aspectRatio: layout.aspectRatio,
    exportWidth: layout.exportWidth,
  };
}

export function canvasToLayoutSettings(doc: CanvasDocument): LayoutSettings {
  return {
    blocks: doc.blocks as Record<BlockId, BlockRect>,
    typography: { ...doc.typography },
    gridSize: doc.gridSize,
    blockGap: doc.blockGap,
    blockPadding: doc.blockPadding,
    handleHeight: doc.handleHeight,
    preventOverlap: doc.preventOverlap,
    resizable: doc.resizable,
  };
}

export function canvasToCardLayoutSettings(doc: CanvasDocument): CardLayoutSettings {
  return {
    typography: { ...doc.typography },
    photoSize: 140,
    padding: doc.margin,
    aspectRatio: doc.aspectRatio ?? "3:2",
    exportWidth: doc.exportWidth ?? 480,
    gridSize: doc.gridSize,
    blockGap: doc.blockGap,
    blockPadding: doc.blockPadding,
    handleHeight: doc.handleHeight,
    preventOverlap: doc.preventOverlap,
    resizable: doc.resizable,
    blocks: doc.blocks as Record<CardBlockId, BlockRect>,
  };
}

export function defaultCanvasDocument(
  mode: CanvasMode,
  templateId: ResumeTemplateId | CardTemplateId,
  typography?: Typography,
): CanvasDocument {
  const behavior = defaultCanvasBehavior();
  if (mode === "card") {
    const page = cardPageSpec();
    const blocks = presetCardBlocks(templateId as CardTemplateId);
    return {
      mode: "card",
      ...page,
      blocks,
      blockOrder: [...CARD_BLOCK_ORDER],
      typography: typography ?? { ...DEFAULT_CARD_TYPOGRAPHY },
      ...behavior,
    };
  }
  const page = resumePageSpec();
  const blocks = presetResumeBlocks(templateId as ResumeTemplateId);
  return {
    mode: "resume",
    ...page,
    blocks,
    blockOrder: [...RESUME_BLOCK_ORDER],
    typography: typography ?? { ...DEFAULT_TYPOGRAPHY },
    ...behavior,
  };
}

export function mergeCanvasDocument(
  saved: Partial<CanvasDocument> | undefined,
  mode: CanvasMode,
  templateId: ResumeTemplateId | CardTemplateId,
): CanvasDocument {
  const base = defaultCanvasDocument(mode, templateId, saved?.typography);
  if (!saved) return base;

  const defaults =
    mode === "card"
      ? presetCardBlocks(templateId as CardTemplateId)
      : presetResumeBlocks(templateId as ResumeTemplateId);

  const mergedBlocks = ensureBlockHeights(
    migrateResumeBlocks(
      { ...base.blocks, ...saved.blocks } as Record<string, BlockRect>,
      defaults as Record<BlockId, BlockRect>,
    ),
    defaults as Record<string, BlockRect>,
  );

  return {
    ...base,
    ...saved,
    blocks: mergedBlocks,
    typography: { ...base.typography, ...saved.typography },
    gridSize: saved.gridSize ?? base.gridSize,
    blockGap: saved.blockGap ?? base.blockGap,
    blockPadding: saved.blockPadding ?? base.blockPadding,
    handleHeight: saved.handleHeight ?? base.handleHeight,
    preventOverlap: saved.preventOverlap ?? base.preventOverlap,
    resizable: saved.resizable ?? base.resizable,
    aspectRatio: saved.aspectRatio ?? base.aspectRatio,
    exportWidth: saved.exportWidth ?? base.exportWidth,
  };
}

export function mergeResumeLayout(
  saved: Partial<LayoutSettings> | undefined,
  templateId: ResumeTemplateId,
): LayoutSettings {
  const savedCanvas = saved
    ? layoutSettingsToCanvas({
        blocks: (saved.blocks ?? presetResumeBlocks(templateId)) as Record<BlockId, BlockRect>,
        typography: saved.typography ?? DEFAULT_TYPOGRAPHY,
        gridSize: saved.gridSize ?? GRID_SIZE,
        blockGap: saved.blockGap ?? defaultCanvasBehavior().blockGap,
        blockPadding: saved.blockPadding ?? defaultCanvasBehavior().blockPadding,
        handleHeight: saved.handleHeight ?? defaultCanvasBehavior().handleHeight,
        preventOverlap: saved.preventOverlap ?? false,
        resizable: saved.resizable ?? true,
      })
    : undefined;
  return canvasToLayoutSettings(mergeCanvasDocument(savedCanvas, "resume", templateId));
}

export function mergeCardLayout(
  saved: Partial<CardLayoutSettings> | undefined,
  templateId: CardTemplateId,
): CardLayoutSettings {
  const savedCanvas = saved
    ? cardLayoutSettingsToCanvas({
        typography: saved.typography ?? DEFAULT_CARD_TYPOGRAPHY,
        photoSize: saved.photoSize ?? 140,
        padding: saved.padding ?? cardPageSpec().margin,
        aspectRatio: saved.aspectRatio ?? "3:2",
        exportWidth: saved.exportWidth ?? 480,
        gridSize: saved.gridSize ?? GRID_SIZE,
        blockGap: saved.blockGap ?? defaultCanvasBehavior().blockGap,
        blockPadding: saved.blockPadding ?? defaultCanvasBehavior().blockPadding,
        handleHeight: saved.handleHeight ?? defaultCanvasBehavior().handleHeight,
        preventOverlap: saved.preventOverlap ?? false,
        resizable: saved.resizable ?? true,
        blocks: (saved.blocks ?? presetCardBlocks(templateId)) as Record<CardBlockId, BlockRect>,
      })
    : undefined;
  return canvasToCardLayoutSettings(mergeCanvasDocument(savedCanvas, "card", templateId));
}

export function defaultResumeLayout(templateId: ResumeTemplateId): LayoutSettings {
  return canvasToLayoutSettings(defaultCanvasDocument("resume", templateId));
}

export function defaultCardLayout(templateId: CardTemplateId): CardLayoutSettings {
  return canvasToCardLayoutSettings(defaultCanvasDocument("card", templateId));
}
