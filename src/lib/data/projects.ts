import type { Project, Locale } from "./types";
import { isNotionConfigured } from "@/lib/notion/client";
import { mockProjects } from "./mock/projects";

function getMockProjects(locale: Locale): Project[] {
  return mockProjects
    .filter((p) => p.language === locale)
    .sort((a, b) => a.order - b.order);
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  if (isNotionConfigured) {
    try {
      const { getNotionProjects } = await import("@/lib/notion/projects");
      return await getNotionProjects(locale);
    } catch (e) {
      console.warn("Notion fetch failed, using mock data:", (e as Error).message);
    }
  }
  return getMockProjects(locale);
}

export async function getFeaturedProjects(
  locale: Locale,
  count: number = 3
): Promise<Project[]> {
  const projects = await getProjects(locale);
  return projects.slice(0, count);
}
