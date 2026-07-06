"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "./LocaleProvider";
import { DEFAULT_AVATAR_URL } from "@/lib/site";
import { t } from "@/lib/i18n";

export function SiteHeader() {
  const { locale, setLocale } = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:py-4">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2.5">
          <Image
            src={DEFAULT_AVATAR_URL}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-lg shadow-sm ring-1 ring-rose-100"
            priority
          />
          <span className="min-w-0">
            <span className="block truncate text-base font-bold text-rose-700 sm:text-lg">
              {t(locale, "siteName")}
            </span>
            <span className="hidden truncate text-xs text-stone-500 sm:block">
              {t(locale, "tagline")}
            </span>
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link
            href="/guides"
            className="hidden text-sm text-stone-600 hover:text-rose-700 sm:inline"
          >
            {t(locale, "guides")}
          </Link>
          <Link
            href="/create"
            className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700 sm:px-4 sm:py-2 sm:text-sm"
          >
            {t(locale, "startCreating")}
          </Link>
          <button
            type="button"
            onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
            className="rounded-full border border-stone-200 px-2.5 py-1 text-xs text-stone-600 hover:border-rose-300 sm:px-3 sm:py-1.5 sm:text-sm"
            aria-label="Language"
          >
            {locale === "zh" ? "EN" : "中文"}
          </button>
        </nav>
      </div>
    </header>
  );
}
