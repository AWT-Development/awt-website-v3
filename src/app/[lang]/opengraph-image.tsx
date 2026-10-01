import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(hasLocale(lang) ? lang : "pt");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          color: "#f2f0eb",
        }}
      >
        <svg width="132" height="100" viewBox="0 0 368 278" fill="none">
          <path
            d="M107.608 149.65L52.0125 238.527H164.127L36.4089 37.687C150.833 116.12 214.985 160.094 329.409 238.527L187.821 21.5275L138.157 107.432"
            stroke="#F88512"
            strokeWidth="21"
            strokeMiterlimit="16"
          />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, maxWidth: 980 }}>
            {dict.hero.title.replaceAll("*", "")}
          </div>
          <div style={{ fontSize: 32, color: "#8a8a8e" }}>{site.name}</div>
        </div>
      </div>
    ),
    size,
  );
}
