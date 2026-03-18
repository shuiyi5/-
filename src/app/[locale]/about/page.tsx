import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale } from "@/lib/utils";
import { siteConfig, socialLinks } from "@/lib/constants";
import { SkillsSection } from "@/components/about/SkillsSection";
import { Timeline } from "@/components/about/Timeline";
import type { Locale } from "@/lib/data/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return {
    title: locale === "zh" ? "关于我" : "About Me",
    description:
      locale === "zh"
        ? "了解 Sentoe — AI 产品经理方向的大三学生"
        : "Learn about Sentoe — a junior student focusing on AI product management",
    alternates: {
      languages: {
        zh: `${siteConfig.url}/zh/about`,
        en: `${siteConfig.url}/en/about`,
      },
    },
  };
}

const bio = {
  zh: "我是 Sentoe，一名计算机专业大三学生，职业方向是 AI 产品经理。我对人工智能如何重塑产品形态和用户体验充满热情。通过这个博客，我记录自己在 AI 产品领域的学习、思考和实践，希望与志同道合的人交流碰撞。我相信好的 AI 产品不仅需要技术功底，更需要对用户需求的深刻理解和对产品细节的极致追求。",
  en: "I'm Sentoe, a junior Computer Science student with a career focus on AI Product Management. I'm passionate about how artificial intelligence reshapes product forms and user experiences. Through this blog, I document my learning, thinking, and practice in the AI product space, hoping to connect with like-minded people. I believe great AI products require not just technical foundations, but also a deep understanding of user needs and a relentless pursuit of product excellence.",
};

const education = {
  zh: {
    degree: "计算机科学与技术 本科",
    school: "某大学",
    period: "2023 - 2027（预计）",
  },
  en: {
    degree: "B.S. in Computer Science",
    school: "University",
    period: "2023 - 2027 (Expected)",
  },
};

const timelineEvents = {
  zh: [
    {
      period: "2025.09 - 至今",
      role: "AI 产品实习生",
      organization: "某科技公司",
      description:
        "参与 AI 助手产品的需求分析和产品设计，负责用户调研和竞品分析。",
    },
    {
      period: "2025.03 - 2025.08",
      role: "产品经理实习生",
      organization: "某互联网公司",
      description:
        "参与内部效率工具的产品迭代，完成 3 次需求评审和 2 个功能上线。",
    },
    {
      period: "2024.06 - 2024.09",
      role: "项目负责人",
      organization: "校园创新项目",
      description:
        "带领 4 人团队开发基于 LLM 的智能学习助手，获得校级创新创业大赛二等奖。",
    },
  ],
  en: [
    {
      period: "Sep 2025 - Present",
      role: "AI Product Intern",
      organization: "Tech Company",
      description:
        "Participating in requirement analysis and product design for AI assistant products. Responsible for user research and competitive analysis.",
    },
    {
      period: "Mar 2025 - Aug 2025",
      role: "Product Manager Intern",
      organization: "Internet Company",
      description:
        "Contributed to product iterations of internal efficiency tools. Completed 3 requirement reviews and launched 2 features.",
    },
    {
      period: "Jun 2024 - Sep 2024",
      role: "Project Lead",
      organization: "Campus Innovation Project",
      description:
        "Led a 4-person team to develop an LLM-based intelligent learning assistant. Won second prize in the university innovation competition.",
    },
  ],
};

const vision = {
  zh: "我的职业愿景是成为一名优秀的 AI 产品经理，推动人工智能技术以更自然、更有温度的方式融入人们的工作和生活。我希望能在 AI 产品设计领域持续深耕，用产品思维和技术理解力架起用户与 AI 之间的桥梁。",
  en: "My career vision is to become an outstanding AI Product Manager, driving artificial intelligence to integrate into people's work and life in more natural and human-centric ways. I aspire to deepen my expertise in AI product design, bridging the gap between users and AI through product thinking and technical understanding.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const l = locale as Locale;
  const dict = await getDictionary(l);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Avatar + Name + Bio */}
      <section className="flex flex-col sm:flex-row items-start gap-6 mb-12">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 shrink-0 flex items-center justify-center text-3xl font-bold text-accent">
          S
        </div>
        <div>
          <h1 className="text-3xl font-bold">{dict.about.title}</h1>
          <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
            {bio[l]}
          </p>
        </div>
      </section>

      {/* Education */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-4">{dict.about.education}</h2>
        <div className="border border-[var(--border)] rounded-lg p-5">
          <div className="font-medium">{education[l].degree}</div>
          <div className="text-sm text-accent">{education[l].school}</div>
          <div className="text-sm text-[var(--text-secondary)]">
            {education[l].period}
          </div>
        </div>
      </section>

      {/* Skills */}
      <SkillsSection dict={dict} locale={locale} />

      {/* Timeline */}
      <Timeline events={timelineEvents[l]} label={dict.about.experience} />

      {/* Vision */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-4">{dict.about.vision}</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          {vision[l]}
        </p>
      </section>

      {/* CTA */}
      <section className="my-12 text-center py-10 border border-[var(--border)] rounded-lg">
        <p className="text-lg font-medium mb-4">{dict.about.contactCta}</p>
        <a
          href={socialLinks.email}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors text-sm font-medium"
        >
          <Mail size={16} />
          {dict.about.contact}
        </a>
      </section>
    </div>
  );
}
