import type { BiodataState } from "../types";
import { flushCardLayout, flushResumeLayout } from "./flush";
import { getCardBlockIdsForFlush } from "./visibility";
import {
  countBackgroundRows,
  countDetailsRows,
  countFamilyRows,
  reflowResumeLayout,
  type ReflowContext,
} from "./reflow";

export function buildReflowContext(state: BiodataState): ReflowContext {
  const showBackground =
    state.sectionPrefs.background &&
    (state.data.hometown || state.data.languages || state.data.visaStatus);
  const showFamily = state.sectionPrefs.family && (state.data.parents || state.data.siblings);
  return {
    templateId: state.resumeTemplateId,
    showBackground: Boolean(showBackground),
    showFamily: Boolean(showFamily),
    detailsRows: countDetailsRows(state.data, state.sectionPrefs.income),
    backgroundRows: countBackgroundRows(state.data, Boolean(showBackground)),
    familyRows: countFamilyRows(state.data, Boolean(showFamily)),
    aboutText: state.data.aboutMe ?? "",
    partnerText: state.data.partnerExpectations ?? "",
    hobbiesLine: Boolean(state.sectionPrefs.hobbies && state.data.hobbies?.trim()),
    contactRows: state.data.contacts.filter((c) => c.value?.trim()).length,
    reserveEditChrome: false,
    flush: true,
  };
}

export function buildReflowContextForEdit(state: BiodataState): ReflowContext {
  return { ...buildReflowContext(state), reserveEditChrome: true, flush: false };
}

/** Preview/export flush: resume + card auto-layout, all content visible. */
export function applyCanvasFlush(
  state: BiodataState,
  options?: { layoutEditing?: boolean },
): BiodataState {
  const editing = options?.layoutEditing ?? false;
  if (editing) {
    return {
      ...state,
      resumeLayout: reflowResumeLayout(state.resumeLayout, buildReflowContextForEdit(state)),
    };
  }

  const ctx = buildReflowContext(state);
  const cardIds = getCardBlockIdsForFlush(state.data, state.cardElementPrefs, true);
  return {
    ...state,
    resumeLayout: flushResumeLayout(state.resumeLayout, ctx),
    cardLayout: flushCardLayout(state.cardLayout, state.cardTemplateId, cardIds),
  };
}

/** @deprecated Use applyCanvasFlush */
export function applyResumeReflow(
  state: BiodataState,
  ctx?: ReflowContext,
): BiodataState {
  if (ctx?.reserveEditChrome) {
    return {
      ...state,
      resumeLayout: reflowResumeLayout(state.resumeLayout, ctx),
    };
  }
  return applyCanvasFlush(state);
}

export type { ReflowContext };
