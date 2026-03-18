"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/data/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { ThemeToggle } from "./ThemeToggle";

interface MobileMenuProps {
  locale: Locale;
  dict: Dictionary;
}

export function MobileMenu({ locale, dict }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const otherLocale = locale === "zh" ? "en" : "zh";

  const navLinks = [
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/about`, label: dict.nav.about },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-md hover:bg-[var(--border)] transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--bg)]">
          <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--border)]">
            <Link
              href={`/${locale}`}
              className="text-lg font-bold"
              onClick={() => setIsOpen(false)}
            >
              Sentoe
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-[var(--border)] transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col px-6 py-8 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-medium text-[var(--text-primary)] hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-4 pt-6 border-t border-[var(--border)]">
              <Link
                href={`/${otherLocale}`}
                onClick={() => setIsOpen(false)}
                className="px-3 py-1.5 text-sm border border-[var(--border)] rounded-md hover:bg-[var(--border)] transition-colors"
              >
                {dict.language.switch}
              </Link>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
