import type { MetadataRoute } from "next";
import { getAllSeoSlugs } from "@/lib/seo-pages";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://matchbiodata.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllSeoSlugs().map((slug) => ({
    url: `${BASE}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/create`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...guides,
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
