import { groq } from 'next-sanity'

import { getClient } from './sanity.client'

export const getStaticPathsForDocumentType = async (type: string) => {
  const client = getClient()
  const slugs: {
    slug: string
  }[] = await client.fetch(groq`*[_type == '${type}']{'slug': slug.current}`)
  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
