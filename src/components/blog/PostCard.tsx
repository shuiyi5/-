import Link from "next/link";
import type { Post, Locale } from "@/lib/data/types";
import { formatDate, calculateReadingTime } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  locale: Locale;
  minReadLabel: string;
}

export function PostCard({ post, locale, minReadLabel }: PostCardProps) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="block group">
      <article className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-4 border-b border-[var(--border)] hover:border-accent/30 transition-colors">
        <time className="text-sm text-[var(--text-secondary)] shrink-0 w-28">
          {formatDate(post.date, locale)}
        </time>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
            {post.summary}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[var(--text-secondary)] px-2 py-0.5 border border-[var(--border)] rounded">
            {post.category}
          </span>
          <span className="text-xs text-[var(--text-secondary)]">
            {calculateReadingTime(post.content, locale)} {minReadLabel}
          </span>
        </div>
      </article>
    </Link>
  );
}
