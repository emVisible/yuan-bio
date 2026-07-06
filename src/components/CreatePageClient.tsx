"use client";

import { useCallback, useRef, useState } from "react";
import { BiodataForm } from "@/components/BiodataForm";
import { BiodataPreview } from "@/components/BiodataPreview";
import { CardElementPrefsPanel } from "@/components/CardElementPrefsPanel";
import { LayoutToolbar } from "@/components/LayoutToolbar";
import { TemplateSelector } from "@/components/TemplateSelector";
import { DownloadPanel } from "@/components/DownloadPanel";
import { SectionPrefsPanel } from "@/components/SectionPrefsPanel";
import { SiteHeader } from "@/components/SiteHeader";
import { useLocale } from "@/components/LocaleProvider";
import { useToast } from "@/components/ToastProvider";
import { useBiodataSession } from "@/lib/client-store";
import { defaultCardLayout, defaultResumeLayout } from "@/lib/layout-settings";
import type { BlockId, BlockRect, CanvasBehavior, CardBlockId, Typography } from "@/lib/layout-settings";
import { applyCanvasFlush } from "@/lib/canvas/reflow-state";
import type { CardElementPrefs } from "@/lib/card-element-prefs";
import type { CardAspectRatio } from "@/lib/card-dimensions";
import { t } from "@/lib/i18n";
import type { EditorMode } from "@/lib/section-prefs";
import { createDefaultState, mergeFormData } from "@/lib/storage";
import { getSampleBiodata } from "@/lib/sample-data";
import type { BiodataState, CardTemplateId, ResumeTemplateId, SectionPrefs } from "@/lib/types";

type Step = "form" | "template" | "export";

const STEPS: Step[] = ["form", "template", "export"];

