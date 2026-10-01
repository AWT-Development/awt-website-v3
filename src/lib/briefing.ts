import {
  UNSURE_ID,
  briefingBudgets,
  briefingTimelines,
  unsureLabel,
} from "@/content/briefing";
import { services } from "@/content/services";
import { site, whatsappGreeting } from "@/content/site";
import type { Locale } from "@/i18n/config";

/** Disparado pelos botões de serviço para pré-selecionar o briefing. */
export const BRIEFING_SERVICE_EVENT = "awt:briefing-service";

export type Briefing = {
  services: string[];
  budget?: string;
  timeline?: string;
  details?: string;
  name: string;
  contact: string;
  lang: Locale;
};

export type BriefingResult =
  | { ok: true; emailSent: boolean }
  | { ok: false; error: "invalid" | "failed" };

export const serviceIds: string[] = [
  ...services.map((service) => service.slug),
  UNSURE_ID,
];
export const budgetIds = briefingBudgets.map((budget) => budget.id);
export const timelineIds = briefingTimelines.map((timeline) => timeline.id);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail = (value: string) => EMAIL.test(value.trim());

/** E-mail ou telefone (8 a 15 dígitos, aceitando +, espaços, parênteses e hífen). */
export function isContactValid(value: string) {
  const text = value.trim();
  if (isEmail(text)) return true;
  if (!/^[\d\s()+-]+$/.test(text)) return false;
  const digits = text.replace(/\D/g, "").length;
  return digits >= 8 && digits <= 15;
}

const text = {
  pt: {
    emailTitle: "Novo briefing pelo site",
    needs: "O que preciso",
    budget: "Investimento",
    timeline: "Prazo",
    details: "Sobre o projeto",
    name: "Nome",
    contact: "Contato",
    language: "Idioma do visitante",
  },
  en: {
    emailTitle: "New briefing from the website",
    needs: "What I need",
    budget: "Budget",
    timeline: "Timeline",
    details: "About the project",
    name: "Name",
    contact: "Contact",
    language: "Visitor language",
  },
} as const;

function lines(data: Briefing, lang: Locale) {
  const t = text[lang];

  const need = data.services
    .map((id) =>
      id === UNSURE_ID
        ? unsureLabel[lang]
        : (services.find((service) => service.slug === id)?.title[lang] ?? id),
    )
    .join(", ");
  const budget = briefingBudgets.find((item) => item.id === data.budget)?.label[
    lang
  ];
  const timeline = briefingTimelines.find(
    (item) => item.id === data.timeline,
  )?.label[lang];

  return [
    `${t.needs}: ${need}`,
    budget && `${t.budget}: ${budget}`,
    timeline && `${t.timeline}: ${timeline}`,
    data.details && `${t.details}: ${data.details}`,
    `${t.name}: ${data.name}`,
    `${t.contact}: ${data.contact}`,
  ].filter((line): line is string => Boolean(line));
}

export function whatsappUrl(data: Briefing) {
  const body = lines(data, data.lang)
    .map((line) => `• ${line}`)
    .join("\n");
  const message = `${whatsappGreeting[data.lang]}\n\n${body}`;
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** E-mail para a equipe: sempre em português. */
export function emailBody(data: Briefing) {
  return [
    text.pt.emailTitle,
    "",
    ...lines(data, "pt"),
    `${text.pt.language}: ${data.lang === "pt" ? "Português" : "English"}`,
  ].join("\n");
}
