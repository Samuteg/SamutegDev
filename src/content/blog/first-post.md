---
title: 'Por que escolhi Astro para este blog'
description: 'Como o Astro combina performance, simplicidade e content collections para um blog estático moderno.'
pubDate: 'Mar 10 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
---

Quando decidi montar um blog pessoal, tinha alguns requisitos claros: carregamento rápido, boa experiência de escrita em Markdown e deploy simples. Depois de comparar algumas opções, o [Astro](https://astro.build/) se destacou.

## Performance por padrão

Astro gera páginas estáticas e envia zero JavaScript desnecessário ao navegador. Isso significa tempos de carregamento excelentes sem precisar otimizar manualmente cada detalhe. Para um blog de conteúdo, isso faz toda a diferença.

## Content Collections

O sistema de **content collections** do Astro traz type-safety ao frontmatter dos posts. Você define um schema com Zod e o editor passa a validar título, data, descrição e imagem de capa automaticamente. Menos erros, mais confiança ao publicar.

## Ecossistema pronto

Este projeto já vem com integrações úteis configuradas:

- **MDX** para posts com componentes interativos
- **RSS** em `/rss.xml` para leitores de feed
- **Sitemap** gerado automaticamente para SEO

## Deploy flexível

Como o build produz arquivos estáticos na pasta `dist/`, você pode hospedar em qualquer lugar: GitHub Pages, Cloudflare Pages, Netlify, Vercel ou um servidor próprio. Basta apontar o domínio e pronto.

## Conclusão

Para um blog focado em conteúdo, Astro entrega o equilíbrio certo entre produtividade do autor e performance para o leitor. É a base sólida que eu queria para o SamutegDev.
