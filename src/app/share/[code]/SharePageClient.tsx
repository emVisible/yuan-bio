"use client";

import Link from "next/link";
import { use } from "react";
import { PageShell } from "@/components/PageShell";
import { BiodataPreview } from "@/components/BiodataPreview";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/i18n";
import { mergeCardLayout, mergeResumeLayout } from "@/lib/layout-settings";
import { DEFAULT_CARD_ELEMENT_PREFS } from "@/lib/card-element-prefs";
import { DEFAULT_SECTION_PREFS } from "@/lib/section-prefs";
import { decodeSharePayload } from "@/lib/share";

export default function SharePageClient({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  const { locale } = useLocale();
  const state = decodeSharePayload(decodeURIComponent(code));

  if (!state) {
    return (
      <PageShell narrow>
        <div className="py-16 text-center">
          <p className="text-stone-600">{t(locale, "invalidShareLink")}</p>
          <Link href="/create" className="mt-4 inline-block text-rose-600 underline">
            {t(locale, "createYourOwn")}
          </Link>
        </div>
      </PageShell>
    );
  }

  const viewLocale = state.locale ?? locale;

  return (
    <PageShell narrow>
      <h1 className="text-xl font-bold">{t(viewLocale, "sharedBiodata")}</h1>
      <p className="mt-1 text-sm text-stone-500">{t(viewLocale, "shareNoPhoto")}</p>
      <div className="mt-6">
        <BiodataPreview
          data={state.data}
          resumeTemplateId={state.resumeTemplateId}
          cardTemplateId={state.cardTemplateId}
          locale={viewLocale}
          sectionPrefs={state.sectionPrefs ?? DEFAULT_SECTION_PREFS}
          resumeLayout={mergeResumeLayout(state.resumeLayout, state.resumeTemplateId)}
          cardLayout={mergeCardLayout(state.cardLayout, state.cardTemplateId)}
          cardElementPrefs={state.cardElementPrefs ?? DEFAULT_CARD_ELEMENT_PREFS}
          mode="resume"
        />
      </div>
      <p className="mt-6 text-center text-sm">
        <Link href="/create" className="text-rose-600 hover:underline">
          {t(viewLocale, "createYourOwn")}
        </Link>
      </p>
    </PageShell>
  );
}
