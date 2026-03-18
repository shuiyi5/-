import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Post, Locale } from "@/lib/data/types";

interface AdjacentPostsProps {
  prev: Post | null;
  next: Post | null;
  locale: Locale;
  prevLabel: string;
  nextLabel: string;
}

export function AdjacentPosts({
  prev,
  next,
  locale,
  prevLabel,
  nextLabel,
}: AdjacentPostsProps) {
  if (!prev && !next) return null;

  return (
    <div className="mt-16 pt-8 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/${locale}/blog/${prev.slug}`}
          className="group flex flex-col gap-1 p-4 rounded-lg border border-[var(--border)] hover:border-accent/30 transition-colors"
        >
          <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
            <ArrowLeft size={12} />
            {prevLabel}
          </span>
          <span className="font-medium group-hover:text-accent transition-colors line-clamp-1">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/${locale}/blog/${next.slug}`}
          className="group flex flex-col gap-1 p-4 rounded-lg border border-[var(--border)] hover:border-accent/30 transition-colors text-right"
        >
          <span className="text-xs text-[var(--text-secondary)] flex items-center justify-end gap-1">
            {nextLabel}
            <ArrowRight size={12} />
          </span>
          <span className="font-medium group-hover:text-accent transition-colors line-clamp-1">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
