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

export async function FeaturedProjects({
  locale,
  dict,
}: FeaturedProjectsProps) {
  const projects = await getFeaturedProjects(locale, 3);

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text-subtle">
              {dict.home.featuredProjects}
            </h2>
            <Link
              href={`/${locale}/projects`}
              className="text-sm text-accent hover:text-accent-light transition-colors flex items-center gap-1 group"
            >
              {dict.home.viewAll}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 100}>
              <SpotlightCard className="glass-card gradient-border rounded-2xl p-5 group h-full">
                {/* Gradient cover placeholder */}
                <div className="h-24 rounded-xl mb-4 bg-gradient-to-br from-pink-400/15 via-purple-300/10 to-sky-300/5 flex items-center justify-center">
                  <span className="text-3xl font-bold gradient-text opacity-30">
                    {project.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-accent/5 text-[var(--text-secondary)] border border-accent/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-accent transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-accent transition-colors"
                      aria-label="Demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
