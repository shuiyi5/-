import type { ContentBlock } from "@/lib/data/types";
import { HeadingBlock } from "./HeadingBlock";
import { CodeBlock } from "./CodeBlock";
import { ImageBlock } from "./ImageBlock";
import { BulletedList, NumberedList } from "./ListBlock";
import { QuoteBlock } from "./QuoteBlock";
import { CalloutBlock } from "./CalloutBlock";
import { TableBlock } from "./TableBlock";
import { ToggleBlock } from "./ToggleBlock";

interface RichContentProps {
  blocks: ContentBlock[];
}

export function RichContent({ blocks }: RichContentProps) {
  return (
    <div className="prose-content">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return <HeadingBlock key={index} block={block} />;
          case "paragraph":
            return (
              <p key={index} className="my-4 text-base leading-relaxed">
                {block.text}
              </p>
            );
          case "bulleted_list":
            return <BulletedList key={index} block={block} />;
          case "numbered_list":
            return <NumberedList key={index} block={block} />;
          case "code":
            return <CodeBlock key={index} block={block} />;
          case "image":
            return <ImageBlock key={index} block={block} />;
          case "quote":
            return <QuoteBlock key={index} block={block} />;
          case "callout":
            return <CalloutBlock key={index} block={block} />;
          case "divider":
            return (
              <hr
                key={index}
                className="my-8 border-[var(--border)]"
              />
            );
          case "table":
            return <TableBlock key={index} block={block} />;
          case "toggle":
            return <ToggleBlock key={index} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
