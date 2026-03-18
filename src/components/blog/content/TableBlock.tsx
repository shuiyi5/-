import type { TableBlock as TableBlockType } from "@/lib/data/types";

export function TableBlock({ block }: { block: TableBlockType }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
            {block.headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-2.5 text-left font-medium text-[var(--text-primary)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} className="border-b border-[var(--border)] last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-2.5 text-[var(--text-secondary)]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
