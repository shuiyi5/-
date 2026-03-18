import type { QuoteBlock as QuoteBlockType } from "@/lib/data/types";

export function QuoteBlock({ block }: { block: QuoteBlockType }) {
  return (
    <blockquote className="my-6 border-l-2 border-accent pl-4 py-1 text-[var(--text-secondary)] italic">
      {block.text}
    </blockquote>
  );
}
