import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import { getProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Locale } from "@/lib/data/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return {
    title: locale === "zh" ? "项目" : "Projects",
    description:
      locale === "zh"
        ? "我的项目作品集"
        : "My project portfolio",
    alternates: {
      languages: {
        zh: `${siteConfig.url}/zh/projects`,
        en: `${siteConfig.url}/en/projects`,
      },
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const projects = await getProjects(locale as Locale);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">{dict.projects.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} dict={dict} />
        ))}
      </div>
    </div>
  );
}
