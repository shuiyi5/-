import { notion, POSTS_DATABASE_ID } from "./client";
import { getPageContent } from "./blocks";
import type { Post, Locale, Category, PostStatus } from "@/lib/data/types";
import type {
  PageObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * Helper to safely extract Notion page properties
 */
function extractPostProps(page: PageObjectResponse): Omit<Post, "content"> {
  const props = page.properties;

  // Title
  const titleProp = props["Title"];
  const title =
    titleProp?.type === "title"
      ? titleProp.title.map((t) => t.plain_text).join("")
      : "";

  // Slug
  const slugProp = props["Slug"];
  const slug =
    slugProp?.type === "rich_text"
      ? slugProp.rich_text.map((t) => t.plain_text).join("")
      : "";

  // Language
  const langProp = props["Language"];
  const language =
    langProp?.type === "select"
      ? (langProp.select?.name as Locale) ?? "zh"
      : "zh";

  // Status
  const statusProp = props["Status"];
  const status =
    statusProp?.type === "select"
      ? (statusProp.select?.name as PostStatus) ?? "Draft"
      : "Draft";

  // Category
  const catProp = props["Category"];
  const category =
    catProp?.type === "select"
      ? (catProp.select?.name as Category) ?? "AI Product Analysis"
      : "AI Product Analysis";

  // Tags
  const tagsProp = props["Tags"];
  const tags =
    tagsProp?.type === "multi_select"
      ? tagsProp.multi_select.map((t) => t.name)
      : [];

  // Summary
  const summaryProp = props["Summary"];
  const summary =
    summaryProp?.type === "rich_text"
      ? summaryProp.rich_text.map((t) => t.plain_text).join("")
      : "";

  // Date
  const dateProp = props["Date"];
  const date =
    dateProp?.type === "date" ? dateProp.date?.start ?? "" : "";

  // Cover
  const coverProp = props["Cover"];
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
 * Query the Posts database with optional filters
 */
async function queryPosts(
  filter?: QueryDatabaseParameters["filter"]
): Promise<Post[]> {
  const response = await notion.databases.query({
    database_id: POSTS_DATABASE_ID,
    filter,
    sorts: [{ property: "Date", direction: "descending" }],
  });

  const posts: Post[] = [];
  for (const page of response.results) {
    const p = page as PageObjectResponse;
    const props = extractPostProps(p);
    const content = await getPageContent(p.id);
    posts.push({ ...props, content });
  }

  return posts;
}

// ─── Exported API (same signatures as mock version) ───

export async function getNotionPosts(locale: Locale): Promise<Post[]> {
  return queryPosts({
    and: [
      { property: "Language", select: { equals: locale } },
      { property: "Status", select: { equals: "Published" } },
    ],
  });
}

export async function getNotionPostBySlug(
  slug: string,
  locale: Locale
): Promise<Post | null> {
  const posts = await queryPosts({
    and: [
      { property: "Slug", rich_text: { equals: slug } },
      { property: "Language", select: { equals: locale } },
      { property: "Status", select: { equals: "Published" } },
    ],
  });
  return posts[0] ?? null;
}

export async function getAllNotionPublishedSlugs(): Promise<
  { slug: string; locale: Locale }[]
> {
  const response = await notion.databases.query({
    database_id: POSTS_DATABASE_ID,
    filter: { property: "Status", select: { equals: "Published" } },
  });

  return response.results.map((page) => {
    const p = page as PageObjectResponse;
    const props = extractPostProps(p);
    return { slug: props.slug, locale: props.language };
  });
}
