import { CodeSimple, Icon } from '@phosphor-icons/react'
import { StructureBuilder } from 'sanity/desk'

import { metaObject } from '~/lib/meta/schemas/meta'

import { metaPreviewView } from '../meta-preview'

export const defaultMetaType = 'defaultMeta'

export const getDefaultMetaObject = ({
  gtm = false,
  icons = false,
}: {
  gtm?: boolean
  icons?: boolean
}) => {
  const siteTitleField = {
    title: 'Site Title',
    name: 'siteTitle',
    type: 'string',
    description: 'The name of your site, usually your company/brand name',
  }
  // const gtmField = {
  //   title: 'Google Tag Manager',
  //   name: 'gtmID',
  //   type: 'string',
  //   description: 'Your Google Tag Manager ID',
  // }

  const iconsFields = [
    {
      title: 'Favicon',
      name: 'icon',
      type: 'object',
      description: 'The icon that appears in your browser tab',
      fields: [
        {
          title: 'Light',
          name: 'light',
          type: 'image',
          description: 'The icon that appears in light mode',
        },
        {
          title: 'Dark',
          name: 'dark',
          type: 'image',
          description: 'The icon that appears in dark mode',
        },
      ],
    },
  ]

  const defaultMetaObject = {
    title: 'Meta',
    name: defaultMetaType,
    type: 'object',
    fields: [
      siteTitleField,
      // ...(gtm ? [gtmField] : []),
      ...metaObject.fields,
      ...(icons ? iconsFields : []),
    ],
  }

  return defaultMetaObject
}

export const defaultMetaItem = (
  S: StructureBuilder,
  title: string = 'Default meta data',
  icon: Icon = CodeSimple,
) => {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document()
        .schemaType(defaultMetaType)
        .documentId(defaultMetaType)
        .views([
          // Default form view
          S.view.form(),
          metaPreviewView(S),
        ]),
    )
}
