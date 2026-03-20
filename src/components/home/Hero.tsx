import { Github, Linkedin, Twitter, Mail, ArrowDown } from "lucide-react";
import { socialLinks } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { HeroBg } from "./HeroBg";
import { HeroEntrance } from "./HeroEntrance";

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

      {/* Gradient fallback — anime pastel sky */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a20] via-[#150818] to-[#0d0515]" />

      {/* Aurora blobs (sakura & lavender) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-blob absolute w-[500px] h-[500px] rounded-full bg-pink-400/20 -top-20 -left-20" />
        <div className="aurora-blob-2 absolute w-[400px] h-[400px] rounded-full bg-purple-400/15 top-1/3 right-[-10%]" />
        <div className="aurora-blob-3 absolute w-[350px] h-[350px] rounded-full bg-sky-300/10 bottom-[-5%] left-1/3" />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent z-10" />

      {/* Content with staggered entrance */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
        <HeroEntrance delay={200}>
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-pink-300 border border-pink-400/30 bg-pink-500/10 backdrop-blur-sm mb-6">
            AI Product Manager &amp; Builder
          </div>
        </HeroEntrance>

        <HeroEntrance delay={450}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
            {dict.home.greeting}
          </h1>
        </HeroEntrance>

        <HeroEntrance delay={700}>
          <p className="mt-5 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
            {dict.home.tagline}
          </p>
        </HeroEntrance>

        <HeroEntrance delay={950}>
          <div className="mt-8 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="p-3 rounded-full text-white/50 hover:text-pink-300 hover:bg-pink-400/10 border border-white/5 hover:border-pink-400/20 transition-all backdrop-blur-sm hover:scale-110"
                aria-label={s.label}
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </HeroEntrance>

        {/* Scroll hint */}
        <HeroEntrance delay={1200}>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown size={18} className="text-white/30" />
          </div>
        </HeroEntrance>
      </div>
    </section>
  );
}
