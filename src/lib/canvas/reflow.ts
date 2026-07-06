import { BIODATA_PAGE_HEIGHT } from "../biodata-page";
import type { BlockId, BlockRect, LayoutSettings, Typography } from "../layout-settings";
import { GRID_SIZE, snapToGrid } from "../layout-settings";
import type { ResumeTemplateId } from "../types";
import type { CanvasDocument } from "./document";
import { canvasToLayoutSettings, layoutSettingsToCanvas } from "./merge";

const PHOTO_RATIO = 5 / 4;

function rowHeight(ty: Typography): number {
  return Math.ceil(ty.bodySize * ty.lineHeight) + 6;
}

function sectionTitleExtra(ty: Typography): number {
  return Math.ceil(ty.labelSize * 1.6) + 14;
}

function rowsSectionHeight(rowCount: number, ty: Typography, flush = false): number {
  if (rowCount <= 0) return 0;
  return sectionTitleExtra(ty) + rowCount * rowHeight(ty) + 12 + (flush ? 8 : 0);
}

function textSectionHeight(
  text: string,
  width: number,
  ty: Typography,
  extraLines = 0,
  flush = false,
): number {
  if (!text?.trim() && extraLines <= 0) return 0;
  const charsPerLine = Math.max(16, Math.floor(width / (ty.bodySize * 0.52)));
  const lines = text?.trim() ? Math.ceil(text.length / charsPerLine) : 0;
  const buffer = flush ? 2 : 0;
  return (
    sectionTitleExtra(ty) +
    (lines + extraLines + buffer) * Math.ceil(ty.bodySize * ty.lineHeight) +
    12
  );
}

function contactHeight(rows: number, ty: Typography): number {
  if (rows <= 0) return snapToGrid(ty.bodySize * ty.lineHeight + 24, GRID_SIZE);
  return snapToGrid(20 + rows * rowHeight(ty), GRID_SIZE);
}

function blockChrome(layout: LayoutSettings, reserveEditChrome: boolean): number {
  const handle = reserveEditChrome ? layout.handleHeight : 0;
  return handle + layout.blockPadding * 2;
}

function withChrome(
  contentH: number,
  layout: LayoutSettings,
  reserveEditChrome: boolean,
): number {
  if (contentH <= 0) return 0;
  return snapToGrid(contentH + blockChrome(layout, reserveEditChrome), GRID_SIZE);
}

export interface ReflowContext {
  templateId: ResumeTemplateId;
  showBackground: boolean;
  showFamily: boolean;
  detailsRows: number;
  backgroundRows: number;
  familyRows: number;
  aboutText: string;
  partnerText: string;
  hobbiesLine: boolean;
  contactRows: number;
  reserveEditChrome?: boolean;
  flush?: boolean;
}

function layoutBackgroundFamilyRow(
  blocks: Record<BlockId, BlockRect>,
  layout: LayoutSettings,
  ctx: ReflowContext,
  cursorY: number,
  gap: number,
  chrome: boolean,
  flush: boolean,
): { blocks: Record<BlockId, BlockRect>; cursorY: number } {
  const ty = layout.typography;
  const detailsH = withChrome(rowsSectionHeight(ctx.detailsRows, ty, flush), layout, chrome);
  const backgroundH = ctx.showBackground
    ? withChrome(rowsSectionHeight(ctx.backgroundRows, ty, flush), layout, chrome)
    : 0;
  const familyH = ctx.showFamily
    ? withChrome(rowsSectionHeight(ctx.familyRows, ty, flush), layout, chrome)
    : 0;

  const pairY = cursorY;
  const rightX = blocks.background?.x ?? blocks.details.x + blocks.details.w + gap;
  const rightW = blocks.background?.w ?? blocks.details.w;

  blocks.details = { ...blocks.details, y: pairY, h: detailsH };

  if (ctx.showBackground) {
    blocks.background = { ...blocks.background, x: rightX, y: pairY, w: rightW, h: backgroundH };
  }

  let nextY = cursorY;

  if (ctx.showBackground && ctx.showFamily) {
    nextY = pairY + Math.max(detailsH, backgroundH) + gap;
    blocks.family = {
      ...blocks.family,
      x: blocks.about.x,
      y: nextY,
      w: blocks.about.w,
      h: familyH,
    };
    nextY += familyH + gap;
  } else if (ctx.showBackground) {
    nextY = pairY + Math.max(detailsH, backgroundH) + gap;
  } else if (ctx.showFamily) {
    blocks.family = { ...blocks.family, x: rightX, y: pairY, w: rightW, h: familyH };
    nextY = pairY + Math.max(detailsH, familyH) + gap;
  } else {
    nextY = pairY + detailsH + gap;
  }

  return { blocks, cursorY: nextY };
}

