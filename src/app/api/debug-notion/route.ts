import { NextResponse } from "next/server";
import { notion, POSTS_DATABASE_ID, PROJECTS_DATABASE_ID, isNotionConfigured } from "@/lib/notion/client";

export async function GET() {
  const result: Record<string, unknown> = {
    isNotionConfigured,
    postsDbId: POSTS_DATABASE_ID ? `${POSTS_DATABASE_ID.slice(0, 8)}...` : "(empty)",
    projectsDbId: PROJECTS_DATABASE_ID ? `${PROJECTS_DATABASE_ID.slice(0, 8)}...` : "(empty)",
    hasApiKey: !!process.env.NOTION_API_KEY,
  };

  if (!isNotionConfigured) {
    result.error = "Environment variables not set";
    return NextResponse.json(result);
  }

  // Test Posts DB
  try {
    const db = await notion.databases.retrieve({
      database_id: POSTS_DATABASE_ID,
    });
    const props = Object.entries(db.properties).map(([name, prop]) => ({
      name,
      type: prop.type,
    }));
    result.postsDb = {
      title: (db as Record<string, unknown>).title,
      properties: props,
    };

    // Query posts
    const posts = await notion.databases.query({
      database_id: POSTS_DATABASE_ID,
      page_size: 3,
    });
    result.postsCount = posts.results.length;

    if (posts.results.length > 0) {
      const first = posts.results[0] as Record<string, unknown>;
      result.firstPostProperties = Object.entries(
        (first as { properties: Record<string, unknown> }).properties
      ).map(([name, val]) => ({
        name,
        type: (val as { type: string }).type,
      }));
    }
  } catch (e) {
    result.postsError = (e as Error).message;
  }

  // Test Projects DB
  try {
    const db = await notion.databases.retrieve({
      database_id: PROJECTS_DATABASE_ID,
    });
    const props = Object.entries(db.properties).map(([name, prop]) => ({
      name,
      type: prop.type,
    }));
    result.projectsDb = {
      properties: props,
    };
  } catch (e) {
    result.projectsError = (e as Error).message;
  }

  return NextResponse.json(result, { status: 200 });
}
