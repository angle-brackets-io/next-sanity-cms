import { groq } from 'next-sanity'

import { getClient } from '~/lib/sanity.client'

import { IMeta } from './components'

export const defaultMetaQuery = groq`
    *[_id == "defaultMeta"][0]
    `

export const getMetaQuery = (type: string, slug?: string) => groq`
  *[_type == "${type}" ${slug ? `&& slug.current == '${slug}'` : ''}][0] {
      meta
  }
`

export const getDefaultMeta = async () => {
  const client = getClient()
  return await client.fetch(defaultMetaQuery)
}

export const mergeDefaultMeta = (defaultMeta: IMeta, _meta: IMeta) => {
  const meta = Object.assign({}, defaultMeta, _meta)
  if (!meta.metaTitle) meta.metaTitle = meta.siteTitle
  if (!meta.shareTitle) meta.shareTitle = meta.metaTitle
  if (!meta.shareDesc) meta.shareDesc = meta.metaDesc
  if (meta.icon) {
    if (!meta.icon.light) meta.icon.light = meta.icon.dark

    if (!meta.icon.dark) meta.icon.dark = meta.icon.light
  }

  return meta
}

export const getMeta = async (type: string, slug?: string): Promise<IMeta> => {
  const client = getClient()
  const defaultMeta = await getDefaultMeta()

  const _meta = type
    ? (await client.fetch(getMetaQuery(type, slug))).meta
    : undefined

  const meta = mergeDefaultMeta(defaultMeta, _meta)

  return meta
}
