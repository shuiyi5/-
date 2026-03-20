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

export async function LatestPosts({ locale, dict }: LatestPostsProps) {
  const posts = await getLatestPosts(locale, 4);

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text-subtle">
              {dict.home.latestPosts}
            </h2>
            <Link
              href={`/${locale}/blog`}
              className="text-sm text-accent hover:text-accent-light transition-colors flex items-center gap-1 group"
            >
              {dict.home.viewAll}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </ScrollReveal>

        {/* Bento-style grid: first post large, rest smaller */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 80}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className={`block group ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <article
                  className={`glass-card gradient-border rounded-2xl p-6 h-full ${
                    i === 0 ? "md:flex md:items-center md:gap-8" : ""
                  }`}
                >
                  {/* Decorative gradient bar (sakura → lavender) */}
                  <div
                    className={`rounded-full bg-gradient-to-r from-pink-400 via-purple-300 to-sky-300 mb-4 ${
                      i === 0
                        ? "h-1 md:h-full md:w-1 md:mb-0 md:rounded-full md:min-h-[80px]"
                        : "h-0.5"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <time className="text-xs text-[var(--text-secondary)]">
                        {formatDate(post.date, locale)}
                      </time>
                      <span className="text-xs text-accent/80 px-2 py-0.5 rounded-full bg-accent/5 border border-accent/10">
                        {post.category}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)]">
                        {calculateReadingTime(post.content, locale)}{" "}
                        {dict.blog.minRead}
                      </span>
                    </div>
                    <h3
                      className={`font-semibold group-hover:text-accent transition-colors ${
                        i === 0 ? "text-xl md:text-2xl" : "text-base"
                      }`}
                    >
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
