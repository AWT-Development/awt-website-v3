import type { Localized } from "@/i18n/config";

export type Differential = {
  id: string;
  title: Localized;
  text: Localized;
};

// Rascunho a validar com a AWT: remover o que não for verdade para o estúdio.
export const differentials: Differential[] = [
  {
    id: "made-to-measure",
    title: { pt: "Feito sob medida", en: "Made to measure" },
    text: {
      pt: "Cada projeto é desenhado do zero para o seu negócio. Nada de modelos prontos.",
      en: "Every project is designed from scratch for your business. No ready-made templates.",
    },
  },
  {
    id: "fast",
    title: { pt: "Rápido de verdade", en: "Truly fast" },
    text: {
      pt: "Sites leves, que abrem rápido em qualquer celular ou computador.",
      en: "Lightweight sites that open fast on any phone or computer.",
    },
  },
  {
    id: "findable",
    title: { pt: "Fácil de ser encontrado", en: "Easy to find" },
    text: {
      pt: "A estrutura é pensada desde o início para aparecer bem no Google.",
      en: "The structure is built from day one to show up well on Google.",
    },
  },
  {
    id: "converts",
    title: { pt: "Pensado para vender", en: "Built to convert" },
    text: {
      pt: "Design e textos trabalham juntos para transformar visitas em clientes.",
      en: "Design and copy work together to turn visits into customers.",
    },
  },
  {
    id: "direct",
    title: { pt: "Conversa direta", en: "Direct conversation" },
    text: {
      pt: "Você fala diretamente com quem desenvolve o seu projeto, sem intermediários.",
      en: "You talk directly to the people building your project, with no middlemen.",
    },
  },
  {
    id: "support",
    title: { pt: "Suporte depois da entrega", en: "Support after launch" },
    text: {
      pt: "O trabalho não termina no lançamento: seguimos ao seu lado para o site continuar funcionando e crescendo.",
      en: "The work doesn't end at launch: we stay by your side so the site keeps working and growing.",
    },
  },
];
