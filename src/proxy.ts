import { NextResponse, type NextRequest } from "next/server";

import {
  LOCALE_COOKIE,
  defaultLocale,
  hasLocale,
  type Locale,
} from "@/i18n/config";

/** Escolhe o idioma pelo `Accept-Language`. Sem cabeçalho (robôs), o padrão; idioma sem tradução, inglês. */
function negotiate(header: string | null): Locale {
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return {
        language: tag.split("-")[0].toLowerCase(),
        quality: quality ? Number(quality) : 1,
      };
    })
    .filter(({ language }) => language && language !== "*")
    .sort((a, b) => b.quality - a.quality);

  const match = preferred.find(({ language }) => hasLocale(language));
  if (match) return match.language as Locale;
  return preferred.length ? "en" : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];

  // `/pt/...` não é canônico: o idioma padrão é servido sem prefixo.
  if (segment === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (hasLocale(segment)) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    saved && hasLocale(saved)
      ? saved
      : negotiate(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  const suffix = pathname === "/" ? "" : pathname;
  let response: NextResponse;

  if (locale === defaultLocale) {
    url.pathname = `/${defaultLocale}${suffix}`;
    response = NextResponse.rewrite(url);
  } else {
    url.pathname = `/${locale}${suffix}`;
    response = NextResponse.redirect(url, 307);
  }

  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Ignora internos do Next, APIs, arquivos estáticos e imagens de compartilhamento.
  matcher: ["/((?!_next|api|.*\\..*|.*opengraph-image).*)"],
};
