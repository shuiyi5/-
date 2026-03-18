import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { umamiConfig } from "@/lib/constants";
import type { Locale } from "@/lib/data/types";

/** ISR: re-fetch Notion data every 60 seconds */
export const revalidate = 60;

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {umamiConfig.websiteId && umamiConfig.src && (
        <script
          async
          defer
          data-website-id={umamiConfig.websiteId}
          src={umamiConfig.src}
        />
      )}
      <Navbar locale={locale as Locale} dict={dict} />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer dict={dict} />
    </>
  );
}
