import type { CalloutBlock as CalloutBlockType } from "@/lib/data/types";

export function CalloutBlock({ block }: { block: CalloutBlockType }) {
  return (
    <div className="my-6 flex gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5">
      {block.emoji && <span className="text-lg shrink-0">{block.emoji}</span>}
      <p className="text-sm leading-relaxed">{block.text}</p>
    </div>
  );
}
