import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { getAllPublishedSlugs } from "@/lib/data/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPublishedSlugs();

  const staticPages = ["", "/blog", "/projects", "/about"];
  const locales = ["zh", "en"];

  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${siteConfig.url}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1.0 : 0.8,
    }))
  );

  const postUrls = slugs.map(({ slug, locale }) => ({
    url: `${siteConfig.url}/${locale}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...postUrls];
}