export function reflowResumeLayout(layout: LayoutSettings, ctx: ReflowContext): LayoutSettings {
  const ty = layout.typography;
  const flush = ctx.flush ?? false;
  const gap = snapToGrid(Math.max(flush ? 8 : 12, ty.bodySize * (flush ? 1.1 : 1.4)), GRID_SIZE);
  const chrome = ctx.reserveEditChrome ?? false;
  const blocks = { ...layout.blocks };

  const headerContentH = snapToGrid(ty.nameSize * 1.3 + ty.bodySize * ty.lineHeight * 2.5 + 8, GRID_SIZE);
  const photoContentH = snapToGrid(blocks.photo.w * PHOTO_RATIO, GRID_SIZE);
  const headerH = withChrome(headerContentH, layout, chrome);
  const photoH = withChrome(photoContentH, layout, chrome);

  const isTraditional = ctx.templateId === "traditional";
  const isMagazineMasthead = ctx.templateId === "magazine";

  let cursorY: number;

  if (isMagazineMasthead) {
    const mastContentH = snapToGrid(Math.max(headerContentH, photoContentH + 16), GRID_SIZE);
    const mastH = withChrome(mastContentH, layout, chrome);
    blocks.header = { ...blocks.header, h: mastH };
    blocks.photo = {
      ...blocks.photo,
      x: blocks.header.x + blocks.header.w - blocks.photo.w - 12,
      y: blocks.header.y + Math.max(8, Math.floor((mastH - photoH) / 2)),
      h: photoH,
    };
    cursorY = blocks.header.y + mastH + gap;
  } else if (isTraditional) {
    blocks.header = { ...blocks.header, h: headerH };
    if (!ctx.aboutText.trim()) {
      blocks.photo = {
        ...blocks.photo,
        x: blocks.header.x + blocks.header.w - blocks.photo.w,
        y: blocks.header.y,
        h: photoH,
      };
      cursorY =
        snapToGrid(Math.max(blocks.header.y + headerH, blocks.photo.y + photoH), GRID_SIZE) + gap;
    } else {
      cursorY = blocks.header.y + headerH + gap;
    }
  } else {
    blocks.header = { ...blocks.header, h: headerH };
    blocks.photo = { ...blocks.photo, h: photoH };
    const topRowBottom = snapToGrid(
      Math.max(blocks.header.y + headerH, blocks.photo.y + photoH),
      GRID_SIZE,
    );
    cursorY = topRowBottom + gap;
  }

  const rowResult = layoutBackgroundFamilyRow(blocks, layout, ctx, cursorY, gap, chrome, flush);
  Object.assign(blocks, rowResult.blocks);
  cursorY = rowResult.cursorY;

  if (ctx.aboutText.trim()) {
    if (isTraditional) {
      const aboutContentW = blocks.about.w;
      const aboutContentH = textSectionHeight(
        ctx.aboutText,
        aboutContentW,
        ty,
        ctx.hobbiesLine ? 1 : 0,
        flush,
      );
      const aboutH = withChrome(aboutContentH, layout, chrome);
      const rowH = Math.max(aboutH, photoH);
      blocks.about = { ...blocks.about, y: cursorY, h: rowH, w: aboutContentW };
      blocks.photo = {
        ...blocks.photo,
        x: blocks.about.x + aboutContentW + gap,
        y: cursorY + Math.max(0, Math.floor((rowH - photoH) / 2)),
        h: photoH,
      };
      cursorY += rowH + gap;
    } else {
      const aboutH = withChrome(
        textSectionHeight(ctx.aboutText, blocks.about.w, ty, ctx.hobbiesLine ? 1 : 0, flush),
        layout,
        chrome,
      );
      blocks.about = { ...blocks.about, y: cursorY, h: aboutH };
      cursorY += aboutH + gap;
    }
  }

  if (ctx.partnerText.trim()) {
    const partnerH = withChrome(textSectionHeight(ctx.partnerText, blocks.partner.w, ty, 0, flush), layout, chrome);
    blocks.partner = { ...blocks.partner, y: cursorY, h: partnerH };
    cursorY += partnerH + gap;
  }

  const contactH = withChrome(contactHeight(ctx.contactRows, ty), layout, chrome);
  blocks.contact = {
    ...blocks.contact,
    y: snapToGrid(Math.min(cursorY, BIODATA_PAGE_HEIGHT - contactH - 8), GRID_SIZE),
    h: contactH,
  };

  return { ...layout, blocks };
}

export function reflowCanvasDocument(doc: CanvasDocument, ctx: ReflowContext): CanvasDocument {
  if (doc.mode !== "resume") return doc;
  const layout = reflowResumeLayout(canvasToLayoutSettings(doc), ctx);
  return layoutSettingsToCanvas(layout);
}

export function countDetailsRows(
  data: { education: string; school: string; occupation: string; incomeRange: string },
  showIncome: boolean,
): number {
  let n = 0;
  if (data.education?.trim()) n++;
  if (data.school?.trim()) n++;
  if (data.occupation?.trim()) n++;
  if (showIncome && data.incomeRange?.trim()) n++;
  return n;
}

export function countBackgroundRows(
  data: { hometown: string; languages: string; visaStatus: string },
  showBackground: boolean,
): number {
  if (!showBackground) return 0;
  let n = 0;
  if (data.hometown?.trim()) n++;
  if (data.languages?.trim()) n++;
  if (data.visaStatus?.trim()) n++;
  return n;
}

export function countFamilyRows(
  data: { parents: string; siblings: string },
  showFamily: boolean,
): number {
  if (!showFamily) return 0;
  let n = 0;
  if (data.parents?.trim()) n++;
  if (data.siblings?.trim()) n++;
  return n;
}

/** @deprecated Use countBackgroundRows + countFamilyRows */
export function countExtraRows(
  data: { hometown: string; languages: string; visaStatus: string; parents: string; siblings: string },
  showBackground: boolean,
  showFamily: boolean,
): number {
  return countBackgroundRows(data, showBackground) + countFamilyRows(data, showFamily);
}

export type { BlockId, BlockRect };
