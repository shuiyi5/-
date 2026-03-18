import { notion, PROJECTS_DATABASE_ID } from "./client";
import type { Project, Locale } from "@/lib/data/types";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

function extractProjectProps(page: PageObjectResponse): Project {
  const props = page.properties;

  // Name
  const nameProp = props["Name"];
  const name =
    nameProp?.type === "title"
      ? nameProp.title.map((t) => t.plain_text).join("")
      : "";

  // Description
  const descProp = props["Description"];
  const description =
    descProp?.type === "rich_text"
      ? descProp.rich_text.map((t) => t.plain_text).join("")
      : "";

  // Language
  const langProp = props["Language"];
  const language =
    langProp?.type === "select"
      ? (langProp.select?.name as Locale) ?? "zh"
      : "zh";

  // Role
  const roleProp = props["Role"];
  const role =
    roleProp?.type === "rich_text"
      ? roleProp.rich_text.map((t) => t.plain_text).join("")
      : "";

  // Tags
  const tagsProp = props["Tags"];
  const tags =
    tagsProp?.type === "multi_select"
      ? tagsProp.multi_select.map((t) => t.name)
      : [];

  // Cover
  const coverProp = props["Cover"];
  let cover: string | undefined;
  if (coverProp?.type === "files" && coverProp.files.length > 0) {
    const file = coverProp.files[0];
    cover =
      file.type === "file"
        ? file.file.url
        : file.type === "external"
          ? file.external.url
          : undefined;
  }

  // Link
  const linkProp = props["Link"];
  const link =
    linkProp?.type === "url" ? linkProp.url ?? undefined : undefined;

  // GitHub
  const githubProp = props["GitHub"];
  const github =
    githubProp?.type === "url" ? githubProp.url ?? undefined : undefined;

  // Order
  const orderProp = props["Order"];
  const order =
    orderProp?.type === "number" ? orderProp.number ?? 0 : 0;

  return {
    id: page.id,
    name,
    description,
    language,
    role,
    tags,
    cover,
    link,
    github,
    order,
  };
}

export async function getNotionProjects(locale: Locale): Promise<Project[]> {
  const response = await notion.databases.query({
    database_id: PROJECTS_DATABASE_ID,
    filter: { property: "Language", select: { equals: locale } },
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return response.results.map((page) =>
    extractProjectProps(page as PageObjectResponse)
  );
}
