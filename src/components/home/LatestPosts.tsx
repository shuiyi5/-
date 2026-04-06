import Link from "next/link";
import type { Locale } from "@/lib/data/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getLatestPosts } from "@/lib/data/posts";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface LatestPostsProps {
  locale: Locale;
  dict: Dictionary;
}

const CAT_COLORS: Record<string, string> = {
  "AI 产品分析": "cat-ai",
  "AI Product Analysis": "cat-ai",
  "行业洞察": "cat-product",
  "Industry Insights": "cat-product",
  "项目复盘": "cat-tech",
  "Project Review": "cat-tech",
  "读书笔记": "cat-note",
  "Reading Notes": "cat-note",
};

const CAT_TEXT_COLORS: Record<string, string> = {
  "cat-ai": "text-[#c43b1e]",
  "cat-product": "text-[#c8a96e]",
  "cat-tech": "text-[#7a9e8e]",
  "cat-note": "text-[#6a7fa8]",
  "cat-default": "text-accent",
};

export async function LatestPosts({ locale, dict }: LatestPostsProps) {
  const posts = await getLatestPosts(locale, 4);

  return (
    <section className="py-20" id="posts">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="section-title-serif text-3xl tracking-tight text-[var(--text-primary)]">
              {dict.home.latestPosts}
              <span className="text-(--text-secondary) text-2xl ml-3 font-normal">/ Writing</span>
            </h2>
            <Link
              href={`/${locale}/blog`}
              className="text-xs font-mono text-(--text-secondary) hover:text-(--text-primary) transition-colors flex items-center gap-1 group"
            >
              {dict.home.viewAll}
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-px bg-[var(--border)] rounded-2xl overflow-hidden border border-[var(--border)]">
          {posts.map((post, i) => {
            const catClass = CAT_COLORS[post.category] ?? "cat-default";
            const catTextClass = CAT_TEXT_COLORS[catClass] ?? "text-accent";
            const isFeatured = i === 0;

            return (
              <ScrollReveal key={post.id} delay={i * 70}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className={`post-card-bar ${catClass} block bg-[var(--card-bg)] hover:bg-[var(--glass-bg)] transition-colors px-7 py-6 group`}
                >
                  {isFeatured ? (
                    /* Featured: two-column */
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 items-center">
                      <div>
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className={`text-[10px] font-semibold font-mono tracking-widest uppercase ${catTextClass}`}>
                            {post.category}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]/30" />
                          <time className="text-xs font-mono text-(--text-secondary)">
                            {formatDate(post.date, locale)}
                          </time>
                          <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]/30" />
                          <span className="text-xs font-mono text-(--text-secondary)">
                            {calculateReadingTime(post.content, locale)} {dict.blog.minRead}
                          </span>
                        </div>
                        <h3 className="section-title-serif text-xl md:text-2xl tracking-tight text-[var(--text-primary)] group-hover:text-accent transition-colors mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-(--text-secondary) line-clamp-2 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                      {/* Cover placeholder */}
                      <div className="hidden md:flex aspect-video rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] items-center justify-center">
                        <span className="text-xs font-mono text-(--text-secondary)/40">cover</span>
                      </div>
                    </div>
                  ) : (
                    /* Regular */
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className={`text-[10px] font-semibold font-mono tracking-widest uppercase ${catTextClass}`}>
                          {post.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]/30" />
                        <time className="text-xs font-mono text-(--text-secondary)">
                          {formatDate(post.date, locale)}
                        </time>
                        <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]/30" />
                        <span className="text-xs font-mono text-(--text-secondary)">
                          {calculateReadingTime(post.content, locale)} {dict.blog.minRead}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-accent transition-colors mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-(--text-secondary) line-clamp-1 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                  )}
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
