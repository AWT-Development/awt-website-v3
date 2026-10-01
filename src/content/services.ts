import type { Localized } from "@/i18n/config";

export type Service = {
  slug: string;
  title: Localized;
  description: Localized;
  /** Rascunho a validar com a AWT. */
  deliverables: Localized<string[]>;
};

export const services: Service[] = [
  {
    slug: "landing-pages",
    title: { pt: "Landing Pages", en: "Landing Pages" },
    description: {
      pt: "Uma página pensada para um objetivo só: transformar quem visita em cliente.",
      en: "A page built for a single goal: turning visitors into customers.",
    },
    deliverables: {
      pt: ["Design exclusivo", "Textos que convencem", "Pronta para anúncios", "Medição de resultados"],
      en: ["Custom design", "Copy that convinces", "Ready for ads", "Results tracking"],
    },
  },
  {
    slug: "sites-institucionais",
    title: { pt: "Sites Institucionais", en: "Corporate Websites" },
    description: {
      pt: "A presença da sua marca na internet, com design cuidadoso e um site que abre rápido em qualquer aparelho.",
      en: "Your brand's presence online, with careful design and a site that opens fast on any device.",
    },
    deliverables: {
      pt: ["Design exclusivo", "Várias páginas", "Aparece no Google", "Rápido em qualquer celular"],
      en: ["Custom design", "Multiple pages", "Shows up on Google", "Fast on any phone"],
    },
  },
  {
    slug: "sistemas-web",
    title: { pt: "Sistemas Web", en: "Web Systems" },
    description: {
      pt: "Ferramentas feitas sob medida para organizar a rotina da sua empresa e poupar o tempo da sua equipe.",
      en: "Tools made to measure to organize your company's routine and save your team's time.",
    },
    deliverables: {
      pt: ["Painéis e relatórios", "Cada pessoa vê o que precisa", "Feito para o seu processo", "Cresce com a empresa"],
      en: ["Dashboards and reports", "Each person sees what they need", "Built around your process", "Grows with your company"],
    },
  },
  {
    slug: "e-commerce",
    title: { pt: "E-Commerce", en: "E-Commerce" },
    description: {
      pt: "Sua loja online completa, com pagamento seguro e entrega funcionando sem dor de cabeça.",
      en: "Your complete online store, with secure payment and delivery that just works.",
    },
    deliverables: {
      pt: ["Loja completa", "Pagamento online", "Frete e entrega", "Gestão de pedidos"],
      en: ["Complete store", "Online payment", "Shipping and delivery", "Order management"],
    },
  },
  {
    slug: "suporte-e-manutencao",
    title: { pt: "Suporte e Manutenção", en: "Support & Maintenance" },
    description: {
      pt: "Cuidamos do seu site depois de pronto: sempre no ar, seguro e atualizado.",
      en: "We take care of your site after launch: always online, safe and up to date.",
    },
    deliverables: {
      pt: ["Segurança e atualizações", "Correções rápidas", "Acompanhamento constante", "Melhorias contínuas"],
      en: ["Security and updates", "Fast fixes", "Constant follow-up", "Ongoing improvements"],
    },
  },
  {
    slug: "integracoes",
    title: { pt: "Integrações", en: "Integrations" },
    description: {
      pt: "Conectamos o seu site às ferramentas que você já usa, para as informações circularem sem digitar duas vezes.",
      en: "We connect your site to the tools you already use, so information flows without typing it twice.",
    },
    deliverables: {
      pt: ["Conexão com as ferramentas que você já usa", "Automação de tarefas repetitivas", "Menos trabalho manual"],
      en: ["Connects the tools you already use", "Automation of repetitive tasks", "Less manual work"],
    },
  },
];
