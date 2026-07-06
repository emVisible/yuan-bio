"use client";

import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/i18n";

export default function TermsPage() {
  const { locale } = useLocale();
  const isZh = locale === "zh";

  return (
    <PageShell narrow>
      <article className="prose prose-stone max-w-none py-4">
        <h1>{t(locale, "terms")}</h1>
        <p className="text-sm text-stone-500">Last updated: 2026-07-06</p>

        {isZh ? (
          <>
            <p>使用缘简（YuanBio）即表示您同意本条款。本服务提供免费的婚恋简历 PDF 制作工具，供个人相亲用途。</p>
            <ul>
              <li>
                <strong>免费服务：</strong>所有模板、PDF 导出与 AI 撰写功能均免费提供。
              </li>
              <li>
                <strong>不保证结果：</strong>我们不对相亲结果作任何保证。您须对发布信息的真实性负责。
              </li>
              <li>
                <strong>广告：</strong>本站通过 Google AdSense 展示广告以维持运营。
              </li>
            </ul>
          </>
        ) : (
          <>
            <p>
              By using YuanBio you agree to these terms. The service provides free marriage
              biodata PDF tools for personal matchmaking.
            </p>
            <ul>
              <li>
                <strong>Free service:</strong> All templates, PDF exports, and AI writing are free.
              </li>
              <li>
                <strong>No guarantees:</strong> We do not guarantee matchmaking outcomes. You are
                responsible for accuracy of your information.
              </li>
              <li>
                <strong>Advertising:</strong> The site is supported by Google AdSense ads.
              </li>
            </ul>
          </>
        )}
        <p>
          <Link href="/" className="text-rose-600">
            ← {t(locale, "backHome")}
          </Link>
        </p>
      </article>
    </PageShell>
  );
}
