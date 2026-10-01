import type { StaticImageData } from "next/image";
import type { Localized } from "@/i18n/config";

import azusCover from "@/assets/projects/azus-imobiliaria/cover.webp";
import docesFinosCover from "@/assets/projects/doces-finos/cover.webp";
import hyperionCover from "@/assets/projects/hyperion-global/cover.webp";
import isotelhasCover from "@/assets/projects/isotelhas-tapajos/cover.webp";
import luccaCover from "@/assets/projects/lucca/cover.webp";

export type ProjectCategory =
  | "landing-page"
  | "site-pessoal"
  | "sistema-web"
  | "automacao"
  | "app"
  | "identidade-visual";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  services: Localized<string[]>;
  /** Uma frase simples, sem termos técnicos. */
  summary: Localized;
  /** Cor da aura atrás da capa. */
  accentColor: string;
  cover: StaticImageData;
  /** Site no ar. Sem ele, o card mostra `note`. */
  liveUrl?: string;
  /** Aviso no lugar do link quando não há site público (ex.: projeto confidencial). */
  note?: Localized;
  order: number;
};

export const categoryLabels: Record<ProjectCategory, Localized> = {
  "landing-page": { pt: "Landing Page", en: "Landing Page" },
  "site-pessoal": { pt: "Site Pessoal", en: "Personal Website" },
  "sistema-web": { pt: "Sistema Web", en: "Web System" },
  automacao: { pt: "Automação", en: "Automation" },
  app: { pt: "App", en: "App" },
  "identidade-visual": { pt: "Identidade Visual", en: "Brand Identity" },
};

/*
 * Para incluir um projeto: salvar a capa em `src/assets/projects/<slug>/cover.webp`
 * (colagem do site, ~1500px de largura, de preferência < 150 KB), importá-la acima
 * e acrescentar um objeto à lista, no formato dos existentes.
 */
export const projects: Project[] = [
  {
    slug: "hyperion-global",
    name: "Hyperion Global",
    category: "landing-page",
    services: {
      pt: ["Design", "Desenvolvimento"],
      en: ["Design", "Development"],
    },
    summary: {
      pt: "Landing page para uma empresa global de sustentabilidade, com design criado do zero a partir da essência da marca.",
      en: "Landing page for a global sustainability company, designed from scratch around the essence of the brand.",
    },
    accentColor: "#1e90ff",
    cover: hyperionCover,
    liveUrl: "https://hyperionglobals.com",
    order: 1,
  },
  {
    slug: "lucca",
    name: "Lucca",
    category: "site-pessoal",
    services: {
      pt: ["Design", "Desenvolvimento"],
      en: ["Design", "Development"],
    },
    summary: {
      pt: "Site autoral do artista Lucca, reunindo seus trabalhos artísticos, músicas e vídeos.",
      en: "A signature website for the artist Lucca, bringing together his artwork, music and videos.",
    },
    accentColor: "#8b5cf6",
    cover: luccaCover,
    liveUrl: "https://iamlucca.com",
    order: 2,
  },
  {
    slug: "isotelhas-tapajos",
    name: "Isotelhas Tapajós",
    category: "landing-page",
    services: {
      pt: ["Design", "Desenvolvimento"],
      en: ["Design", "Development"],
    },
    summary: {
      pt: "Landing page para uma empresa de isolamento termoacústico, pensada para o calor e a chuva do clima amazônico.",
      en: "Landing page for a thermal and acoustic insulation company, built around the heat and rain of the Amazon climate.",
    },
    accentColor: "#d9532b",
    cover: isotelhasCover,
    // Ainda em desenvolvimento; o endereço já funciona e foi liberado como link.
    liveUrl: "https://isotelhas-tapajos.vercel.app",
    order: 3,
  },
  {
    slug: "azus-imobiliaria",
    name: "Azus Imobiliária",
    category: "sistema-web",
    services: {
      pt: ["Design", "Desenvolvimento"],
      en: ["Design", "Development"],
    },
    summary: {
      pt: "Sistema e plataforma de inteligência imobiliária: mostra, em tempo real, as áreas mais procuradas, a valorização e a oferta de imóveis.",
      en: "A real estate intelligence system and platform: it shows, in real time, the most sought-after areas, price trends and available properties.",
    },
    accentColor: "#b8895a",
    cover: azusCover,
    note: { pt: "Projeto confidencial", en: "Confidential project" },
    order: 4,
  },
  {
    slug: "doces-finos",
    name: "Doces Finos",
    category: "automacao",
    // A categoria já é "Automação"; repetir nos serviços duplicaria o chip.
    services: { pt: ["Desenvolvimento"], en: ["Development"] },
    summary: {
      pt: "Gerador de contratos em PDF: o pedido é preenchido uma vez e os valores são calculados sozinhos.",
      en: "A PDF contract generator: the order is filled in once and the totals calculate themselves.",
    },
    accentColor: "#3b6fd4",
    cover: docesFinosCover,
    note: { pt: "Ferramenta de uso pessoal", en: "Personal-use tool" },
    order: 5,
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
