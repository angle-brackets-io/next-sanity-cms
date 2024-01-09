import { CodeSimple } from '@phosphor-icons/react'
import { StructureBuilder } from 'sanity/desk'

import MetaPreview, { ResolveHref } from './meta-preview'

export interface MetaPreviewViewOptions {
  resolveHref?: ResolveHref
}

export const metaPreviewView = (
  S: StructureBuilder,
  options: MetaPreviewViewOptions = {},
) => {
  return S.view
    .component(MetaPreview)
    .options(options)
    .icon(CodeSimple)
    .title('Preview meta data')
}
