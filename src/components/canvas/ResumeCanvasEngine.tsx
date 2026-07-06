"use client";

import type { CSSProperties } from "react";
import type { BiodataFormData, Locale, ResumeTemplateId, SectionPrefs } from "@/lib/types";
import { contactDisplayLabel, filledContacts } from "@/lib/contacts";
import { genderLabel } from "@/lib/gender";
import { t } from "@/lib/i18n";
import { BIODATA_PAGE_HEIGHT, BIODATA_PAGE_WIDTH } from "@/lib/biodata-page";
import { flushResumeLayout } from "@/lib/canvas/flush";
import { layoutSettingsToCanvas } from "@/lib/canvas/merge";
import { countBackgroundRows, countDetailsRows, countFamilyRows } from "@/lib/canvas/reflow";
import { getVisibleResumeBlockIds } from "@/lib/canvas/visibility";
import type { BlockId, BlockRect, LayoutSettings, Typography } from "@/lib/layout-settings";
import { RESUME_THEMES } from "@/lib/template-themes";
import { CanvasSurface } from "./CanvasSurface";
import { resumeBlockLabelKey } from "./block-labels";

const PHOTO_RATIO = 5 / 4;

export interface ResumeCanvasProps {
  data: BiodataFormData;
  locale: Locale;
  sectionPrefs: SectionPrefs;
  templateId: ResumeTemplateId;
  layout: LayoutSettings;
  editable?: boolean;
  canvasScale?: number;
  onBlockMove?: (id: BlockId, rect: BlockRect) => void;
}

