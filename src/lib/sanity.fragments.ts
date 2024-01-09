import { groq } from 'next-sanity'

export const linkFragment = groq`
    type,
    link,
    label,
    page->{
      'type': _type,
      'slug': slug.current,
      title
    },
    file {
      'type': _type,
      asset->{
        url
      }
    },
    targetBlank
`
