import type { Locale } from "@/lib/data/types";

const dictionaries = {
  zh: () => import("./zh.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["zh"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
