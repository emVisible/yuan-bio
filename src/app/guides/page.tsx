"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { GuideSearch } from "@/components/GuideSearch";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/i18n";

function GuidesContent() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  return (
    <>
      <Link href="/" className="text-sm text-rose-600 hover:underline">
        ← {t(locale, "backHome")}
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{t(locale, "guides")}</h1>
      <p className="mt-2 text-stone-600">
        {locale === "zh"
          ? "为海外华人相亲场景撰写的写作指南，配合缘简免费在线工具使用。"
          : "Writing guides for overseas Chinese matchmaking, paired with the free YuanBio maker."}
      </p>
      <GuideSearch locale={locale} initialQuery={initialQuery} />
      <div className="mt-10 text-center">
        <Link
          href="/create"
          className="inline-block rounded-full bg-rose-600 px-6 py-3 text-white hover:bg-rose-700"
        >
          {t(locale, "startFree")}
        </Link>
      </div>
      <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES ?? "guides-footer"} className="mt-10" />
    </>
  );
}

export default function GuidesIndexPage() {
  return (
    <PageShell narrow>
      <Suspense fallback={<p className="py-8 text-stone-500">Loading…</p>}>
        <GuidesContent />
      </Suspense>
    </PageShell>
  );
}
