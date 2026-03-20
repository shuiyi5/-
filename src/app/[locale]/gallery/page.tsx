import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import { getGalleryItems, getGalleryTypes } from "@/lib/data/gallery";
import { GalleryFilter } from "@/components/gallery/GalleryFilter";
import { GalleryCard } from "@/components/gallery/GalleryCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Locale, GalleryItemType } from "@/lib/data/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return {
    title: locale === "zh" ? "作品集" : "Gallery",
    description:
      locale === "zh"
        ? "图片、音乐、视频等创作作品展示"
        : "Creative works including images, music, and videos",
    alternates: {
      languages: {
        zh: `${siteConfig.url}/zh/gallery`,
        en: `${siteConfig.url}/en/gallery`,
      },
    },
  };
}

export default async function GalleryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(locale as Locale);
  const allItems = await getGalleryItems(locale as Locale);
  const types = await getGalleryTypes(locale as Locale);

  const typeFilter = resolvedSearchParams.type as GalleryItemType | undefined;
  const filteredItems = typeFilter
    ? allItems.filter((item) => item.type === typeFilter)
    : allItems;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2 gradient-text-subtle">
        {dict.gallery.title}
      </h1>
      <p className="text-[var(--text-secondary)] mb-8">
        {dict.gallery.subtitle}
      </p>

      <Suspense fallback={null}>
        <GalleryFilter
          types={types}
          allLabel={dict.blog.all}
          locale={locale}
        />
      </Suspense>

      {filteredItems.length === 0 ? (
        <p className="py-12 text-center text-[var(--text-secondary)]">
          {locale === "zh" ? "暂无作品" : "No works yet"}
        </p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredItems.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 60}>
              <div className="break-inside-avoid">
                <GalleryCard item={item} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
