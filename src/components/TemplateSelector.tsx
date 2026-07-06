"use client";

import type { CardTemplateId, Locale, ResumeTemplateId } from "@/lib/types";
import type { EditorMode } from "@/lib/section-prefs";
import { t } from "@/lib/i18n";

const RESUME_TEMPLATES: { id: ResumeTemplateId; nameKey: string; descKey: string }[] = [
  { id: "minimal", nameKey: "resumeMinimal", descKey: "resumeMinimalDesc" },
  { id: "traditional", nameKey: "resumeTraditional", descKey: "resumeTraditionalDesc" },
  { id: "modern", nameKey: "resumeModern", descKey: "resumeModernDesc" },
  { id: "elegant", nameKey: "resumeElegant", descKey: "resumeElegantDesc" },
  { id: "sidebar", nameKey: "resumeSidebar", descKey: "resumeSidebarDesc" },
  { id: "magazine", nameKey: "resumeMagazine", descKey: "resumeMagazineDesc" },
  { id: "timeline", nameKey: "resumeTimeline", descKey: "resumeTimelineDesc" },
  { id: "corporate", nameKey: "resumeCorporate", descKey: "resumeCorporateDesc" },
  { id: "warm", nameKey: "resumeWarm", descKey: "resumeWarmDesc" },
];

const CARD_TEMPLATES: { id: CardTemplateId; nameKey: string; descKey: string }[] = [
  { id: "minimal", nameKey: "cardMinimal", descKey: "cardMinimalDesc" },
  { id: "classic", nameKey: "cardClassic", descKey: "cardClassicDesc" },
  { id: "split", nameKey: "cardSplit", descKey: "cardSplitDesc" },
  { id: "polaroid", nameKey: "cardPolaroid", descKey: "cardPolaroidDesc" },
  { id: "bold", nameKey: "cardBold", descKey: "cardBoldDesc" },
  { id: "banner", nameKey: "cardBanner", descKey: "cardBannerDesc" },
  { id: "showcase", nameKey: "cardShowcase", descKey: "cardShowcaseDesc" },
  { id: "stripe", nameKey: "cardStripe", descKey: "cardStripeDesc" },
  { id: "ledger", nameKey: "cardLedger", descKey: "cardLedgerDesc" },
];

interface TemplateSelectorProps {
  mode: EditorMode;
  resumeSelected: ResumeTemplateId;
  cardSelected: CardTemplateId;
  locale: Locale;
  onSelectResume: (id: ResumeTemplateId) => void;
  onSelectCard: (id: CardTemplateId) => void;
}

export function TemplateSelector({
  mode,
  resumeSelected,
  cardSelected,
  locale,
  onSelectResume,
  onSelectCard,
}: TemplateSelectorProps) {
  const templates = mode === "resume" ? RESUME_TEMPLATES : CARD_TEMPLATES;
  const selected = mode === "resume" ? resumeSelected : cardSelected;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((tpl) => (
        <button
          key={tpl.id}
          type="button"
          onClick={() =>
            mode === "resume"
              ? onSelectResume(tpl.id as ResumeTemplateId)
              : onSelectCard(tpl.id as CardTemplateId)
          }
          className={`rounded-xl border-2 p-4 text-left transition ${
            selected === tpl.id
              ? mode === "resume"
                ? "border-rose-500 bg-rose-50 ring-2 ring-rose-200"
                : "border-violet-500 bg-violet-50 ring-2 ring-violet-200"
              : "border-stone-200 bg-white hover:border-stone-300"
          }`}
        >
          <span className="font-semibold text-stone-800">{t(locale, tpl.nameKey)}</span>
          <p className="mt-1 text-sm text-stone-500">{t(locale, tpl.descKey)}</p>
        </button>
      ))}
    </div>
  );
}
