"use client";

import { useCallback, useSyncExternalStore } from "react";
import { applyCanvasFlush } from "./canvas/reflow-state";
import { getSampleBiodata } from "./sample-data";
import { mergeCardLayout, mergeResumeLayout } from "./layout-settings";
import { mergeFormData, readInitialState, saveDraft, STORAGE_KEY } from "./storage";
import { DEFAULT_CARD_ELEMENT_PREFS } from "./card-element-prefs";
import { DEFAULT_SECTION_PREFS } from "./section-prefs";
import type { BiodataFormData, BiodataState, Locale } from "./types";

const LOCALE_KEY = "matchbiodata-locale";

export function ssrDefaultState(locale: Locale = "zh"): BiodataState {
  const resumeTemplateId = "traditional";
  const cardTemplateId = "classic";
  return applyCanvasFlush({
    data: getSampleBiodata(locale),
    resumeTemplateId,
    cardTemplateId,
    locale,
    sectionPrefs: { ...DEFAULT_SECTION_PREFS },
    cardElementPrefs: { ...DEFAULT_CARD_ELEMENT_PREFS },
    resumeLayout: mergeResumeLayout(undefined, resumeTemplateId),
    cardLayout: mergeCardLayout(undefined, cardTemplateId),
  });
}

const localeListeners = new Set<() => void>();

function subscribeLocale(onStoreChange: () => void) {
  localeListeners.add(onStoreChange);
  return () => localeListeners.delete(onStoreChange);
}

function getLocaleSnapshot(): Locale {
  const saved = localStorage.getItem(LOCALE_KEY);
  return saved === "en" ? "en" : "zh";
}

function notifyLocale() {
  localeListeners.forEach((l) => l());
}

export function useLocaleStore(): [Locale, (next: Locale) => void] {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    (): Locale => "zh",
  );

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(LOCALE_KEY, next);
    initSession();
    if (sessionIsSample) {
      sessionState = applyCanvasFlush({
        ...sessionState,
        locale: next,
        data: getSampleBiodata(next),
      });
    } else {
      sessionState = { ...sessionState, locale: next };
    }
    saveDraft(sessionState);
    notifySession();
    notifyLocale();
  }, []);

  return [locale, setLocale];
}

interface SessionSnapshot {
  state: BiodataState;
  isSample: boolean;
}

const SERVER_SESSION_SNAPSHOT: SessionSnapshot = {
  state: ssrDefaultState(),
  isSample: true,
};

let sessionInitialized = false;
let sessionState = ssrDefaultState();
let sessionIsSample = true;
let clientSnapshot: SessionSnapshot = SERVER_SESSION_SNAPSHOT;
const sessionListeners = new Set<() => void>();

function syncClientSnapshot(): SessionSnapshot {
  clientSnapshot = { state: sessionState, isSample: sessionIsSample };
  return clientSnapshot;
}

function initSession() {
  if (sessionInitialized || typeof window === "undefined") return;
  sessionInitialized = true;
  sessionState = readInitialState();
  sessionIsSample = !localStorage.getItem(STORAGE_KEY);
  syncClientSnapshot();
}

function getSessionSnapshot(): SessionSnapshot {
  initSession();
  return clientSnapshot;
}

function getSessionServerSnapshot(): SessionSnapshot {
  return SERVER_SESSION_SNAPSHOT;
}

function notifySession() {
  syncClientSnapshot();
  sessionListeners.forEach((l) => l());
}

function subscribeSession(onStoreChange: () => void) {
  sessionListeners.add(onStoreChange);
  return () => sessionListeners.delete(onStoreChange);
}

export function useBiodataSession() {
  const { state, isSample } = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getSessionServerSnapshot,
  );

  const patchState = useCallback((updater: (prev: BiodataState) => BiodataState) => {
    initSession();
    sessionState = updater(sessionState);
    sessionIsSample = false;
    saveDraft(sessionState);
    notifySession();
  }, []);

  const patchData = useCallback(
    (patch: Partial<BiodataFormData>) => {
      patchState((prev) => ({ ...prev, data: mergeFormData(prev.data, patch) }));
    },
    [patchState],
  );

  const replaceState = useCallback((next: BiodataState, sampleFlag?: boolean) => {
    initSession();
    sessionState = next;
    if (sampleFlag !== undefined) sessionIsSample = sampleFlag;
    saveDraft(next);
    notifySession();
  }, []);

  return { state, isSample, patchState, patchData, replaceState };
}
