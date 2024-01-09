import { Rule } from 'sanity'

import { ModulePreview } from '../components/modulePreview'

export const heroSection = {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'button',
      title: 'Button',
      type: 'link',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  components: {
    preview: ModulePreview,
  },
  storybook: {
    id: 'modules-herosection--default',
  },
}
