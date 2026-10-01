import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { htmlLang, localePath, locales } from "@/i18n/config";

const pages = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/privacidade", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [
        htmlLang[locale],
        `${site.url}${localePath(locale, path)}`,
      ]),
    );

    return locales.map((locale) => ({
      url: `${site.url}${localePath(locale, path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
