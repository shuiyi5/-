import { notion } from "./client";
import type { ContentBlock } from "@/lib/data/types";
import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * Extract plain text from Notion rich text array
 */
function richTextToPlain(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join("");
}

/**
 * Fetch all child blocks of a Notion page and convert to ContentBlock[]
 */
export async function getPageContent(pageId: string): Promise<ContentBlock[]> {
  const blocks: ContentBlock[] = [];
  let cursor: string | undefined = undefined;

  // Paginate through all blocks
  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const block of response.results) {
      const converted = await convertBlock(block as BlockObjectResponse);
      if (converted) {
        // Merge consecutive list items into a single list block
        const last = blocks[blocks.length - 1];
        if (
          converted.type === "bulleted_list" &&
          last?.type === "bulleted_list"
        ) {
          last.items.push(...converted.items);
        } else if (
          converted.type === "numbered_list" &&
          last?.type === "numbered_list"
        ) {
          last.items.push(...converted.items);
        } else {
          blocks.push(converted);
        }
      }
    }

    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}

/**
 * Convert a single Notion block to our ContentBlock type
 */
async function convertBlock(
  block: BlockObjectResponse
): Promise<ContentBlock | null> {
  switch (block.type) {
    case "heading_1":
      return {
        type: "heading",
        level: 1,
        text: richTextToPlain(block.heading_1.rich_text),
        id: block.id.replace(/-/g, "").slice(0, 8),
      };

    case "heading_2":
      return {
        type: "heading",
        level: 2,
        text: richTextToPlain(block.heading_2.rich_text),
        id: block.id.replace(/-/g, "").slice(0, 8),
      };

    case "heading_3":
      return {
        type: "heading",
        level: 3,
        text: richTextToPlain(block.heading_3.rich_text),
        id: block.id.replace(/-/g, "").slice(0, 8),
      };

    case "paragraph": {
      const text = richTextToPlain(block.paragraph.rich_text);
      if (!text) return null; // Skip empty paragraphs
      return { type: "paragraph", text };
    }

    case "bulleted_list_item":
      return {
        type: "bulleted_list",
        items: [richTextToPlain(block.bulleted_list_item.rich_text)],
      };

    case "numbered_list_item":
      return {
        type: "numbered_list",
        items: [richTextToPlain(block.numbered_list_item.rich_text)],
      };

    case "code":
      return {
        type: "code",
        language: block.code.language || "text",
        code: richTextToPlain(block.code.rich_text),
      };

    case "image": {
      let url = "";
      if (block.image.type === "file") {
        url = block.image.file.url;
      } else if (block.image.type === "external") {
        url = block.image.external.url;
      }
      const caption = block.image.caption
        ? richTextToPlain(block.image.caption)
        : undefined;
      return { type: "image", url, caption };
    }

    case "quote":
      return {
        type: "quote",
        text: richTextToPlain(block.quote.rich_text),
      };

    case "callout":
      return {
        type: "callout",
        emoji:
          block.callout.icon?.type === "emoji"
            ? block.callout.icon.emoji
            : undefined,
        text: richTextToPlain(block.callout.rich_text),
      };

    case "divider":
      return { type: "divider" };

    case "table": {
      // Fetch table rows (children of the table block)
      const tableChildren = await notion.blocks.children.list({
        block_id: block.id,
        page_size: 100,
      });

      const rows = tableChildren.results as BlockObjectResponse[];
      const headers: string[] = [];
      const dataRows: string[][] = [];

      rows.forEach((row, i) => {
        if (row.type !== "table_row") return;
        const cells = row.table_row.cells.map((cell) =>
          richTextToPlain(cell)
        );
        if (i === 0 && block.table.has_column_header) {
          headers.push(...cells);
        } else {
          dataRows.push(cells);
        }
      });

      return { type: "table", headers, rows: dataRows };
    }

    case "toggle": {
      // Fetch toggle children for content
      const toggleChildren = await notion.blocks.children.list({
        block_id: block.id,
        page_size: 100,
      });
      const childTexts: string[] = [];
      for (const child of toggleChildren.results) {
        const c = child as BlockObjectResponse;
        if (c.type === "paragraph") {
          childTexts.push(richTextToPlain(c.paragraph.rich_text));
        }
      }
      return {
        type: "toggle",
        title: richTextToPlain(block.toggle.rich_text),
        content: childTexts.join("\n"),
      };
    }

    default:
      // Unsupported block type — skip
      return null;
  }
}
