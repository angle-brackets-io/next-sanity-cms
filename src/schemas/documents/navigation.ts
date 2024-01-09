import { Rule } from 'sanity'

export const navigation = {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  groups: [
    { name: 'top', title: 'Top', default: true },
    { name: 'footer', title: 'Footer' },
    { name: 'social', title: 'Social' },
  ],
  fields: [
    {
      name: 'navbarLinks',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'link',
        },
      ],
      group: 'top',
    },
    {
      name: 'button',
      title: 'Button (right-aligned)',
      group: 'top',
      type: 'optionalLink',
      validation: (Rule: any) => Rule.max(1),
    },
    {
      name: 'footerLinks',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'link',
        },
      ],
      group: 'footer',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      group: 'footer',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'footer',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'privacyLink',
      title: 'Privacy Link',
      group: 'footer',
      type: 'optionalLink',
      validation: (Rule: any) => Rule.max(1),
    },
    {
      name: 'termsLink',
      title: 'Terms Link',
      group: 'footer',
      type: 'optionalLink',
      validation: (Rule: any) => Rule.max(1),
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'link',
        },
      ],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation',
      }
    },
  },
}
