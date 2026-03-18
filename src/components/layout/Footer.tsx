import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { socialLinks } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface FooterProps {
  dict: Dictionary;
}

const socials = [
  { href: socialLinks.github, icon: Github, label: "GitHub" },
  { href: socialLinks.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: socialLinks.twitter, icon: Twitter, label: "X / Twitter" },
  { href: socialLinks.email, icon: Mail, label: "Email" },
];

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="relative border-t border-[var(--glass-border)] py-16">
      {/* Subtle gradient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-5">
        <span className="text-sm font-bold gradient-text-subtle">Sentoe</span>
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[var(--text-secondary)] hover:text-accent hover:bg-accent/5 transition-all"
              aria-label={s.label}
            >
              <s.icon size={16} />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
          <span>{dict.footer.copyright}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)] opacity-30" />
          <span>{dict.footer.poweredBy}</span>
        </div>
      </div>
    </footer>
  );
}
