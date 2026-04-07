import Link from "next/link";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import type { Locale } from "@/lib/data/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getFeaturedProjects } from "@/lib/data/projects";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface FeaturedProjectsProps {
  locale: Locale;
  dict: Dictionary;
}

/* Animated SVG icons — Japanese motif */
function IconBrush({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-500 group-hover:[stroke-dashoffset:0] [stroke-dasharray:60] [stroke-dashoffset:60]"
      />
      <path
        d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-500 delay-100 group-hover:[stroke-dashoffset:0] [stroke-dasharray:60] [stroke-dashoffset:60]"
      />
    </svg>
  );
}

function IconCompass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"
        className="transition-all duration-500 group-hover:rotate-[360deg] origin-center" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor"
        className="transition-transform duration-300 group-hover:scale-125 origin-center" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        className="transition-opacity duration-300 group-hover:opacity-70" />
      <path d="M8 8l2.5 2.5M13.5 13.5L16 16M16 8l-2.5 2.5M10.5 13.5L8 16"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );
}

function IconFragment({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
        className="transition-all duration-500 group-hover:[stroke-dashoffset:0] [stroke-dasharray:80] [stroke-dashoffset:80]" />
      <polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5"
        stroke="currentColor" strokeWidth="1" strokeLinejoin="round" strokeOpacity="0.4"
        className="transition-all duration-500 delay-150 group-hover:[stroke-dashoffset:0] [stroke-dasharray:60] [stroke-dashoffset:60]" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" className="transition-transform duration-300 group-hover:scale-150 origin-center" />
    </svg>
  );
}

const PROJECT_THEMES = [
  {
    Icon: IconBrush,
    iconBg: "bg-[#c43b1e]/10 border border-[#c43b1e]/20",
    iconColor: "text-[#c43b1e]",
    glow: "hover:shadow-[0_8px_32px_rgba(196,59,30,0.1)]",
    number: "01",
  },
  {
    Icon: IconCompass,
    iconBg: "bg-[#c8a96e]/10 border border-[#c8a96e]/20",
    iconColor: "text-[#c8a96e]",
    glow: "hover:shadow-[0_8px_32px_rgba(200,169,110,0.1)]",
    number: "02",
  },
  {
    Icon: IconFragment,
    iconBg: "bg-[#7a9e8e]/10 border border-[#7a9e8e]/20",
    iconColor: "text-[#7a9e8e]",
    glow: "hover:shadow-[0_8px_32px_rgba(122,158,142,0.1)]",
    number: "03",
  },
];

export async function FeaturedProjects({ locale, dict }: FeaturedProjectsProps) {
  const projects = await getFeaturedProjects(locale, 3);

  return (
    <section className="py-20" id="projects">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="section-title-serif text-3xl tracking-tight text-(--text-primary)">
              {dict.home.featuredProjects}
              <span className="text-(--text-secondary) text-2xl ml-3 font-normal">/ Projects</span>
            </h2>
            <Link
              href={`/${locale}/projects`}
              className="text-xs font-mono text-(--text-secondary) hover:text-(--text-primary) transition-colors flex items-center gap-1 group"
            >
              {dict.home.viewAll}
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project, i) => {
            const theme = PROJECT_THEMES[i % PROJECT_THEMES.length];
            const cardInner = (
              <>
                {/* Header row: icon + number */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${theme.iconBg} flex items-center justify-center ${theme.iconColor}`}>
                    <theme.Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-(--text-secondary) opacity-40 tracking-widest">
                    No.{theme.number}
                  </span>
                </div>
                {/* Name & description */}
                <h3 className="font-semibold text-(--text-primary) group-hover:text-accent transition-colors duration-300 mb-1.5 leading-snug">
                  {project.name}
                </h3>
                <p className="text-sm text-(--text-secondary) line-clamp-2 leading-relaxed flex-1">
                  {project.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-(--bg-secondary) text-(--text-secondary) border border-(--border)">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Footer */}
                <div className="mt-4 pt-3.5 border-t border-(--border) flex items-center justify-between">
                  <span className="text-[11px] font-mono text-(--text-secondary) opacity-50">
                    {project.role}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                        className="w-6 h-6 rounded-md border border-(--border) bg-(--bg-secondary) flex items-center justify-center text-(--text-secondary) hover:text-accent hover:border-accent/30 transition-all duration-200 relative z-10">
                        <Github size={12} />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Demo"
                        className="w-6 h-6 rounded-md border border-(--border) bg-(--bg-secondary) flex items-center justify-center text-(--text-secondary) hover:text-accent hover:border-accent/30 transition-all duration-200 relative z-10">
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </>
            );
            const href = project.slug
              ? `/${locale}/projects/${project.slug}`
              : `/${locale}/projects`;
            return (
              <ScrollReveal key={project.id} delay={i * 80}>
                <Link
                  href={href}
                  className={`block h-full group transition-all duration-500 hover:-translate-y-1 ${theme.glow}`}
                >
                  <SpotlightCard className="glass-card rounded-2xl p-5 h-full flex flex-col">
                    {cardInner}
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
