import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/pt";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  pt: () => import("./dictionaries/pt").then((module) => module.default),
  en: () => import("./dictionaries/en").then((module) => module.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
