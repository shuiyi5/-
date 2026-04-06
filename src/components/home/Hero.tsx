import Link from "next/link";
import { socialLinks } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { HeroBg } from "./HeroBg";
import { HeroEntrance } from "./HeroEntrance";

interface HeroProps {
  dict: Dictionary;
}

/* Inline SVG social icons with hover draw animation */
function SvgGithub({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function SvgLinkedin({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SvgX({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function SvgMail({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

/* Animated "writing" SVG pen icon */
function SvgPen({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

const socials = [
  { href: socialLinks.github, Icon: SvgGithub, label: "GitHub" },
  { href: socialLinks.linkedin, Icon: SvgLinkedin, label: "LinkedIn" },
  { href: socialLinks.twitter, Icon: SvgX, label: "X" },
  { href: socialLinks.email, Icon: SvgMail, label: "Email" },
];

export function Hero({ dict }: HeroProps) {
  return (
    <section className="relative w-full min-h-150 overflow-hidden -mt-16 grid-bg">
      {/* Background */}
      <HeroBg />
      <div className="absolute inset-0 bg-linear-to-br from-[#131110] via-[#1a1714] to-[#131110]" />

      {/* Subtle warm blobs — 朱 & 金茶 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob absolute w-150 h-150 rounded-full bg-accent/5 -top-40 -right-20" />
        <div className="aurora-blob-2 absolute w-100 h-100 rounded-full bg-[#c8a96e]/5 bottom-0 left-[-10%]" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-(--bg) to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 pt-36 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">

          {/* Left: text */}
          <div>
            {/* Status badge */}
            <HeroEntrance delay={100}>
              <div className="inline-flex items-center gap-2 mb-7 px-3 py-1.5 rounded-full text-xs font-medium border border-white/8 bg-white/4 backdrop-blur-sm text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-accent dot-pulse" />
                AI Product Manager &amp; Builder
              </div>
            </HeroEntrance>

            {/* Headline */}
            <HeroEntrance delay={250}>
              <h1 className="hero-headline text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mb-5 leading-[1.08]">
                {dict.home.greeting.replace(" 👋", "").replace("Hi, I'm ", "")}
                <br />
                <span className="hero-gradient-text">AI 产品探索者</span>
              </h1>
            </HeroEntrance>

            {/* Tagline — with 和紙 left-border accent */}
            <HeroEntrance delay={400}>
              <p className="text-base text-white/45 max-w-md leading-relaxed mb-9 font-light pl-4 border-l border-accent/40">
                {dict.home.tagline}
              </p>
            </HeroEntrance>

            {/* CTA buttons */}
            <HeroEntrance delay={550}>
              <div className="flex items-center gap-3 mb-10">
                <Link
                  href="#posts"
                  className="hero-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all"
                >
                  阅读文章
                  <span className="text-white/70 transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white/60 border border-white/10 hover:border-accent/30 hover:text-white/80 transition-all duration-300 backdrop-blur-sm"
                >
                  查看项目
                </Link>
              </div>
            </HeroEntrance>

            {/* Social icons */}
            <HeroEntrance delay={700}>
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg border border-white/8 bg-white/4 flex items-center justify-center text-white/35 hover:text-accent hover:border-accent/25 hover:bg-accent/8 transition-all duration-300"
                  >
                    <s.Icon size={14} />
                  </a>
                ))}
              </div>
            </HeroEntrance>
          </div>

          {/* Right: avatar */}
          <HeroEntrance delay={350}>
            <div className="relative hidden md:block">
              <div className="hero-avatar-frame hero-avatar-bg w-48 h-48 rounded-2xl border border-white/8 overflow-hidden relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-40">
                  <div className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center">
                    <span className="hero-avatar-name text-2xl text-white/60">水</span>
                  </div>
                  <span className="text-[10px] text-white/30 font-mono tracking-wider">avatar</span>
                </div>
                <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-[#c8a96e]/5" />
              </div>

              {/* Floating badge — 金茶 */}
              <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-accent/20 bg-[#131110]/90 backdrop-blur-sm text-[11px] font-mono text-[#c8a96e]">
                <SvgPen size={10} />
                writing
              </div>
            </div>
          </HeroEntrance>
        </div>
      </div>
    </section>
  );
}
