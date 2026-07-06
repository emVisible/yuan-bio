"use client";

import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { useLocale } from "./LocaleProvider";
import { t } from "@/lib/i18n";

export function PageShell({
  children,
  narrow = false,
}: {
  children: React.ReactNode;
  narrow?: boolean;
}) {
  const { locale } = useLocale();

  return (
    <>
      <SiteHeader />
      <div className={narrow ? "mx-auto max-w-3xl px-4 py-8" : undefined}>{children}</div>
      <footer className="mt-auto border-t border-stone-200 py-8 text-center text-sm text-stone-500">
        <Link href="/privacy" className="hover:text-rose-600">
          {t(locale, "privacy")}
        </Link>
        <span className="mx-2">·</span>
        <Link href="/terms" className="hover:text-rose-600">
          {t(locale, "terms")}
        </Link>
        <span className="mx-2">·</span>
        <Link href="/guides" className="hover:text-rose-600">
          {t(locale, "guides")}
        </Link>
      </footer>
    </>
  );
}
