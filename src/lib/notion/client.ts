import { Client } from "@notionhq/client";

if (!process.env.NOTION_API_KEY) {
  console.warn(
    "⚠ NOTION_API_KEY not set — falling back to mock data. See .env.example for setup instructions."
  );
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY || "placeholder",
});

export const POSTS_DATABASE_ID = process.env.NOTION_POSTS_DB_ID || "";
export const PROJECTS_DATABASE_ID = process.env.NOTION_PROJECTS_DB_ID || "";

/** Whether Notion is properly configured */
export const isNotionConfigured =
  !!process.env.NOTION_API_KEY &&
  !!process.env.NOTION_POSTS_DB_ID &&
  !!process.env.NOTION_PROJECTS_DB_ID;
