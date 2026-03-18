import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, formatDate, calculateReadingTime } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import {
  getPostBySlug,
  getAdjacentPosts,
  hasTranslation,
  getAllPublishedSlugs,
} from "@/lib/data/posts";
import { RichContent } from "@/components/blog/content/RichContent";
import { DesktopTOC, MobileTOC } from "@/components/blog/TableOfContents";
import { AdjacentPosts } from "@/components/blog/AdjacentPosts";
import type { Locale, HeadingBlock } from "@/lib/data/types";

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map(({ slug, locale }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const post = await getPostBySlug(slug, locale as Locale);
  if (!post) return {};

  const otherLocale = locale === "zh" ? "en" : "zh";

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      languages: {
        zh: `${siteConfig.url}/zh/blog/${slug}`,
        en: `${siteConfig.url}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteConfig.url}/${locale}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: otherLocale === "zh" ? "zh_CN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const post = await getPostBySlug(slug, typedLocale);
  if (!post) notFound();

  const dict = await getDictionary(typedLocale);
  const otherLocale = typedLocale === "zh" ? "en" : "zh";
  const hasOtherLang = await hasTranslation(slug, otherLocale);
  const { prev, next } = await getAdjacentPosts(slug, typedLocale);

  // Extract headings for TOC (level 2 and 3 only, skip level 1)
  const tocItems = post.content
    .filter(
      (b): b is HeadingBlock =>
        b.type === "heading" && (b.level === 2 || b.level === 3)
    )
    .map((b) => ({ id: b.id, text: b.text, level: b.level }));

  const readingTime = calculateReadingTime(post.content, typedLocale);

  return (
    <article className="max-w-5xl mx-auto px-6 py-16">
      {/* Article header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)] mb-4">
          <time>{formatDate(post.date, typedLocale)}</time>
          <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
          <span className="px-2 py-0.5 border border-[var(--border)] rounded text-xs">
            {post.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
          <span>
            {readingTime} {dict.blog.minRead}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {post.title}
        </h1>
        <div className="mt-4">
          {hasOtherLang ? (
            <Link
              href={`/${otherLocale}/blog/${slug}`}
              className="text-sm text-accent hover:text-accent-light transition-colors"
            >
              {dict.blog.readInOther}
            </Link>
          ) : (
            <span className="text-sm text-[var(--text-secondary)]">
              {dict.blog.noTranslation}
            </span>
          )}
        </div>
      </header>

      {/* Mobile TOC: between header and content, only visible below lg */}
      <MobileTOC items={tocItems} tocLabel={dict.blog.toc} />

      {/* Content + Desktop TOC sidebar */}
      <div className="flex gap-10">
        <div className="flex-1 min-w-0">
          <RichContent blocks={post.content} />
          <AdjacentPosts
            prev={prev}
            next={next}
            locale={typedLocale}
            prevLabel={dict.blog.prev}
            nextLabel={dict.blog.next}
          />
        </div>
        <DesktopTOC items={tocItems} tocLabel={dict.blog.toc} />
      </div>
    </article>
  );
}
