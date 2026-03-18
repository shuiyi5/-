import { codeToHtml } from "shiki";
import type { CodeBlock as CodeBlockType } from "@/lib/data/types";

export async function CodeBlock({ block }: { block: CodeBlockType }) {
  const html = await codeToHtml(block.code, {
    lang: block.language || "text",
    theme: "github-dark",
  });

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[var(--border)]">
      {block.language && (
        <div className="px-4 py-1.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] border-b border-[var(--border)]">
          {block.language}
        </div>
      )}
      <div
        className="overflow-x-auto text-sm [&_pre]:p-4 [&_pre]:m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
