# personal-blog

> 探索 AI 产品的边界，记录从 0 到 1 的思考。

基于 **Next.js 16 + Notion API** 构建的中英双语个人博客，以 Notion 作为全站内容管理系统，支持文章、项目、图库三大模块，配备深色模式、目录导航、图片灯箱、Live2D 看板娘等特色功能，部署于 Vercel。

**在线预览：** https://sentoe.vercel.app &nbsp;·&nbsp; **作者：** [@shuiyi5](https://github.com/shuiyi5)

---

## 功能特性

### 内容管理
- **Notion 驱动**：文章、项目、图库全部由 Notion 数据库管理，写作即发布
- **中英双语**：基于 Next.js 动态路由实现 `zh` / `en` 双语切换，默认中文
- **增量缓存**：配合 Vercel ISR + Webhook 实现内容自动更新，无需重新部署
- **SEO 友好**：自动生成 `sitemap.xml`、`robots.txt`，支持 Open Graph 元数据

### 博客
- **目录导航（TOC）**：文章页右侧固定目录，滚动同步高亮当前章节，点击平滑跳转
- **分类过滤**：按分类筛选文章列表
- **代码高亮**：集成 Shiki，支持多种编程语言主题高亮
- **富文本渲染**：完整支持 Notion 块类型——标题、引用、Callout、代码块、表格、折叠块、图片、列表等
- **上下篇导航**：文章底部展示相邻文章跳转

### 项目展示
- 展示个人项目，支持 Demo 链接、GitHub 仓库链接
- 中英双语项目描述，标签分类

### 图库
- Notion 图库数据库驱动
- 灯箱（Lightbox）查看原图
- 分类过滤
- 音频播放器支持

### 视觉与交互
- **深色 / 浅色模式**：一键切换，偏好持久化
- **Live2D 看板娘**：页面右下角互动角色
- **粒子网格背景**：首页动态粒子效果
- **鼠标光标拖尾**：流光拖尾动效
- **花瓣飘落动画**：氛围感装饰
- **ScrollReveal**：页面元素滚动入场动画
- **Spotlight 卡片**：鼠标悬停光晕效果

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| 内容 | Notion API (`@notionhq/client`) |
| 代码高亮 | Shiki 4 |
| 图标 | Lucide React |
| 统计 | Umami（可选，自托管） |
| 部署 | Vercel |
| 包管理 | pnpm |

---

## 项目结构

```
src/
├── app/
│   ├── [locale]/               # 多语言路由（zh / en）
│   │   ├── page.tsx            # 首页
│   │   ├── blog/               # 博客列表 & 文章详情
│   │   ├── projects/           # 项目展示
│   │   ├── gallery/            # 图库
│   │   └── about/              # 关于页
│   ├── api/
│   │   ├── revalidate/         # Webhook 触发 ISR 缓存更新
│   │   └── debug-notion/       # Notion 调试接口
│   ├── sitemap.ts              # 自动生成站点地图
│   └── robots.ts               # 爬虫规则
├── components/
│   ├── blog/                   # 博客相关组件（TOC、文章卡片、内容块）
│   ├── gallery/                # 图库组件（灯箱、过滤器、音频播放）
│   ├── home/                   # 首页组件（Hero、精选项目、最新文章）
│   ├── layout/                 # 布局（Navbar、Footer、主题切换）
│   ├── projects/               # 项目卡片
│   └── ui/                     # 通用 UI（动画、特效、Live2D）
├── lib/
│   ├── notion/                 # Notion API 封装（文章、项目、图库、块渲染）
│   ├── data/                   # 数据类型定义 & Mock 数据
│   ├── i18n/                   # 国际化字典（zh.json / en.json）
│   ├── constants.ts            # 站点配置、社交链接
│   └── utils.ts                # 工具函数
└── middleware.ts                # 语言路由中间件
```

---

## 快速开始

### 环境要求

- Node.js 18+
- pnpm 10+

### 1. 克隆仓库

```bash
git clone https://github.com/shuiyi5/personal-blog.git
cd personal-blog
pnpm install
```

### 2. 配置 Notion

#### 创建 Notion Integration

1. 访问 https://www.notion.so/my-integrations
2. 新建 Integration，复制 **Internal Integration Secret**

#### 创建数据库

需要在 Notion 中创建三个数据库，并与 Integration 共享：

**文章数据库（Posts）**

| 字段 | 类型 | 说明 |
|------|------|------|
| Title | title | 文章标题 |
| Slug | text | URL 路径，如 `my-first-post` |
| Language | select | `zh` 或 `en` |
| Status | select | `Draft`（草稿）或 `Published`（发布） |
| Category | select | 文章分类 |
| Tags | multi-select | 标签 |
| Summary | text | 摘要，建议不超过 120 字 |
| Date | date | 发布日期 |
| Cover | files | 封面图 |

**项目数据库（Projects）**

| 字段 | 类型 | 说明 |
|------|------|------|
| Name | title | 项目名称 |
| Description | text | 一行描述 |
| Language | select | `zh` 或 `en` |
| Role | text | 担任角色 |
| Tags | multi-select | 技术/工具标签 |
| Cover | files | 封面图 |
| Link | url | Demo 地址 |
| GitHub | url | 仓库地址 |
| Order | number | 排序（1, 2, 3...） |

**图库数据库（Gallery）**

按需配置图片、分类等字段。

#### 获取数据库 ID

打开数据库页面，URL 格式为：
```
https://notion.so/YOUR_WORKSPACE/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=...
```
其中 32 位十六进制字符串即为数据库 ID。

### 3. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
# Notion
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxx
NOTION_POSTS_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PROJECTS_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_GALLERY_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Umami 统计（可选）
# NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
# NEXT_PUBLIC_UMAMI_SRC=https://your-umami.vercel.app/script.js
```

### 4. 本地开发

```bash
pnpm dev
```

访问 http://localhost:3000，默认跳转至中文版 `/zh`。

---

## 个性化配置

修改 `src/lib/constants.ts` 替换为你自己的信息：

```ts
export const siteConfig = {
  name: "你的名字",
  url: "https://your-domain.com",
  description: {
    zh: "你的中文简介",
    en: "Your English bio",
  },
};

export const socialLinks = {
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
  twitter: "https://x.com/your-handle",
  email: "mailto:your@email.com",
};
```

---

## 部署到 Vercel

1. Fork 本仓库
2. 在 [Vercel](https://vercel.com) 导入项目
3. 在 **Environment Variables** 中填入所有 `NOTION_*` 变量
4. 点击 Deploy

### 配置内容自动更新（Webhook）

Notion 内容更新后，通过 Webhook 触发 Vercel ISR 缓存刷新：

1. 在 Vercel 项目设置中生成 **REVALIDATE_SECRET**，加入环境变量
2. 在 Notion 或第三方自动化工具（如 Make、Zapier）中配置 Webhook：
   ```
   POST https://your-domain.com/api/revalidate
   Body: { "secret": "your-revalidate-secret" }
   ```

---

## License

[MIT](./LICENSE)
