"use client";

import type { CSSProperties } from "react";
import type { BiodataFormData, CardTemplateId, Locale } from "@/lib/types";
import type { CardElementPrefs } from "@/lib/card-element-prefs";
import { DEFAULT_CARD_ELEMENT_PREFS } from "@/lib/card-element-prefs";
import { cardSizeFromLayout } from "@/lib/card-dimensions";
import { contactDisplayLabel, filledContacts } from "@/lib/contacts";
import { contentBox } from "@/lib/canvas/geometry";
import { flushCardLayout } from "@/lib/canvas/flush";
import { cardLayoutSettingsToCanvas } from "@/lib/canvas/merge";
import { scaleDocument, unscaleBlock } from "@/lib/canvas/transform";
import {
  applySoloBlockExpansion,
  getCardBlockIdsForFlush,
} from "@/lib/canvas/visibility";
import type { CardBlockId, CardLayoutSettings, BlockRect } from "@/lib/layout-settings";
import { CARD_THEMES } from "@/lib/card-themes";
import { genderLabel } from "@/lib/gender";
import { t } from "@/lib/i18n";
import { CanvasSurface } from "./CanvasSurface";
import { cardBlockLabelKey } from "./block-labels";

export interface CardCanvasProps {
  data: BiodataFormData;
  locale: Locale;
  templateId: CardTemplateId;
  layout: CardLayoutSettings;
  editable?: boolean;
  canvasScale?: number;
  onBlockMove?: (id: CardBlockId, rect: BlockRect) => void;
  elementPrefs?: CardElementPrefs;
}

function truncate(text: string, max: number): string {
  const s = text.trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}

