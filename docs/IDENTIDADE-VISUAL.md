# Identidade visual — AWT Development

Documento de referência da linguagem visual da AWT, derivado do que está aplicado no site (`src/app/globals.css`, `src/components/brand/*`, seções) e da direção pedida: **fundo cinza, geometria circular com brilho de LED suave e elementos espelhados**.

Legenda: **[Aplicado]** já existe no site · **[Direção]** orientação nova, ainda não implementada.

---

## 1. Essência

A AWT é um estúdio de **software sob medida**: precisão de engenharia com acabamento de design. A identidade traduz isso em três ideias:

1. **Calma técnica** — superfícies cinza escuras, silenciosas, onde nada grita.
2. **Luz como acento** — a cor aparece como brilho (um LED aceso num painel), não como bloco chapado.
3. **Simetria e reflexo** — formas que se espelham, sugerindo rigor, equilíbrio e "sistema".

Tom: confiante, direto, sem jargão. Visualmente: sóbrio, preciso, com um toque de ficção científica discreta.

---

## 2. Símbolo e marca

- **[Aplicado]** O símbolo é um traço contínuo, de ângulos agudos, que forma **triângulos/picos** (`AwtSymbol`). Cor oficial `--color-logo #f88512`. Existe só em 2D.
- **[Aplicado]** O símbolo se **desenha** (stroke animado, `symbol-draw`) na abertura e no hero; há uma cópia deslocada em violeta atrás, como sombra/reflexo.
- **[Aplicado]** O triângulo é o motivo geométrico herdado do símbolo: cursor próprio (triângulo laranja de 18 px), ilustrações `TriArt` nos serviços.
- **[Direção]** O triângulo (herança do logo) convive com o **círculo** (brilho, luz, órbita). Regra: **triângulo = estrutura/marca; círculo = luz/atmosfera**. Não misturar os dois no mesmo papel.
- Área de respiro do logo: no mínimo a altura do pico menor em todos os lados. Nunca sobre fundo com brilho forte atrás do traço.

---

## 3. Cor

### 3.1 Cinza como base — **[Direção]**

O site hoje usa um preto quase puro (`ink-950 #0b0b0c`). A identidade passa a **priorizar o cinza-grafite**, mais quente e "metálico", com o preto reservado para profundidade e texto sobre papel.

| Papel | Token | Valor | Uso |
|---|---|---|---|
| Fundo da abertura | `--color-splash` **[Aplicado]** | `#1a1a1a` | Splash, referência do cinza principal |
| Fundo base (proposto) | `gray-900` | `#1a1a1a` | Fundo geral das seções escuras |
| Superfície elevada | `--color-ink-800` **[Aplicado]** | `#1f1f21` | Cartões, painéis |
| Superfície mais alta | `gray-700` | `#2a2a2d` | Hover, campos, painéis espelhados |
| Profundidade | `--color-ink-950` **[Aplicado]** | `#0b0b0c` | Rodapé, vinhetas, sombras |
| Linha | `--color-line` **[Aplicado]** | `rgb(255 255 255 / .08)` | Divisórias, grade |
| Texto secundário | `--color-muted` **[Aplicado]** | `#8a8a8e` | Subtítulos, rótulos |
| Papel | `--color-paper` **[Aplicado]** | `#f2f0eb` | Texto principal e seções claras |

Gradações de cinza devem ter leve **subtom neutro-quente**, nunca azulado, para conviver com o laranja.

### 3.2 Cores de luz (acentos)

Cada cor tem **papel fixo** (decisão de 30/09/2026 no blueprint):

| Cor | Token | Valor | Papel |
|---|---|---|---|
| Laranja marca | `--color-logo` | `#f88512` | Símbolo oficial apenas |
| Laranja UI | `--color-orange-500` | `#ff7a00` | Ação, CTA, destaque da palavra-chave, cursor, foco |
| Laranja claro | `--color-orange-300` | `#ffb366` | Brilho interno do LED, texto sobre escuro |
| Laranja texto | `--color-orange-700` | `#c25400` | Texto pequeno sobre fundo claro (AA) |
| Violeta | `--color-violet-700` / `-400` | `#4b1fa6` / `#8b5cf6` | Atmosfera, profundidade, reflexo; nunca em botões |

Proporção sugerida em qualquer tela: **~85% cinza/papel · ~10% laranja · ~5% violeta**.

---

## 4. Geometria circular com brilho de LED — **[Direção]**

Base **[Aplicado]**: auras circulares em órbita no hero (`.aura`), agora feitas com `radial-gradient` (sem `filter: blur`, por desempenho).

Regras para o círculo luminoso:

- **Forma**: círculos perfeitos, anéis finos (1 px) e discos; nunca elipses distorcidas. Raios em progressão (1 : 2 : 3) para criar ressonância.
- **Efeito LED suave**: centro mais claro (`orange-300`), meio saturado (`orange-500`), borda que dissolve em transparente. Implementação: `radial-gradient(closest-side, cor, transparent)` + `box-shadow` suave nos elementos pequenos. Intensidade baixa; o brilho **sugere** luz, não ofusca.
- **Anel + ponto**: um anel fino cinza-claro (`--color-line`) com um **ponto aceso** percorrendo-o, como um indicador de status. Serve de loader, marcador de etapa e ornamento.
- **Respiração**: pulsos lentos de opacidade (4–6 s, `ease-in-out`), sem piscar. Movimento orbital apenas em elementos grandes e desfocados por gradiente.
- **Uso**: no máximo **1 foco de luz dominante por tela**; os demais são secundários e mais frios (violeta).
- **Desempenho**: animar só `transform` e `opacity`; evitar `blur()` em elementos grandes em movimento.

