import type { MetadataRoute } from "next";
import { getAllSeoSlugs } from "@/lib/seo-pages";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllSeoSlugs().map((slug) => ({
    url: absoluteUrl(`/guides/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/create"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/guides"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...guides,
    { url: absoluteUrl("/privacy"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
