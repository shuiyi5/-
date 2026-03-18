import type { Dictionary } from "@/lib/i18n/dictionaries";

interface SkillsSectionProps {
  dict: Dictionary;
  locale: string;
}

const productSkills = {
  zh: [
    "用户研究",
    "需求分析",
    "PRD 撰写",
    "数据分析",
    "竞品分析",
    "AI Prompt Engineering",
  ],
  en: [
    "User Research",
    "Requirements Analysis",
    "PRD Writing",
    "Data Analysis",
    "Competitive Analysis",
    "AI Prompt Engineering",
  ],
};

const techSkills = {
  zh: ["Python", "SQL", "JavaScript", "前端开发", "机器学习基础"],
  en: ["Python", "SQL", "JavaScript", "Frontend Development", "ML Fundamentals"],
};

export function SkillsSection({ dict, locale }: SkillsSectionProps) {
  const l = locale as "zh" | "en";

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">{dict.about.skills}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-[var(--border)] rounded-lg p-5">
          <h3 className="font-semibold mb-4 text-accent">
            {dict.about.productSkills}
          </h3>
          <div className="flex flex-wrap gap-2">
            {productSkills[l].map((skill) => (
              <span
                key={skill}
                className="text-sm px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="border border-[var(--border)] rounded-lg p-5">
          <h3 className="font-semibold mb-4 text-accent">
            {dict.about.techSkills}
          </h3>
          <div className="flex flex-wrap gap-2">
            {techSkills[l].map((skill) => (
              <span
                key={skill}
                className="text-sm px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
