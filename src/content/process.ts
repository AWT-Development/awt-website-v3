import type { Localized } from "@/i18n/config";

export type ProcessStep = {
  id: string;
  title: Localized;
  text: Localized;
};

export const processSteps: ProcessStep[] = [
  {
    id: "conversa",
    title: { pt: "Conversa", en: "Conversation" },
    text: {
      pt: "Entendemos o seu negócio, os seus objetivos e quem você quer alcançar. Saímos dessa conversa com um plano claro.",
      en: "We learn about your business, your goals and who you want to reach. We leave the conversation with a clear plan.",
    },
  },
  {
    id: "projeto",
    title: { pt: "Projeto", en: "Design" },
    text: {
      pt: "Desenhamos como o site vai ser: estrutura, textos e visual. Você vê e aprova tudo antes de qualquer coisa ser construída.",
      en: "We design how the site will look and work: structure, copy and visuals. You see and approve everything before anything is built.",
    },
  },
  {
    id: "construcao",
    title: { pt: "Construção", en: "Build" },
    text: {
      pt: "Transformamos o desenho em um site de verdade, testado no celular, no tablet e no computador.",
      en: "We turn the design into a real site, tested on phone, tablet and computer.",
    },
  },
  {
    id: "lancamento",
    title: { pt: "Lançamento", en: "Launch" },
    text: {
      pt: "Colocamos no ar e seguimos ao seu lado: ajustes, melhorias e suporte para o site continuar funcionando e crescendo.",
      en: "We put it live and stay by your side: tweaks, improvements and support so the site keeps working and growing.",
    },
  },
];
