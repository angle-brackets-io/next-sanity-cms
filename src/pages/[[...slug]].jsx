import { groq } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import { ParsedUrlQuery } from 'querystring'
import TemplateRenderer from '~/components/template-renderer/index'

import Layout from '~/components/layout'
import ModuleRenderer from '~/components/module-renderer'
import { fragment as modulesFragment } from '~/components/module-renderer'
import { getMeta } from '~/lib/meta'
import { IModule } from '~/lib/modules'
import { getNavigation } from '~/lib/navigation'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'

export const getPageQuery = (slug) => groq`
[
  *[_type == "post" && slug.current == '${slug}'],
  *[_type == "page" && slug.current == '${slug}'] {
    _type,
    "title": title,
    "slug": slug.current,
  }
]
`


function Page(props) {
  return (
    <Layout>
    <TemplateRenderer  {...props}/>

    </Layout>
  )
}

export async function getStaticPaths() {
  const client = getClient()
  const [slugs1, slugs] = await client.fetch(
    groq`[
      *[_type == "post" ] {
        "title": title,
        "slug": slug.current
      },
      *[_type == "page"] {    
        "title": title,
        "slug": slug.current
      }
    ]`,
  )

  const allSlugs = [...slugs1, ...slugs]

  return {
    paths:
      allSlugs?.map(({ slug }) =>
        slug !== '/' ? `/${slug}` : `${slug}`,
      ) || [],
    fallback: false,
  }
}

export const getStaticProps = async ({ draftMode = false, params }) => {
  let slug = '/'
  if (Object.keys(params || {}).length) {
    const { slug: currentSlug } = params
    slug = currentSlug?.join('/')
  }

  const client = getClient(draftMode ? readToken : undefined)
  if (!slug) throw new Error('No slug provided')
  const pageQuery = getPageQuery(slug)

  const [blog, page] = await client.fetch(pageQuery)
  const pageData = [...blog, ...page]
  
  
  // const meta = await getMeta(pagesData[0]?._type, slug)
  
  const navigation = await getNavigation()

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      page: pageData[0],
      slug,
      // meta,
      navigation,
    },
  }
}

export default Page
