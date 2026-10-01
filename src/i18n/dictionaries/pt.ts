const pt = {
  meta: {
    title: "AWT Development | Arquitetura Digital de Alta Performance",
    description:
      "Desenvolvemos soluções digitais de alta performance com precisão técnica e design orientado a resultados. A arquitetura do seu sucesso começa aqui.",
  },
  nav: {
    services: "Serviços",
    projects: "Projetos",
    process: "Processo",
    about: "Sobre",
    differentials: "Diferenciais",
    technologies: "Tecnologias",
    faq: "Dúvidas",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
    cta: "Iniciar projeto",
    switchLocale: "English",
  },
  hero: {
    // `*palavra*` marca a ênfase em laranja.
    title: "Sites e sistemas *únicos* para o seu negócio",
    subtitle:
      "Projetos sob medida para vender mais, gerir com precisão e ganhar produtividade.",
    primaryCta: "Iniciar um projeto",
    secondaryCta: "Ver projetos",
  },
  services: {
    label: "Serviços",
    title: "O que podemos *construir* para o seu negócio",
    intro:
      "Do site que apresenta a sua marca ao sistema que organiza a operação: cada solução é pensada do zero.",
    cta: "Pedir orçamento",
  },
  clients: {
    label: "Quem já confiou na AWT",
  },
  projects: {
    label: "Projetos",
    title: "Trabalhos que já *saíram do papel*",
    visit: "Visitar site",
    cta: "O seu projeto pode ser o próximo",
  },
  process: {
    label: "Como trabalhamos",
    title: "Do primeiro papo ao site *no ar*",
    cta: "Começar a conversa",
  },
  differentials: {
    label: "Por que a AWT",
    title: "Seis motivos para trabalhar com a *AWT*",
    cta: "Quero conversar sobre o meu projeto",
  },
  technologies: {
    label: "Tecnologias",
    title: "Tecnologia moderna por trás de cada projeto",
    text: "Usamos ferramentas modernas, adotadas por grandes empresas no mundo todo, para o seu site ser rápido, seguro e fácil de evoluir.",
  },
  faq: {
    label: "Dúvidas frequentes",
    title: "Ficou com alguma *dúvida*?",
    ctaTitle: "Não encontrou o que procurava?",
    cta: "Falar com a AWT",
  },
  contact: {
    label: "Contato",
    title: "Vamos *construir* algo juntos?",
    intro:
      "Conte um pouco sobre o seu projeto. Respondemos com uma proposta sob medida.",
    direct: "Prefere conversar agora?",
    whatsapp: "Chamar no WhatsApp",
    channels: {
      email: "E-mail",
      phone: "Telefone e WhatsApp",
      instagram: "Instagram",
      location: "Onde estamos",
    },
    form: {
      progress: "Passo {current} de {total}",
      back: "Voltar",
      next: "Continuar",
      skip: "Pular",
      send: "Enviar briefing",
      sending: "Enviando...",
      steps: {
        services: {
          title: "O que você precisa?",
          hint: "Pode escolher mais de uma opção.",
        },
        budget: {
          title: "Quanto pretende investir?",
          hint: "Uma estimativa já ajuda. Se preferir, pule este passo.",
        },
        timeline: {
          title: "Para quando você precisa?",
          hint: "Opcional.",
        },
        details: {
          title: "Conte um pouco sobre o seu projeto",
          hint: "Opcional.",
          placeholder:
            "O que você quer criar? Para quem? Tem algum site que você admira?",
        },
        contact: {
          title: "Como podemos falar com você?",
          name: "Seu nome",
          contact: "WhatsApp ou e-mail",
        },
      },
      errors: {
        services: "Escolha pelo menos uma opção.",
        name: "Informe o seu nome.",
        contact: "Informe um WhatsApp ou e-mail válido.",
      },
      done: {
        title: "Recebemos o seu briefing!",
        textSent:
          "Enviamos para a nossa equipe e abrimos o WhatsApp com o resumo, para agilizar a conversa. Se a janela não abriu, use o botão abaixo.",
        textFallback:
          "Não conseguimos enviar por e-mail agora, mas o WhatsApp já tem o resumo do seu briefing. Use o botão abaixo para falar com a gente.",
        whatsapp: "Abrir WhatsApp",
        again: "Enviar outro briefing",
      },
    },
  },
  footer: {
    tagline:
      "Sites, landing pages e sistemas feitos sob medida para o seu negócio crescer.",
    navigation: "Navegação",
    contact: "Contato",
    privacy: "Política de Privacidade",
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
  },
  manifesto: {
    label: "Sobre nós",
    text: "Não usamos modelos prontos. Cada projeto é *desenhado do zero* para o seu negócio: bonito de ver, rápido de abrir e fácil de ser encontrado.",
  },
};

export default pt;

export type Dictionary = typeof pt;
