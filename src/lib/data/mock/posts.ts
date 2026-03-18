import type { Post } from "../types";

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "GPT-4o 产品分析：多模态如何重塑用户体验",
    slug: "gpt-4o-product-analysis",
    language: "zh",
    status: "Published",
    category: "AI Product Analysis",
    tags: ["GPT-4o", "多模态", "用户体验"],
    summary:
      "深入分析 GPT-4o 的产品设计决策，探讨多模态交互如何从根本上改变人与 AI 的协作方式，以及对产品经理的启示。",
    date: "2026-03-10",
    content: [
      {
        type: "heading",
        level: 1,
        text: "GPT-4o 产品分析：多模态如何重塑用户体验",
        id: "intro",
      },
      {
        type: "paragraph",
        text: "2024 年 5 月，OpenAI 发布了 GPT-4o（\"o\" 代表 \"omni\"），这是一款能够同时处理文本、音频和图像输入的多模态模型。作为 AI 产品经理，我认为这不仅是技术上的飞跃，更是产品设计范式的转变。",
      },
      {
        type: "heading",
        level: 2,
        text: "多模态交互的核心优势",
        id: "advantages",
      },
      {
        type: "paragraph",
        text: "传统的 AI 助手以文本为主要交互方式，但人类的信息获取和表达是多维度的。GPT-4o 在单一模型中统一了多种模态的理解和生成能力，这意味着用户不再需要在不同工具之间切换。",
      },
      {
        type: "bulleted_list",
        items: [
          "实时语音对话：响应延迟降至 320 毫秒，接近人类对话的自然节奏",
          "视觉理解：能够分析图片、图表、手写内容并给出反馈",
          "情感感知：通过语音语调判断用户情绪，调整回复风格",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "产品设计启示",
        id: "design-insights",
      },
      {
        type: "callout",
        emoji: "💡",
        text: "关键洞察：最好的 AI 产品不是让用户适应技术，而是让技术适应用户最自然的交互方式。",
      },
      {
        type: "paragraph",
        text: "作为产品经理，我们需要重新思考用户交互流程。以下是一些关键的设计原则：",
      },
      {
        type: "numbered_list",
        items: [
          "降低输入门槛：允许用户以最方便的方式提供信息（语音、图片、文字）",
          "上下文连续性：跨模态保持对话上下文，避免信息丢失",
          "渐进式复杂度：简单任务简单交互，复杂任务逐步引导",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "竞品对比",
        id: "comparison",
      },
      {
        type: "table",
        headers: ["特性", "GPT-4o", "Claude 3", "Gemini Pro"],
        rows: [
          ["多模态输入", "文本+图片+音频", "文本+图片", "文本+图片+视频"],
          ["实时语音", "支持", "不支持", "部分支持"],
          ["响应速度", "320ms", "~1s", "~500ms"],
          ["免费可用", "是（有限制）", "是（有限制）", "是（有限制）"],
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "总结",
        id: "summary",
      },
      {
        type: "paragraph",
        text: "GPT-4o 代表了 AI 产品从单一模态向全模态演进的重要里程碑。对于产品经理而言，理解多模态交互的优势和局限性，将帮助我们设计出更加自然、高效的 AI 产品。",
      },
      {
        type: "quote",
        text: "未来的 AI 产品不再是工具，而是协作伙伴。多模态能力让这一愿景更近了一步。",
      },
    ],
  },
  {
    id: "2",
    title: "GPT-4o Product Analysis: How Multimodal AI Reshapes UX",
    slug: "gpt-4o-product-analysis",
    language: "en",
    status: "Published",
    category: "AI Product Analysis",
    tags: ["GPT-4o", "Multimodal", "UX"],
    summary:
      "A deep dive into GPT-4o's product design decisions, exploring how multimodal interaction fundamentally changes human-AI collaboration.",
    date: "2026-03-10",
    content: [
      {
        type: "heading",
        level: 1,
        text: "GPT-4o Product Analysis: How Multimodal AI Reshapes UX",
        id: "intro",
      },
      {
        type: "paragraph",
        text: "In May 2024, OpenAI released GPT-4o (\"o\" for \"omni\"), a multimodal model capable of processing text, audio, and image inputs simultaneously. As an AI product manager, I believe this represents not just a technological leap, but a paradigm shift in product design.",
      },
      {
        type: "heading",
        level: 2,
        text: "Core Advantages of Multimodal Interaction",
        id: "advantages",
      },
      {
        type: "paragraph",
        text: "Traditional AI assistants rely primarily on text-based interaction, but human information acquisition and expression is multidimensional. GPT-4o unifies understanding and generation across multiple modalities in a single model.",
      },
      {
        type: "bulleted_list",
        items: [
          "Real-time voice conversation: Response latency reduced to 320ms, approaching natural human conversation rhythm",
          "Visual understanding: Ability to analyze images, charts, handwritten content and provide feedback",
          "Emotion perception: Adjusts response style based on vocal tone",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Product Design Insights",
        id: "design-insights",
      },
      {
        type: "callout",
        emoji: "💡",
        text: "Key insight: The best AI products don't make users adapt to technology — they make technology adapt to users' most natural interaction patterns.",
      },
      {
        type: "code",
        language: "typescript",
        code: '// Example: Multimodal input handler\ninterface MultimodalInput {\n  text?: string;\n  image?: File;\n  audio?: Blob;\n}\n\nasync function processInput(input: MultimodalInput) {\n  const modalities = Object.keys(input).filter(\n    (k) => input[k as keyof MultimodalInput] != null\n  );\n  console.log(`Processing ${modalities.join(" + ")} input`);\n  // Route to appropriate processing pipeline\n}',
      },
      {
        type: "heading",
        level: 2,
        text: "Summary",
        id: "summary",
      },
      {
        type: "paragraph",
        text: "GPT-4o represents a significant milestone in the evolution of AI products from single-modality to omni-modality. Understanding the advantages and limitations of multimodal interaction will help us design more natural and efficient AI products.",
      },
    ],
  },
  {
    id: "3",
    title: "2026 AI 产品趋势：从 Copilot 到 Agent",
    slug: "ai-trends-copilot-to-agent",
    language: "zh",
    status: "Published",
    category: "Industry Insights",
    tags: ["AI Agent", "Copilot", "趋势"],
    summary:
      "AI 产品正经历从辅助工具到自主代理的转变。本文梳理这一趋势的关键驱动因素和产品机会。",
    date: "2026-02-28",
    content: [
      {
        type: "heading",
        level: 1,
        text: "2026 AI 产品趋势：从 Copilot 到 Agent",
        id: "intro",
      },
      {
        type: "paragraph",
        text: "2025 年是 AI Copilot 全面开花的一年，从代码编写到文档生成、从客户服务到数据分析，几乎每个软件产品都添加了 AI 辅助功能。而进入 2026 年，我们正在见证一个更深刻的转变：从 Copilot（辅助驾驶）到 Agent（自动驾驶）。",
      },
      {
        type: "heading",
        level: 2,
        text: "Copilot 的局限性",
        id: "copilot-limitations",
      },
      {
        type: "paragraph",
        text: "Copilot 模式本质上是人机协作的升级版——AI 给出建议，人类做最终决策。这在很多场景下是合理的，但也存在明显的瓶颈：",
      },
      {
        type: "bulleted_list",
        items: [
          "每次交互都需要人类参与，无法处理批量或后台任务",
          "AI 的输出质量受限于人类提问的质量",
          "缺乏持续性记忆和目标追踪能力",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Agent 的崛起",
        id: "agent-rise",
      },
      {
        type: "paragraph",
        text: "AI Agent 能够自主规划任务、调用工具、处理异常，并在复杂工作流中保持上下文。这种能力的核心突破来自几个方面：",
      },
      {
        type: "numbered_list",
        items: [
          "推理能力提升：o1、Claude 3.5 等模型展现了强大的链式推理能力",
          "工具使用（Tool Use）：模型能够可靠地调用外部 API 和工具",
          "长上下文窗口：支持更复杂的任务规划和执行",
          "可靠性改善：输出幻觉率显著降低",
        ],
      },
      {
        type: "quote",
        text: "Agent 不是更聪明的 Copilot，而是一种全新的产品形态。它要求我们重新思考人机交互、信任建立和错误处理的设计模式。",
      },
      {
        type: "heading",
        level: 2,
        text: "对产品经理的启示",
        id: "pm-insights",
      },
      {
        type: "paragraph",
        text: "作为 AI 产品经理，我们需要为 Agent 时代做好准备。这意味着不仅要理解模型能力，还要深入思考信任、安全、和人机协作的边界。",
      },
    ],
  },
  {
    id: "4",
    title: "2026 AI Product Trends: From Copilot to Agent",
    slug: "ai-trends-copilot-to-agent",
    language: "en",
    status: "Published",
    category: "Industry Insights",
    tags: ["AI Agent", "Copilot", "Trends"],
    summary:
      "AI products are evolving from assistive tools to autonomous agents. This article examines the key drivers and product opportunities in this shift.",
    date: "2026-02-28",
    content: [
      {
        type: "heading",
        level: 1,
        text: "2026 AI Product Trends: From Copilot to Agent",
        id: "intro",
      },
      {
        type: "paragraph",
        text: "2025 was the year AI Copilots bloomed across every domain — from code generation to document creation, customer service to data analysis. Entering 2026, we're witnessing a deeper transformation: from Copilot (assisted driving) to Agent (autonomous driving).",
      },
      {
        type: "heading",
        level: 2,
        text: "Limitations of the Copilot Model",
        id: "copilot-limitations",
      },
      {
        type: "paragraph",
        text: "The Copilot model is essentially an upgraded version of human-AI collaboration — AI provides suggestions, humans make the final decisions. While reasonable for many scenarios, there are clear bottlenecks.",
      },
      {
        type: "bulleted_list",
        items: [
          "Every interaction requires human involvement, unable to handle batch or background tasks",
          "AI output quality is limited by the quality of human prompts",
          "Lack of persistent memory and goal tracking capabilities",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "The Rise of AI Agents",
        id: "agent-rise",
      },
      {
        type: "paragraph",
        text: "AI Agents can autonomously plan tasks, invoke tools, handle exceptions, and maintain context across complex workflows. This capability breakthrough comes from several advances in reasoning, tool use, long context windows, and reliability improvements.",
      },
      {
        type: "code",
        language: "python",
        code: '# Simplified Agent loop\nclass AIAgent:\n    def __init__(self, tools, memory):\n        self.tools = tools\n        self.memory = memory\n    \n    async def execute(self, goal: str):\n        plan = await self.plan(goal)\n        for step in plan:\n            result = await self.tools[step.tool].run(step.params)\n            self.memory.store(step, result)\n            if result.needs_replanning:\n                plan = await self.replan(goal, self.memory)\n        return self.memory.summarize()',
      },
      {
        type: "heading",
        level: 2,
        text: "Implications for Product Managers",
        id: "pm-insights",
      },
      {
        type: "paragraph",
        text: "As AI product managers, we need to prepare for the Agent era. This means understanding not just model capabilities, but deeply considering trust, safety, and the boundaries of human-AI collaboration.",
      },
    ],
  },
  {
    id: "5",
    title: "如何用 Notion 构建个人知识管理系统",
    slug: "notion-knowledge-management",
    language: "zh",
    status: "Published",
    category: "Project Review",
    tags: ["Notion", "知识管理", "效率"],
    summary:
      "分享我用 Notion 搭建个人知识管理系统的完整方法论，包括信息收集、整理、输出的全流程。",
    date: "2026-02-15",
    content: [
      {
        type: "heading",
        level: 1,
        text: "如何用 Notion 构建个人知识管理系统",
        id: "intro",
      },
      {
        type: "paragraph",
        text: "作为一名 AI 产品方向的学生，我每天需要阅读大量的行业资讯、论文和产品分析。如何高效地收集、整理和利用这些信息，成为了一个关键问题。经过一年多的迭代，我用 Notion 搭建了一套完整的个人知识管理系统。",
      },
      {
        type: "heading",
        level: 2,
        text: "系统架构",
        id: "architecture",
      },
      {
        type: "paragraph",
        text: "我的知识管理系统分为四个核心模块：收集箱（Inbox）、知识库（Wiki）、项目库（Projects）和输出库（Output）。每个模块对应一个 Notion 数据库，通过 Relation 和 Rollup 字段相互关联。",
      },
      {
        type: "heading",
        level: 2,
        text: "收集流程",
        id: "collection",
      },
      {
        type: "bulleted_list",
        items: [
          "浏览器插件 Save to Notion：一键保存网页到收集箱",
          "微信读书笔记导出：定期将阅读笔记同步到 Notion",
          "RSS 阅读器：通过 IFTTT 自动将感兴趣的文章发送到 Notion",
          "手动记录：随时随地打开 Notion 记录灵感和想法",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "效果与反思",
        id: "reflection",
      },
      {
        type: "paragraph",
        text: "使用这套系统半年来，我明显感受到信息处理效率的提升。最大的收获不是收集了多少信息，而是养成了定期整理和输出的习惯。知识只有经过加工和输出，才能真正内化为自己的能力。",
      },
      {
        type: "toggle",
        title: "我的 Notion 模板清单",
        content:
          "1. 周报模板：总结本周学习和产出\n2. 竞品分析模板：标准化的竞品分析框架\n3. 阅读笔记模板：包含摘要、思考和行动项\n4. 项目复盘模板：PDCA 循环框架",
      },
    ],
  },
  {
    id: "6",
    title: "Building a Knowledge Management System with Notion",
    slug: "notion-knowledge-management",
    language: "en",
    status: "Published",
    category: "Project Review",
    tags: ["Notion", "Knowledge Management", "Productivity"],
    summary:
      "Sharing my complete methodology for building a personal knowledge management system with Notion, covering the full workflow from collection to output.",
    date: "2026-02-15",
    content: [
      {
        type: "heading",
        level: 1,
        text: "Building a Knowledge Management System with Notion",
        id: "intro",
      },
      {
        type: "paragraph",
        text: "As a student focused on AI product management, I consume vast amounts of industry news, papers, and product analyses daily. How to efficiently collect, organize, and leverage this information became a critical challenge. After over a year of iteration, I built a complete personal knowledge management system using Notion.",
      },
      {
        type: "heading",
        level: 2,
        text: "System Architecture",
        id: "architecture",
      },
      {
        type: "paragraph",
        text: "My knowledge management system consists of four core modules: Inbox, Wiki, Projects, and Output. Each module corresponds to a Notion database, interconnected through Relation and Rollup fields.",
      },
      {
        type: "heading",
        level: 2,
        text: "Collection Workflow",
        id: "collection",
      },
      {
        type: "bulleted_list",
        items: [
          "Save to Notion browser extension: One-click save web pages to Inbox",
          "Reading notes export: Periodically sync reading notes to Notion",
          "RSS reader: Auto-forward interesting articles to Notion via IFTTT",
          "Manual capture: Record ideas and thoughts in Notion anytime",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Results and Reflections",
        id: "reflection",
      },
      {
        type: "paragraph",
        text: "After six months of using this system, I've noticed a significant improvement in information processing efficiency. The biggest gain isn't the volume of information collected, but the habit of regular organization and output. Knowledge only becomes internalized capability when it's processed and articulated.",
      },
    ],
  },
];
