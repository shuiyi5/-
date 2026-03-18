import type { HeadingBlock as HeadingBlockType } from "@/lib/data/types";

export function HeadingBlock({ block }: { block: HeadingBlockType }) {
  const Tag = `h${block.level}` as "h1" | "h2" | "h3";
  const sizes = {
    1: "text-3xl font-bold mt-10 mb-4",
    2: "text-2xl font-semibold mt-8 mb-3",
    3: "text-xl font-medium mt-6 mb-2",
  };

  return (
    <Tag id={block.id} className={sizes[block.level]}>
      {block.text}
    </Tag>
  );
}