function Row({
  label,
  value,
  labelSize,
  bodySize,
  labelColor,
  valueColor,
  borderColor,
  lineHeight = 1.4,
  isLast = false,
}: {
  label: string;
  value: string;
  labelSize: number;
  bodySize: number;
  labelColor: string;
  valueColor: string;
  borderColor: string;
  lineHeight?: number;
  isLast?: boolean;
}) {
  if (!value?.trim()) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "4.5rem 1fr",
        columnGap: 8,
        borderBottom: isLast ? undefined : `1px solid ${borderColor}`,
        paddingTop: 6,
        paddingBottom: 6,
        fontSize: bodySize,
        lineHeight,
        boxSizing: "border-box",
      }}
    >
      <span style={{ color: labelColor, fontSize: labelSize, fontWeight: 500 }}>{label}</span>
      <span style={{ color: valueColor, wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}

function FieldRows({
  rows,
  labelSize,
  bodySize,
  labelColor,
  valueColor,
  borderColor,
  lineHeight,
}: {
  rows: { label: string; value: string }[];
  labelSize: number;
  bodySize: number;
  labelColor: string;
  valueColor: string;
  borderColor: string;
  lineHeight: number;
}) {
  const visible = rows.filter((r) => r.value?.trim());
  return visible.map((row, index) => (
    <Row
      key={row.label}
      label={row.label}
      value={row.value}
      labelSize={labelSize}
      bodySize={bodySize}
      labelColor={labelColor}
      valueColor={valueColor}
      borderColor={borderColor}
      lineHeight={lineHeight}
      isLast={index === visible.length - 1}
    />
  ));
}

function SectionTitle({
  title,
  accent,
  labelSize,
  classical = false,
}: {
  title: string;
  accent: string;
  labelSize: number;
  classical?: boolean;
}) {
  if (classical) {
    return (
      <div className="mb-2 flex items-center gap-2">
        <span className="h-px flex-1" style={{ background: accent, opacity: 0.35 }} />
        <h2 className="shrink-0 font-semibold tracking-widest" style={{ color: accent, fontSize: labelSize }}>
          {title}
        </h2>
        <span className="h-px flex-1" style={{ background: accent, opacity: 0.35 }} />
      </div>
    );
  }
  return (
    <h2 className="mb-1.5 font-semibold uppercase tracking-wider" style={{ color: accent, fontSize: labelSize }}>
      {title}
    </h2>
  );
}

function ClassicalCorner({ top, left, color }: { top: boolean; left: boolean; color: string }) {
  const pos = {
    top: top ? 22 : undefined,
    bottom: top ? undefined : 22,
    left: left ? 22 : undefined,
    right: left ? undefined : 22,
  };
  return (
    <div className="pointer-events-none absolute" style={{ ...pos, width: 18, height: 18 }}>
      <div
        className="absolute"
        style={{
          [top ? "top" : "bottom"]: 0,
          [left ? "left" : "right"]: 0,
          width: 18,
          height: 2,
          background: color,
        }}
      />
      <div
        className="absolute"
        style={{
          [top ? "top" : "bottom"]: 0,
          [left ? "left" : "right"]: 0,
          width: 2,
          height: 18,
          background: color,
        }}
      />
    </div>
  );
}

function resumeDecorations(templateId: ResumeTemplateId) {
  const theme = RESUME_THEMES[templateId];
  return (
    <>
      {templateId === "traditional" && theme.innerBorder && (
        <div
          className="pointer-events-none absolute"
          style={{
            top: theme.innerPadding ?? 24,
            left: theme.innerPadding ?? 24,
            right: theme.innerPadding ?? 24,
            bottom: 40,
            border: `1px solid ${theme.innerBorder}`,
          }}
        />
      )}
      {templateId === "sidebar" && theme.frameBorder && (
        <>
          <div
            className="pointer-events-none absolute"
            style={{
              top: 20,
              left: 20,
              right: 20,
              bottom: 20,
              border: `2px solid ${theme.frameBorder}`,
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              top: 28,
              left: 28,
              right: 28,
              bottom: 28,
              border: `1px solid ${theme.frameInner ?? theme.frameBorder}`,
            }}
          />
          <ClassicalCorner top left color={theme.frameBorder} />
          <ClassicalCorner top={false} left color={theme.frameBorder} />
          <ClassicalCorner top left={false} color={theme.frameBorder} />
          <ClassicalCorner top={false} left={false} color={theme.frameBorder} />
          <div
            className="pointer-events-none absolute left-16 right-16 top-[52px] h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.frameBorder}, transparent)` }}
          />
        </>
      )}
      {templateId === "magazine" && (
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-[108px]" style={{ background: "#1c1917" }} />
      )}
      {templateId === "corporate" && (
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-28" style={{ background: "#0f172a" }} />
      )}
    </>
  );
}

function sectionStyleFor(templateId: ResumeTemplateId, theme: (typeof RESUME_THEMES)[ResumeTemplateId]) {
  const pad = { paddingTop: 8, paddingRight: 10, paddingBottom: 8, paddingLeft: 10 };
  const base = {
    background: theme.sectionBg,
    border: `1px solid ${theme.sectionBorder}`,
    borderRadius: templateId === "minimal" ? 2 : templateId === "modern" ? 8 : 4,
    ...pad,
  };
  if (templateId === "magazine") {
    return { ...base, background: "#ffffff", borderRadius: 8, border: "1px solid #e7e5e4" };
  }
  if (templateId === "timeline") {
    return {
      ...base,
      background: "#ffffff",
      borderTop: "none",
      borderRight: "none",
      borderBottom: "none",
      borderLeft: `3px solid ${theme.accent}`,
      borderRadius: 0,
      paddingLeft: 14,
    };
  }
  if (templateId === "corporate") {
    return { ...base, background: "#ffffff", border: "1px solid #e2e8f0" };
  }
  if (templateId === "warm") {
    return { ...base, background: "#fffbeb", border: "1px solid #fde68a" };
  }
  if (templateId === "sidebar") {
    return {
      ...base,
      background: "transparent",
      borderTop: "none",
      borderRight: "none",
      borderLeft: "none",
      borderBottom: `1px solid ${theme.sectionBorder}`,
      borderRadius: 0,
      paddingTop: 10,
      paddingRight: 6,
      paddingBottom: 10,
      paddingLeft: 6,
    };
  }
  return base;
}

function quoteSectionStyle(
  sectionStyle: CSSProperties,
  templateId: ResumeTemplateId,
  theme: (typeof RESUME_THEMES)[ResumeTemplateId],
): CSSProperties {
  const isClassical = templateId === "sidebar";
  return {
    ...sectionStyle,
    borderLeft: isClassical ? undefined : `2px solid ${theme.quoteBorder}`,
    borderRadius: 0,
    paddingLeft: isClassical ? 6 : 12,
  };
}

function headerColors(templateId: ResumeTemplateId, theme: (typeof RESUME_THEMES)[ResumeTemplateId]) {
  if (templateId === "magazine" || templateId === "corporate") {
    return { title: "#ffffff", sub: "#cbd5e1", accent: templateId === "magazine" ? "#fda4af" : "#38bdf8", label: "#a8a29e" };
  }
  return { title: theme.title, sub: theme.sub, accent: theme.accent, label: theme.label };
}

function renderResumeBlock(
  blockId: BlockId,
  props: ResumeCanvasProps,
  ty: Typography,
  theme: (typeof RESUME_THEMES)[ResumeTemplateId],
  sectionStyle: React.CSSProperties,
  blocks: Record<BlockId, BlockRect>,
): React.ReactNode {
  const { data, locale, sectionPrefs, templateId } = props;
  const gender = genderLabel(locale, data.gender);
  const meta = [data.birthYear, gender, data.height, data.city, data.country].filter(Boolean).join(" · ");
  const hc = headerColors(templateId, theme);
  const isClassical = templateId === "sidebar";

  switch (blockId) {
    case "header":
      return (
        <div style={{ textAlign: theme.headerAlign ?? "left" }}>
          {isClassical && (
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className="h-px w-10" style={{ background: theme.accent, opacity: 0.5 }} />
              <p className="tracking-[0.35em]" style={{ color: theme.accent, fontSize: ty.labelSize }}>
                {t(locale, "biodataTitle")}
              </p>
              <span className="h-px w-10" style={{ background: theme.accent, opacity: 0.5 }} />
            </div>
          )}
          {(templateId === "traditional" || templateId === "magazine") && (
            <p className="mb-1 uppercase tracking-[0.3em]" style={{ color: templateId === "magazine" ? "#a8a29e" : theme.accent, fontSize: ty.labelSize }}>
              {t(locale, "biodataTitle")}
            </p>
          )}
          <h1 className="font-bold leading-tight" style={{ color: hc.title, fontSize: ty.nameSize }}>
            {data.name || "—"}
          </h1>
          {meta && <p className="mt-1" style={{ color: hc.sub, fontSize: ty.bodySize }}>{meta}</p>}
          {data.occupation && (
            <p className="mt-0.5 font-medium" style={{ color: hc.accent, fontSize: ty.bodySize }}>
              {data.occupation}
            </p>
          )}
        </div>
      );
    case "photo": {
      const photoW = blocks.photo.w;
      const photoH = Math.round(photoW * PHOTO_RATIO);
      const isClassicalPhoto = templateId === "sidebar";
      const photoBorder = isClassicalPhoto
        ? `3px double ${theme.accent}`
        : templateId === "traditional"
          ? `2px solid ${theme.sectionBorder}`
          : undefined;
      if (data.photoDataUrl) {
        return (
          <div
            data-export-photo="true"
            style={{
              width: photoW,
              height: photoH,
              overflow: "hidden",
              borderRadius: isClassicalPhoto ? 4 : theme.photoRadius,
              boxShadow: theme.photoShadow,
              border: photoBorder,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.photoDataUrl} alt="" style={{ width: photoW, height: photoH, objectFit: "cover", display: "block" }} />
          </div>
        );
      }
      return (
        <div
          className="flex items-center justify-center"
          style={{
            width: photoW,
            height: photoH,
            borderRadius: isClassicalPhoto ? 4 : theme.photoRadius,
            border: isClassicalPhoto ? `1px dashed ${theme.sectionBorder}` : `1px dashed ${theme.sectionBorder}`,
            color: theme.sub,
            fontSize: ty.labelSize,
            background: isClassicalPhoto ? "rgba(139,69,19,0.04)" : theme.sectionBg,
          }}
        >
          {t(locale, "photo")}
        </div>
      );
    }
    case "details":
      return (
        <div style={sectionStyle}>
          <SectionTitle title={t(locale, "educationCareer")} accent={theme.accent} labelSize={ty.labelSize} classical={isClassical} />
          <FieldRows
            rows={[
              { label: t(locale, "education"), value: data.education },
              { label: t(locale, "school"), value: data.school },
              { label: t(locale, "occupation"), value: data.occupation },
              ...(sectionPrefs.income ? [{ label: t(locale, "incomeRangeRender"), value: data.incomeRange }] : []),
            ]}
            labelSize={ty.labelSize}
            bodySize={ty.bodySize}
            labelColor={theme.label}
            valueColor={theme.value}
            borderColor={theme.sectionBorder}
            lineHeight={ty.lineHeight}
          />
        </div>
      );
    case "background":
      return (
        <div style={sectionStyle}>
          <SectionTitle title={t(locale, "background")} accent={theme.accent} labelSize={ty.labelSize} classical={isClassical} />
          <FieldRows
            rows={[
              { label: t(locale, "hometown"), value: data.hometown },
              { label: t(locale, "languages"), value: data.languages },
              { label: t(locale, "visaStatusRender"), value: data.visaStatus },
            ]}
            labelSize={ty.labelSize}
            bodySize={ty.bodySize}
            labelColor={theme.label}
            valueColor={theme.value}
            borderColor={theme.sectionBorder}
            lineHeight={ty.lineHeight}
          />
        </div>
      );
    case "family":
      return (
        <div style={sectionStyle}>
          <SectionTitle title={t(locale, "family")} accent={theme.accent} labelSize={ty.labelSize} classical={isClassical} />
          <FieldRows
            rows={[
              { label: t(locale, "parents"), value: data.parents },
              { label: t(locale, "siblings"), value: data.siblings },
            ]}
            labelSize={ty.labelSize}
            bodySize={ty.bodySize}
            labelColor={theme.label}
            valueColor={theme.value}
            borderColor={theme.sectionBorder}
            lineHeight={ty.lineHeight}
          />
        </div>
      );
    case "about":
      return (
        <div style={quoteSectionStyle(sectionStyle, templateId, theme)}>
          <SectionTitle title={t(locale, "aboutMe")} accent={theme.accent} labelSize={ty.labelSize} classical={isClassical} />
          <p className="whitespace-pre-wrap" style={{ color: theme.value, fontSize: ty.bodySize, lineHeight: ty.lineHeight }}>
            {data.aboutMe}
          </p>
          {sectionPrefs.hobbies && data.hobbies?.trim() && (
            <p style={{ fontSize: ty.bodySize, color: theme.sub, marginTop: 8 }}>
              <span style={{ color: theme.label, fontWeight: 600 }}>{t(locale, "hobbies")}: </span>
              {data.hobbies}
            </p>
          )}
        </div>
      );
    case "partner":
      return (
        <div style={quoteSectionStyle(sectionStyle, templateId, theme)}>
          <SectionTitle title={t(locale, "partnerExpectations")} accent={theme.accent} labelSize={ty.labelSize} classical={isClassical} />
          <p className="whitespace-pre-wrap" style={{ color: theme.value, fontSize: ty.bodySize, lineHeight: ty.lineHeight }}>
            {data.partnerExpectations}
          </p>
        </div>
      );
    case "contact":
      return (
        <div
          className={`flex flex-wrap gap-x-4 gap-y-1 pt-2 ${isClassical ? "" : "border-t"}`}
          style={{
            borderColor: theme.sectionBorder,
            fontSize: ty.bodySize,
            color: theme.value,
            justifyContent: theme.headerAlign === "center" ? "center" : "flex-start",
          }}
        >
          {isClassical && (
            <div
              className="mb-1 h-px w-full"
              style={{ background: `linear-gradient(90deg, transparent, ${theme.sectionBorder}, transparent)` }}
            />
          )}
          {filledContacts(data.contacts).map((c) => (
            <span key={c.id}>
              <span style={{ color: theme.label }}>{contactDisplayLabel(locale, c)} </span>
              {c.value}
            </span>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function ResumeCanvasEngine(props: ResumeCanvasProps) {
  const theme = RESUME_THEMES[props.templateId];
  const flush = !props.editable;
  const showBackground =
    props.sectionPrefs.background &&
    (props.data.hometown || props.data.languages || props.data.visaStatus);
  const showFamily = props.sectionPrefs.family && (props.data.parents || props.data.siblings);
  const flushCtx = {
    templateId: props.templateId,
    showBackground: Boolean(showBackground),
    showFamily: Boolean(showFamily),
    detailsRows: countDetailsRows(props.data, props.sectionPrefs.income),
    backgroundRows: countBackgroundRows(props.data, Boolean(showBackground)),
    familyRows: countFamilyRows(props.data, Boolean(showFamily)),
    aboutText: props.data.aboutMe ?? "",
    partnerText: props.data.partnerExpectations ?? "",
    hobbiesLine: Boolean(props.sectionPrefs.hobbies && props.data.hobbies?.trim()),
    contactRows: props.data.contacts.filter((c) => c.value?.trim()).length,
    reserveEditChrome: Boolean(props.editable),
    flush,
  };
  const layout = flush ? flushResumeLayout(props.layout, flushCtx) : props.layout;
  const doc = layoutSettingsToCanvas(layout);
  const visibleIds = getVisibleResumeBlockIds(props.data, props.sectionPrefs);
  const ty = layout.typography;
  const sectionStyle = sectionStyleFor(props.templateId, theme);

  const pageStyle: React.CSSProperties = {
    background:
      props.templateId === "warm"
        ? "#fffbeb"
        : props.templateId === "magazine"
          ? "#fafaf9"
          : props.templateId === "corporate"
            ? "#f8fafc"
            : theme.pageBg,
    fontFamily: theme.fontFamily,
    color: theme.value,
    width: BIODATA_PAGE_WIDTH,
    height: BIODATA_PAGE_HEIGHT,
  };

  return (
    <CanvasSurface
      document={doc}
      locale={props.locale}
      editable={props.editable}
      flush={flush}
      canvasScale={props.canvasScale}
      visibleIds={visibleIds}
      labelKeyForBlock={resumeBlockLabelKey}
      accent={theme.accent}
      pageStyle={pageStyle}
      decorations={resumeDecorations(props.templateId)}
      renderBlock={(id) =>
        renderResumeBlock(id as BlockId, props, ty, theme, sectionStyle, doc.blocks as Record<BlockId, BlockRect>)
      }
      onBlockChange={props.onBlockMove as ((id: string, rect: BlockRect) => void) | undefined}
    />
  );
}

export type { Typography };
