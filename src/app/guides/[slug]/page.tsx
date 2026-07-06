import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GuideArticleJsonLd } from "@/components/JsonLd";
import { GuidePageClient } from "@/components/GuidePageClient";
import { getAllSeoSlugs, getSeoPage } from "@/lib/seo-pages";

export function generateStaticParams() {
  return getAllSeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};
  return {
    title: page.titleZh,
    description: page.descriptionZh,
    keywords: page.keywords,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      title: page.titleEn,
      description: page.descriptionEn,
      type: "article",
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  return (
    <>
      <GuideArticleJsonLd
        slug={slug}
        title={page.titleEn}
        description={page.descriptionEn}
      />
      <GuidePageClient page={page} />
    </>
  );
}
