"use client";

import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/i18n";

export default function PrivacyPage() {
  const { locale } = useLocale();
  const isZh = locale === "zh";

  return (
    <PageShell narrow>
      <article className="prose prose-stone max-w-none py-4">
        <h1>{t(locale, "privacy")}</h1>
        <p className="text-sm text-stone-500">Last updated: 2026-07-06</p>

        {isZh ? (
          <>
            <p>
              缘简（YuanBio）以隐私优先为设计原则。您的婚恋简历表单数据和照片默认保存在浏览器本地（localStorage），我们不提供账号系统，也不会默认将您的个人信息上传至服务器。
            </p>
            <ul>
              <li>
                <strong>本地存储：</strong>草稿保存在浏览器中，方便您继续编辑。
              </li>
              <li>
                <strong>分享链接：</strong>链接中不含照片，且资料经压缩编码在 URL 中。拥有链接的人均可查看文字信息，请仅分享给信任的对象。
              </li>
              <li>
                <strong>广告：</strong>本站可能展示 Google AdSense 广告。Google 可能使用 Cookie 提供个性化广告，详见 Google 隐私政策。
              </li>
            </ul>
            <p>如有疑问，请联系：hello@matchbiodata.com</p>
          </>
        ) : (
          <>
            <p>
              YuanBio is designed with privacy first. Your biodata and photos stay in your
              browser by default. We do not require accounts and do not upload your personal
              information to our servers.
            </p>
            <ul>
              <li>
                <strong>Local storage:</strong> Drafts are saved in your browser.
              </li>
              <li>
                <strong>Share links:</strong> Photos are excluded; text data is encoded in the URL.
                Only share with people you trust.
              </li>
              <li>
                <strong>Advertising:</strong> We may show Google AdSense ads. Google may use cookies
                for personalized ads — see Google&apos;s Privacy Policy.
              </li>
            </ul>
            <p>Contact: hello@matchbiodata.com</p>
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
