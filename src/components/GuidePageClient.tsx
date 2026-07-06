"use client";

import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { PageShell } from "@/components/PageShell";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/i18n";
import type { SeoPage } from "@/lib/seo-pages";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-stone-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function renderMarkdownish(text: string) {
  return text.split("\n\n").map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.includes("\n")) {
      return (
        <h2 key={i} className="mt-8 text-xl font-bold text-stone-900 first:mt-0">
          {trimmed.slice(2, -2)}
        </h2>
      );
    }

    const lines = trimmed.split("\n");
    if (lines.every((line) => /^[-•]/.test(line.trim()) || /^\d+\./.test(line.trim()))) {
      return (
        <ul key={i} className="mt-4 list-disc space-y-2 pl-5 text-stone-700">
          {lines.map((line, j) => (
            <li key={j} className="leading-relaxed">
              {renderInline(line.replace(/^[-•]\s*/, "").replace(/^\d+\.\s*/, ""))}
            </li>
          ))}
        </ul>
      );
    }

    if (trimmed.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          className="mt-4 border-l-4 border-rose-200 bg-rose-50/60 py-2 pl-4 text-stone-700 italic"
        >
          {renderInline(trimmed.replace(/^>\s*/, ""))}
        </blockquote>
      );
    }

    return (
      <p key={i} className="mt-4 leading-relaxed text-stone-700">
        {renderInline(trimmed)}
      </p>
    );
  });
}

export function GuidePageClient({ page }: { page: SeoPage }) {
  const { locale } = useLocale();
  const title = locale === "zh" ? page.titleZh : page.titleEn;
  const description = locale === "zh" ? page.descriptionZh : page.descriptionEn;
  const content = locale === "zh" ? page.contentZh : page.contentEn;

  return (
    <PageShell narrow>
      <Link href="/guides" className="text-sm text-rose-600 hover:underline">
        ← {t(locale, "allGuides")}
      </Link>
      <article className="mt-4">
        <h1 className="text-3xl font-bold text-stone-900">{title}</h1>
        <p className="mt-3 text-base leading-relaxed text-stone-600">{description}</p>
        <div className="mt-8">{renderMarkdownish(content)}</div>
      </article>
      <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE ?? "guide-inline"} className="mt-8" />
      <div className="mt-12 rounded-xl bg-rose-50 p-6 text-center">
        <p className="font-medium text-rose-900">{t(locale, "readyToCreate")}</p>
        <Link
          href="/create"
          className="mt-4 inline-block rounded-full bg-rose-600 px-6 py-3 text-white hover:bg-rose-700"
        >
          {t(locale, "startFree")}
        </Link>
      </div>
    </PageShell>
  );
}
