import { groq } from 'next-sanity'

import Layout from '~/components/layout'
import TemplateRenderer from '~/components/template-renderer/index'
import { getNavigation } from '~/lib/navigation'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'

import SEO from '../components/seo'

export const getPageQuery = (slug) => groq`
[
  *[_type == "post" && slug.current == '${slug}'],
  *[_type == "page" && slug.current == '${slug}']
]
`

function Page(props) {
  return (
    <Layout>
      <TemplateRenderer {...props} />
      <SEO
        title={props?.page?.seoTitle}
        description={props?.page?.metaDescription}
      />
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
      allSlugs?.map(({ slug }) => (slug !== '/' ? `/${slug}` : `${slug}`)) ||
      [],
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

  const navigation = await getNavigation()

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      page: pageData[0],
      slug,
      navigation,
    },
  }
}

export default Page
