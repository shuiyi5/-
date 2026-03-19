import type { GalleryItem, GalleryItemType, Locale } from "./types";
import { isNotionConfigured } from "@/lib/notion/client";
import { mockGallery } from "./mock/gallery";

function getMockGallery(locale: Locale): GalleryItem[] {
  return mockGallery
    .filter((item) => item.language === locale)
    .sort((a, b) => a.order - b.order);
}

export async function getGalleryItems(locale: Locale): Promise<GalleryItem[]> {
  if (isNotionConfigured && process.env.NOTION_GALLERY_DB_ID) {
    try {
      const { getNotionGallery } = await import("@/lib/notion/gallery");
      return await getNotionGallery(locale);
    } catch (e) {
      console.warn("Notion gallery fetch failed, using mock:", (e as Error).message);
    }
  }
  return getMockGallery(locale);
}

export async function getGalleryTypes(locale: Locale): Promise<GalleryItemType[]> {
  const items = await getGalleryItems(locale);
  const types = new Set(items.map((item) => item.type));
  return Array.from(types);
}
