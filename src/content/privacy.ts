import type { Localized } from "@/i18n/config";
import { site } from "@/content/site";

/**
 * Texto-base, NÃO revisado por um advogado. Enquanto for `true`, a página
 * exibe um aviso de que o texto está em revisão. Mudar para `false` só depois
 * da revisão jurídica.
 */
export const PRIVACY_IS_DRAFT = true;

export const privacyUpdated = "2026-10-01";

type Section = { heading: Localized; body: Localized<string[]> };

export const privacy = {
  title: { pt: "Política de Privacidade", en: "Privacy Policy" } as Localized,
  description: {
    pt: "Como a AWT Development coleta, usa e protege os dados enviados por este site.",
    en: "How AWT Development collects, uses and protects the data sent through this website.",
  } as Localized,
  updatedLabel: { pt: "Última atualização", en: "Last updated" } as Localized,
  draftNotice: {
    pt: "Este texto está em revisão e pode ser alterado.",
    en: "This text is under review and may change.",
  } as Localized,
  sections: [
    {
      heading: { pt: "Quem somos", en: "Who we are" },
      body: {
        pt: [
          `A AWT Development é um estúdio de desenvolvimento web de Goiânia, GO, responsável pelo tratamento dos dados descritos nesta política. Para qualquer assunto sobre privacidade, fale conosco em ${site.email}.`,
        ],
        en: [
          `AWT Development is a web development studio based in Goiânia, Brazil, responsible for processing the data described in this policy. For any privacy matter, contact us at ${site.email}.`,
        ],
      },
    },
    {
      heading: { pt: "Dados que coletamos", en: "Data we collect" },
      body: {
        pt: [
          "Briefing: quando você preenche o formulário de contato, recebemos o que precisa, a faixa de investimento e o prazo (se informados), a descrição do projeto, o seu nome e o seu WhatsApp ou e-mail.",
          "Conversas: se você falar com a gente por WhatsApp, e-mail ou Instagram, recebemos o que você escrever e os dados do seu perfil nesses serviços.",
          "Navegação: este site guarda no seu navegador apenas a sua escolha de idioma (um cookie, quando você troca o idioma manualmente) e o registro de que a tela de abertura já foi exibida (armazenamento da sessão). Não usamos cookies de publicidade nem ferramentas de análise de comportamento.",
        ],
        en: [
          "Briefing: when you fill in the contact form, we receive what you need, the budget range and the timeline (if provided), the project description, your name and your WhatsApp number or email.",
          "Conversations: if you talk to us on WhatsApp, email or Instagram, we receive what you write and your profile details on those services.",
          "Browsing: this site stores in your browser only your language choice (a cookie, when you switch language manually) and a note that the opening screen was already shown (session storage). We do not use advertising cookies or behavior analytics tools.",
        ],
      },
    },
    {
      heading: { pt: "Para que usamos", en: "What we use it for" },
      body: {
        pt: [
          "Usamos os dados para responder ao seu contato, entender o seu projeto, preparar uma proposta e conversar sobre o trabalho. Não vendemos os seus dados nem os usamos para publicidade de terceiros.",
        ],
        en: [
          "We use the data to reply to you, understand your project, prepare a proposal and discuss the work. We do not sell your data or use it for third-party advertising.",
        ],
      },
    },
    {
      heading: { pt: "Com quem compartilhamos", en: "Who we share it with" },
      body: {
        pt: [
          "Compartilhamos os dados apenas com os serviços necessários para operar o site e responder a você, como o serviço de envio de e-mail (Resend), a hospedagem do site e o WhatsApp. Esses serviços tratam os dados conforme as suas próprias políticas.",
        ],
        en: [
          "We share data only with the services needed to run the site and reply to you, such as the email delivery service (Resend), the site hosting and WhatsApp. These services process data under their own policies.",
        ],
      },
    },
    {
      heading: { pt: "Por quanto tempo guardamos", en: "How long we keep it" },
      body: {
        pt: [
          "Guardamos os dados pelo tempo necessário para atender ao seu contato, executar o projeto e cumprir obrigações legais. Depois disso, eles são apagados ou anonimizados.",
        ],
        en: [
          "We keep the data for as long as needed to handle your request, carry out the project and meet legal obligations. After that, it is deleted or anonymized.",
        ],
      },
    },
    {
      heading: { pt: "Seus direitos", en: "Your rights" },
      body: {
        pt: [
          `Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir a confirmação de que tratamos os seus dados, o acesso a eles, a correção, a anonimização ou eliminação, a portabilidade e a revogação do consentimento. Basta escrever para ${site.email}.`,
        ],
        en: [
          `Under Brazil's General Data Protection Law (Law No. 13,709/2018), you may request confirmation that we process your data, access to it, correction, anonymization or deletion, portability and withdrawal of consent. Just write to ${site.email}.`,
        ],
      },
    },
    {
      heading: { pt: "Segurança e alterações", en: "Security and changes" },
      body: {
        pt: [
          "Adotamos medidas razoáveis para proteger os dados contra acesso indevido. Podemos atualizar esta política; a data da última atualização aparece no topo da página.",
        ],
        en: [
          "We take reasonable measures to protect data from unauthorized access. We may update this policy; the date of the last update appears at the top of the page.",
        ],
      },
    },
  ] satisfies Section[],
};
