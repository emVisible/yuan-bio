"use client";

import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SiteHeader } from "@/components/SiteHeader";
import { BiodataPreview } from "@/components/BiodataPreview";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/i18n";
import { applyCanvasFlush } from "@/lib/canvas/reflow-state";
import { defaultResumeLayout, defaultCardLayout } from "@/lib/layout-settings";
import { DEFAULT_CARD_ELEMENT_PREFS } from "@/lib/card-element-prefs";
import { DEFAULT_SECTION_PREFS } from "@/lib/section-prefs";
import { getSampleBiodata } from "@/lib/sample-data";

export default function HomePage() {
  const { locale } = useLocale();
  const sample = getSampleBiodata(locale);
  const previewState = applyCanvasFlush({
    data: sample,
    resumeTemplateId: "traditional",
    cardTemplateId: "minimal",
    locale,
    sectionPrefs: DEFAULT_SECTION_PREFS,
    cardElementPrefs: DEFAULT_CARD_ELEMENT_PREFS,
    resumeLayout: defaultResumeLayout("traditional"),
    cardLayout: defaultCardLayout("minimal"),
  });

  const features = [
    { title: t(locale, "noLogin"), desc: t(locale, "featureNoLoginDesc") },
    { title: t(locale, "privacyFirst"), desc: t(locale, "featurePrivacyDesc") },
    { title: t(locale, "bilingual"), desc: t(locale, "featureBilingualDesc") },
    { title: t(locale, "completelyFree"), desc: t(locale, "featureFreeDesc") },
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-rose-100 bg-gradient-to-b from-rose-50/60 via-white to-stone-50">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:py-16">
            <div className="text-center lg:text-left">
              <p className="mb-3 inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-800">
                {t(locale, "poweredBy")}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                {t(locale, "heroTitle")}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
                {t(locale, "heroSubtitle")}
              </p>
              <p className="mt-2 text-sm font-medium text-emerald-700">{t(locale, "freeForever")}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href="/create"
                  className="rounded-full bg-rose-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-rose-200/80 hover:bg-rose-700"
                >
                  {t(locale, "startCreating")}
                </Link>
                <Link
                  href="/guides"
                  className="rounded-full border border-stone-300 bg-white px-7 py-3.5 font-semibold text-stone-700 hover:bg-stone-50"
                >
                  {t(locale, "viewGuides")}
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <BiodataPreview
                data={sample}
                resumeTemplateId="traditional"
                cardTemplateId="minimal"
                locale={locale}
                sectionPrefs={DEFAULT_SECTION_PREFS}
                resumeLayout={previewState.resumeLayout}
                cardLayout={defaultCardLayout("minimal")}
                cardElementPrefs={DEFAULT_CARD_ELEMENT_PREFS}
                mode="resume"
                fixedWidth={280}
                className="shadow-xl shadow-rose-100/50"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-stone-200 bg-white py-10">
          <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-stone-100 p-5 text-center shadow-sm"
              >
                <h3 className="font-semibold text-rose-700">{f.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-center text-2xl font-bold">{t(locale, "threeSteps")}</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {[t(locale, "stepForm"), t(locale, "stepTemplate"), t(locale, "stepExport")].map(
              (stepLabel, i) => (
                <li
                  key={stepLabel}
                  className="rounded-xl border border-stone-200 bg-white p-6 text-center shadow-sm"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-lg font-bold text-rose-700">
                    {i + 1}
                  </span>
                  <p className="mt-3 font-medium">{stepLabel}</p>
                </li>
              ),
            )}
          </ol>
          <div className="mt-10 text-center">
            <Link
              href="/create"
              className="inline-block rounded-full bg-rose-600 px-8 py-3 font-semibold text-white hover:bg-rose-700"
            >
              {t(locale, "startFree")}
            </Link>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4">
          <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "home-footer"} />
        </div>

        <footer className="border-t border-stone-200 py-8 text-center text-sm text-stone-500">
          <Link href="/privacy" className="hover:text-rose-600">
            {t(locale, "privacy")}
          </Link>
          <span className="mx-2">·</span>
          <Link href="/terms" className="hover:text-rose-600">
            {t(locale, "terms")}
          </Link>
        </footer>
      </main>
    </>
  );
}
