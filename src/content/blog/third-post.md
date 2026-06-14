---
title: 'Meu fluxo de desenvolvimento web em 2026'
description: 'Ferramentas, práticas e rotinas que uso no dia a dia para construir e publicar software.'
pubDate: 'Feb 28 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
---

O ecossistema web muda rápido, mas alguns hábitos se mantêm estáveis. Este é o fluxo que uso hoje para ir da ideia ao deploy.

## Editor e ambiente

Uso o **Cursor** como editor principal, com terminal integrado e extensões para Astro, TypeScript e formatação automática. No Linux (CachyOS), o ambiente é leve e o Node.js 22+ roda nativamente.

## Stack favorita para sites

Para blogs, landing pages e documentação, minha combinação atual é:

| Camada | Escolha |
| --- | --- |
| Framework | Astro |
| Linguagem | TypeScript |
| Estilo | CSS vanilla (sem framework extra) |
| Conteúdo | Markdown / MDX |
| Package manager | pnpm |

## Ciclo de trabalho

1. **Escrever** o conteúdo em Markdown com frontmatter validado
2. **Preview** local com `pnpm dev`
3. **Build** de produção com `pnpm build`
4. **Deploy** dos arquivos estáticos gerados em `dist/`

## O que priorizo

- **Simplicidade**: menos dependências, menos manutenção
- **Performance**: Lighthouse alto sem esforço heroico
- **Versionamento**: Git com commits pequenos e descritivos
- **Documentação**: README claro para eu mesmo daqui a seis meses

Esse fluxo não é a única forma certa, mas funciona bem para projetos pessoais e side projects onde velocidade e clareza importam mais que complexidade.
