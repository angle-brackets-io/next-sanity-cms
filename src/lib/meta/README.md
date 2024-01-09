- Automatically create a singleton document of type `defaultMeta`
- Add meta fields to sanity schemas by using `metaField` and `metaGroup`
- Fetch metadata from sanity with `getMeta` function on pages
- Render metadata with `MetaComponent` in `_app.ts`
- Add meta preview view by using `MetaPreviewView`

# USAGE

## Add plugin to `sanity.config.ts`

```ts
plugins: [
    metaPlugin({
        gtm: true
        icons: true
    }),
  ],
```

## Meta fields

## Add `metaField`, `metaGroup` to sanity schema

```ts
import { Rule } from 'sanity'

import { metaField, metaGroup } from '~/lib/meta/'

export const frontpage = {
  name: 'frontpage',
  title: 'Frontpage',
  type: 'document',
  groups: [metaGroup],
  fields: [metaField],
}
```

## Add `defaultMetaItem` to desk structure

```ts
import { Gear } from '@phosphor-icons/react'
import { StructureResolver } from 'sanity/desk'

import { defaultMetaItem } from '~/lib/meta/default-meta'

export const structureResolver: StructureResolver = (S) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(Gear)
        .child(
          S.list()
            .title('Settings')
            .items([defaultMetaItem(S)]),
        ),
    ])
}
```

## Fetch metadata from sanity in pages

```ts
export const getStaticProps = async () => {
  const meta = await getMeta('frontpage')

  return {
    props: {
      meta,
    },
  }
}
```

### with slug

```ts
export const getStaticProps = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : undefined
  const meta = await getMeta('page', slug)

  return {
    props: {
      meta,
    },
  }
}
```

## Add `MetaComponent` component to `_app.ts`

```ts
import MetaComponent, { IMeta } from '~/lib/meta/Head'

export default function App({ pageProps }) {
  const { meta } = pageProps
  return (
    <>
      {meta && <MetaComponent meta={meta} />}
      ...
    </>
  )
}
```

## Meta Preview

### Add `metaPreviewView` to `sanity.config.ts`

```ts
defaultDocumentNode: (S, { schemaType }) => {
  return S.document().views([
    // Default form view
    S.view.form(),
    metaPreviewView(S, {
      resolveHref,
    }),
  ])
},
```

### Add `metaPreviewView` to singleton item

```ts
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
          metaPreviewView(S, {
            resolveHref,
          }),
        ]),
    )
}
```
