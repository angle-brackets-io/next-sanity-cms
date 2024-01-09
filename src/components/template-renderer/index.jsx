import dynamic from 'next/dynamic'

import ModuleRenderer from '~/components/module-renderer'
const PostPreview = dynamic(() => import('~/components/Post/PostPreview'))
import { groq } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'

import { fragment as modulesFragment } from '~/components/module-renderer'
import Post from '~/components/Post'

export default function TemplateRenderer(props) {
  const pageQuery = (slug) => groq`
  *[_type == "page" && slug.current == '${slug}'] {
    _type,
    "title": title,
    "slug": slug.current,
    ${modulesFragment}
  }
`
  const postQuery = (slug) => groq`
  *[_type == "post" && slug.current == '${slug}'][0]
`
  switch (props.page?._type) {
    case 'page':
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const [page] = useLiveQuery(props.page, pageQuery(props.slug))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const { modules } = page[0] || {}
      return <>{modules?.length > 0 && <ModuleRenderer modules={modules} />}</>
    case 'post':
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const [postPage] = useLiveQuery(props.page, postQuery(props.slug))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return (
        <>
          <Post post={postPage} />
        </>
      )

    default:
      return null
  }
}
