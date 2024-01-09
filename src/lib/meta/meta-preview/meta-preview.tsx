import { GoogleLogo } from '@phosphor-icons/react'
import { SanityDocument } from 'next-sanity'
import { useSchema } from 'sanity'
import useSWR from 'swr'

import { getDefaultMeta, mergeDefaultMeta } from '../queries'
import { defaultMetaType } from '../schemas/defaultMeta'
import GoogleSearchResult from './google-search'
import PreviewItem from './preview-item'

export type ResolveHref = (type: string, slug?: string) => string

export interface MetaPreviewOptions {
  resolveHref: ResolveHref
}

function MetaPreview({
  document,
  options,
}: {
  document: SanityDocument
  options: MetaPreviewOptions
}) {
  const doc = document.displayed || document.draft || document.published
  const isDefaultMeta = doc._type === defaultMetaType
  const schemas = useSchema()
  const currentSchema = schemas._original?.types.find(
    (schema) => schema.name === doc._type,
  )

  const hasMetaFields =
    isDefaultMeta ||
    // @ts-ignore
    currentSchema?.fields.some((field: any) => field.name === 'meta')

  const { resolveHref } = options

  const { data: defaultMeta = {} } = useSWR('default meta', () => {
    if (isDefaultMeta) return doc
    return getDefaultMeta()
  })
  const meta = isDefaultMeta
    ? defaultMeta
    : mergeDefaultMeta(defaultMeta, doc.meta)

  const href =
    isDefaultMeta || !resolveHref
      ? '/'
      : resolveHref(doc._type, doc.slug?.current)
  const url = `example.com${href}`

  const { metaTitle, metaDesc } = meta

  return hasMetaFields ? (
    <>
      <PreviewItem title="Google search result preview" Icon={GoogleLogo}>
        {metaTitle && metaDesc && (
          <GoogleSearchResult
            websiteUrlWithoutProtocol={url}
            metaTitle={metaTitle}
            metaDesc={metaDesc}
          />
        )}
      </PreviewItem>
    </>
  ) : (
    <p>Preview of meta data is not available for {doc._type}.</p>
  )
}

export default MetaPreview
