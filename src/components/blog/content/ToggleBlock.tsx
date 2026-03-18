"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { ToggleBlock as ToggleBlockType } from "@/lib/data/types";
import { cn } from "@/lib/utils";

export function ToggleBlock({ block }: { block: ToggleBlockType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4 border border-[var(--border)] rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full px-4 py-3 text-left hover:bg-[var(--bg-secondary)] transition-colors rounded-lg"
      >
        <ChevronRight
          size={16}
          className={cn(
            "shrink-0 transition-transform",
            isOpen && "rotate-90"
          )}
        />
        <span className="font-medium text-sm">{block.title}</span>
      </button>
      {isOpen && (
        <div className="px-4 pb-3 pl-10 text-sm text-[var(--text-secondary)] whitespace-pre-wrap">
          {block.content}
        </div>
      )}
    </div>
  );
}
