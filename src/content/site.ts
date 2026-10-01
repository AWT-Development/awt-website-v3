import type { Locale, Localized } from "@/i18n/config";

export const site = {
  name: "AWT Development",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.awtdevelopment.com",
  location: "Goiânia, GO — Brasil",
  timeZone: "America/Sao_Paulo",
  email: "awtdevelopment@gmail.com",
  phone: "+55 62 98315-5703",
  // O WhatsApp está cadastrado sem o 9 extra: o link usa esta forma, o texto exibe a nova.
  whatsapp: "https://wa.me/556283155703",
  instagram: {
    handle: "@awtdevelopment",
    href: "https://www.instagram.com/awtdevelopment",
  },
} as const;

export const whatsappGreeting: Localized = {
  pt: "Olá! Vim pelo site da AWT e gostaria de conversar sobre um projeto.",
  en: "Hi! I found AWT's website and I'd like to talk about a project.",
};

export const whatsappHref = (lang: Locale) =>
  `${site.whatsapp}?text=${encodeURIComponent(whatsappGreeting[lang])}`;
