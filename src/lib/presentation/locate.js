import { map } from 'rxjs'

export const locate = (params, context) => {
  if (params.type === 'post') {
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id][0]{slug,title}`,
      params,
      { perspective: 'previewDrafts' }, // returns a draft article if it exists
    )

    return doc$.pipe(
      map((doc) => {
        // If the document doesn't exist or have a slug, return null
        if (!doc || !doc.slug?.current) {
          return null
        }
        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/${doc.slug.current}`,
            },
          ],
        }
      }),
    )
  }
  return null
}
