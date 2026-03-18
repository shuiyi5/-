import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["zh", "en"];
const defaultLocale = "zh";

function getLocaleFromPath(pathname: string): string | null {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (locales.includes(maybeLocale)) return maybeLocale;
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // Check if path already has a locale
  const locale = getLocaleFromPath(pathname);
  if (locale) return NextResponse.next();

  // Redirect to default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
