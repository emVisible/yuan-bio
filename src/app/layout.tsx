import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AdSenseScript } from "@/components/AdSenseScript";
import { WebAppJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import { LocaleProvider } from "@/components/LocaleProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

function buildSiteVerification(): Metadata["verification"] | undefined {
  const verification: NonNullable<Metadata["verification"]> = {};
  const other: Record<string, string> = {};

  if (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) {
    verification.google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  }
  if (process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION) {
    other["msvalidate.01"] = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  }
  if (Object.keys(other).length > 0) {
    verification.other = other;
  }

  return Object.keys(verification).length > 0 ? verification : undefined;
}

const siteVerification = buildSiteVerification();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "缘简 YuanBio — 海外华人相亲简历制作器 | Free Marriage Biodata PDF",
    template: "%s | 缘简 YuanBio",
  },
  description:
    "免费在线制作海外华人相亲简历 PDF 与名片图。多款模板、无需注册，适合相亲群、论坛与家长介绍。Free marriage biodata maker for overseas Chinese.",
  keywords: [
    "华人相亲简历",
    "marriage biodata",
    "overseas chinese dating",
    "chinese marriage profile",
    "相亲简历模板",
    "biodata PDF",
    "海外华人相亲",
  ],
  openGraph: {
    title: "缘简 YuanBio — Free Marriage Biodata for Overseas Chinese",
    description: "Create a professional matchmaking biodata PDF in 5 minutes. 100% free, no signup.",
    type: "website",
    url: SITE_URL,
    siteName: "缘简 YuanBio",
    locale: "zh_CN",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "缘简 YuanBio — Free Marriage Biodata PDF",
    description: "Professional matchmaking biodata for overseas Chinese. Free templates.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  ...(siteVerification ? { verification: siteVerification } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className={`${geist.variable} h-full antialiased`}>
      <head>
        <WebsiteJsonLd />
        <WebAppJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        <AdSenseScript />
        <LocaleProvider>
          <ToastProvider>{children}</ToastProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
