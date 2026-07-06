import type { ReactElement } from "react";
import type { BlockId, BlockRect, CardLayoutSettings, LayoutSettings } from "@/lib/layout-settings";
import type { BiodataFormData, CardTemplateId, Locale, ResumeTemplateId, SectionPrefs } from "@/lib/types";
import { TemplateEngine } from "./TemplateEngine";

export interface ResumeTemplateProps {
  data: BiodataFormData;
  locale: Locale;
  sectionPrefs: SectionPrefs;
  layout: LayoutSettings;
  editable?: boolean;
  canvasScale?: number;
  onBlockMove?: (id: BlockId, rect: BlockRect) => void;
}

export function renderResumeTemplate(
  templateId: ResumeTemplateId,
  props: ResumeTemplateProps,
): ReactElement {
  return (
    <TemplateEngine
      templateId={templateId}
      data={props.data}
      locale={props.locale}
      sectionPrefs={props.sectionPrefs}
      layout={props.layout}
      editable={props.editable}
      canvasScale={props.canvasScale}
      onBlockMove={props.onBlockMove}
    />
  );
}

/** @deprecated */
export function renderTemplate(
  templateId: ResumeTemplateId | string,
  props: ResumeTemplateProps,
): ReactElement {
  const id = (
    [
      "traditional", "modern", "elegant", "sidebar", "magazine", "timeline", "corporate", "warm",
    ].includes(templateId as string)
      ? templateId
      : "minimal"
  ) as ResumeTemplateId;
  return renderResumeTemplate(id, props);
}

export type { CardLayoutSettings };

export { BIODATA_PAGE_WIDTH, BIODATA_PAGE_HEIGHT } from "@/lib/biodata-page";
