"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { GalleryItemType } from "@/lib/data/types";
import { cn } from "@/lib/utils";

interface GalleryFilterProps {
  types: GalleryItemType[];
  allLabel: string;
  locale: string;
}

export function GalleryFilter({ types, allLabel, locale }: GalleryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("type") ?? "";

  function handleClick(type: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    router.push(`/${locale}/gallery?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleClick("")}
        className={cn(
          "px-3 py-1.5 text-sm rounded-full border transition-colors",
          !current
            ? "border-accent text-accent bg-accent/10"
            : "border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-accent/30"
        )}
      >
        {allLabel}
      </button>
      {types.map((t) => (
        <button
          key={t}
          onClick={() => handleClick(t)}
          className={cn(
            "px-3 py-1.5 text-sm rounded-full border transition-colors",
            current === t
              ? "border-accent text-accent bg-accent/10"
              : "border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-accent/30"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
