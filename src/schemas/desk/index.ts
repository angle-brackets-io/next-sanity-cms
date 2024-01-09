import { File, Gear, NavigationArrow } from '@phosphor-icons/react'
import { StructureResolver } from 'sanity/desk'

import { defaultMetaItem } from '~/lib/meta/schemas/defaultMeta'

import { singletonItem } from './singleton-item'

export const structureResolver: StructureResolver = (S) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .icon(File)
        .child(
          S.list()
            .title('Pages')
            .items([S.documentTypeListItem('page').title('Pages').icon(File)]),
        ),
      S.divider(),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .icon(Gear)
        .child(
          S.list()
            .title('Settings')
            .items([
              defaultMetaItem(S),
              singletonItem(S, 'navigation', 'Navigation', NavigationArrow),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Blogs')
        .icon(File)
        .child(
          S.list()
            .title('Blogs')
            .items([
              S.documentTypeListItem('post').title('Posts').icon(File),
              S.documentTypeListItem('author').title('Author').icon(File),
              S.documentTypeListItem('category').title('Category').icon(File),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Assigned to me')
        .schemaType('workflow.metadata')
        .child(
          S.documentList()
            .title('Assigned to me')
            .filter('_type == "workflow.metadata" && identity() in assignees'),
        ),
      S.documentTypeListItem('workflow.metadata').title('Workflow Metadata'),
    ])
}
