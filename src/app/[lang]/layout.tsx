import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Aldrich, Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Splash } from "@/components/layout/Splash";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import {
  hasLocale,
  htmlLang,
  localePath,
  locales,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { splashScript } from "@/lib/splash";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Só numeração e contadores: não precisa competir com as fontes do primeiro carregamento.
const aldrich = Aldrich({
  variable: "--font-aldrich",
  weight: "400",
  subsets: ["latin"],
  preload: false,
});

export const viewport: Viewport = { themeColor: "#0b0b0c" };

const ogLocale: Record<Locale, string> = { pt: "pt_BR", en: "en_US" };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: Pick<LayoutProps<"/[lang]">, "params">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s | ${site.name}` },
    description: dict.meta.description,
    applicationName: site.name,
    alternates: {
      canonical: localePath(lang),
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [htmlLang[locale], localePath(locale)]),
        ),
        "x-default": localePath("pt"),
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: site.name,
      url: localePath(lang),
      locale: ogLocale[lang],
      alternateLocale: locales
        .filter((locale) => locale !== lang)
        .map((locale) => ogLocale[locale]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={htmlLang[lang]}
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${aldrich.variable}`}
    >
      <body className="flex min-h-svh flex-col">
        {/* `next/script`: uma <script> comum no layout gera erro do React 19 ao re-renderizar no cliente. */}
        <Script
          id="splash-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: splashScript }}
        />
        <Splash />
        <Cursor />
        <SmoothScroll />
        <ScrollReveal />
        <Header lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