function CardPhoto({
  data,
  rect,
  layout,
  locale,
  radius,
  border,
  shadow,
  placeholderColor = "#999",
  reserveHandle = false,
}: {
  data: BiodataFormData;
  rect: BlockRect;
  layout: CardLayoutSettings;
  locale: Locale;
  radius: number;
  border?: string;
  shadow?: string;
  placeholderColor?: string;
  reserveHandle?: boolean;
}) {
  const { width, height } = contentBox(
    rect,
    reserveHandle ? layout.blockPadding : 0,
    reserveHandle ? layout.handleHeight : 0,
  );
  const w = width;
  const h = height;
  const size = Math.min(w, h);
  const imgW = Math.min(size, w);
  const imgH = Math.min(size, h);
  const frameStyle: CSSProperties = {
    width: imgW,
    height: imgH,
    borderRadius: radius,
    border,
    boxShadow: shadow,
    overflow: "hidden",
    flexShrink: 0,
  };
  if (data.photoDataUrl) {
    return (
      <div style={{ width: w, height: h, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div data-export-photo="true" style={frameStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.photoDataUrl}
            alt=""
            style={{
              width: imgW,
              height: imgH,
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <div
      className="flex h-full w-full items-center justify-center text-xs"
      style={{
        border: border ?? `1px dashed ${placeholderColor}`,
        borderRadius: radius,
        color: placeholderColor,
        boxShadow: shadow,
      }}
    >
      {t(locale, "photo")}
    </div>
  );
}

function ContactRow({
  data,
  locale,
  ty,
  color,
  labelColor,
  align = "center",
  chip = false,
}: {
  data: BiodataFormData;
  locale: Locale;
  ty: CardLayoutSettings["typography"];
  color: string;
  labelColor: string;
  align?: "left" | "center";
  chip?: boolean;
}) {
  const contacts = filledContacts(data.contacts);
  if (!contacts.length) return null;
  if (chip) {
    return (
      <div className="flex flex-wrap gap-2">
        {contacts.map((c) => (
          <span key={c.id} className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm" style={{ fontSize: ty.labelSize, color }}>
            {contactDisplayLabel(locale, c)}: {c.value}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div
      className="flex flex-wrap gap-x-4 gap-y-1"
      style={{ fontSize: ty.bodySize, color, justifyContent: align === "left" ? "flex-start" : "center" }}
    >
      {contacts.map((c) => (
        <span key={c.id}>
          <span style={{ color: labelColor }}>{contactDisplayLabel(locale, c)}: </span>
          {c.value}
        </span>
      ))}
    </div>
  );
}

function cardDecorations(templateId: CardTemplateId) {
  switch (templateId) {
    case "classic":
      return <div className="pointer-events-none absolute left-0 right-0 top-0 h-2" style={{ background: CARD_THEMES.classic.accent }} />;
    case "split":
      return (
        <>
          <div
            className="pointer-events-none absolute bottom-0 left-0 top-0 w-[42%]"
            style={{ background: "#f1f5f9", borderRight: "1px solid #e2e8f0" }}
          />
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-1" style={{ background: CARD_THEMES.split.accent }} />
        </>
      );
    case "banner":
      return null;
    case "showcase":
      return (
        <>
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-1.5" style={{ background: CARD_THEMES.showcase.accent }} />
          <div className="pointer-events-none absolute left-0 top-0 h-full w-1" style={{ background: `${CARD_THEMES.showcase.accent}22` }} />
        </>
      );
    case "stripe":
      return <div className="absolute left-0 right-0 top-0 h-3" style={{ background: "linear-gradient(90deg, #0ea5e9, #6366f1)" }} />;
    case "ledger":
      return <div className="pointer-events-none absolute bottom-6 left-6 right-6 top-6 border border-stone-300" />;
    default:
      return null;
  }
}

function renderCardBlock(
  templateId: CardTemplateId,
  blockId: CardBlockId,
  props: CardCanvasProps,
  layout: CardLayoutSettings,
  rect: BlockRect,
  reserveHandle = false,
): React.ReactNode {
  const { data, locale, elementPrefs = DEFAULT_CARD_ELEMENT_PREFS } = props;
  const theme = CARD_THEMES[templateId];
  const ty = layout.typography;
  const gender = genderLabel(locale, data.gender);
  const meta = [data.birthYear, gender, data.height, data.city, data.country].filter(Boolean);
  const metaLine = meta.join(templateId === "minimal" ? " / " : " · ");

  const headerAlign = ["split", "bold", "minimal", "stripe", "ledger", "showcase"].includes(templateId)
    ? "left"
    : "center";

  switch (blockId) {
    case "photo":
      if (templateId === "polaroid") {
        return (
          <div className="bg-white p-2 pb-6 shadow-xl" style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
            <CardPhoto data={data} rect={rect} layout={layout} locale={locale} radius={0} reserveHandle={reserveHandle} />
            <p className="mt-2 text-center" style={{ fontSize: ty.nameSize * 0.85, color: theme.title }}>
              {data.name || "—"}
            </p>
          </div>
        );
      }
      return (
        <CardPhoto
          data={data}
          rect={rect}
          layout={layout}
          locale={locale}
          radius={theme.photoRadius}
          reserveHandle={reserveHandle}
          border={theme.photoBorder}
          shadow={templateId === "classic" ? "0 16px 40px rgba(0,0,0,0.12)" : undefined}
          placeholderColor={theme.sub}
        />
      );
    case "header":
      return (
        <div style={{ textAlign: headerAlign as "left" | "center" }}>
          {["banner", "ledger"].includes(templateId) && (
            <p
              className="uppercase tracking-[0.25em]"
              style={{
                fontSize: ty.labelSize,
                color: templateId === "banner" ? "#7dd3fc" : "#78716c",
              }}
            >
              {t(locale, "biodataTitle")}
            </p>
          )}
          {templateId === "showcase" && (
            <p className="mb-1 uppercase tracking-[0.2em]" style={{ fontSize: ty.labelSize, color: theme.accent }}>
              {t(locale, "biodataTitle")}
            </p>
          )}
          {templateId === "split" && (
            <p className="uppercase tracking-[0.2em]" style={{ fontSize: ty.labelSize, color: theme.accent }}>
              {t(locale, "biodataTitle")}
            </p>
          )}
          <h1
            className="font-bold leading-tight"
            style={{
              fontSize: ty.nameSize + (templateId === "bold" ? 4 : 0),
              color: theme.title,
              fontFamily: templateId === "ledger" ? "var(--font-geist-sans), sans-serif" : theme.fontFamily,
            }}
          >
            {data.name || "—"}
          </h1>
          {data.occupation && (
            <p
              className="mt-1 font-medium"
              style={{
                fontSize: ty.bodySize + (templateId === "split" ? 2 : 0),
                color: templateId === "banner" ? "#bae6fd" : theme.accent,
              }}
            >
              {data.occupation}
            </p>
          )}
          {templateId === "classic" && data.city && (
            <p style={{ fontSize: ty.bodySize, color: theme.sub, marginTop: 4 }}>
              {[data.city, data.country].filter(Boolean).join(", ")}
            </p>
          )}
          {!elementPrefs.about && metaLine && (
            <p style={{ fontSize: ty.bodySize, color: theme.sub, marginTop: 8 }}>
              {metaLine}
            </p>
          )}
        </div>
      );
    case "body":
      return (
        <div style={{ textAlign: headerAlign as "left" | "center" }}>
          {elementPrefs.about && metaLine && (
            <p style={{ fontSize: ty.bodySize, color: theme.sub }}>{metaLine}</p>
          )}
          {data.aboutMe && (
            <p
              className="whitespace-pre-wrap"
              style={{
                fontSize: ty.bodySize,
                color: theme.sub,
                lineHeight: ty.lineHeight,
                marginTop: elementPrefs.about && metaLine ? 8 : 0,
              }}
            >
              {reserveHandle
                ? truncate(data.aboutMe, templateId === "minimal" ? 140 : 100)
                : data.aboutMe}
            </p>
          )}
        </div>
      );
    case "contact":
      return (
        <ContactRow
          data={data}
          locale={locale}
          ty={ty}
          color={theme.title}
          labelColor={theme.label}
          align={headerAlign as "left" | "center"}
          chip={false}
        />
      );
    default:
      return null;
  }
}

export function CardCanvasEngine(props: CardCanvasProps) {
  const theme = CARD_THEMES[props.templateId];
  const flush = !props.editable;
  const prefs = props.elementPrefs ?? DEFAULT_CARD_ELEMENT_PREFS;
  const visibleIds = getCardBlockIdsForFlush(props.data, prefs, flush);
  const layout = flush
    ? flushCardLayout(props.layout, props.templateId, visibleIds)
    : props.layout;
  const { width, height } = cardSizeFromLayout(layout);

  let doc = cardLayoutSettingsToCanvas(layout);
  doc = applySoloBlockExpansion(doc, visibleIds);
  const displayDoc = scaleDocument(doc, width, height);

  const onBlockChange = props.onBlockMove
    ? (id: string, rect: BlockRect) => {
        props.onBlockMove!(
          id as CardBlockId,
          unscaleBlock(rect, doc.pageWidth, doc.pageHeight, width, height),
        );
      }
    : undefined;

  const pageStyle: React.CSSProperties = {
    background: theme.bg,
    fontFamily: theme.fontFamily,
    color: theme.title,
  };

  if (props.templateId === "banner") {
    Object.assign(pageStyle, {
      background: "linear-gradient(90deg, #1e3a5f 0%, #0f172a 55%, #0c4a6e 100%)",
      color: "#f8fafc",
    });
  }
  if (props.templateId === "stripe") {
    Object.assign(pageStyle, { background: "#ffffff", color: "#1e293b" });
  }
  if (props.templateId === "ledger") {
    Object.assign(pageStyle, {
      background: "#fafaf9",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    });
  }

  return (
    <CanvasSurface
      document={displayDoc}
      locale={props.locale}
      editable={props.editable}
      flush={flush}
      canvasScale={props.canvasScale}
      visibleIds={visibleIds}
      labelKeyForBlock={cardBlockLabelKey}
      accent={
        props.templateId === "banner" ? "#38bdf8" : props.templateId === "showcase" ? "#2563eb" : theme.accent
      }
      pageStyle={pageStyle}
      decorations={cardDecorations(props.templateId)}
      renderBlock={(id) =>
        renderCardBlock(
          props.templateId,
          id as CardBlockId,
          props,
          layout,
          displayDoc.blocks[id],
          Boolean(props.editable),
        )
      }
      onBlockChange={onBlockChange}
    />
  );
}
