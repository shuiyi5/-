import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import { Hero } from "@/components/home/Hero";
import { LatestPosts } from "@/components/home/LatestPosts";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import type { Locale } from "@/lib/data/types";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const otherLocale = locale === "zh" ? "en" : "zh";

  return {
    title: `Sentoe - ${siteConfig.description[locale as Locale]}`,
    description: siteConfig.description[locale as Locale],
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        zh: `${siteConfig.url}/zh`,
        en: `${siteConfig.url}/en`,
      },
    },
    openGraph: {
      title: `Sentoe`,
      description: siteConfig.description[locale as Locale],
      url: `${siteConfig.url}/${locale}`,
      siteName: "Sentoe",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: otherLocale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sentoe",
      description: siteConfig.description[locale as Locale],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero dict={dict} />
      <LatestPosts locale={locale as Locale} dict={dict} />
      <FeaturedProjects locale={locale as Locale} dict={dict} />
    </>
  );
}
