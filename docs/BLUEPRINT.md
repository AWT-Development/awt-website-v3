# AWT Development — Blueprint da Refatoração Total

> Documento-mestre da reconstrução do site da AWT Development.
> Criado em 30/09/2026. É um documento vivo: atualizar conforme o portfólio e as decisões evoluírem.

**Sumário**

1. [Contexto e objetivo](#1-contexto-e-objetivo)
2. [Diagnóstico da versão atual](#2-diagnóstico-da-versão-atual)
3. [Inventário de conteúdo (o que preservar)](#3-inventário-de-conteúdo-o-que-preservar)
4. [Análise das referências](#4-análise-das-referências)
5. [Padrões transversais extraídos](#5-padrões-transversais-extraídos)
6. [Direção criativa proposta para a AWT](#6-direção-criativa-proposta-para-a-awt)
7. [Arquitetura de informação — Landing Page (v1)](#7-arquitetura-de-informação--landing-page-v1)
8. [Sistema de motion e interação](#8-sistema-de-motion-e-interação)
9. [Evolução para multipáginas (v2)](#9-evolução-para-multipáginas-v2)
10. [Stack técnica e estrutura de pastas](#10-stack-técnica-e-estrutura-de-pastas)
11. [Qualidade: performance, acessibilidade e SEO](#11-qualidade-performance-acessibilidade-e-seo)
12. [Plano de execução](#12-plano-de-execução)
13. [Pendências e perguntas em aberto](#13-pendências-e-perguntas-em-aberto)

---

## 1. Contexto e objetivo

A AWT Development é um estúdio de desenvolvimento web de Goiânia (GO) que cria landing pages, sites institucionais, sistemas web, e-commerces e integrações. Hoje o site é uma landing page única, com cara de template: estática e com pouca personalidade.

**Objetivo da refatoração**

- Reconstruir o site **do zero**, no mesmo repositório (`awt-website-v3`), preservando histórico git, assets de marca e conteúdo.
- Elevar o nível visual ao de estúdios premiados (Halo Lab, Zajno, Focus Lab, Cuberto, Clay): **motion coreografado, interatividade e direção de arte autoral**.
- Lançar primeiro como **landing page (v1)**, mas com arquitetura de dados e componentes pronta para virar um **site multipáginas (v2)** quando o portfólio crescer.
- O próprio site precisa ser a principal peça do portfólio. Ele é a prova técnica do que a AWT entrega.

---

## 2. Diagnóstico da versão atual

> Esta seção descreve o site **antes** da refatoração (branch `main`). O código novo vive na branch `refactor/v4`.

### 2.1 Stack atual

| Item | Versão / Estado |
| :--- | :--- |
| Framework | Next.js 16.2.1 (App Router) |
| UI | React 19.2.4 |
| Estilo | Tailwind CSS v4 (`@theme` em `globals.css`) |
| Animação | framer-motion 12 |
| Temas | next-themes (3 temas: `light`, `dark`, `dark-purple`) |
| Ícones | lucide-react |
| Fontes | Alexandria (corpo) + Aldrich (títulos), via `next/font/google` |
| Gerenciador | **`package-lock.json` e `pnpm-lock.yaml` coexistindo** (conflito) |

### 2.2 Estrutura atual

```
src/
├── app/
│   ├── favicon.ico            ← atualizado recentemente (manter)
│   ├── globals.css            ← tokens dos 3 temas
│   ├── layout.tsx             ← fontes, ThemeProvider, ThemeSwitcher flutuante
│   └── page.tsx               ← Header + 4 seções + Footer
├── assets/                    ← logos PNG (3 variações × header/footer), mockups, instagram.svg
└── components/
    ├── home/                  ← HeroSection, ServicesSection, ProjectsSection, ContactCTASection
    ├── layout/                ← Header, Footer
    └── theme/                 ← ThemeProvider, ThemeSwitcher
```

Fluxo da página: **Header → Hero → Serviços (grid 3×2) → Projetos (2 cards) → CTA WhatsApp → Footer**.

### 2.3 Problemas identificados

**Design e experiência**
- Todas as seções repetem a mesma fórmula (*eyebrow* + H2 + grid de cards), sem ritmo nem narrativa.
- O único motion é o *fade-up* no `whileInView`, igual em tudo. Não há scroll storytelling, microinterações, cursor ou transições.
- O hero é centralizado, com *blob* de blur laranja: visual genérico de template SaaS.
- O sistema de 3 temas com *switcher* flutuante dilui a identidade. Cada tema exige QA visual próprio e briga com a direção de arte. Nenhuma das referências oferece troca de tema; todas constroem narrativa de cor **por seção**.
- A logo depende de PNG trocado via JS após o `mount`, o que causa *flash* e troca visível no carregamento. Também não há versão vetorial animável.
- Aldrich só tem peso 400, mas é usada com `font-bold`, o que gera *faux bold* (negrito sintético do navegador).
- O container da logo no header (`w-32 h-32`) é maior que o header (`h-20`).

**Conteúdo e conversão**
- "Ver todos os projetos", "Privacy Policy" e "Terms of Service" apontam para `#`. Os links do rodapé estão em inglês num site PT-BR.
- Telefone, e-mail e Instagram não são clicáveis (faltam `tel:`, `mailto:` e o link do perfil).
- Todos os "Saber mais" dos serviços levam ao mesmo `#contato`.
- O único canal de contato é o WhatsApp, sem formulário de briefing.
- As descrições de projeto enfraquecem o posicionamento (por exemplo, "foi nosso primeiro projeto real").
- Não há prova social: números, depoimentos, stack, processo.

**Técnico**
- Todas as seções são `"use client"` só para usar framer-motion; poderiam ser Server Components com ilhas de animação.
- Faltam metadata Open Graph/Twitter, `sitemap.xml`, `robots.txt` e JSON-LD (`Organization` / `LocalBusiness`).
- `package.json` ainda tem `"name": "my-app"` e o README é o padrão do `create-next-app`.
- Há dois lockfiles (npm e pnpm).
- O roxo do tema `dark-purple` no CSS (`#8b5cf6`) diverge do `DESIGN.md` (`#4B1FA6`).

### 2.4 O que se mantém vs. o que sai

| Manter | Descartar / reescrever |
| :--- | :--- |
| Repositório e histórico git | Todos os componentes em `src/components/` |
| Next.js 16 + React 19 + Tailwind v4 + TypeScript | Sistema de 3 temas + ThemeSwitcher + next-themes |
| `favicon.ico` | `globals.css` atual (tokens serão refeitos) |
| Assets de marca (logos, mockups) até recebermos os SVGs | `DESIGN.md` (substituído por este blueprint + novo design system) |
| Conteúdo: contatos, serviços, projetos, tagline | Um dos lockfiles (padronizar em **pnpm**) |
| Laranja `#FF7A00` e roxo `#4B1FA6` como DNA de marca | Aldrich como fonte de títulos (ver §6.3) |

---

## 3. Inventário de conteúdo (o que preservar)

### 3.1 Identidade

- **Nome:** AWT Development
- **Símbolo:** dois triângulos vazados entrelaçados formando um monograma angular, lido como "A"/"W", com traço grosso e cantos vivos. Existe em laranja sólido (`#FF7A00`), em gradiente roxo→azul-índigo (`#2E1065 → #1A0FB0` aprox.) e com o *wordmark* em branco.
- **Tagline atual:** "Transformando **código** em valor."
- **Posicionamento (metadata):** "Arquitetura Digital de Alta Performance"
- **Descrição (metadata):** "Desenvolvemos soluções digitais de alta performance com precisão técnica e design orientado a resultados. A arquitetura do seu sucesso começa aqui."
- **Sub-headline:** "Transformamos sua ideia em realidade, seu negócio em sua vitrine virtual e sistemas web que aumentam sua produtividade e poupam seu tempo."
- **Texto institucional (footer):** "Elevamos o padrão do desenvolvimento web. Criamos infraestruturas digitais que suportam o crescimento acelerado do seu negócio."

### 3.2 Contatos

| Canal | Valor |
| :--- | :--- |
| Localização | Goiânia, GO — Brasil |
| WhatsApp / Telefone | +55 62 8315-5703 → `https://wa.me/556283155703` |
| E-mail | awtdevelopment@gmail.com |
| Instagram | @awtdevelopment |

### 3.3 Serviços

| # | Serviço | Descrição atual |
| :--- | :--- | :--- |
| 01 | Landing Pages | Páginas de alta conversão focadas em transformar visitantes em clientes reais através de UX otimizada. |
| 02 | Sites Institucionais | A presença digital da sua marca com autoridade, design premium e performance técnica superior. |
| 03 | Sistemas Web | Aplicações complexas, dashboards e ferramentas internas desenvolvidas para otimizar processos. |
| 04 | E-Commerce | Plataformas de venda robustas e seguras com integração de pagamentos e logística fluída. |
| 05 | Suporte e Manutenção | Garantia de que seu projeto continue rodando com segurança, atualizado e sem quedas. |
| 06 | Integrações | Conectamos seu sistema com APIs externas, CRMs e ferramentas de automação de mercado. |

### 3.4 Portfólio atual

> Situação em 30/09/2026. A tabela completa, com links e pendências, está em [§13.3](#133-registro-de-portfólio).

Cinco projetos publicados na landing: **Hyperion Global**, **Lucca**, **Isotelhas Tapajós**, **Azus Imobiliária** e **Doces Finos**. Dois estão previstos e ainda sem material: **Ludus Tally** e **Guilherme Martins**.

---

## 4. Análise das referências

> Método: navegação automatizada (Playwright, 1440×900) com capturas ao longo de toda a página, extração do DOM (hierarquia de headings, fontes computadas, bibliotecas carregadas) e observação de comportamento no scroll.

### 4.1 Halo Lab — [halo-lab.com](https://www.halo-lab.com/)

**Stack detectada:** Webflow + GSAP + ScrollTrigger + **Lenis** + SplitText/SplitType + Swiper
**Tipografia:** *Suisse* (sans, peso 500, H1 ~71px, tracking −3%) + ***Instrument Serif* itálico** para números e palavras de ênfase
**Cor:** narrativa de "céu noturno": começa em azul-marinho quase preto (`#02021E`) com estrelas, clareia para azul royal e chega a um branco-azulado. **O fundo muda de cor conforme o scroll.**

**Estrutura de seções**
1. **Hero:** objeto 3D (mão segurando uma esfera luminosa) sobre céu estrelado; H1 centralizado; abaixo, 3 "pílulas" de time (Design / Development / Marketing) com ícone 3D, subtítulo e seta ↗.
2. **Showreel:** um card pequeno de vídeo **cresce com o scroll** até ocupar a tela (scroll-scrubbed scale).
3. **Cases em destaque:** cards coloridos com UI flutuando.
4. **Marquee de logos**, com o rótulo "Trusted by 300+ global clients" em serif itálico.
5. **Manifesto:** parágrafo grande com **ícones inline no meio do texto**, mais um selo "Crafted by Humans".
6. **Stats:** cards brancos com números enormes em serif itálico (500+, 2–3mo, $1B+).
7. **Serviços:** objeto 3D (diamante) + H2, com duas colunas "*Design*" e "*Development*" em serif itálico e listas separadas por *hairlines*.
8. **Projetos:** **cards full-screen empilhados (sticky stacking)** com foto escura, nome, tags e descrição curta.
9. **"6 reasons why"**: grid 3×2 com ícones de linha e divisórias finas.
10. **Depoimentos:** pilha de cards com rating e selos (Clutch, Trustpilot…).
11. **CTA final:** "Ready to discuss your project?" com **arco 3D de miniaturas de projetos girando** ao redor do texto.
12. **Mega footer:** endereços, serviços, newsletter, redes, selos e acordeões "Show all…".

**Absorver:** fundo que muda de cor com o scroll; showreel que expande; mistura de sans com serif itálico; sticky stacking de projetos; CTA cercado pelos próprios trabalhos.
**Evitar:** excesso de seções corporativas (reasons, badges, mega footer) para um portfólio pequeno.

---

### 4.2 Zajno — [zajno.com](https://zajno.com/)

**Stack detectada:** build próprio (sem Webflow nem GSAP global), canvas WebGL, 8 vídeos na home, scroll virtual (documento com 1200px de altura e rolagem interna).
**Tipografia:** uma sans própria em **corpo minúsculo (~12px)**. O contraste vem da escala das mídias, não do texto.
**Cor:** cinza claro neutro (`#EBEBEB`) com texto preto.

> As capturas visuais ficaram presas no preloader (o WebGL não termina de carregar no navegador headless). A análise abaixo usa a estrutura completa do DOM e o comportamento observado.

**Estrutura de seções**
1. **Preloader com contador 0→100**, centralizado e minimalista.
2. **Header mínimo:** "zajno® digital studio · work · studio · contact · twitter · instagram · los angeles, ca".
3. **Work:** lista numerada **01–05** em que cada projeto mostra tipo de entrega ("Full-cycle website creation"), **contagem de prêmios** (Awwwards ×2, CSSDA ×4…), nome e categoria, com **vídeo de preview**.
4. **Studio:** manifesto curto, lista de serviços e **Stats** (Founded 2015 · Clients 300+ · Countries 12 · Awwwards 62 · Team 28).
5. **Playground Z15™:** experimentos autorais com ano (Motion.ed — 2023, Zajno Grid — 2018, "Journey — Coming soon").
6. **Watch Showreel**, com o intervalo "2015–26".
7. **"Let's collaborate!": formulário de briefing em 8 passos numerados**, com **chips selecionáveis**:
   `01` O que podemos fazer (Design, Development, 2D & 3D, Animation, Marketing, Support, SEO, Sound) · `02` Orçamento em faixas · `03` Nome · `04` E-mail · `05` Detalhes · `06` Data de início · `07` Prazo (Sim / Sem pressa / ASAP) · `08` Como nos conheceu.

**Absorver:** preloader com contador; lista numerada de projetos com metadados (entrega, ano, tags); **formulário de briefing em passos com chips**, que qualifica o lead e reduz atrito; seção "Playground" para experimentos da AWT no futuro.
**Evitar:** texto de corpo tão pequeno (acessibilidade) e preloader longo (no headless passou de 60s).

---

### 4.3 Focus Lab — [focuslab.agency](https://www.focuslab.agency/)

**Stack detectada:** Webflow + GSAP + ScrollTrigger + **DrawSVGPlugin** + Swiper + anime.js + Finsweet Attributes (acordeão, slider)
**Tipografia:** ***Focusdisplay*, serif display fina, H1 em 120px/120px** + *Sohne* (sans) no corpo
**Cor:** creme quente (`#F6F4EE`), preto-tinta (`#1B1A17`) e **vermelho-alaranjado** como único acento. É uma paleta editorial, próxima da laranja da AWT.

**Estrutura de seções**
1. **Hero editorial alinhado à esquerda:** "The ~~world's~~ most trusted B2B brand agency." com uma **elipse desenhada à mão (SVG animado com DrawSVG) circulando uma palavra**, subtítulo e link com seta "→ LEARN ABOUT OUR BRAND PROCESS".
2. **Grid assimétrico de cases:** um card grande seguido de dois lado a lado, com legenda (nome + disciplinas).
3. **"See more work"** em serif.
4. **Reel:** bloco preto com título serif e player.
5. **"What if…":** lista de provocações em 2 colunas com *hairlines*.
6. **Livro "Conquer your rebrand":** bloco escuro com mockup, citação e anotação à mão.
7. **FAQ:** título com anotação circulando "Questions" e acordeão à direita.
8. **Grid de logos** de clientes (5 colunas).
9. **"Hear what it's like [foto] to work [foto] with us…":** **fotos de clientes inline dentro do título**.
10. **Press:** lista de manchetes grandes em serif.
11. **"Let's talk":** card branco sobreposto ao footer escuro.
12. **Footer** com CTA de quiz ("Is your brand holding you back? Take our 2 minute quiz").

**Absorver:** **anotações desenhadas à mão (DrawSVG)** para destacar palavras; alinhamento editorial à esquerda com muito respiro; imagens inline no título; card de CTA sobreposto ao footer; um único acento quente sobre base neutra.
**Evitar:** serif muito fina como fonte principal (foge do DNA "tech" da AWT).

---

### 4.4 Cuberto — [cuberto.com](https://cuberto.com/)

**Stack detectada:** **Astro** + ClientRouter (transições de página) + **Lenis** + componentes próprios (`RoundButton`, `ShowreelModal`)
**Tipografia:** *Suisse Intl*, peso 500, H1 ~80px, tracking −1%
**Cor:** branco com **painéis pretos de cantos superiores muito arredondados que sobem sobre a seção anterior**, e acentos pastel (menta, lavanda) nos cards de stats.

**Estrutura de seções**
1. **Hero:** H1 centralizado curto + subtítulo de uma linha.
2. **Showreel:** card de vídeo que **expande no scroll** até a largura total.
3. **"What we do":** texto de posicionamento em 2 colunas e **cards de serviço escuros numerados 01–05, empilhados em sticky** (cada novo card cobre o anterior). Cada card traz arte geométrica em gradiente (**inclusive padrões triangulares**) e botão "Explore ↗".
4. **Logos:** grid 4×3.
5. **"Selected work":** painel preto com cantos arredondados e **grid de 2 colunas desencontradas** (a coluna da direita desce), com vídeos/mockups e uma linha de descrição.
6. **"Trusted by our clients":** depoimentos como **cards espalhados e rotacionados** (colagem).
7. **"Why Cuberto":** texto + tiles de stats (15+, prêmios, 300+).
8. **Insights (blog)**, 3 cards.
9. **FAQ** em acordeão.
10. **CTA:** "Have a product to build or rethink?" sobre **fundo de triângulos em perspectiva**.
11. **Footer:** e-mail e telefone em **pílulas**, escritórios e ícones sociais em círculos.

**Interações conhecidas:** cursor customizado que muda de forma e texto ("View", "Play"), **botões magnéticos**, *hover* com vídeo e transições de página suaves.

**Absorver:** **sticky stacking de serviços numerados**; painéis escuros e claros com raio grande criando camadas; grid desencontrado; **padrões triangulares**, que conversam diretamente com o símbolo da AWT; botões magnéticos e cursor contextual.
**Evitar:** blog e insights na v1 (não há conteúdo ainda).

---

### 4.5 Clay — [clay.global](https://clay.global/)

**Stack detectada:** **Next.js** (Pages Router) + **17 canvas WebGL** (distorção de imagem no hover e objetos 3D) + 12 vídeos
**Tipografia:** *Universal Sans* (variável; 740 nos títulos, 500 no corpo), H1 74px, tracking −4%
**Cor:** lavanda muito clara (`#F1EEF5`) no hero, branco no corpo e navy escuro nas seções de notícias/FAQ, com esferas roxa e laranja como acento (**o mesmo par de cores da AWT**).

**Estrutura de seções**
1. **Hero:** H1 à esquerda + **escultura 3D branca** à direita com esferas roxa e laranja orbitando.
2. **Card de vídeo** de case em largura total.
3. **Logos** em grid 5×2, em cinza.
4. **Intro + lista expansível de serviços** (Branding ▾, Digital Products ▾…).
5. **Banner de indústria:** "The Future of Finance is Intelligent", escuro, com objeto 3D.
6. **Grid editorial de trabalhos:** alternando **1 grande / 2 pequenos**, com offsets verticais; cada card tem nome e uma linha de descrição.
7. **Sobre:** faixa horizontal de fotos do time + parágrafo + "Get to know us →".
8. **Featured News**, **FAQ** e **"Let's Talk"** (footer com e-mail, telefone, escritórios e redes).

**Absorver:** hero com **objeto 3D próprio da marca**; ritmo editorial do grid (grande/pequeno, offsets); links discretos com seta "→"; FAQ em seção escura; uso combinado de roxo e laranja como acentos sobre base neutra.
**Evitar:** 17 canvas WebGL. Custo alto de performance; um só canvas no hero basta.

---

## 5. Padrões transversais extraídos

### 5.1 Estrutura de informação comum

```
Preloader (opcional)
Header mínimo + CTA em pílula
Hero: H1 curto e forte + sub + 1 elemento visual de assinatura (3D / vídeo)
Showreel / mídia que expande no scroll
Prova social rápida (logos / números)
Serviços (stacking cards | lista expansível | 2 colunas)
Trabalhos selecionados (grid editorial | sticky full-screen | lista numerada)
Diferenciais / processo / stats
Depoimentos
FAQ
CTA final grande
Footer com contato clicável e "Let's talk"
```

### 5.2 Tipografia

- **Uma grotesca neo-suíça** (Suisse, Universal Sans, Sohne) com **tracking negativo** (−1% a −4%) nos títulos e H1 entre 70 e 120px.
- **Serif itálico como voz secundária** (Halo, Focus Lab) em números, palavras de ênfase e rótulos.
- Títulos curtos (1–2 linhas) e corpo com contraste de escala forte.

### 5.3 Cor

- **Base neutra** (preto-tinta, creme ou cinza) + **um acento forte**. Nenhuma referência usa mais de dois acentos.
- **Cor muda por seção**: painéis escuros e claros alternados, ou gradiente contínuo guiado pelo scroll.
- Nenhuma oferece seletor de tema.

### 5.4 Motion (catálogo recorrente)

| Padrão | Onde aparece |
| :--- | :--- |
| Smooth scroll (Lenis) | Halo, Cuberto |
| Texto revelado por linha/palavra (SplitText) | Halo, Focus Lab, Cuberto |
| Mídia que escala com o scroll | Halo, Cuberto, Clay |
| Sticky stacking de cards | Halo (projetos), Cuberto (serviços) |
| Anotação SVG desenhada (DrawSVG) | Focus Lab |
| Painel que sobe com raio grande sobre a seção anterior | Cuberto |
| Marquee de logos | Halo |
| Cursor contextual + botões magnéticos | Cuberto, Zajno |
| Distorção WebGL no hover de imagem | Clay, Zajno |
| Preloader com contador | Zajno |
| Transição entre páginas | Cuberto (Astro ClientRouter) |
| Objeto 3D de assinatura no hero | Halo, Clay |

### 5.5 Stack

GSAP + ScrollTrigger + Lenis é o denominador comum. Webflow domina (Halo, Focus Lab), mas Clay usa **Next.js** e Cuberto usa **Astro**. O stack atual da AWT (Next.js) está alinhado com o mercado de ponta.

---

## 6. Direção criativa proposta para a AWT

### 6.1 Conceito: "Arquitetura Digital"

O posicionamento que já existe ("Arquitetura Digital de Alta Performance") e o símbolo (**dois triângulos**, a forma estrutural mais estável da engenharia) formam um conceito pronto:

> **A AWT projeta e constrói produtos digitais como um arquiteto projeta estruturas: com precisão, cálculo e intenção.**

Esse conceito vira linguagem visual:

- **Blueprint:** grid de construção sutil no fundo, com linhas finas, marcas de cruz nas interseções e **coordenadas/labels em fonte mono** (`X:0142 Y:0880`, `§02 — SERVIÇOS`), como um desenho técnico.
- **Triângulos como sistema gráfico:** o símbolo se decompõe em módulos triangulares usados em *reveals* (clip-path triangular), padrões de fundo (como a CTA da Cuberto), divisores e cursor.
- **Traço que se desenha:** linhas e contornos surgem em *stroke draw*, como um lápis técnico. Isso é a versão AWT das anotações da Focus Lab.
- **Código como matéria-prima:** efeito *text scramble* (caracteres aleatórios que se resolvem na palavra) em labels e links, uma referência literal a "transformando código em valor".

### 6.2 Paleta

**Decidido (30/09/2026):** tema único, dark-first, com narrativa de cor por seção. **Laranja e roxo convivem no mesmo tema**, cada um com um papel fixo, para preservar as duas cores da identidade.

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--ink-950` | `#0B0B0C` | Fundo principal (dark) |
| `--ink-900` | `#141414` | Superfícies e painéis escuros |
| `--ink-800` | `#1F1F21` | Cards elevados |
| `--line` | `rgb(255 255 255 / 0.08)` | Hairlines e grid blueprint |
| `--paper` | `#F2F0EB` | Seções claras (creme quente, como a Focus Lab) |
| `--paper-ink` | `#141414` | Texto sobre `--paper` |
| `--muted` | `#8A8A8E` | Texto secundário |
| `--orange-500` | `#FF7A00` | **Acento de assinatura**: CTAs, destaques, traços |
| `--orange-300` | `#FFB366` | Hover e gradientes |
| `--orange-700` | `#C25400` | Laranja para **texto pequeno sobre fundo claro** (contraste AA) |
| `--violet-400` | `#8B5CF6` | Roxo para **traço e texto sobre fundo escuro** (o `#4B1FA6` some no preto) |
| `--violet-700` | `#4B1FA6` | Roxo de marca: auras, superfícies, seleção de texto |
| `--violet-950` | `#2E1065` | Auras e gradientes profundos |

**Regras**

- **Laranja = ação e destaque:** CTAs, palavra de ênfase, traços que se desenham, indicador ativo.
- **Roxo = profundidade e ambiente:** auras de fundo, hover de elementos secundários, seleção de texto, superfícies de seções específicas.
- **O símbolo usa as duas:** um triângulo laranja e um roxo. É onde a dupla aparece junta com mais força.
- Nunca usar as duas cores como texto lado a lado, nem gradiente laranja→roxo em áreas grandes.
- Alternância de seções: **dark (hero) → dark (manifesto) → paper (serviços) → dark (projetos, painel que sobe) → paper (processo/FAQ) → laranja pleno (CTA) → dark (footer)**.
- Cada projeto pode ter uma `accentColor` própria usada no seu card e, na v2, na sua página de case.

### 6.3 Tipografia

**Decidido (30/09/2026):** Geist entra como fonte principal e a **Aldrich permanece em elementos pontuais** (wordmark, numeração `01–06`, contador do preloader, números técnicos grandes). Ela tem um peso só (400), então nunca recebe negrito.

| Papel | Fonte (recomendada) | Alternativas | Origem |
| :--- | :--- | :--- | :--- |
| Display e corpo | **Geist** (100–900, variável) | Inter Tight, General Sans, Satoshi | Google Fonts / Fontshare (grátis) |
| Labels e coordenadas | **Geist Mono** | JetBrains Mono | Google Fonts |
| Elementos pontuais de marca | **Aldrich** (400) | — | Google Fonts |

**Escala (desktop → mobile, com `clamp()`)**

| Token | Desktop | Mobile | Detalhes |
| :--- | :--- | :--- | :--- |
| `display-xl` | 108px (máx.) | 46px | peso 500, tracking −4%, line-height 0.88. Título do hero em 4 linhas, sempre antes do meio da tela (testado em 1024 e 1440px) |
| `display` | 88px | 44px | peso 500, tracking −3% |
| `h2` | 56px | 34px | peso 500, tracking −2% |
| `h3` | 28px | 22px | peso 500 |
| `body-lg` | 20px | 18px | line-height 1.5 |
| `body` | 16px | 16px | |
| `label` | 12px mono | 12px mono | CAIXA-ALTA, tracking +8% |

**Sem serif (decidido em 30/09/2026):** a troca de fonte no meio do título foi testada e rejeitada. A ênfase é feita **só com cor** (laranja), na mesma Geist. Números grandes usam Aldrich.

### 6.4 Elementos de assinatura

1. **Símbolo AWT interativo no hero:** SVG 2D (decidido para a v1) que se desenha na entrada. O **símbolo oficial é um traço único laranja** (`#F88512`, arquivos em `src/assets/brand/logo-symbol.svg` e `logo-full.svg`; versões em componente: `AwtSymbol.tsx` e `AwtLogo.tsx`). No hero ele ganha um **eco violeta** deslocado, para as duas cores da marca aparecerem juntas. Ainda por fazer: reação ao cursor (parallax e *tilt*) e decomposição no scroll. A versão 3D fica para uma etapa futura.
2. **Grid blueprint vivo:** linhas que se desenham ao entrar em cada seção; as coordenadas da label mudam conforme o scroll.
3. **Cursor triangular:** um pequeno triângulo laranja que segue o mouse com *lerp*. Sobre um projeto, vira um círculo com "Ver case"; sobre vídeo, "Play"; sobre um link, encolhe.
4. **Transição triangular:** *wipe* diagonal em clip-path `polygon()` no preloader, na abertura do menu e (na v2) entre páginas.

---

### 6.5 Arredondamento

**Decidido em 30/09/2026:** o arredondamento original **permanece** (painéis das seções 40px, cards 32px, botões e chips em pílula, campos 16px). Foi testada uma escala bem mais discreta (16/8/4px) e **rejeitada**: "antes estava melhor".

**Exceção:** as **capas dos projetos são quadradas** (sem `border-radius`). Qualquer imagem de projeto nova segue essa regra.

## 7. Arquitetura de informação — Landing Page (v1)

Página única com navegação por âncoras. Cada seção é um componente isolado que consome dados de `src/content/`, pronto para ser reaproveitado em páginas próprias na v2.

**Idiomas (decidido):** português e inglês. O português é servido na raiz (`/`) e o inglês em `/en`. Textos de interface ficam em `src/i18n/dictionaries/`; dados de conteúdo (serviços, projetos) carregam os dois idiomas no próprio registro. O header tem um seletor de idioma.

**Detecção automática de idioma (implementado em 01/10/2026, `src/proxy.ts`):** ao abrir `/` ou `/privacidade`, o idioma é escolhido pelo cabeçalho `Accept-Language` do navegador. Português fica na raiz; **inglês e qualquer idioma sem tradução (francês, alemão…) vão para `/en`**; sem cabeçalho (robôs, buscadores) vale o padrão, português. Quando o visitante **troca o idioma manualmente**, a escolha é gravada no cookie `NEXT_LOCALE` (1 ano) e passa a valer sobre a detecção. O seletor mantém a página e a seção atuais.

```
/  (landing)
├── 00  Preloader
├── 01  Header (fixo)
├── 02  Hero                     #inicio
├── 03  Showreel / Mídia         (sem âncora)
├── 04  Manifesto + Números      #sobre
├── 05  Serviços                 #servicos
├── 06  Projetos Selecionados    #projetos
├── 07  Processo                 #processo
├── 08  Diferenciais             (sem âncora)
├── 09  Stack / Tecnologias      (marquee)
├── 10  Depoimentos              (condicional: só renderiza se houver dados)
├── 11  FAQ                      #faq
├── 12  CTA + Briefing           #contato
└── 13  Footer
```

### 00 — Abertura (splash)
- **Status:** implementado em 01/10/2026 (`Splash.tsx`, `lib/splash.ts`, regras `#splash` em `globals.css`).
- **Visual:** tela cheia em **cinza escuro `#1A1A1A`**, o **símbolo oficial em laranja se desenhando** (1,2s) e, em seguida, **"Bem-vindo!" ou "Welcome!"**, conforme o **idioma do navegador** (não o da rota). Sai com um corte de baixo para cima.
- **Quando aparece:** só na **primeira visita da sessão** (`sessionStorage`). Não aparece com "reduzir movimento" nem sem JavaScript.
- **Como evita piscar:** um script no `<head>` decide, antes da primeira pintura, o estado `data-splash` do `<html>` (`play`, `leaving` ou `done`). O scroll fica travado enquanto ela está no ar.
- **Integração:** o título e o símbolo do hero só começam a animar quando a abertura começa a sair.
- Duração: cerca de 2,6s depois da hidratação (o relógio começa quando a página fica interativa, então a abertura cobre o carregamento).

### 01 — Header
- **Status:** implementado em 30/09/2026 (`Header.tsx`, `AwtLogo.tsx`, `lib/lenis.ts`).
- **Fixo no topo** durante todo o scroll (não esconde). No topo da página é transparente; depois de 24px de scroll ganha **glass**: fundo translúcido, `backdrop-blur` e saturação, com uma linha fina embaixo.
- **O glass muda de tom conforme a seção por baixo:** escuro (texto claro) sobre as seções escuras; **claro (texto escuro)** sobre as claras (Serviços, Clientes, Processo, FAQ). A seção avisa o header com `data-header-theme="light"`. A logo acompanha, porque as letras "WT" usam `currentColor`.
- **Conteúdo:** logo completa oficial · links **Sobre, Serviços, Projetos, Processo, Diferenciais, Tecnologias, Dúvidas** · seletor de idioma (mantém a seção atual ao trocar) · botão "Iniciar projeto" (abre o briefing).
- **Link ativo:** o link da seção que está sob o header fica mais forte e ganha um ponto laranja.
- **Responsivo:** a partir de **1280px** os 7 links aparecem na barra. Abaixo disso a barra mostra logo, idioma, CTA (a partir de 768px) e o botão de menu.
- **Menu de celular/tablet:** tela cheia, aberta por um **corte triangular** que cresce do canto superior direito; links grandes entram em cascata, com CTA, idioma e e-mail embaixo. Trava o scroll (inclusive o suave), fecha com ESC, mantém o foco dentro dele e devolve tudo ao normal ao fechar.

### 02 — Hero
- **Referências:** Halo (objeto de assinatura + pílulas), Clay (H1 à esquerda + 3D à direita), Focus Lab (anotação).
- **Layout (desktop):** grid 12 colunas. H1 ocupa as colunas 1–8; o **símbolo AWT interativo** ocupa as colunas 8–12; grid blueprint ao fundo.
- **Conteúdo (rascunho):**
  - Sem rótulo acima do título (testado e removido).
  - H1: "Projetado com precisão. Construído para **crescer**." (última palavra em laranja). Em inglês: "Designed with precision. Built to **grow**."
  - Sub: "Criamos sites e sistemas sob medida para o seu negócio ser encontrado, vender mais e trabalhar melhor." **Regra de copy (30/09/2026): sem jargão técnico** (deploy, stack, API…). O site fala com quem contrata, não com quem programa; termos técnicos ficam só na seção de tecnologias.
  - A tagline antiga, "Transformando código em valor", fica disponível para o manifesto ou o footer.
  - CTAs: **"Iniciar um projeto"** (primário, magnético) · **"Ver projetos →"** (link com seta)
  - Rodapé do hero: 3 pílulas (Landing Pages · Sites · Sistemas Web), cada uma com ícone triangular e ↗, mais o indicador "Role ↓" com a linha animada.
- **Fundo:** duas auras em órbita lenta (roxa 26s, laranja suave 34s em sentido contrário), sobre o grid blueprint. Implementado em CSS puro (`.aura` em `globals.css`).
- **Motion:** H1 revelado por linha (máscara + `y: 100% → 0`, stagger 0.08s); palavra de ênfase ("crescer") com *scramble* antes de assentar em laranja, e um traço laranja desenhado sob ela. O símbolo se desenha e depois acompanha o cursor (parallax de 2 camadas + tilt). No scroll, o hero faz leve *scale-down* e escurece.
- **Mobile:** símbolo acima do H1, menor e sem interação de cursor (usa giroscópio opcional ou animação *idle*).

### 03 — Showreel / Mídia
> **Adiada:** depende de vídeos ou screen recordings dos projetos. Será construída quando houver mídia (o resto da página segue sem ela).

- **Referências:** Halo e Cuberto.
- **Comportamento:** card de vídeo com ~40% da largura, **pinado**, que escala até full-bleed com o scroll (`ScrollTrigger scrub`), com os cantos arredondados indo de 24px a 0.
- **Conteúdo:** enquanto não houver reel, uma **montagem de screen recordings** dos projetos (Hyperion e Lucca navegando), mudo, em loop, com poster.
- **Interação:** cursor vira "Play". O clique abre um modal com o vídeo em tela cheia e áudio.

### 04 — Manifesto + Números
- **Referências:** Halo (manifesto com ícones inline) e Focus Lab (imagem inline no título).
- **Conteúdo (implementado, 30/09/2026):** "Não usamos modelos prontos. Cada projeto é **desenhado do zero** para o seu negócio: bonito de ver, rápido de abrir e fácil de ser encontrado." Rótulo discreto "Sobre nós" ao lado, sem numeração (âncora `#sobre`). Em inglês: "We don't use ready-made templates…".
- **Status:** texto implementado (`Manifesto.tsx` + `ScrubText.tsx`). Os **números** (contadores) ficam para quando os valores reais chegarem; `stats.ts` já está pronto e a faixa só aparece com dados.
- **Rascunho original (não usado):** "Não usamos templates. Cada projeto é **projetado** do zero, [ícone de triângulo] **calculado** para performance e **construído** para crescer com o seu negócio."
- **Motion:** o texto grande **acende palavra por palavra** conforme o scroll (opacidade de 0.15 → 1, *scrubbed*), e os ícones inline surgem com um *pop* de escala.
- **Números:** 3–4 tiles com contador animado em Aldrich (por exemplo, projetos entregues, anos de estúdio, % de clientes recorrentes, tempo médio de entrega). **Apenas números reais; pendente de dados** (§13).

### 05 — Serviços
- **Referências:** Cuberto (sticky stacking numerado) e Clay (lista expansível).
- **Status:** implementado em 30/09/2026 (`Services.tsx`, `StackCards.tsx`, `TriArt.tsx`).
- **Fundo:** `--paper`, em um painel de cantos superiores arredondados que sobe sobre o Manifesto. É a primeira seção clara da página.
- **Layout:** título fixo à esquerda ("O que podemos *construir* para o seu negócio", com "construir" em `--orange-700` para contraste no fundo claro) e, à direita, **6 cards escuros que se empilham** conforme o scroll. Cada card recua e escurece (sem ficar transparente, para o texto de trás não vazar) quando o próximo chega.
- **Cada card:** número `01–06` em Aldrich, título, descrição, 3–4 entregas em chips e uma **arte de triângulos exclusiva** (seis composições em SVG), que gira de leve no hover.
- **Mobile:** o mesmo empilhamento, com a arte menor. (O acordeão previsto foi descartado: o empilhamento funciona bem em tela pequena e evita duplicar o conteúdo.)
- **CTA do card:** "Pedir orçamento ↗", hoje para `#contato`. Quando o briefing existir (§12), cada botão abre o formulário com o serviço pré-selecionado.
- **Copy:** descrições reescritas em linguagem simples (sem "UX", "dashboards", "APIs", "CRMs"). As **entregas dos chips são rascunho** e precisam de validação da AWT (`src/content/services.ts`).

### 05b — Clientes (faixa de logos)
- **Pedido da AWT em 30/09/2026:** carrossel de logos de quem já confiou na AWT, **antes dos Projetos**.
- **Status:** implementado (`Clients.tsx`, `content/clients.ts`, reutiliza `Marquee`). Âncora `#clientes`.
- **Fundo:** `--paper`, continuando a seção de Serviços, com divisória fina no topo. Os Projetos sobem sobre ela.
- **Layout:** rótulo "Quem já confiou na AWT" e uma faixa infinita que anda devagar (mesmo comportamento das Tecnologias: acelera com o scroll), com as bordas esmaecidas. Cada cliente é separado por um triângulo laranja.
- **Conteúdo:** os clientes aparecem como **marca de texto**, porque ainda não há arquivos de logo. A lista se repete até a faixa nunca ficar curta. Para usar um logo: colocar o arquivo em `src/assets/clients/` e importá-lo em `content/clients.ts`; o logo aparece em tom neutro e ganha destaque no hover.
- **Lista atual (por nome):** Hyperion Global, Lucca, Isotelhas Tapajós, Azus Imobiliária, Doces Finos.
- **Melhoria futura:** trocar os nomes pelos **logos** dos clientes (ver "Melhorias futuras").

### 06 — Projetos Selecionados
- **Referências:** Halo (full-screen stacking), Cuberto (grid desencontrado), Zajno (lista numerada com metadados).
- **Status:** implementado (`Projects.tsx`) com **5 projetos** (atualizado em 30/09/2026).
- **Fundo:** painel `--ink-900` que **sobe sobre a faixa de Clientes** (margem negativa + cantos de 40px; o papel aparece atrás dos cantos).
- **Título:** "Trabalhos que já *saíram do papel*" / "Ideas we've already *brought to life*".
- **Cards:** empilham em `sticky` a partir do desktop (degraus de 0,75rem para o último caber na tela); no celular viram uma lista normal. Cada card traz número `01 / 05`, nome grande, resumo de uma linha, chip da categoria (claro), chips dos serviços e a **capa à direita**, com aura na cor do projeto. No hover a capa **sobe levemente, sem zoom** (o zoom cortava as bordas das colagens, que têm conteúdo até a margem). O retângulo da capa é quadrado, sem arredondamento.
- **Capas:** colagens fornecidas pela AWT (captura do site + uma seção abaixo), exportadas do Figma como SVG com PNG embutido (1,5 a 3,5 MB cada). Foram **renderizadas e convertidas para WebP** (31 a 89 KB cada, 312 KB no total) em `src/assets/projects/<slug>/cover.webp`. A imagem usa a **proporção original**, sem cortes.
- **Link ou aviso:** com `liveUrl` o card mostra "Visitar site ↗" (nova aba, `noopener noreferrer`); sem site público mostra o `note` (ex.: "Projeto confidencial").
- **Para 6 ou mais projetos:** avaliar o grid de 2 colunas desencontradas e o toggle Grid/Lista (ainda não implementados; hoje o empilhamento comporta qualquer quantidade, mas a seção fica longa).
- **Pendente:** cursor "Ver case" (depende do cursor da F1) e a página de case de cada projeto (v2).
- **Template para novo projeto:** bloco comentado no topo de `src/content/projects.ts`.

### 07 — Processo
- **Referências:** blueprint e Focus Lab ("What if").
- **Status:** implementado em 30/09/2026 (`Process.tsx`, `ProcessScroller.tsx`, `content/process.ts`).
- **Fundo:** `--paper`, em um painel que sobe sobre os Projetos (cantos arredondados).
- **Título:** "Do primeiro papo ao site *no ar*" / "From the first chat to a site that's *live*".
- **Desktop:** a seção **fica fixa na tela** e o scroll vertical desloca a trilha para o lado (1,8× mais scroll do que deslocamento, para o movimento ser calmo). A **linha laranja se desenha** acompanhando a borda direita da tela, e cada **marcador triangular acende** quando a linha o alcança. Os marcadores permanecem acesos e só apagam se o usuário voltar.
- **Celular:** linha do tempo vertical; a linha desce e os marcadores acendem conforme a lista passa pela tela. Sem pin.
- **Movimento reduzido:** tudo aparece completo, e a trilha rola na horizontal de forma nativa.
- **Etapas (linguagem simples, sem jargão):** 01 Conversa · 02 Projeto · 03 Construção · 04 Lançamento. Textos em `src/content/process.ts`; **precisam de validação da AWT** (por exemplo, "você vê e aprova tudo antes de qualquer coisa ser construída" é uma promessa do processo).

### 08 — Diferenciais
- **Status:** implementado em 30/09/2026 (`Differentials.tsx`, `content/differentials.ts`).
- **Fundo:** `--ink-950`, painel que sobe sobre o Processo.
- **Layout:** título "Seis motivos para trabalhar com a *AWT*" e grid 3×2 de células com divisórias finas, número em Aldrich, título e texto. As células entram em cascata (`Reveal`) e ganham fundo no hover.
- **CTA:** "Quero conversar sobre o meu projeto →", que leva ao briefing.
- **Conteúdo é rascunho** derivado do que o site já dizia (feito do zero, rápido, aparece no Google, pensado para vender, conversa direta, suporte). **Validar com a AWT**; remover o que não for verdade.

### 09 — Stack / Tecnologias
- **Status:** implementado em 30/09/2026 (`Technologies.tsx`, `Marquee.tsx`, `content/technologies.ts`).
- **Layout:** título e uma frase simples ("ferramentas modernas… para o seu site ser rápido, seguro e fácil de evoluir"), seguidos de **duas faixas em movimento com listas diferentes**: texto sólido andando para a esquerda e texto em contorno andando para a direita, separados por triângulos laranja. A duração de cada faixa é proporcional ao número de nomes, para a velocidade ser parecida.
- **Motion:** as faixas **aceleram com a velocidade do scroll** e voltam ao ritmo normal. Com "reduzir movimento", mostram uma cópia estática, quebrando linha.
- **Lista (confirmada pela AWT em 30/09/2026), em duas faixas:** interface — Next.js, React, TypeScript, Tailwind CSS, GSAP; servidor, dados e hospedagem — C#, .NET, Node.js, PostgreSQL, Supabase, Railway, Vercel, Cloudflare. Logos em SVG podem substituir os nomes no futuro.
- Sem CTA (seção de apoio).

### 10 — Depoimentos *(condicional)*
- **Referência:** Cuberto (cards espalhados e rotacionados).
- **Regra:** só renderiza se `testimonials.length > 0`.
- **Motion:** os cards "caem" na mesa em sequência; no desktop dá para arrastá-los.

### 11 — FAQ
- **Status:** implementado em 30/09/2026 (`Faq.tsx`, `content/faq.ts`).
- **Fundo:** `--paper`, painel que sobe sobre Tecnologias.
- **Layout:** título "Ficou com alguma *dúvida*?" e CTA "Falar com a AWT" à esquerda (fixos no scroll); acordeão à direita, com **altura animada** e abertura exclusiva (abrir um fecha o outro). Usa `<details>` nativo: funciona sem JavaScript e é acessível por teclado.
- **SEO:** gera JSON-LD `FAQPage` no idioma da página.
- **Perguntas (rascunho):** preço, prazo, modelos prontos, pós-lançamento e "Onde vocês atendem?" (resposta confirmada pela AWT: clientes do mundo todo). As respostas **não citam valores nem prazos**; tratam preço e prazo sob proposta. **Validar com a AWT.**

### 12 — CTA + Briefing (Contato)
- **Status:** implementado em 30/09/2026 (`Contact.tsx`, `BriefingForm.tsx`, `lib/briefing.ts`, `lib/actions/briefing.ts`).
- **Fundo:** **laranja pleno** `#FF7A00`, o único bloco de cor saturada da página. Painel que sobe sobre o FAQ.
- **Esquerda:** "Vamos *construir* algo juntos?", frase de apoio, botão "Chamar no WhatsApp" e os canais clicáveis (e-mail, telefone, Instagram, localização).
- **Direita:** card escuro com o **briefing em 5 passos** e barra de progresso:
  1. **O que você precisa?** (chips, múltipla escolha; "Ainda não sei" é exclusivo) · obrigatório
  2. **Quanto pretende investir?** (chips) · pode pular
  3. **Para quando?** (chips) · pode pular
  4. **Conte sobre o projeto** (texto livre) · pode pular
  5. **Nome + WhatsApp ou e-mail** · obrigatório, validado
- **Envio pelos dois canais (decidido):** uma Server Action valida os dados (Zod) e envia o **e-mail** (Resend, via API REST); em paralelo, o navegador abre o **WhatsApp** com o resumo já escrito, no idioma do visitante. A janela do WhatsApp é aberta no clique, antes do envio, para não ser bloqueada. Se o e-mail falhar ou não estiver configurado, o WhatsApp ainda leva o briefing e a tela final avisa isso.
- **Proteção contra robôs:** campo-isca invisível (honeypot). Limite de requisições por IP ainda **não** existe.
- **Pré-seleção:** cada botão "Pedir orçamento" de Serviços marca o serviço correspondente no briefing (evento `awt:briefing-service`).
- **Variáveis de ambiente:** `RESEND_API_KEY`, `BRIEFING_TO`, `BRIEFING_FROM` (ver `.env.example`).
- **Rascunhos a validar:** as **faixas de investimento** (`content/briefing.ts`) são sugestões minhas, não valores da AWT.
- **Não implementado:** miniaturas de projetos orbitando no topo (ideia da Halo Lab).

#### Mapa de CTAs para o briefing
| Onde | Botão | Pré-seleciona serviço? |
| :--- | :--- | :--- |
| Hero | "Iniciar um projeto" | não |
| Serviços (cada card) | "Pedir orçamento ↗" | **sim** |
| Projetos (rodapé) | "O seu projeto pode ser o próximo →" | não |
| Processo | "Começar a conversa →" | não |
| Diferenciais | "Quero conversar sobre o meu projeto →" | não |
| FAQ | "Falar com a AWT →" | não |

### 13 — Footer
- **Status:** implementado em 01/10/2026 (`Footer.tsx`, `LocalTime.tsx`, `BackToTop.tsx`).
- **Conteúdo:** logo, descrição e botão "Iniciar projeto" · navegação (as 7 seções + Contato) · contatos (telefone/WhatsApp, e-mail, Instagram, localização) · **marca d'água gigante** "AWT" em tom quase invisível · linha final com © do ano, **Política de Privacidade**, **hora local de Goiânia** (atualiza a cada 30s) e "Voltar ao topo".
- **Fundo:** `--ink-950`, painel que sobe sobre o Contato (laranja).
- Os links de navegação usam `/#seção`, então funcionam também fora da home (ex.: na página de privacidade).

#### Página de Política de Privacidade
- **Rota:** `/privacidade` e `/en/privacidade` (`app/[lang]/privacidade`), texto em `content/privacy.ts`.
- **É um texto-base, NÃO revisado por advogado.** Enquanto `PRIVACY_IS_DRAFT` for `true`, a página mostra o aviso "Este texto está em revisão". **Revisar com quem entende de LGPD e só então mudar para `false`.**
- Descreve o que o site realmente faz hoje: briefing (nome, contato, descrição), conversas por WhatsApp/e-mail/Instagram, **um cookie de idioma** (só quando o visitante troca o idioma) e **o registro da abertura** (sessão). Informa que **não há cookies de publicidade nem análise de comportamento**. Se uma ferramenta de análise for adicionada, **atualizar esse texto**.

## 8. Sistema de motion e interação

### 8.1 Princípios

1. **Motion com função:** cada animação guia a leitura, dá feedback ou reforça o conceito (desenhar, construir). Nada decorativo por hábito.
2. **Coreografia, não efeitos soltos:** as seções têm entrada, clímax e saída ligados ao scroll.
3. **Resposta imediata:** hover e clique em até 100ms. Animações de entrada nunca bloqueiam a interação.
4. **Respeito ao usuário:** `prefers-reduced-motion` desliga smooth scroll, pins, parallax e scramble, mantendo apenas *fades* curtos.

### 8.2 Tokens

```css
/* Easing */
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);     /* reveals e entradas */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);  /* wipes, menu, transições */
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1); /* pops, chips, microinterações */

/* Durações */
--dur-micro: 150ms;   /* hover, focus */
--dur-short: 300ms;   /* botões, chips, acordeão */
--dur-base:  600ms;   /* reveals de texto e imagem */
--dur-long:  1000ms;  /* wipes, preloader, entrada do hero */

/* Stagger */
--stagger-lines: 80ms;
--stagger-items: 60ms;
```

### 8.3 Catálogo de componentes de motion

| Componente | Descrição | Tecnologia |
| :--- | :--- | :--- |
| `<SmoothScroll>` | Lenis sincronizado com o ticker do GSAP | lenis + gsap |
| `<SplitReveal>` | Revela texto por linha/palavra/caractere com máscara | GSAP SplitText |
| `<ScrambleText>` | Caracteres aleatórios que se resolvem na palavra | GSAP ScrambleText |
| `<DrawLine>` / `<Annotation>` | Traço SVG desenhado (sublinhado, círculo à mão) | GSAP DrawSVG |
| `<ScrubText>` | Opacidade palavra a palavra guiada pelo scroll | ScrollTrigger scrub |
| `<ScaleMedia>` | Mídia pinada que expande até full-bleed | ScrollTrigger pin + scrub |
| `<StackCards>` | Cards sticky que empilham com leve *scale-down* dos anteriores | CSS sticky + ScrollTrigger |
| `<HorizontalPin>` | Seção pinada com scroll horizontal | ScrollTrigger |
| `<Marquee>` | Loop infinito reativo à velocidade do scroll | GSAP + Lenis velocity |
| `<Magnetic>` | Elemento atraído pelo cursor dentro de um raio | GSAP quickTo |
| `<Cursor>` | Cursor triangular com estados (default, link, "Ver case", "Play", drag) | GSAP quickTo + contexto React |
| `<Counter>` | Número que conta ao entrar na viewport | GSAP |
| `<Parallax>` | Deslocamento Y relativo ao scroll | ScrollTrigger |
| `<TriWipe>` | Transição por clip-path `polygon()` triangular | GSAP / motion |
| `<Accordion>` | Altura animada e ícone rotacionando | motion (`AnimatePresence`) |
| `<HoverPreview>` | Imagem ou vídeo que segue o cursor sobre itens de lista | GSAP quickTo |

### 8.4 Regras por dispositivo

- **Touch/mobile:** sem cursor customizado, sem magnético e sem pins longos (pins só onde a leitura melhora de fato). Lenis com `syncTouch: false` (scroll nativo). Reveals mantidos.
- **Desktop:** experiência completa.
- **Low-end** (`navigator.hardwareConcurrency <= 4` ou `saveData`): sem WebGL, com fallback SVG estático do símbolo.

---

## 9. Evolução para multipáginas (v2)

### 9.1 Sitemap futuro

```
/                          Home (evolução da landing: destaques + atalhos)
/projetos                  Índice de projetos (grid/lista + filtro por categoria)
/projetos/[slug]           Case study
/servicos                  Visão geral dos serviços
/servicos/[slug]           Página por serviço (SEO local: "landing page em Goiânia" etc.)
/processo                  Metodologia detalhada (opcional)
/sobre                     Estúdio, time, valores, stack
/contato                   Briefing completo + canais
/playground                Experimentos de motion/código da AWT (opcional, à la Zajno)
/blog  e  /blog/[slug]     Artigos (futuro, via MDX ou CMS)
/privacidade               Política de privacidade (LGPD)

Todas as rotas existem também em inglês sob /en (ex.: /en/projetos/[slug]).
```

**Template de case study (`/projetos/[slug]`):**
1. Hero: capa ou vídeo full-bleed, nome, cliente, ano e `accentColor` do projeto aplicada à página.
2. Ficha técnica: categoria · serviços · stack · link ao vivo.
3. Desafio → Solução → Resultado (com métricas quando houver).
4. Galeria: desktop e mobile mockups, vídeos de interação, grid editorial.
5. Depoimento do cliente (se houver).
6. **"Próximo projeto"**: card full-width; o scroll até o fim leva ao próximo case com transição.

**Transições de página:** `<TriWipe>` entre rotas (View Transitions API nativa do Next + fallback com `motion`). A imagem do card **morfa** para o hero do case (shared element via `view-transition-name`).

### 9.2 Modelo de conteúdo de projeto

A landing já nasce lendo desse modelo. Na v2, o mesmo arquivo alimenta as páginas. Migrar para CMS (Sanity, Payload ou MDX) só quando houver mais de 10 projetos ou quando alguém sem acesso ao código precisar editar.

```ts
// src/content/projects.ts
export type Project = {
  slug: string;                 // "hyperion-global"
  name: string;                 // "Hyperion Global"
  client: string;
  year: number;
  category: 'landing-page' | 'site-institucional' | 'sistema-web' | 'e-commerce' | 'site-pessoal' | 'integracao';
  services: string[];           // ["Design", "Desenvolvimento", "SEO"]
  stack: string[];              // ["Next.js", "Tailwind"]
  summary: string;              // 1 linha para cards
  challenge?: string;           // v2: case study
  solution?: string;
  results?: { label: string; value: string }[];
  accentColor: string;          // cor do projeto para cards/páginas
  cover: StaticImageData;
  previewVideo?: string;        // loop curto para hover/cards
  gallery?: StaticImageData[];
  liveUrl?: string;
  featured: boolean;            // aparece na landing
  order: number;
  testimonial?: { quote: string; author: string; role: string; avatar?: StaticImageData };
};
```

O mesmo padrão vale para `services.ts`, `process.ts`, `faq.ts`, `testimonials.ts`, `stats.ts` e `site.ts` (contatos, redes, metadados).

---

## 10. Stack técnica e estrutura de pastas

### 10.1 Dependências

| Pacote | Papel | Observação |
| :--- | :--- | :--- |
| `next@16`, `react@19`, `typescript` | Base | Mantidos |
| `tailwindcss@4` | Estilo, tokens via `@theme` | Mantido |
| **`gsap`** + **`@gsap/react`** | Coreografia de scroll e texto (ScrollTrigger, SplitText, ScrambleText, DrawSVG, Flip) | Todos os plugins são gratuitos desde 2025 |
| **`lenis`** | Smooth scroll | Usado por Halo e Cuberto |
| `motion` (sucessor do `framer-motion`) | Estado de UI: menu, acordeão, modal, `AnimatePresence` | Substitui `framer-motion` |
| `@react-three/fiber` + `@react-three/drei` | Símbolo 3D no hero | **Fora da v1.** Quando entrar: `dynamic(..., { ssr: false })` + fallback SVG |
| `resend` | E-mail do briefing | Entra na F4 |
| `zod` | Validação do formulário | |
| `@vercel/analytics` | Métricas | Se o deploy for na Vercel |
| ~~`next-themes`~~ | — | **Remover** |
| `lucide-react` | Ícones utilitários | Manter só se necessário |

**Divisão de responsabilidades:** GSAP cuida de tudo que é ligado a scroll, timeline ou texto. `motion` cuida de tudo que é ligado a estado React (montar e desmontar). Não usar os dois no mesmo elemento.

**Gerenciador:** **pnpm** (o `package-lock.json` foi removido).

**i18n:** sem biblioteca externa. Segmento dinâmico `app/[lang]`, dicionários tipados e `src/proxy.ts` (o antigo middleware, renomeado no Next 16) reescrevendo `/` para o idioma padrão.

### 10.2 Estrutura de pastas proposta

```
src/
├── proxy.ts                     # roteamento de idioma (pt na raiz, /en com prefixo)
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx           # fontes, SmoothScroll, Cursor, metadata + hreflang
│   │   ├── page.tsx             # composição da landing (Server Component)
│   │   ├── privacidade/page.tsx
│   │   └── opengraph-image.tsx  # OG dinâmica
│   ├── sitemap.ts
│   ├── robots.ts
│   └── globals.css              # @theme tokens + base
├── i18n/
│   ├── config.ts                # locales, Localized<T>, localePath()
│   ├── get-dictionary.ts
│   └── dictionaries/            # pt.ts (fonte do tipo Dictionary), en.ts
├── components/
│   ├── layout/                  # Header, MobileMenu, Footer, Preloader
│   ├── sections/                # Hero, Showreel, Manifesto, Services, Projects, Process,
│   │                            # Differentials, StackMarquee, Testimonials, Faq, Contact
│   ├── motion/                  # SmoothScroll, SplitReveal, ScrambleText, DrawLine, ScrubText,
│   │                            # ScaleMedia, StackCards, HorizontalPin, Marquee, Magnetic,
│   │                            # Cursor, Counter, Parallax, TriWipe
│   ├── ui/                      # Button, Pill, Chip, Label, Container, Grid, Accordion, Modal
│   ├── brand/                   # AwtSymbol (SVG animável), AwtWordmark, BlueprintGrid, TriPattern
│   └── three/                   # (futuro) HeroSymbol3D
├── content/                     # site.ts, services.ts, projects.ts, process.ts, faq.ts, stats.ts
├── lib/
│   ├── gsap.ts                  # registro central de plugins
│   ├── motion-prefs.ts          # reduced-motion, touch, low-end
│   ├── emphasis.tsx             # `*palavra*` → ênfase em laranja
│   └── actions/briefing.ts      # Server Action do formulário
└── assets/
    ├── brand/                   # SVGs oficiais do símbolo e wordmark
    ├── projects/<slug>/         # capas, vídeos (webm/mp4), galeria
    └── fonts/                   # se houver fonte local
```

**Princípio:** seções são Server Components que recebem dados e envolvem só as partes animadas em componentes client de `motion/`. Isso reduz o JS enviado e mantém o HTML indexável.

---

## 11. Qualidade: performance, acessibilidade e SEO

### 11.0 Otimização realizada (01/10/2026)

| Item | Antes | Depois |
| :--- | :--- | :--- |
| JavaScript baixado (gzip, todas as rotas) | 340 KB, 15 arquivos | **252 KB, 13 arquivos (−26%)** |
| CSS (gzip) | 8 KB | 9 KB (inclui rodapé, abertura e privacidade) |
| Capas dos projetos | ~10 MB em SVG | 312 KB em WebP (servidas em AVIF/WebP, redimensionadas pelo Next) |

- **Dependências:** removido o `motion` (não era usado); o `zod` passou a rodar **só no servidor** (separado em `lib/briefing-schema.ts`), saindo do código do navegador.
- **Código morto removido:** estatísticas sem tela (`stats.ts`, cuja lista continua em §13.2), `isTouchDevice`, campos de projeto sem uso, uma validação inalcançável no briefing e a chave de erro `generic`.
- **Comentários:** ficaram só os que explicam um "porquê" (ex.: por que o véu usa opacidade e não `filter`).
- **Fontes:** a Aldrich (só numeração) deixou de ser pré-carregada.
- **Imagens:** formatos AVIF e WebP habilitados; `alt` descritivo em todas as capas.
- **Segurança:** cabeçalhos `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e `Permissions-Policy`; sem o cabeçalho `X-Powered-By`.
- **Ícone de dev tools do Next** removido (`devIndicators: false`).

**SEO implementado:** título e descrição por idioma · canonical · `hreflang` pt-BR, en e `x-default` · Open Graph e Twitter Card com **imagem gerada por idioma** (`opengraph-image.tsx`) · `robots.txt` · `sitemap.xml` (4 endereços, com alternates) · `manifest` e cor do tema · dados estruturados `ProfessionalService` (home) e `FAQPage` · um único `h1`, hierarquia correta e `lang` na raiz.

### 11.1 Orçamento de performance

| Métrica | Meta (mobile, 4G) |
| :--- | :--- |
| LCP | < 2,5s (o H1 do hero é o elemento LCP, nunca o 3D) |
| CLS | < 0,05 |
| INP | < 200ms |
| JS inicial (gzip) | < 180 KB, com GSAP e Lenis carregados após a hidratação e Three.js só sob demanda |
| Lighthouse | ≥ 90 em Performance, Acessibilidade, Best Practices e SEO |

**Práticas**
- Vídeos: `muted playsinline loop`, com poster, WebM + MP4 comprimidos (< 2 MB cada), carregados com `IntersectionObserver`.
- Imagens: `next/image` com AVIF/WebP, `sizes` corretos e `priority` só no hero.
- Fontes: `next/font` com `display: swap` e subset latin.
- WebGL: um canvas no máximo, pausado fora da viewport (`frameloop="demand"`).

### 11.2 Acessibilidade

- Contraste AA: laranja `#FF7A00` só em texto grande (≥ 24px) sobre fundo escuro; em texto pequeno sobre claro, usar `#C25400`.
- O cursor customizado **não substitui** o foco. Foco visível em todos os interativos (anel laranja com offset).
- Menu mobile e modal com *focus trap*, fechamento por ESC e `aria-expanded`/`aria-controls`.
- Textos divididos pelo SplitText mantêm `aria-label` com o texto original.
- `prefers-reduced-motion` respeitado globalmente (§8.1).
- HTML semântico: um `h1`, hierarquia correta, `<main>`, `<nav>`, `<footer>` e *landmarks*.

### 11.3 SEO

- `metadata` completa: title template, description, Open Graph, Twitter, `metadataBase`, canonical.
- OG image dinâmica (`opengraph-image.tsx`) com o símbolo e a tagline.
- JSON-LD: `Organization` + `LocalBusiness` (Goiânia) + `FAQPage` + (v2) `CreativeWork` por case.
- `sitemap.ts` e `robots.ts`.
- Conteúdo em texto real, nunca em imagem. Títulos com palavras-chave locais nas páginas de serviço (v2).

---

## 12. Plano de execução

| Fase | Entregas | Depende de |
| :--- | :--- | :--- |
| **F0 — Fundação** ✅ | Branch `refactor/v4`; limpeza (remover componentes, temas, next-themes, lockfile npm); tokens de cor, tipo e motion no `@theme`; fontes; `SmoothScroll` + registro GSAP; `content/` com os dados atuais; `Container`/`Label`/`Button`; i18n PT/EN; símbolo mock; hero provisório | Concluída em 30/09/2026 |
| **F1 — Marca e casca** (parcial ✅: logo, header, abertura e footer prontos; faltam cursor e botões magnéticos) | `AwtSymbol` SVG animável; Preloader; Header + menu mobile; Footer; `BlueprintGrid`; `Cursor` + `Magnetic` | **SVG oficial da logo** |
| **F2 — Hero e narrativa** (parcial: faltam Showreel e números) | Hero; Showreel; Manifesto + Números; SplitReveal/Scramble/DrawLine/ScrubText | Vídeos/recordings dos projetos |
| **F3 — Oferta** ✅ | Serviços (StackCards + acordeão mobile); Projetos (layout adaptativo); Processo (HorizontalPin); Diferenciais; Marquee | Textos validados |
| **F4 — Conversão** (parcial ✅: FAQ, briefing, privacidade (rascunho), SEO e Open Graph prontos; falta limitar envios por IP no briefing) | FAQ; CTA + Briefing (Server Action, WhatsApp, validação); página de privacidade; SEO/OG/JSON-LD | Faixas de orçamento, respostas do FAQ |
| **F5 — Polimento** | Distorção de imagem no hover (opcional); reduced-motion; QA mobile real; Lighthouse; ajuste fino de easing e timing | — |
| **F6 — v2 multipáginas** | Rotas `/projetos`, `/projetos/[slug]`, `/servicos/[slug]`, `/sobre`; transições de página; CMS se necessário | Portfólio com 4+ projetos |

**Definição de pronto por seção:** funciona em 375px, 768px, 1440px e 1920px; tem fallback de reduced-motion; não gera CLS; navegável por teclado; conteúdo vem de `content/`.

---

## 13. Pendências e perguntas em aberto

### 13.1 Decisões

**Fechadas em 01/10/2026**

- [x] **Domínio:** `https://www.awtdevelopment.com` (canonical, sitemap, Open Graph, dados do Google). Pode ser trocado pela variável `NEXT_PUBLIC_SITE_URL`.
- [x] **Telefone:** os **textos** exibem **+55 62 98315-5703** (com o 9); os **links do WhatsApp** usam o número **sem o 9** (`556283155703`), porque é assim que está cadastrado no WhatsApp. Todo link de WhatsApp abre com a **mensagem pré-definida** (`whatsappGreeting`, em `content/site.ts`).
- [x] **Abertura:** cinza escuro, só na primeira visita da sessão.
- [x] **Privacidade:** página-base criada (rascunho, ver §13).

**Fechadas em 30/09/2026**

- [x] **Temas:** tema único, usando laranja e roxo juntos (§6.2).
- [x] **Tipografia:** Geist como principal, Aldrich mantida em elementos pontuais, sem serif (§6.3).
- [x] **Símbolo no hero:** SVG 2D na v1; 3D em versão futura.
- [x] **Idioma:** português e inglês (§7).
- [x] **Formulário:** envio por e-mail e WhatsApp.

**Em aberto**

- [ ] **Deploy/domínio:** onde está hospedado hoje e qual o domínio oficial? Hoje `site.url` usa `NEXT_PUBLIC_SITE_URL`, com fallback para localhost.

### 13.2 Materiais necessários

- [x] **Logo em SVG** (símbolo e logo completa): recebida em 30/09/2026 e aplicada (`src/assets/brand/`, `AwtSymbol.tsx`, `AwtLogo.tsx`).
- [ ] Significado de "AWT" (útil para o manifesto e a página Sobre).
- [ ] **Portfólio em expansão:** 5 projetos publicados; faltam **Ludus Tally** e **Guilherme Martins** (ver §13.3). Para os já publicados ainda faltam ano, stack e, para o case (v2), desafio, solução e resultados.
- [ ] **Números reais para as estatísticas.** A lista está em `src/content/stats.ts`; cada item fica oculto enquanto o valor for `null`:

  | # | Estatística | Onde aparece |
  | :--- | :--- | :--- |
  | 1 | Projetos entregues (total) | Landing |
  | 2 | Ano de fundação | Landing |
  | 3 | Clientes atendidos | Landing |
  | 4 | Prazo médio de entrega de uma landing page (em semanas) | Landing |
  | 5 | Nota média de PageSpeed/Lighthouse dos sites entregues | Sobre (v2) / Diferenciais |
  | 6 | % de clientes que voltam ou mantêm suporte | Sobre (v2) |
  | 7 | Pessoas no time | Sobre (v2) |
  | 8 | Países (ou estados) atendidos | Sobre (v2) |
  | 9 | Avaliação média dos clientes (ex.: Google) | Depoimentos |
- [ ] Depoimentos de clientes (nome, cargo, foto, citação).
- [x] Lista de tecnologias: confirmada em 30/09/2026 (13 itens, ver §09).
- [ ] Validar as respostas do FAQ e as faixas de investimento do briefing (rascunhos).
- [ ] **Logos dos clientes** para a faixa de parceiros (melhoria futura, ver §13.4).
- [ ] Fotos do time/estúdio (para a seção Sobre, hoje ou na v2).

### 13.3 Registro de portfólio

**Publicados na landing**

| # | Projeto | Categoria | Link | Observação |
| :--- | :--- | :--- | :--- | :--- |
| 01 | Hyperion Global | Landing Page | hyperionglobals.com | No ar |
| 02 | Lucca | Site Pessoal | iamlucca.com | No ar |
| 03 | Isotelhas Tapajós | Landing Page | isotelhas-tapajos.vercel.app | **Em desenvolvimento**; o link foi liberado como redirecionamento. Trocar pelo domínio definitivo quando houver |
| 04 | Azus Imobiliária | Sistema Web (sistema e plataforma de inteligência imobiliária) | — | **Confidencial**: sem link; o card mostra "Projeto confidencial" |
| 05 | Doces Finos | Automação (gerador de contratos) | — | **Uso pessoal**: sem link; o card mostra "Ferramenta de uso pessoal" |

**Previstos (ainda NÃO estão no código, por falta de imagens de referência)**

| # | Projeto | O que é | Categoria | Já definido | Falta receber |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 06 | **Ludus Tally** | App de contagem de pontos de board games | App (já existe em `ProjectCategory`) | Nome e descrição | Imagens/colagem de capa, link ou loja, ano, serviços prestados, status (no ar? em desenvolvimento?) |
| 07 | **Guilherme Martins** | Website e identidade visual | Site Pessoal + Identidade Visual (ambas já existem em `ProjectCategory`) | Nome e escopo | Imagens (site e identidade), link, ano, confirmar se o cliente autoriza a divulgação |

**Como incluir um novo item (template):** seguir o bloco comentado no topo de `src/content/projects.ts`.
1. Salvar a colagem em `src/assets/projects/<slug>/cover.webp` (~1500px de largura, WebP, de preferência < 150 KB) e importá-la.
2. Copiar o modelo de objeto, preencher e acrescentar à lista (ordem pelo campo `order`).
3. Se o cliente puder aparecer na faixa de Clientes, acrescentar o nome em `src/content/clients.ts`.
4. Se houver site público, preencher `liveUrl`; se não houver, usar `note` ("Projeto confidencial", "Uso pessoal" etc.).

### 13.4 Melhorias futuras

- **Logos dos clientes na faixa de parceiros.** Hoje a faixa mostra só os nomes. Quando os logos chegarem, salvar em `src/assets/clients/` e importar em `src/content/clients.ts` (campo `logo`); o componente já os exibe em tom neutro com destaque no hover. Preferir SVG de um traço só.
- **Confirmar o endereço definitivo da Isotelhas Tapajós** (hoje no domínio de testes da Vercel) e rever se o card deve indicar "em desenvolvimento".
- **Layout para muitos projetos:** com 6 ou mais, avaliar grid de 2 colunas desencontradas e alternância Grid/Lista.
- **Páginas de case** (`/projetos/[slug]`) na v2.
