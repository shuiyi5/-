import type { Post, Locale } from "@/lib/data/types";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Post[];
  locale: Locale;
  minReadLabel: string;
}

export function PostList({ posts, locale, minReadLabel }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="py-12 text-center text-[var(--text-secondary)]">
        {locale === "zh" ? "暂无文章" : "No posts yet"}
      </p>
    );
  }

  return (
    <div className="space-y-0">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          locale={locale}
          minReadLabel={minReadLabel}
        />
      ))}
    </div>
  );
}
