import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import { getPosts, getCategories } from "@/lib/data/posts";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { PostList } from "@/components/blog/PostList";
import type { Locale, Category } from "@/lib/data/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const title = locale === "zh" ? "博客" : "Blog";
  return {
    title,
    description:
      locale === "zh"
        ? "AI 产品分析、行业洞察和项目复盘"
        : "AI product analysis, industry insights, and project reviews",
    alternates: {
      languages: {
        zh: `${siteConfig.url}/zh/blog`,
        en: `${siteConfig.url}/en/blog`,
      },
    },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(locale as Locale);
  const allPosts = await getPosts(locale as Locale);
  const categories = await getCategories(locale as Locale);

  const categoryFilter = resolvedSearchParams.category as Category | undefined;
  const filteredPosts = categoryFilter
    ? allPosts.filter((p) => p.category === categoryFilter)
    : allPosts;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">{dict.blog.title}</h1>
      <Suspense fallback={null}>
        <CategoryFilter
          categories={categories}
          allLabel={dict.blog.all}
          locale={locale}
        />
      </Suspense>
      <PostList
        posts={filteredPosts}
        locale={locale as Locale}
        minReadLabel={dict.blog.minRead}
      />
    </div>
  );
}
