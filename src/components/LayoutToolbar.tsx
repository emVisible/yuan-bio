"use client";

import type { Locale } from "@/lib/types";
import type { EditorMode } from "@/lib/section-prefs";
import { CARD_ASPECT_RATIOS, CARD_EXPORT_WIDTHS } from "@/lib/card-dimensions";
import type { CardAspectRatio } from "@/lib/card-dimensions";
import { t } from "@/lib/i18n";
import type { CardLayoutSettings, LayoutSettings, Typography } from "@/lib/layout-settings";
import { Button, Panel, RangeField, SelectField } from "./ui/Field";

interface LayoutToolbarProps {
  locale: Locale;
  mode: EditorMode;
  resumeLayout: LayoutSettings;
  cardLayout: CardLayoutSettings;
  onResumeTypographyChange: (patch: Partial<Typography>) => void;
  onCardTypographyChange: (patch: Partial<Typography>) => void;
  onCardPhotoSizeChange: (size: number) => void;
  onCardAspectChange: (ratio: CardAspectRatio) => void;
  onCardExportWidthChange: (width: number) => void;
  onResumeBlockGapChange: (gap: number) => void;
  onResumeBlockPaddingChange: (padding: number) => void;
  onCardBlockGapChange: (gap: number) => void;
  onCardBlockPaddingChange: (padding: number) => void;
  onPreventOverlapChange: (enabled: boolean) => void;
  layoutEditing?: boolean;
  onLayoutEditingChange?: (enabled: boolean) => void;
  onResetLayout: () => void;
}

export function LayoutToolbar({
  locale,
  mode,
  resumeLayout,
  cardLayout,
  onResumeTypographyChange,
  onCardTypographyChange,
  onCardPhotoSizeChange,
  onCardAspectChange,
  onCardExportWidthChange,
  onResumeBlockGapChange,
  onResumeBlockPaddingChange,
  onCardBlockGapChange,
  onCardBlockPaddingChange,
  onPreventOverlapChange,
  layoutEditing = false,
  onLayoutEditingChange,
  onResetLayout,
}: LayoutToolbarProps) {
  const isResume = mode === "resume";
  const layout = isResume ? resumeLayout : cardLayout;
  const typography = layout.typography;
  const onTypography = isResume ? onResumeTypographyChange : onCardTypographyChange;
  const accent = isResume ? "rose" : "violet";
  const onBlockGapChange = isResume ? onResumeBlockGapChange : onCardBlockGapChange;
  const onBlockPaddingChange = isResume ? onResumeBlockPaddingChange : onCardBlockPaddingChange;

  return (
    <Panel
      title={isResume ? t(locale, "resumeLayoutTitle") : t(locale, "cardLayoutTitle")}
      hint={isResume ? t(locale, "resumeLayoutHint") : t(locale, "cardLayoutHint")}
      action={
        <Button variant="ghost" onClick={onResetLayout} className="shrink-0 px-2 py-1 text-xs">
          {t(locale, "resetLayout")}
        </Button>
      }
    >
      <div className="space-y-3">
        {onLayoutEditingChange && (
          <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-stone-200 bg-stone-50/60 px-3 py-2.5">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-stone-300 text-rose-600 focus:ring-rose-200"
              checked={layoutEditing}
              onChange={(e) => onLayoutEditingChange(e.target.checked)}
            />
            <span>
              <span className="block text-sm font-medium text-stone-800">{t(locale, "layoutDragEdit")}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-stone-500">
                {t(locale, "layoutDragEditHint")}
              </span>
            </span>
          </label>
        )}
        {!isResume && (
          <>
            <SelectField
              label={t(locale, "cardAspect")}
              value={cardLayout.aspectRatio}
              onChange={(v) => onCardAspectChange(v as CardAspectRatio)}
              options={CARD_ASPECT_RATIOS.map((r) => ({ value: r, label: r }))}
            />
            <SelectField
              label={t(locale, "exportWidth")}
              value={String(cardLayout.exportWidth)}
              onChange={(v) => onCardExportWidthChange(Number(v))}
              options={CARD_EXPORT_WIDTHS.map((w) => ({ value: String(w), label: `${w}px` }))}
            />
          </>
        )}
        <RangeField
          label={t(locale, "fontName")}
          value={typography.nameSize}
          min={isResume ? 20 : 24}
          max={isResume ? 40 : 52}
          onChange={(v) => onTypography({ nameSize: v })}
          accent={accent}
        />
        <RangeField
          label={t(locale, "fontBody")}
          value={typography.bodySize}
          min={8}
          max={18}
          onChange={(v) => onTypography({ bodySize: v })}
          accent={accent}
        />
        <RangeField
          label={t(locale, "fontLabel")}
          value={typography.labelSize}
          min={7}
          max={14}
          onChange={(v) => onTypography({ labelSize: v })}
          accent={accent}
        />
        <RangeField
          label={t(locale, "blockGap")}
          value={layout.blockGap}
          min={4}
          max={24}
          onChange={onBlockGapChange}
          accent={accent}
        />
        <RangeField
          label={t(locale, "blockPadding")}
          value={layout.blockPadding}
          min={0}
          max={20}
          onChange={onBlockPaddingChange}
          accent={accent}
        />
        <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-stone-200 bg-stone-50/60 px-3 py-2.5">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-stone-300 text-rose-600 focus:ring-rose-200"
            checked={layout.preventOverlap}
            onChange={(e) => onPreventOverlapChange(e.target.checked)}
          />
          <span>
            <span className="block text-sm font-medium text-stone-800">{t(locale, "preventOverlap")}</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-stone-500">
              {t(locale, "preventOverlapHint")}
            </span>
          </span>
        </label>
        {!isResume && (
          <RangeField
            label={t(locale, "photoSize")}
            value={cardLayout.photoSize}
            min={120}
            max={280}
            onChange={onCardPhotoSizeChange}
            accent="violet"
          />
        )}
      </div>
    </Panel>
  );
}
