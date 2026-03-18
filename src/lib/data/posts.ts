import type { Post, Locale, Category } from "./types";
import { isNotionConfigured } from "@/lib/notion/client";
import { mockPosts } from "./mock/posts";

function getMockPosts(locale: Locale): Post[] {
  return mockPosts
    .filter((p) => p.language === locale && p.status === "Published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function getMockPostBySlug(slug: string, locale: Locale): Post | null {
  return (
    mockPosts.find(
      (p) =>
        p.slug === slug && p.language === locale && p.status === "Published"
    ) ?? null
  );
}

function getMockAllSlugs(): { slug: string; locale: Locale }[] {
  return mockPosts
    .filter((p) => p.status === "Published")
    .map((p) => ({ slug: p.slug, locale: p.language }));
}

// Try Notion, fall back to mock on any error (network, auth, etc.)
async function fetchPosts(locale: Locale): Promise<Post[]> {
  if (isNotionConfigured) {
    try {
      const { getNotionPosts } = await import("@/lib/notion/posts");
      return await getNotionPosts(locale);
    } catch (e) {
      console.warn("Notion fetch failed, using mock data:", (e as Error).message);
    }
  }
  return getMockPosts(locale);
}

async function fetchPostBySlug(
  slug: string,
  locale: Locale
): Promise<Post | null> {
  if (isNotionConfigured) {
    try {
      const { getNotionPostBySlug } = await import("@/lib/notion/posts");
      return await getNotionPostBySlug(slug, locale);
    } catch (e) {
      console.warn("Notion fetch failed, using mock data:", (e as Error).message);
    }
  }
  return getMockPostBySlug(slug, locale);
}

async function fetchAllPublishedSlugs(): Promise<
  { slug: string; locale: Locale }[]
> {
  if (isNotionConfigured) {
    try {
      const { getAllNotionPublishedSlugs } = await import("@/lib/notion/posts");
      return await getAllNotionPublishedSlugs();
    } catch (e) {
      console.warn("Notion fetch failed, using mock data:", (e as Error).message);
    }
  }
  return getMockAllSlugs();
}

// ─── Public API (unchanged signatures) ───

export async function getPosts(locale: Locale): Promise<Post[]> {
  return fetchPosts(locale);
}

export async function getLatestPosts(
  locale: Locale,
  count: number = 4
): Promise<Post[]> {
  const posts = await getPosts(locale);
  return posts.slice(0, count);
}

export async function getPostBySlug(
  slug: string,
  locale: Locale
): Promise<Post | null> {
  return fetchPostBySlug(slug, locale);
}

export async function getPostSlugs(locale: Locale): Promise<string[]> {
  const posts = await getPosts(locale);
  return posts.map((p) => p.slug);
}

export async function getCategories(locale: Locale): Promise<Category[]> {
  const posts = await getPosts(locale);
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories);
}

export async function getAdjacentPosts(
  slug: string,
  locale: Locale
): Promise<{ prev: Post | null; next: Post | null }> {
  const posts = await getPosts(locale);
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export async function hasTranslation(
  slug: string,
  targetLocale: Locale
): Promise<boolean> {
  const post = await getPostBySlug(slug, targetLocale);
  return post !== null;
}

export async function getAllPublishedSlugs(): Promise<
  { slug: string; locale: Locale }[]
> {
  return fetchAllPublishedSlugs();
}
