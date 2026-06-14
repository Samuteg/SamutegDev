import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        description: fields.text({ label: 'Descrição', multiline: true }),
        pubDate: fields.date({
          label: 'Data de Publicação',
          defaultValue: { kind: 'today' },
        }),
        updatedDate: fields.date({
          label: 'Data de Atualização (opcional)',
        }),
        heroImage: fields.image({
          label: 'Imagem de Capa (opcional)',
          directory: 'src/assets',
          publicPath: '../../assets/',
        }),
        content: fields.mdx({
          label: 'Conteúdo',
          options: {
            divider: true,
            links: true,
            code: true,
            image: {
              directory: 'src/assets',
              publicPath: '../../assets/',
            },
          },
        }),
      },
    }),
  },
});
