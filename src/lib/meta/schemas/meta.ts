import { Rule } from 'sanity'

export const metaObject = {
  title: 'Meta',
  name: 'meta',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    {
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'Title used for search engines and browsers',
      validation: (Rule: Rule) =>
        Rule.max(50).warning(
          'Longer titles may be truncated by search engines',
        ),
    },
    {
      title: 'Meta Description',
      name: 'metaDesc',
      type: 'text',
      rows: 3,
      description: 'Description for search engines',
      validation: (Rule: Rule) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines',
        ),
    },
  ],
}

export const metaGroup = {
  name: 'meta',
  title: 'Meta',
}

export const metaField = {
  title: 'Meta',
  name: 'meta',
  type: 'meta',
  group: 'meta',
}
