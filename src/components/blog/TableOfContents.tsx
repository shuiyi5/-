"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return activeId;
}

interface TocNavProps {
  items: TocItem[];
  activeId: string;
  onAfterClick?: () => void;
}

function TocNav({ items, activeId, onAfterClick }: TocNavProps) {
  function handleClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
    onAfterClick?.();
  }

  return (
    <nav className="border-l border-[var(--border)]">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          className={cn(
            "block py-1 pl-3 text-sm transition-colors border-l -ml-px",
            item.level === 3 && "pl-6",
            activeId === item.id
              ? "text-accent border-accent"
              : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]"
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}

export function DesktopTOC({
  items,
  tocLabel,
}: {
  items: TocItem[];
  tocLabel: string;
}) {
  const activeId = useActiveHeading(items);
  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:block sticky top-24 w-56 shrink-0 self-start">
      <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-3">
        {tocLabel}
      </p>
      <TocNav items={items} activeId={activeId} />
    </aside>
  );
}

export function MobileTOC({
  items,
  tocLabel,
}: {
  items: TocItem[];
  tocLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useActiveHeading(items);
  const close = useCallback(() => setIsOpen(false), []);

  if (items.length === 0) return null;

  return (
    <div className="lg:hidden mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      >
        <List size={16} />
        {tocLabel}
      </button>
      {isOpen && (
        <div className="mt-3">
          <TocNav items={items} activeId={activeId} onAfterClick={close} />
        </div>
      )}
    </div>
  );
}
