"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BiodataFormData, CardTemplateId, Locale, ResumeTemplateId, SectionPrefs } from "@/lib/types";
import type { CardElementPrefs } from "@/lib/card-element-prefs";
import type { BlockId, BlockRect, CardBlockId, CardLayoutSettings, LayoutSettings } from "@/lib/layout-settings";
import { cardSizeFromLayout } from "@/lib/card-dimensions";
import type { EditorMode } from "@/lib/section-prefs";
import { BIODATA_PAGE_HEIGHT, BIODATA_PAGE_WIDTH } from "@/lib/biodata-page";
import { renderResumeTemplate } from "./templates/BiodataTemplates";
import { CardEngine } from "./templates/CardEngine";

interface BiodataPreviewProps {
  data: BiodataFormData;
  resumeTemplateId: ResumeTemplateId;
  cardTemplateId: CardTemplateId;
  locale: Locale;
  sectionPrefs: SectionPrefs;
  resumeLayout: LayoutSettings;
  cardLayout: CardLayoutSettings;
  cardElementPrefs?: CardElementPrefs;
  mode?: EditorMode;
  captureRef?: React.RefObject<HTMLDivElement | null>;
  fixedWidth?: number;
  className?: string;
  editable?: boolean;
  onBlockMove?: (id: BlockId, rect: BlockRect) => void;
  onCardBlockMove?: (id: CardBlockId, rect: BlockRect) => void;
}

export function BiodataPreview({
  data,
  resumeTemplateId,
  cardTemplateId,
  locale,
  sectionPrefs,
  resumeLayout,
  cardLayout,
  cardElementPrefs,
  mode = "resume",
  captureRef,
  fixedWidth,
  className = "",
  editable = false,
  onBlockMove,
  onCardBlockMove,
}: BiodataPreviewProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canvasScale, setCanvasScale] = useState(1);

  const isCard = mode === "card";
  const cardSize = cardSizeFromLayout(cardLayout);
  const pageW = isCard ? cardSize.width : BIODATA_PAGE_WIDTH;
  const pageH = isCard ? cardSize.height : BIODATA_PAGE_HEIGHT;

  const content = isCard ? (
    <CardEngine
      data={data}
      locale={locale}
      templateId={cardTemplateId}
      layout={cardLayout}
      editable={editable}
      canvasScale={canvasScale}
      onBlockMove={onCardBlockMove}
      elementPrefs={cardElementPrefs}
    />
  ) : (
    renderResumeTemplate(resumeTemplateId, {
      data,
      locale,
      sectionPrefs,
      layout: resumeLayout,
      editable,
      canvasScale,
      onBlockMove,
    })
  );

  const fit = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    if (w <= 0 || h <= 0) return;
    setCanvasScale(Math.min(w / pageW, h / pageH));
  }, [pageW, pageH]);

  useEffect(() => {
    fit();
    const viewport = viewportRef.current;
    if (!viewport) return;
    const ro = new ResizeObserver(fit);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [fit, data, resumeTemplateId, cardTemplateId, mode, sectionPrefs, resumeLayout, cardLayout, editable]);

  const setPageRef = (el: HTMLDivElement | null) => {
    if (captureRef) captureRef.current = el;
  };

  return (
    <div
      ref={viewportRef}
      className={`relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100/90 shadow-inner ${className}`}
      style={{
        width: fixedWidth ? `${fixedWidth}px` : "100%",
        maxWidth: "100%",
        aspectRatio: `${pageW} / ${pageH}`,
      }}
    >
      {/* Centered scale wrapper — capture node has NO transform (export-safe) */}
      <div className="absolute inset-0 flex justify-center overflow-hidden">
        <div
          style={{
            width: pageW,
            height: pageH,
            flexShrink: 0,
            transform: `scale(${canvasScale})`,
            transformOrigin: "top center",
          }}
        >
          <div
            ref={setPageRef}
            data-export-root="true"
            data-export-width={pageW}
            data-export-height={pageH}
            data-export-bg={isCard ? "transparent" : "white"}
            className="overflow-hidden"
            style={{ width: pageW, height: pageH, boxSizing: "border-box" }}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
