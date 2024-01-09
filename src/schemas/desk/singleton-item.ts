import { Icon } from '@phosphor-icons/react'
import { previewView } from 'sanity.config'
import { StructureBuilder } from 'sanity/desk'

import { metaPreviewView } from '~/lib/meta'
import { resolveHref } from '~/lib/sanity.links'

export const singletonItem = (
  S: StructureBuilder,
  type: string,
  title: string,
  icon: Icon,
) => {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document()
        .schemaType(type)
        .documentId(type)
        .views([
          // Default form view
          S.view.form(),
          // Preview
          previewView(S),
          metaPreviewView(S, {
            resolveHref,
          }),
        ]),
    )
}
