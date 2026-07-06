"use client";

import type { SectionPrefs } from "@/lib/types";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const TOGGLE_KEYS: { key: keyof SectionPrefs; labelKey: string }[] = [
  { key: "background", labelKey: "prefBackground" },
  { key: "family", labelKey: "prefFamily" },
  { key: "income", labelKey: "prefIncome" },
  { key: "hobbies", labelKey: "prefHobbies" },
  { key: "partnerExpectations", labelKey: "prefPartner" },
];

interface SectionPrefsPanelProps {
  locale: Locale;
  prefs: SectionPrefs;
  onChange: (prefs: SectionPrefs) => void;
}

export function SectionPrefsPanel({ locale, prefs, onChange }: SectionPrefsPanelProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-stone-800">{t(locale, "sectionPrefsTitle")}</h3>
      <p className="mt-1 text-xs text-stone-500">{t(locale, "sectionPrefsHint")}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {TOGGLE_KEYS.map(({ key, labelKey }) => {
          const on = prefs[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange({ ...prefs, [key]: !on })}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                on
                  ? "bg-rose-100 text-rose-800 ring-1 ring-rose-200"
                  : "bg-stone-100 text-stone-500 ring-1 ring-stone-200"
              }`}
            >
              {on ? "✓ " : ""}
              {t(locale, labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
