"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/data/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Category[];
  allLabel: string;
  locale: string;
}

export function CategoryFilter({
  categories,
  allLabel,
  locale,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") ?? "";

  function handleClick(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`/${locale}/blog?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleClick("")}
        className={cn(
          "px-3 py-1.5 text-sm rounded-md border transition-colors",
          !current
            ? "border-accent text-accent bg-accent/10"
            : "border-[var(--border)] text-[var(--text-secondary)] hover:border-accent/30"
        )}
      >
        {allLabel}
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={cn(
            "px-3 py-1.5 text-sm rounded-md border transition-colors",
            current === cat
              ? "border-accent text-accent bg-accent/10"
              : "border-[var(--border)] text-[var(--text-secondary)] hover:border-accent/30"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
