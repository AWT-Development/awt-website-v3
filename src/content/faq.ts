import type { Localized } from "@/i18n/config";

export type FaqItem = {
  id: string;
  question: Localized;
  answer: Localized;
};

// Rascunho a validar com a AWT. Preço e prazo ficam sob proposta, sem números.
export const faqItems: FaqItem[] = [
  {
    id: "price",
    question: {
      pt: "Quanto custa um projeto?",
      en: "How much does a project cost?",
    },
    answer: {
      pt: "Depende do que você precisa. Cada projeto é diferente, por isso fazemos um orçamento sob medida depois de entender o seu caso. Conte sobre o seu projeto no formulário e respondemos com uma proposta.",
      en: "It depends on what you need. Every project is different, so we put together a custom quote after understanding your case. Tell us about your project in the form and we'll reply with a proposal.",
    },
  },
  {
    id: "time",
    question: {
      pt: "Quanto tempo leva para ficar pronto?",
      en: "How long does it take?",
    },
    answer: {
      pt: "Depende do tamanho do projeto: uma página simples costuma ser bem mais rápida que um sistema completo. Combinamos um prazo claro na proposta, antes de começar.",
      en: "It depends on the size of the project: a simple page is usually much faster than a complete system. We agree on a clear deadline in the proposal, before we start.",
    },
  },
  {
    id: "templates",
    question: {
      pt: "Vocês usam modelos prontos?",
      en: "Do you use ready-made templates?",
    },
    answer: {
      pt: "Não. Cada projeto é desenhado do zero para o seu negócio, com a identidade da sua marca.",
      en: "No. Every project is designed from scratch for your business, with your brand's identity.",
    },
  },
  {
    id: "after-launch",
    question: {
      pt: "E depois que o site estiver no ar?",
      en: "What happens after the site is live?",
    },
    answer: {
      pt: "Seguimos com você. Oferecemos suporte e manutenção para o site continuar seguro, atualizado e funcionando.",
      en: "We stay with you. We offer support and maintenance so the site stays secure, up to date and running.",
    },
  },
  {
    id: "location",
    question: {
      pt: "Onde vocês atendem?",
      en: "Where do you work?",
    },
    answer: {
      pt: "Temos clientes do mundo todo e atendemos de qualquer lugar. Conversamos por mensagem e videochamada, então a distância não é problema.",
      en: "We have clients all over the world and work from anywhere. We talk by message and video call, so distance isn't a problem.",
    },
  },
];
