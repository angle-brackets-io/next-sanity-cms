export const author = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'img',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
