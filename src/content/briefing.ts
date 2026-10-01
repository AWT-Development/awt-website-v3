import type { Localized } from "@/i18n/config";

export const UNSURE_ID = "unsure";

export const unsureLabel: Localized = {
  pt: "Ainda não sei",
  en: "Not sure yet",
};

// Faixas sugeridas, a ajustar à realidade comercial da AWT antes de publicar.
export const briefingBudgets: { id: string; label: Localized }[] = [
  { id: "up-to-3k", label: { pt: "Até R$ 3 mil", en: "Up to R$ 3k" } },
  { id: "3k-8k", label: { pt: "R$ 3 a 8 mil", en: "R$ 3k to 8k" } },
  { id: "8k-20k", label: { pt: "R$ 8 a 20 mil", en: "R$ 8k to 20k" } },
  { id: "20k-plus", label: { pt: "Acima de R$ 20 mil", en: "Over R$ 20k" } },
  { id: "talk", label: { pt: "Prefiro conversar", en: "I'd rather talk" } },
];

export const briefingTimelines: { id: string; label: Localized }[] = [
  {
    id: "date",
    label: { pt: "Tenho uma data em mente", en: "I have a date in mind" },
  },
  { id: "no-rush", label: { pt: "Sem pressa", en: "No rush" } },
  { id: "asap", label: { pt: "O quanto antes", en: "As soon as possible" } },
];
