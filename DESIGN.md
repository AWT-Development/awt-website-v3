# Design System: AWT Web

## 1. Typography
- **Primary / Global Font:** Alexandria
- **Headline Font:** Aldrich
- **Body Font:** Alexandria
- **Label Font:** Alexandria

> *Note: All fonts are available via Google Fonts.*

---

## 2. Color Palettes Reference

Base tokens extraídos do key visual do projeto, formando os alicerces dos três temas.

### Tech Clean
| Token | Cor |
| :--- | :--- |
| **Dark 1** | `#1A1A1A` |
| **Dark 2** | `#2A2A2A` |
| **Gray** | `#6B6B6B` |
| **Light** | `#D9D9D9` |

### Purple System
| Token | Cor |
| :--- | :--- |
| **Primary** | `#4B1FA6` |
| **Deep / Dark** | `#2E1065` |
| **Dark / Base** | `#1A1A1A` |
| **Light / Muted** | `#A1A1AA` |

### Orange Accent
| Token | Cor |
| :--- | :--- |
| **Primary** | `#FF7A00` |
| **Light** | `#FFB366` |
| **Dark 1** | `#141414` |
| **Dark 2** | `#333333` |

---

## 3. Themes

Teremos 3 temas principais no site, aplicando as cores acima em diferentes cenários. 

### Theme 1: Light Mode (Tech Clean Focus)
Focado em alta legibilidade e um visual limpo e minimalista, utilizando os tons mais claros do Tech Clean e contrastando com grafites escuros.

- **Background Principal:** `#D9D9D9` (ou Branco `#FFFFFF` em alguns containers centrais para criar profundidade)
- **Surface/Cards:** `#FFFFFF` ou um nível de cinza bem sutil.
- **Texto Principal (Headlines/Body):** `#1A1A1A`
- **Texto Secundário / Labels:** `#6B6B6B`
- **Borders / Elementos Secundários:** `#6B6B6B` (com opacidade controlada)

---

### Theme 2: Dark Mode - Orange Accent + Tech Clean
Um tema vibrante, moderno e agressivo, ideal para seções de impacto ou apelo comercial forte. Une a base sólida escura com toques enérgicos de laranja.

- **Background Principal:** `#141414` (Orange Base Dark) ou `#1A1A1A` (Tech Clean)
- **Surface/Cards (Containers elevado):** `#333333` (Orange Dark 2) ou `#2A2A2A` (Tech Clean Dark 2)
- **Primary Action (Botões, Links de Destaque, CTAs):** `#FF7A00`
- **Secondary Action / Hover States:** `#FFB366`
- **Texto Principal:** `#D9D9D9`
- **Texto Secundário:** `#6B6B6B`

---

### Theme 3: Dark Mode - Purple System + Tech Clean
Uma pegada mais voltada a "tecnologia profunda", software e elegância. O contraste do roxo vibrante em cima de bases profundamente escuras dá um aspecto sofisticado de "Cyber/SaaS".

- **Background Principal:** `#1A1A1A`
- **Surface/Cards:** `#2A2A2A` (com possíveis gradientes ultra-suaves de `#2E1065` para criar aura)
- **Primary Action (Botões, Links de Destaque):** `#4B1FA6`
- **Secondary Action / Callouts:** `#2E1065` ou `#A1A1AA` (como suporte)
- **Texto Principal:** `#D9D9D9` (tech clean light) ou `#A1A1AA` 
- **Texto Secundário:** `#6B6B6B`

---

## 4. Design System Strategy & Do's / Don'ts

### The "Architectural Pulse" / Tech Vibe
- **Profundidade Tonal ("No-Line" Rule):** Ao invés de usar bordas sólidas rígidas nas interfaces Dark, prefira separar containers e seções com cores de fundo sutilmente diferentes (Ex: `#1A1A1A` vs `#2A2A2A`). O sombreamento suave e as elevações ditam a hierarquia visual.
- **Tipografia em Foco:** Textos devem ser super legíveis. Utilize *Aldrich* para criar contraste tecnológico e digital em Cabeçalhos (`H1`, `H2`), enquanto *Alexandria* preenche tabelas, campos e grandes blocos textuais (`Body`, `Label`).
- **Gradients Controlados:** Botões de CTA ou grandes números estatísticos podem ter gradientes do `Primary` para a variação `Light` (ex: `#FF7A00` -> `#FFB366`).
- **Estados Vazadas (Ghost Borders):** Para elementos não-primários, prefira fundos transparentes mas com bordas suaves (ex: 20% de opacidade na cor de contorno) para manter a tela limpa e direcionar a atenção ao botão Primary.
