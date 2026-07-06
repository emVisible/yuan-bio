import type { CardElementPrefs } from "../card-element-prefs";
import type { BiodataFormData, SectionPrefs } from "../types";
import { filledContacts } from "../contacts";
import type { BlockId, CardBlockId } from "../layout-settings";
import { CARD_INNER_HEIGHT, CARD_INNER_WIDTH } from "../layout-margins";
import { CARD_MARGIN } from "../card-dimensions";
import type { CanvasDocument, CanvasMode } from "./document";
import { CARD_BLOCK_ORDER, RESUME_BLOCK_ORDER } from "./document";

import type { BlockRect } from "../layout-settings";

export function getVisibleResumeBlockIds(
  data: BiodataFormData,
  sectionPrefs: SectionPrefs,
): BlockId[] {
  const ids: BlockId[] = ["header", "photo", "details"];
  const showBackground =
    sectionPrefs.background && (data.hometown || data.languages || data.visaStatus);
  const showFamily = sectionPrefs.family && (data.parents || data.siblings);
  if (showBackground) ids.push("background");
  if (showFamily) ids.push("family");
  if (data.aboutMe?.trim()) ids.push("about");
  if (sectionPrefs.partnerExpectations && data.partnerExpectations?.trim()) ids.push("partner");
  if (data.contacts.some((c) => c.value?.trim())) ids.push("contact");
  return ids;
}

export function getVisibleCardBlockIds(prefs: CardElementPrefs): CardBlockId[] {
  const ids: CardBlockId[] = ["header"];
  if (prefs.photo) ids.unshift("photo");
  if (prefs.about) ids.push("body");
  if (prefs.contact) ids.push("contact");
  return ids;
}

function hasCardMeta(data: BiodataFormData): boolean {
  return [data.birthYear, data.gender, data.height, data.city, data.country].some((v) =>
    String(v ?? "").trim(),
  );
}

/** Flush/preview mode: show blocks that have content, not only user prefs. */
export function getCardBlockIdsForFlush(
  data: BiodataFormData,
  prefs: CardElementPrefs,
  flush: boolean,
): CardBlockId[] {
  if (!flush) return getVisibleCardBlockIds(prefs);

  const ids: CardBlockId[] = ["header"];
  if (prefs.photo || data.photoDataUrl || hasCardMeta(data)) ids.unshift("photo");
  if (prefs.about || data.aboutMe?.trim() || hasCardMeta(data)) ids.push("body");
  if (prefs.contact || filledContacts(data.contacts).length > 0) ids.push("contact");
  return ids;
}

export function applySoloBlockExpansion(
  doc: CanvasDocument,
  visibleIds: string[],
  soloBlockId = "header",
): CanvasDocument {
  if (doc.mode !== "card") return doc;
  if (visibleIds.length !== 1 || visibleIds[0] !== soloBlockId) return doc;
  return {
    ...doc,
    blocks: {
      ...doc.blocks,
      [soloBlockId]: {
        x: CARD_MARGIN,
        y: CARD_MARGIN,
        w: CARD_INNER_WIDTH,
        h: CARD_INNER_HEIGHT,
      },
    },
  };
}

export function blockOrderForMode(mode: CanvasMode): readonly string[] {
  return mode === "card" ? CARD_BLOCK_ORDER : RESUME_BLOCK_ORDER;
}

export function peerRects(
  blocks: Record<string, BlockRect>,
  visibleIds: string[],
  excludeId: string,
): BlockRect[] {
  return visibleIds.filter((id) => id !== excludeId).map((id) => blocks[id]);
}
