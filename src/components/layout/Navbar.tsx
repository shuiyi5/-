import Link from "next/link";
import type { Locale } from "@/lib/data/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
}

export function Navbar({ locale, dict }: NavbarProps) {
  const otherLocale = locale === "zh" ? "en" : "zh";

  const navLinks = [
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/gallery`, label: dict.nav.gallery },
    { href: `/${locale}/about`, label: dict.nav.about },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 glass">
      <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-lg font-bold tracking-tight gradient-text-subtle hover:opacity-80 transition-opacity"
        >
          Sentoe
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] hover:text-accent transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-2 ml-2 pl-4 border-l border-[var(--glass-border)]">
            <Link
              href={`/${otherLocale}`}
              className="px-2.5 py-1 text-xs font-medium border border-[var(--glass-border)] rounded-full hover:bg-accent/10 hover:border-accent/30 transition-all"
            >
              {dict.language.switch}
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu */}
        <MobileMenu locale={locale} dict={dict} />
      </div>
    </nav>
  );
}
