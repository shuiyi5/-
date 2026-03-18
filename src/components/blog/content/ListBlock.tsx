import type {
  BulletedListBlock,
  NumberedListBlock,
} from "@/lib/data/types";

export function BulletedList({ block }: { block: BulletedListBlock }) {
  return (
    <ul className="my-4 space-y-2 pl-6 list-disc text-[var(--text-primary)]">
      {block.items.map((item, i) => (
        <li key={i} className="text-base leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function NumberedList({ block }: { block: NumberedListBlock }) {
  return (
    <ol className="my-4 space-y-2 pl-6 list-decimal text-[var(--text-primary)]">
      {block.items.map((item, i) => (
        <li key={i} className="text-base leading-relaxed">
          {item}
        </li>
      ))}
    </ol>
  );
}
