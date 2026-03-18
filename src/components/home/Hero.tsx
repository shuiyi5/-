import { Github, Linkedin, Twitter, Mail, ArrowDown } from "lucide-react";
import { socialLinks } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { HeroBg } from "./HeroBg";

interface HeroProps {
  dict: Dictionary;
}

const socials = [
  { href: socialLinks.github, icon: Github, label: "GitHub" },
  { href: socialLinks.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: socialLinks.twitter, icon: Twitter, label: "X / Twitter" },
  { href: socialLinks.email, icon: Mail, label: "Email" },
];

export function Hero({ dict }: HeroProps) {
  return (
    <section className="relative w-full h-[75vh] min-h-[520px] max-h-[800px] overflow-hidden -mt-16">
      {/* Background image */}
      <HeroBg />

      {/* Gradient fallback — deep dark with color hints */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0015] via-[#0d0d2b] to-[#0a001a]" />

      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-blob absolute w-[500px] h-[500px] rounded-full bg-indigo-600/20 -top-20 -left-20" />
        <div className="aurora-blob-2 absolute w-[400px] h-[400px] rounded-full bg-purple-600/15 top-1/3 right-[-10%]" />
        <div className="aurora-blob-3 absolute w-[350px] h-[350px] rounded-full bg-pink-500/10 bottom-[-5%] left-1/3" />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent z-10" />

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm mb-6">
          AI Product Manager &amp; Builder
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
          {dict.home.greeting}
        </h1>
        <p className="mt-5 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
          {dict.home.tagline}
        </p>
        <div className="mt-8 flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="p-3 rounded-full text-white/50 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all backdrop-blur-sm"
              aria-label={s.label}
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown size={18} className="text-white/30" />
        </div>
      </div>
    </section>
  );
}
