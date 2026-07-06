"use client";

import type { CardElementPrefs } from "@/lib/card-element-prefs";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/i18n";

const TOGGLE_KEYS: { key: keyof CardElementPrefs; labelKey: string }[] = [
  { key: "photo", labelKey: "cardShowPhoto" },
  { key: "about", labelKey: "cardShowAbout" },
  { key: "contact", labelKey: "cardShowContact" },
];

interface CardElementPrefsPanelProps {
  locale: Locale;
  prefs: CardElementPrefs;
  layoutEditing: boolean;
  onChange: (prefs: CardElementPrefs) => void;
}

export function CardElementPrefsPanel({
  locale,
  prefs,
  layoutEditing,
  onChange,
}: CardElementPrefsPanelProps) {
  return (
    <div
      className={`rounded-xl border p-4 shadow-sm transition ${
        layoutEditing
          ? "border-violet-200 bg-violet-50/50"
          : "border-stone-200 bg-stone-50/80 opacity-90"
      }`}
    >
      <h3 className="text-sm font-bold text-stone-800">{t(locale, "cardElementPrefsTitle")}</h3>
      <p className="mt-1 text-xs text-stone-500">
        {layoutEditing ? t(locale, "cardElementPrefsHint") : t(locale, "cardElementPrefsLockedHint")}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {TOGGLE_KEYS.map(({ key, labelKey }) => {
          const on = prefs[key];
          return (
            <button
              key={key}
              type="button"
              disabled={!layoutEditing}
              onClick={() => layoutEditing && onChange({ ...prefs, [key]: !on })}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                !layoutEditing
                  ? "cursor-not-allowed bg-stone-100 text-stone-400 ring-1 ring-stone-200"
                  : on
                    ? "bg-violet-100 text-violet-800 ring-1 ring-violet-200"
                    : "bg-white text-stone-500 ring-1 ring-stone-200 hover:ring-violet-200"
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
