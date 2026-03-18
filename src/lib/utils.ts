import { clsx, type ClassValue } from "clsx";
import type { Locale, ContentBlock } from "@/lib/data/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(
  content: ContentBlock[],
  locale: Locale
): number {
  let totalText = "";
  for (const block of content) {
    switch (block.type) {
      case "paragraph":
      case "quote":
      case "callout":
        totalText += block.text + " ";
        break;
      case "heading":
        totalText += block.text + " ";
        break;
      case "bulleted_list":
      case "numbered_list":
        totalText += block.items.join(" ") + " ";
        break;
      case "code":
        totalText += block.code + " ";
        break;
      case "toggle":
        totalText += block.title + " " + block.content + " ";
        break;
      case "table":
        totalText +=
          block.headers.join(" ") +
          " " +
          block.rows.map((r) => r.join(" ")).join(" ") +
          " ";
        break;
    }
  }

  // Chinese: ~400 chars/min, English: ~200 words/min
  if (locale === "zh") {
    const charCount = totalText.replace(/\s/g, "").length;
    return Math.max(1, Math.ceil(charCount / 400));
  } else {
    const wordCount = totalText.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "...";
}

export const locales: Locale[] = ["zh", "en"];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
