# AWT Development — Website

Site da AWT Development, em reconstrução na branch `refactor/v4`.
O plano completo (diagnóstico, referências, direção criativa, seções, motion e fases) está em [docs/BLUEPRINT.md](docs/BLUEPRINT.md).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + Lenis · Motion

## Rodando

```bash
pnpm install
pnpm dev
```

Português em `http://localhost:3000/`, inglês em `http://localhost:3000/en`. O idioma é detectado pelo navegador na primeira visita; trocar o idioma manualmente grava a escolha.

## Onde fica cada coisa

| Pasta | Conteúdo |
| :--- | :--- |
| `src/app/[lang]` | Layout e páginas, por idioma |
| `src/proxy.ts` | Roteamento de idioma (pt na raiz, `/en` com prefixo) |
| `src/i18n` | Configuração de idiomas e dicionários de interface |
| `src/content` | Dados do site: contatos, serviços, projetos, estatísticas |
| `src/components` | `layout`, `sections`, `motion`, `ui`, `brand` |
| `src/assets/brand` | Logos (o símbolo em SVG oficial entra aqui) |
| `src/assets/projects/<slug>` | Capas e mídias de cada projeto |

## Variáveis de ambiente

| Variável | Uso |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (padrão: `https://www.awtdevelopment.com`), usada em canonical, sitemap e Open Graph |
| `RESEND_API_KEY` | Chave da Resend para enviar o briefing por e-mail. Sem ela, o briefing segue só pelo WhatsApp |
| `BRIEFING_TO` | Destinatário do briefing (padrão: e-mail em `src/content/site.ts`) |
| `BRIEFING_FROM` | Remetente verificado na Resend, ex.: `AWT Site <contato@seudominio.com.br>` |

Há um modelo em `.env.example`; copie para `.env.local`.