export function CreatePageClient() {
  const { locale } = useLocale();
  const { showToast } = useToast();
  const { state, isSample, patchState, replaceState } = useBiodataSession();
  const [step, setStep] = useState<Step>("form");
  const [editorMode, setEditorMode] = useState<EditorMode>("resume");
  const [layoutEditing, setLayoutEditing] = useState(false);
  const [savedHint, setSavedHint] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewCaptureRef = useRef<HTMLDivElement>(null);

  const persistWithHint = useCallback(() => {
    setSavedHint(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSavedHint(false), 1500);
  }, []);

  const updateState = useCallback(
    (updater: (prev: BiodataState) => BiodataState) => {
      patchState((prev) => ({ ...updater(prev), locale }));
      persistWithHint();
    },
    [locale, patchState, persistWithHint],
  );

  const syncCanvasLayout = useCallback(
    (s: BiodataState) => applyCanvasFlush(s, { layoutEditing }),
    [layoutEditing],
  );

  const updatePrefs = useCallback(
    (sectionPrefs: SectionPrefs) => {
      patchState((prev) => {
        const next = { ...prev, sectionPrefs };
        return syncCanvasLayout(next);
      });
      persistWithHint();
    },
    [patchState, persistWithHint, syncCanvasLayout],
  );

  const updateCardElementPrefs = useCallback(
    (cardElementPrefs: CardElementPrefs) => {
      patchState((prev) => syncCanvasLayout({ ...prev, cardElementPrefs }));
      persistWithHint();
    },
    [patchState, persistWithHint, syncCanvasLayout],
  );

  const updateDataWithReflow = useCallback(
    (patch: Partial<BiodataState["data"]>) => {
      patchState((prev) => {
        const next = {
          ...prev,
          locale,
          data: mergeFormData(prev.data, patch),
        };
        return syncCanvasLayout(next);
      });
      persistWithHint();
    },
    [locale, patchState, persistWithHint, syncCanvasLayout],
  );

  const updateCanvasBlock = useCallback(
    (mode: EditorMode, id: BlockId | CardBlockId, rect: BlockRect) => {
      patchState((prev) => {
        if (mode === "resume") {
          return {
            ...prev,
            resumeLayout: {
              ...prev.resumeLayout,
              blocks: { ...prev.resumeLayout.blocks, [id]: rect },
            },
          };
        }
        return {
          ...prev,
          cardLayout: {
            ...prev.cardLayout,
            blocks: { ...prev.cardLayout.blocks, [id]: rect },
          },
        };
      });
      persistWithHint();
    },
    [patchState, persistWithHint],
  );

  const updateBlock = useCallback(
    (id: BlockId, rect: BlockRect) => updateCanvasBlock("resume", id, rect),
    [updateCanvasBlock],
  );

  const updateCardBlock = useCallback(
    (id: CardBlockId, rect: BlockRect) => updateCanvasBlock("card", id, rect),
    [updateCanvasBlock],
  );

  const updateLayoutEditing = useCallback(
    (enabled: boolean) => {
      setLayoutEditing(enabled);
      patchState((prev) => applyCanvasFlush(prev, { layoutEditing: enabled }));
      persistWithHint();
    },
    [patchState, persistWithHint],
  );

  const updateResumeTypography = useCallback(
    (patch: Partial<Typography>) => {
      patchState((prev) =>
        syncCanvasLayout({
          ...prev,
          resumeLayout: {
            ...prev.resumeLayout,
            typography: { ...prev.resumeLayout.typography, ...patch },
          },
        }),
      );
      persistWithHint();
    },
    [patchState, persistWithHint, syncCanvasLayout],
  );

  const updateCardTypography = useCallback(
    (patch: Partial<Typography>) => {
      patchState((prev) => ({
        ...prev,
        cardLayout: {
          ...prev.cardLayout,
          typography: { ...prev.cardLayout.typography, ...patch },
        },
      }));
      persistWithHint();
    },
    [patchState, persistWithHint],
  );

  const updateCardPhotoSize = useCallback(
    (photoSize: number) => {
      patchState((prev) => ({
        ...prev,
        cardLayout: { ...prev.cardLayout, photoSize },
      }));
      persistWithHint();
    },
    [patchState, persistWithHint],
  );

  const updateCardAspect = useCallback(
    (aspectRatio: CardAspectRatio) => {
      patchState((prev) => ({
        ...prev,
        cardLayout: { ...prev.cardLayout, aspectRatio },
      }));
      persistWithHint();
    },
    [patchState, persistWithHint],
  );

  const updateCardExportWidth = useCallback(
    (exportWidth: number) => {
      patchState((prev) => ({
        ...prev,
        cardLayout: { ...prev.cardLayout, exportWidth },
      }));
      persistWithHint();
    },
    [patchState, persistWithHint],
  );

  const updateCanvasBehavior = useCallback(
    (mode: EditorMode, patch: Partial<Pick<CanvasBehavior, "blockGap" | "blockPadding" | "preventOverlap">>) => {
      patchState((prev) => {
        if (mode === "resume") {
          return { ...prev, resumeLayout: { ...prev.resumeLayout, ...patch } };
        }
        return { ...prev, cardLayout: { ...prev.cardLayout, ...patch } };
      });
      persistWithHint();
    },
    [patchState, persistWithHint],
  );

  const updateResumeBlockGap = useCallback(
    (blockGap: number) => updateCanvasBehavior("resume", { blockGap }),
    [updateCanvasBehavior],
  );

  const updateResumeBlockPadding = useCallback(
    (blockPadding: number) => updateCanvasBehavior("resume", { blockPadding }),
    [updateCanvasBehavior],
  );

  const updateCardBlockGap = useCallback(
    (blockGap: number) => updateCanvasBehavior("card", { blockGap }),
    [updateCanvasBehavior],
  );

  const updateCardBlockPadding = useCallback(
    (blockPadding: number) => updateCanvasBehavior("card", { blockPadding }),
    [updateCanvasBehavior],
  );

  const updatePreventOverlap = useCallback(
    (preventOverlap: boolean) => updateCanvasBehavior(editorMode, { preventOverlap }),
    [editorMode, updateCanvasBehavior],
  );

  const resetLayout = useCallback(() => {
    patchState((prev) => {
      if (editorMode === "resume") {
        return syncCanvasLayout({
          ...prev,
          resumeLayout: defaultResumeLayout(prev.resumeTemplateId),
        });
      }
      return syncCanvasLayout({
        ...prev,
        cardLayout: defaultCardLayout(prev.cardTemplateId),
      });
    });
    persistWithHint();
  }, [editorMode, patchState, persistWithHint, syncCanvasLayout]);

  const loadSample = () => {
    replaceState(
      applyCanvasFlush({
        ...state,
        data: getSampleBiodata(locale),
        resumeTemplateId: "traditional",
        cardTemplateId: "minimal",
        locale,
        resumeLayout: defaultResumeLayout("traditional"),
        cardLayout: defaultCardLayout("minimal"),
      }),
      true,
    );
    showToast(t(locale, "sampleLoaded"), "success");
  };

  const clearSample = () => {
    replaceState(createDefaultState(locale), false);
  };

  const goToStep = (target: Step) => {
    const currentIndex = STEPS.indexOf(step);
    const targetIndex = STEPS.indexOf(target);
    if (targetIndex > currentIndex && !state.data.name?.trim()) {
      showToast(t(locale, "nameRequired"), "error");
      return;
    }
    if (target === "template") {
      setLayoutEditing(false);
      patchState((prev) => applyCanvasFlush(prev, { layoutEditing: false }));
      persistWithHint();
    }
    setStep(target);
  };

  const steps: { id: Step; label: string }[] = [
    { id: "form", label: t(locale, "stepForm") },
    { id: "template", label: t(locale, "stepTemplate") },
    { id: "export", label: t(locale, "stepExport") },
  ];

  const fullState = { ...state, locale };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-3 py-4 sm:px-4 sm:py-8">
        <div className="mb-4 sm:mb-5">
          <h1 className="text-xl font-bold text-stone-900 sm:text-3xl">{t(locale, "createTitle")}</h1>
          <p className="mt-1 text-sm text-stone-600">{t(locale, "createSubtitle")}</p>
        </div>

        {isSample && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50/80 px-3 py-3 sm:px-4">
            <p className="text-sm text-rose-900">{t(locale, "sampleLoaded")}</p>
            <button type="button" onClick={clearSample} className="text-sm font-medium text-rose-700 underline">
              {t(locale, "clearSample")}
            </button>
          </div>
        )}

        <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 sm:mb-5 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0">
          {steps.map((s, index) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goToStep(s.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm ${
                step === s.id
                  ? "bg-rose-600 text-white shadow-md shadow-rose-200"
                  : "bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-rose-300"
              }`}
            >
              {index + 1}. {s.label}
            </button>
          ))}
        </div>

        {savedHint && <p className="mb-3 text-xs text-green-600">{t(locale, "saveDraft")}</p>}

        <div className="grid items-start gap-5 lg:grid-cols-[1fr_360px] lg:gap-8 xl:grid-cols-[1fr_400px]">
          <aside className="order-1 lg:order-2 lg:sticky lg:top-20">
            <div className="mx-auto w-full max-w-[340px] lg:max-w-none">
              {step !== "export" && (
                <div className="mb-3 flex rounded-full border border-stone-200 bg-white p-0.5 text-xs shadow-sm sm:text-sm">
                  <button
                    type="button"
                    onClick={() => setEditorMode("resume")}
                    className={`flex-1 rounded-full py-2 font-medium ${
                      editorMode === "resume" ? "bg-rose-600 text-white" : "text-stone-600"
                    }`}
                  >
                    {t(locale, "modeResume")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode("card")}
                    className={`flex-1 rounded-full py-2 font-medium ${
                      editorMode === "card" ? "bg-violet-600 text-white" : "text-stone-600"
                    }`}
                  >
                    {t(locale, "modeCard")}
                  </button>
                </div>
              )}
              <p className="mb-2 text-sm font-medium text-stone-800">{t(locale, "livePreview")}</p>
              <p className="mb-3 text-xs text-stone-500">
                {editorMode === "card" ? t(locale, "cardPreviewNote") : t(locale, "previewLiveDataNote")}
              </p>
              <BiodataPreview
                data={state.data}
                resumeTemplateId={state.resumeTemplateId}
                cardTemplateId={state.cardTemplateId}
                locale={locale}
                sectionPrefs={state.sectionPrefs}
                resumeLayout={state.resumeLayout}
                cardLayout={state.cardLayout}
                cardElementPrefs={state.cardElementPrefs}
                mode={editorMode}
                captureRef={previewCaptureRef}
                editable={step === "template" && layoutEditing}
                onBlockMove={updateBlock}
                onCardBlockMove={updateCardBlock}
              />
            </div>
          </aside>

          <div className="order-2 min-w-0 space-y-4 lg:order-1">
            {step === "form" && (
              <>
                <SectionPrefsPanel locale={locale} prefs={state.sectionPrefs} onChange={updatePrefs} />
                <BiodataForm data={state.data} locale={locale} onChange={updateDataWithReflow} />
                <div className="flex flex-wrap justify-between gap-2 pt-2">
                  <button type="button" onClick={loadSample} className="text-sm text-stone-500 underline">
                    {t(locale, "reloadSample")}
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep("template")}
                    className="rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-rose-700 sm:px-6"
                  >
                    {t(locale, "nextStep")} →
                  </button>
                </div>
              </>
            )}

            {step === "template" && (
              <>
                <div className="flex rounded-full border border-stone-200 bg-stone-50 p-0.5 text-sm">
                  <button
                    type="button"
                    onClick={() => setEditorMode("resume")}
                    className={`flex-1 rounded-full py-2 font-medium ${
                      editorMode === "resume" ? "bg-white text-rose-700 shadow-sm" : "text-stone-600"
                    }`}
                  >
                    {t(locale, "modeResume")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode("card")}
                    className={`flex-1 rounded-full py-2 font-medium ${
                      editorMode === "card" ? "bg-white text-violet-700 shadow-sm" : "text-stone-600"
                    }`}
                  >
                    {t(locale, "modeCard")}
                  </button>
                </div>
                <TemplateSelector
                  mode={editorMode}
                  resumeSelected={state.resumeTemplateId}
                  cardSelected={state.cardTemplateId}
                  locale={locale}
                  onSelectResume={(id: ResumeTemplateId) =>
                    updateState((s) =>
                      syncCanvasLayout({
                        ...s,
                        resumeTemplateId: id,
                        resumeLayout: defaultResumeLayout(id),
                      }),
                    )
                  }
                  onSelectCard={(id: CardTemplateId) =>
                    updateState((s) =>
                      syncCanvasLayout({
                        ...s,
                        cardTemplateId: id,
                        cardLayout: defaultCardLayout(id),
                      }),
                    )
                  }
                />
                <LayoutToolbar
                  locale={locale}
                  mode={editorMode}
                  resumeLayout={state.resumeLayout}
                  cardLayout={state.cardLayout}
                  onResumeTypographyChange={updateResumeTypography}
                  onCardTypographyChange={updateCardTypography}
                  onCardPhotoSizeChange={updateCardPhotoSize}
                  onCardAspectChange={updateCardAspect}
                  onCardExportWidthChange={updateCardExportWidth}
                  onResumeBlockGapChange={updateResumeBlockGap}
                  onResumeBlockPaddingChange={updateResumeBlockPadding}
                  onCardBlockGapChange={updateCardBlockGap}
                  onCardBlockPaddingChange={updateCardBlockPadding}
                  onPreventOverlapChange={updatePreventOverlap}
                  layoutEditing={layoutEditing}
                  onLayoutEditingChange={updateLayoutEditing}
                  onResetLayout={resetLayout}
                />
                {editorMode === "card" && (
                  <CardElementPrefsPanel
                    locale={locale}
                    prefs={state.cardElementPrefs}
                    layoutEditing={layoutEditing}
                    onChange={updateCardElementPrefs}
                  />
                )}
                <div className="flex justify-between pt-2">
                  <button type="button" onClick={() => setStep("form")} className="text-sm text-stone-600 underline">
                    ← {t(locale, "prevStep")}
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep("export")}
                    className="rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-700 sm:px-6"
                  >
                    {t(locale, "nextStep")} →
                  </button>
                </div>
              </>
            )}

            {step === "export" && (
              <>
                <button
                  type="button"
                  onClick={() => setStep("template")}
                  className="text-sm text-stone-600 underline"
                >
                  ← {t(locale, "prevStep")}
                </button>
                <DownloadPanel
                  state={fullState}
                  previewCaptureRef={previewCaptureRef}
                  editorMode={editorMode}
                  onEditorModeChange={setEditorMode}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
