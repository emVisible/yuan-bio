"use client";

import { useEffect, useState } from "react";
import type { BiodataState } from "@/lib/types";
import type { EditorMode } from "@/lib/section-prefs";
import { cardSizeFromLayout } from "@/lib/card-dimensions";
import { useLocale } from "./LocaleProvider";
import { useToast } from "./ToastProvider";
import { t } from "@/lib/i18n";
import { exportElementToPdf } from "@/lib/pdf";
import { exportElementToPng, waitForPreviewPaint } from "@/lib/export-image";
import { Button, FieldLabel, Panel, SegmentedControl } from "./ui/Field";

type ExportFormat = "pdf" | "image";

function defaultFormatFor(mode: EditorMode): ExportFormat {
  return mode === "card" ? "image" : "pdf";
}

interface DownloadPanelProps {
  state: BiodataState;
  previewCaptureRef: React.RefObject<HTMLDivElement | null>;
  editorMode: EditorMode;
  onEditorModeChange: (mode: EditorMode) => void;
}

export function DownloadPanel({
  state,
  previewCaptureRef,
  editorMode,
  onEditorModeChange,
}: DownloadPanelProps) {
  const { locale } = useLocale();
  const { showToast } = useToast();
  const [exportTarget, setExportTarget] = useState<EditorMode>(editorMode);
  const [exportFormat, setExportFormat] = useState<ExportFormat>(() => defaultFormatFor(editorMode));
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const name = state.data.name?.trim();

  useEffect(() => {
    onEditorModeChange(exportTarget);
  }, [exportTarget, onEditorModeChange]);

  const handleExportTargetChange = (target: EditorMode) => {
    setExportTarget(target);
    setExportFormat(defaultFormatFor(target));
  };

  const syncPreviewToTarget = async () => {
    if (editorMode !== exportTarget) {
      onEditorModeChange(exportTarget);
      await new Promise((r) => setTimeout(r, 0));
    }
    await waitForPreviewPaint();
    await waitForPreviewPaint();
  };

  const download = async () => {
    if (!name) {
      showToast(t(locale, "nameRequired"), "error");
      return;
    }

    setBusy(true);
    try {
      await syncPreviewToTarget();

      const el = previewCaptureRef.current;
      if (!el) {
        showToast(t(locale, "exportFailed"), "error");
        return;
      }

      const base = name.replace(/\s+/g, "-");
      if (exportFormat === "pdf") {
        await exportElementToPdf(el, `${base}.pdf`);
        showToast(t(locale, "downloadSuccess"), "success");
      } else {
        await exportElementToPng(el, `${base}.png`);
        showToast(t(locale, "cardSuccess"), "success");
      }
    } catch (e) {
      console.error(e);
      showToast(exportFormat === "pdf" ? t(locale, "pdfFailed") : t(locale, "cardFailed"), "error");
    } finally {
      setBusy(false);
    }
  };

  const share = async () => {
    if (!name) {
      showToast(t(locale, "nameRequired"), "error");
      return;
    }
    try {
      const { buildShareUrl } = await import("@/lib/share");
      const url = buildShareUrl(state, window.location.origin);
      await navigator.clipboard.writeText(url);
      setCopied(true);
      showToast(t(locale, "linkCopied"), "success");
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      const msg =
        e instanceof Error && e.message === "share_too_long"
          ? t(locale, "shareFailed")
          : t(locale, "copyFailed");
      showToast(msg, "error");
    }
  };

  const cardSize = cardSizeFromLayout(state.cardLayout);
  const sizeHint =
    exportTarget === "card" ? `${cardSize.width} × ${cardSize.height}px` : "A4";
  const formatHint =
    exportTarget === "card"
      ? exportFormat === "image"
        ? t(locale, "exportCardHint")
        : t(locale, "exportCardPdfHint")
      : exportFormat === "pdf"
        ? t(locale, "exportResumeHint")
        : t(locale, "exportResumeImageHint");

  return (
    <Panel title={t(locale, "exportSection")} hint={t(locale, "exportWysiwygHint")}>
      <div className="space-y-4">
        <div>
          <FieldLabel>{t(locale, "exportWhatLabel")}</FieldLabel>
          <SegmentedControl
            value={exportTarget}
            onChange={handleExportTargetChange}
            accent={exportTarget === "card" ? "violet" : "rose"}
            options={[
              { id: "resume" as const, label: t(locale, "modeResume") },
              { id: "card" as const, label: t(locale, "modeCard") },
            ]}
          />
        </div>

        <div>
          <FieldLabel>{t(locale, "exportHowLabel")}</FieldLabel>
          <SegmentedControl
            value={exportFormat}
            onChange={setExportFormat}
            accent="neutral"
            options={[
              { id: "pdf" as const, label: t(locale, "formatPdf") },
              { id: "image" as const, label: t(locale, "formatImage") },
            ]}
          />
        </div>

        <p className="text-xs text-stone-500">
          {t(locale, "exportSizeHint")}: {sizeHint} · {t(locale, "exportMatchesPreview")}
        </p>
        <p className="text-xs text-stone-400">{formatHint}</p>

        <Button variant="primary" disabled={busy} onClick={download} className="w-full py-3">
          {busy
            ? t(locale, "loading")
            : exportFormat === "pdf"
              ? t(locale, "downloadPdf")
              : t(locale, "downloadImage")}
        </Button>

        <Button variant="secondary" onClick={share} className="w-full">
          {copied ? t(locale, "linkCopied") : t(locale, "shareLink")}
        </Button>
      </div>
    </Panel>
  );
}
