export type Locale = "zh" | "en";

export type PostStatus = "Draft" | "Published";

export type Category =
  | "AI Product Analysis"
  | "Industry Insights"
  | "Project Review"
  | "Reading Notes";

export interface Post {
  id: string;
  title: string;
  slug: string;
  language: Locale;
  status: PostStatus;
  category: Category;
  tags: string[];
  summary: string;
  date: string; // ISO date string
  cover?: string;
  content: ContentBlock[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  language: Locale;
  role: string;
  tags: string[];
  cover?: string;
  link?: string;
  github?: string;
  order: number;
}

export type GalleryItemType = "Image" | "Music" | "Video" | "Design";

export interface GalleryItem {
  id: string;
  name: string;
  type: GalleryItemType;
  description: string;
  language: Locale;
  tags: string[];
  cover?: string;      // Thumbnail (< 5MB, stored in Notion)
  mediaUrl?: string;    // Full-size file on external host
  embedUrl?: string;    // Embed link (NetEase/SoundCloud/Bilibili/YouTube)
  order: number;
}

// Content block types matching Notion block structure
export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | BulletedListBlock
  | NumberedListBlock
  | CodeBlock
  | ImageBlock
  | QuoteBlock
  | CalloutBlock
  | DividerBlock
  | TableBlock
  | ToggleBlock;

export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3;
  text: string;
  id: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface BulletedListBlock {
  type: "bulleted_list";
  items: string[];
}

export interface NumberedListBlock {
  type: "numbered_list";
  items: string[];
}

export interface CodeBlock {
  type: "code";
  language: string;
  code: string;
}

export interface ImageBlock {
  type: "image";
  url: string;
  caption?: string;
}

export interface QuoteBlock {
  type: "quote";
  text: string;
}

export interface CalloutBlock {
  type: "callout";
  emoji?: string;
  text: string;
}

export interface DividerBlock {
  type: "divider";
}

export interface TableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface ToggleBlock {
  type: "toggle";
  title: string;
  content: string;
}