---

## 5. Elementos espelhados — **[Direção]**

O espelhamento reforça precisão e dá profundidade ao fundo cinza.

- **Simetria axial**: composições que se refletem no eixo vertical ou horizontal (por exemplo, o símbolo com sua cópia violeta já deslocada, que evolui para um reflexo verdadeiro).
- **Reflexo de piso**: o símbolo ou um círculo aceso repetido abaixo com `scaleY(-1)`, opacidade 8–15% e máscara em degradê que o desfaz. Ideal para o hero e blocos de destaque.
- **Superfície vidro/metal**: painéis com borda de 1 px (`--color-line`), leve gradiente diagonal cinza e brilho especular no canto superior. Já presente no cabeçalho com efeito *glass* **[Aplicado]** (`backdrop-blur-xl`, `backdrop-saturate-150`).
- **Pares espelhados**: seções de conteúdo que alternam esquerda/direita por simetria (projetos, processo).
- Limite: espelhar no máximo **um elemento por bloco**, para não virar caleidoscópio.

---

## 6. Tipografia

- **[Aplicado]** **Geist** (sans) para títulos e texto, peso 500, tracking negativo nos títulos grandes; **Geist Mono** para rótulos em caixa-alta (`label`); **Aldrich** (`--font-tech`) só em elementos pontuais.
- **[Aplicado]** Escala fluida: `display-xl` até 6,75 rem (hero), `display`, `h2`, `h3`, `manifesto`, `body-lg`.
- **[Aplicado]** Regras: nunca misturar fontes diferentes dentro de um título; sem rótulo de seção ("§01") no hero; a palavra-chave do título recebe laranja (`*trecho*`).
- Texto corrido em `paper` sobre cinza; secundário em `muted`.

---

## 7. Layout e superfícies

- **[Aplicado]** Grade *blueprint* de 5 rem em linhas `--color-line`, com máscara radial (`BlueprintGrid`): lembra papel técnico/engenharia.
- **[Aplicado]** Cantos generosos: `--radius-panel 2.5rem` em painéis. Capas de projeto ficam **quadradas** (sem raio), por decisão do cliente.
- **[Aplicado]** Seções alternam escuro e claro (`paper`) para criar ritmo; divisórias de 1 px.
- **[Direção]** Nas seções escuras, trocar o preto por cinza-grafite (item 3.1) e inserir um disco de luz por seção, em posição diferente a cada vez.

---

## 8. Movimento

Todo movimento é **suave, longo e com saída desacelerada** (`--ease-out-expo`).

| Efeito | Status |
|---|---|
| Abertura: logo laranja sobre cinza `#1a1a1a`, "Bem-vindo!/Welcome!" por idioma, só na 1ª visita | Aplicado |
| Título do hero digitado letra a letra | Aplicado |
| Revelação suave ao rolar (`data-reveal`, 0,9 s) | Aplicado |
| Acordeão do FAQ por `grid-template-rows` | Aplicado |
| Cartões empilhados com véu de opacidade (sem `brightness`) | Aplicado |
| Rolagem suave (Lenis) | Aplicado |
| Cursor triângulo laranja, escala 1,5 sobre elementos interativos | Aplicado |
| Auras em órbita lenta | Aplicado |
| Respiração de brilho nos círculos LED | Direção |
| Reflexo que acompanha o movimento do cursor (paralaxe leve) | Direção |

`prefers-reduced-motion` desliga digitação, revelações e órbitas.

---

## 9. Tom de voz

Português claro, frases curtas, sem termos técnicos desnecessários. Foco em resultado para o negócio ("vender mais, gerir com precisão e ganhar produtividade"). Mesma voz em português e inglês.

---

## 10. Faça / Não faça

**Faça**
- Fundo cinza-grafite com brilhos suaves e localizados.
- Um foco de luz laranja por tela; violeta só como atmosfera.
- Círculos para luz, triângulos para marca; reflexos discretos.
- Animar `transform`/`opacity`.

**Não faça**
- Preto puro chapado em grandes áreas, nem cinza azulado.
- Brilho forte atrás do logo ou de texto pequeno.
- Violeta em botões, ou laranja em grandes blocos chapados.
- Raios de canto diferentes dos já definidos; zoom nas capas de projeto.
- `filter: blur()` em elementos grandes animados.

---

## 11. Próximos passos para aplicar a direção

1. Adicionar tokens `gray-900/800/700` e migrar o fundo base de `ink-950` para `gray-900`.
2. Criar o componente `LedOrb` (disco/anel com brilho e variação de tamanho/cor).
3. Criar `Reflection` (cópia espelhada com máscara) e aplicar ao símbolo do hero.
4. Distribuir um `LedOrb` por seção, com posições alternadas.
5. Atualizar `docs/BLUEPRINT.md` com este documento e validar contraste do texto `muted` sobre o novo cinza.
