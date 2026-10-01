export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

/** Texto (ou dado) disponível nos dois idiomas. */
export type Localized<T = string> = Record<Locale, T>;

export const defaultLocale: Locale = "pt";

export const htmlLang: Localized = { pt: "pt-BR", en: "en" };

/** Guarda a escolha manual de idioma, para a detecção automática não sobrescrevê-la. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** O idioma padrão vive na raiz (`/`); os demais ganham prefixo (`/en`). */
export function localePath(locale: Locale, path = "/") {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}
