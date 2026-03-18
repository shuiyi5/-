import Image from "next/image";
import type { ImageBlock as ImageBlockType } from "@/lib/data/types";

export function ImageBlock({ block }: { block: ImageBlockType }) {
  return (
    <figure className="my-6">
      <div className="relative w-full overflow-hidden rounded-lg border border-[var(--border)]">
        <Image
          src={block.url}
          alt={block.caption ?? ""}
          width={800}
          height={450}
          className="w-full h-auto"
          unoptimized
        />
      </div>
      {block.caption && (
        <figcaption className="mt-2 text-center text-sm text-[var(--text-secondary)]">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}
