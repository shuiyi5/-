import { notion, PROJECTS_DATABASE_ID } from "./client";
import type { GalleryItem, GalleryItemType, Locale } from "@/lib/data/types";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

function findProp(props: PageObjectResponse["properties"], name: string) {
  if (props[name]) return props[name];
  const key = Object.keys(props).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return key ? props[key] : undefined;
}

function normalizeLocale(val: string): Locale {
  const lower = val.toLowerCase();
  if (lower === "zh" || lower === "en") return lower as Locale;
  return "zh";
}

const validTypes = ["image", "music", "video", "design"];
function normalizeType(val: string): GalleryItemType {
  const lower = val.toLowerCase();
  if (validTypes.includes(lower)) {
    return (lower.charAt(0).toUpperCase() + lower.slice(1)) as GalleryItemType;
  }
  return "Image";
}

function extractGalleryProps(page: PageObjectResponse): GalleryItem {
  const props = page.properties;

  const nameProp = findProp(props, "Name");
  const name =
    nameProp?.type === "title"
      ? nameProp.title.map((t) => t.plain_text).join("")
      : "";

  const typeProp = findProp(props, "Type");
  const type =
    typeProp?.type === "select" && typeProp.select?.name
      ? normalizeType(typeProp.select.name)
      : "Image";

  const descProp = findProp(props, "Description");
  const description =
    descProp?.type === "rich_text"
      ? descProp.rich_text.map((t) => t.plain_text).join("")
      : "";

  const langProp = findProp(props, "Language");
  const language =
    langProp?.type === "select" && langProp.select?.name
      ? normalizeLocale(langProp.select.name)
      : "zh";

  const tagsProp = findProp(props, "Tags");
  const tags =
    tagsProp?.type === "multi_select"
      ? tagsProp.multi_select.map((t) => t.name)
      : [];

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

  const mediaUrlProp = findProp(props, "MediaURL");
  const mediaUrl =
    mediaUrlProp?.type === "url" ? mediaUrlProp.url ?? undefined : undefined;

  const embedUrlProp = findProp(props, "EmbedURL");
  const embedUrl =
    embedUrlProp?.type === "url" ? embedUrlProp.url ?? undefined : undefined;

  const orderProp = findProp(props, "Order");
  const order =
    orderProp?.type === "number" ? orderProp.number ?? 0 : 0;

  return {
    id: page.id,
    name,
    type,
    description,
    language,
    tags,
    cover,
    mediaUrl,
    embedUrl,
    order,
  };
}

const GALLERY_DATABASE_ID = process.env.NOTION_GALLERY_DB_ID || "";

export { GALLERY_DATABASE_ID };

export async function getNotionGallery(): Promise<GalleryItem[]> {
  if (!GALLERY_DATABASE_ID) return [];

  const response = await notion.databases.query({
    database_id: GALLERY_DATABASE_ID,
  });

  return (response.results as PageObjectResponse[])
    .map(extractGalleryProps)
    .sort((a, b) => a.order - b.order);
}
