import { definePlugin } from 'sanity'

import { getDefaultMetaObject } from './schemas/defaultMeta'
import { metaObject } from './schemas/meta'

export * from './components'
export * from './meta-preview'
export * from './queries'
export * from './schemas'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
// Define the singleton document types
const singletonTypes = new Set(['defaultMeta'])

export interface MetaPluginOptions {
  gtm?: boolean
  icons?: boolean
  metaPreview: {
    twitterCard: {
      name: string
      handle: string
    }
  }
}

export let metaPluginOptions: MetaPluginOptions

export const metaPlugin = definePlugin((options: MetaPluginOptions) => {
  const { gtm = false, icons = false } = options
  metaPluginOptions = options
  return {
    name: 'meta-plugin',
    schema: {
      types: [metaObject, getDefaultMetaObject({ gtm, icons })],
      templates: (templates) =>
        templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
    },
    document: {
      // For singleton types, filter out actions that are not explicitly included
      // in the `singletonActions` list defined above
      actions: (input, context) =>
        singletonTypes.has(context.schemaType)
          ? input.filter(({ action }) => action && singletonActions.has(action))
          : input,
    },
  }
})
