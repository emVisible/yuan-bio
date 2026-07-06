"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/i18n";
import { SEO_PAGES } from "@/lib/seo-pages";

interface GuideSearchProps {
  locale: Locale;
  initialQuery?: string;
}

export function GuideSearch({ locale, initialQuery = "" }: GuideSearchProps) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEO_PAGES;

    return SEO_PAGES.filter((page) => {
      const title = locale === "zh" ? page.titleZh : page.titleEn;
      const desc = locale === "zh" ? page.descriptionZh : page.descriptionEn;
      const keywords = page.keywords.join(" ");
      const haystack = `${title} ${desc} ${keywords} ${page.slug}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, locale]);

  return (
    <div className="mt-6">
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-stone-700">{t(locale, "searchGuides")}</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t(locale, "searchGuidesPlaceholder")}
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        />
      </label>
      {query && (
        <p className="mt-2 text-xs text-stone-500">
          {t(locale, "searchResultsCount").replace("{n}", String(results.length))}
        </p>
      )}
      <ul className="mt-6 space-y-3">
        {results.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/guides/${page.slug}`}
              className="block rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition hover:border-rose-300 hover:shadow"
            >
              <span className="font-medium text-stone-900">
                {locale === "zh" ? page.titleZh : page.titleEn}
              </span>
              <span className="mt-1 block text-sm text-stone-500">
                {locale === "zh" ? page.descriptionZh : page.descriptionEn}
              </span>
            </Link>
          </li>
        ))}
        {results.length === 0 && (
          <li className="rounded-lg border border-dashed border-stone-200 p-8 text-center text-sm text-stone-500">
            {t(locale, "searchNoResults")}
          </li>
        )}
      </ul>
    </div>
  );
}
