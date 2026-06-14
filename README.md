# SamutegDev

Blog pessoal construído com [Astro](https://astro.build/), focado em desenvolvimento de software e aprendizados do dia a dia.

## Funcionalidades

- Páginas estáticas com excelente performance
- Posts em Markdown e MDX com validação de frontmatter
- Feed RSS em `/rss.xml`
- Sitemap automático para SEO
- Meta tags Open Graph e URLs canônicas

## Estrutura

```text
├── public/          # Arquivos estáticos (favicon, etc.)
├── src/
│   ├── assets/      # Imagens e fontes
│   ├── components/  # Componentes Astro reutilizáveis
│   ├── content/     # Posts do blog (Markdown/MDX)
│   ├── layouts/     # Layouts de página
│   └── pages/       # Rotas do site
├── astro.config.mjs
└── package.json
```

## Comandos

| Comando        | Ação                                      |
| :------------- | :---------------------------------------- |
| `pnpm install` | Instala dependências                      |
| `pnpm dev`     | Servidor local em `localhost:4321`        |
| `pnpm build`   | Build de produção em `./dist/`            |
| `pnpm preview` | Preview do build local                    |

## Personalização

- **Título e descrição**: `src/consts.ts`
- **URL do site**: `astro.config.mjs` (campo `site`)
- **Novos posts**: adicione arquivos `.md` ou `.mdx` em `src/content/blog/`
- **Estilo global**: `src/styles/global.css`

## Créditos

Tema baseado no [Bear Blog](https://github.com/HermanMartinus/bearblog/) e no template oficial de blog do Astro.
