import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

interface ProjectCardProps {
  project: Project;
  dict: Dictionary;
}

export function ProjectCard({ project, dict }: ProjectCardProps) {
  return (
    <SpotlightCard className="glass-card gradient-border rounded-2xl overflow-hidden group">
      {/* Cover placeholder with gradient */}
      <div className="h-36 bg-gradient-to-br from-accent/15 via-purple-500/10 to-pink-500/5 flex items-center justify-center">
        <span className="text-4xl font-bold gradient-text opacity-20">
          {project.name.charAt(0)}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
          {project.description}
        </p>

        <div className="mt-3 text-xs text-[var(--text-secondary)]">
          <span className="font-medium text-accent/70">{dict.projects.role}:</span>{" "}
          {project.role}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
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
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-accent transition-colors"
            >
              <Github size={15} />
              {dict.projects.source}
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-accent transition-colors"
            >
              <ExternalLink size={15} />
              {dict.projects.demo}
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
