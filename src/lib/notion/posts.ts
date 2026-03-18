import { notion, POSTS_DATABASE_ID } from "./client";
import { getPageContent } from "./blocks";
import type { Post, Locale, Category, PostStatus } from "@/lib/data/types";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

/**
 * Find a property by name (case-insensitive) from a Notion page
 */
function findProp(props: PageObjectResponse["properties"], name: string) {
  // Try exact match first, then case-insensitive
  if (props[name]) return props[name];
  const key = Object.keys(props).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return key ? props[key] : undefined;
}

/** Normalize language value: "Zh"/"zh"/"ZH" → "zh" */
function normalizeLocale(val: string): Locale {
  const lower = val.toLowerCase();
  if (lower === "zh" || lower === "en") return lower as Locale;
  return "zh";
}

/** Normalize status value: "published"/"Published" → "Published" */
function normalizeStatus(val: string): PostStatus {
  if (val.toLowerCase() === "published") return "Published";
  return "Draft";
}

function extractPostProps(page: PageObjectResponse): Omit<Post, "content"> {
  const props = page.properties;

  const titleProp = findProp(props, "Title");
  const title =
    titleProp?.type === "title"
      ? titleProp.title.map((t) => t.plain_text).join("")
      : "";

  const slugProp = findProp(props, "Slug");
  const slug =
    slugProp?.type === "rich_text"
      ? slugProp.rich_text.map((t) => t.plain_text).join("")
      : "";

  const langProp = findProp(props, "Language");
  const language =
    langProp?.type === "select" && langProp.select?.name
      ? normalizeLocale(langProp.select.name)
      : "zh";

  const statusProp = findProp(props, "Status");
  const status =
    statusProp?.type === "select" && statusProp.select?.name
      ? normalizeStatus(statusProp.select.name)
      : "Draft";

  const catProp = findProp(props, "Category");
  const category =
    catProp?.type === "select"
      ? (catProp.select?.name as Category) ?? "AI Product Analysis"
      : "AI Product Analysis";

  const tagsProp = findProp(props, "Tags");
  const tags =
    tagsProp?.type === "multi_select"
      ? tagsProp.multi_select.map((t) => t.name)
      : [];

  const summaryProp = findProp(props, "Summary");
  const summary =
    summaryProp?.type === "rich_text"
      ? summaryProp.rich_text.map((t) => t.plain_text).join("")
      : "";

  const dateProp = findProp(props, "Date");
  const date =
    dateProp?.type === "date" ? dateProp.date?.start ?? "" : "";

  const coverProp = findProp(props, "Cover");
  let cover: string | undefined;
  if (coverProp?.type === "files" && coverProp.files.length > 0) {
    const file = coverProp.files[0];
    cover =
      file.type === "file"
        ? file.file.url
        : file.type === "external"
          ? file.external.url
          : undefined;
  }

  return {
    id: page.id,
    title,
    slug,
    language,
    status,
    category,
    tags,
    summary,
    date,
    cover,
  };
}

/**
 * Fetch ALL posts from Notion (no filter), then filter in code.
 * This avoids issues with select option casing mismatches.
 */
async function fetchAllPosts(): Promise<Post[]> {
  const allPages: PageObjectResponse[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.databases.query({
      database_id: POSTS_DATABASE_ID,
      start_cursor: cursor,
    });
    allPages.push(...(response.results as PageObjectResponse[]));
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  const posts: Post[] = [];
  for (const page of allPages) {
    const props = extractPostProps(page);
    const content = await getPageContent(page.id);
    posts.push({ ...props, content });
  }
  return posts;
}

// ─── Exported API ───

export async function getNotionPosts(locale: Locale): Promise<Post[]> {
  const all = await fetchAllPosts();
  return all
    .filter((p) => p.language === locale && p.status === "Published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNotionPostBySlug(
  slug: string,
  locale: Locale
): Promise<Post | null> {
  const all = await fetchAllPosts();
  return (
    all.find(
      (p) =>
        p.slug === slug && p.language === locale && p.status === "Published"
    ) ?? null
  );
}

export async function getAllNotionPublishedSlugs(): Promise<
  { slug: string; locale: Locale }[]
> {
  const all = await fetchAllPosts();
  return all
    .filter((p) => p.status === "Published")
    .map((p) => ({ slug: p.slug, locale: p.language }));
}
