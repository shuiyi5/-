import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand revalidation API
 *
 * Usage:
 *   GET /api/revalidate?secret=YOUR_SECRET
 *   → revalidates all pages (home, blog list, projects, about)
 *
 *   GET /api/revalidate?secret=YOUR_SECRET&path=/zh/blog/my-post
 *   → revalidates a specific page
 *
 * Set REVALIDATE_SECRET in Vercel environment variables.
 * If not set, revalidation is open (fine for personal blogs).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");

  // Check secret if configured
  const expectedSecret = process.env.REVALIDATE_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (path) {
    // Revalidate specific path
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }

  // Revalidate all main pages
  const paths = [
    "/zh",
    "/en",
    "/zh/blog",
    "/en/blog",
    "/zh/projects",
    "/en/projects",
    "/zh/about",
    "/en/about",
  ];

  for (const p of paths) {
    revalidatePath(p);
  }

  // Also revalidate all blog post pages
  revalidatePath("/zh/blog/[slug]", "page");
  revalidatePath("/en/blog/[slug]", "page");

  return NextResponse.json({
    revalidated: true,
    paths,
    timestamp: new Date().toISOString(),
  });
}
