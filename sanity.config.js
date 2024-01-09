/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { defineUrlResolver, Iframe } from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from '~/lib/sanity.api'
import { PageTypes } from '~/lib/sanity.links'
import { documentTypesForWorkFlow, schemaTypes } from '~/schemas'
import { structureResolver } from '~/schemas/desk'
import { presentationTool } from 'sanity/presentation'
import { locate } from '~/lib/presentation/locate'
import { workflow } from 'sanity-plugin-workflow'
// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
// Define the singleton document types
const singletonTypes = new Set(['navigation'])

const requiresSlug = [PageTypes['Page'], PageTypes['Post']]
const iframeOptions = {
  url: defineUrlResolver({
    base: '/api/draft',
    requiresSlug,
  }),
  urlSecretId: previewSecretId,
  reload: { button: true },
}

export const previewView = (S) =>
  S.view.component(Iframe).options(iframeOptions).title('Preview')

export default defineConfig({
  basePath: '/studio',
  name: 'demo',
  title: 'Demo',
  projectId,
  dataset,
  //edit schemas in './src/schemas'
  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  plugins: [
    deskTool({
      structure: structureResolver,
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        return S.document().views([
          // Default form view
          S.view.form(),
          // Preview
          previewView(S),
        ])
      },
    }),
    // Add the "Open preview" action
    previewUrl({
      base: '/api/draft',
      requiresSlug,
      urlSecretId: previewSecretId,
    }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: '/api/presentation-draft',
        },
      },
    }),
    workflow({
      schemaTypes: documentTypesForWorkFlow,
    }),
  ],
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
