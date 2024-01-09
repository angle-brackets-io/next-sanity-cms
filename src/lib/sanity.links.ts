import { useRouter } from 'next/router'

import { Link } from '~/utils/types'

export enum PageTypes {
  Page = 'page',
  Post = 'post',
}

export function resolveHref(documentType: string, slug?: string) {
  switch (documentType) {
    case PageTypes.Page:
      return slug ? (slug === '/' ? slug : `/${slug}`) : '/'
    case PageTypes.Post:
      return slug ? `/${slug}` : '/blogs/'
    default:
      return '/'
  }
}

export function resolveLink(link: Link) {
  if (link.type === 'link') {
    return link.link
  } else if (link.type === 'page') {
    return resolveHref(link.page?.type, link.page?.slug)
  } else if (link.type === 'file') {
    return link.file?.asset.url
  }
  return ''
}

export const resolveLabel = (link: Link) => {
  if (link.label) return link.label
  if (link.type === 'link') {
    return link.link
  } else if (link.type === 'page') {
    return link.page.title
  } else if (link.type === 'file') {
    return link.file?.asset.url
  }
  return ''
}

export const resolvePageLink = ({
  type,
  slug = '',
  label = '',
}: {
  type: string
  slug?: string
  label?: string
}): Link => {
  return {
    type: PageTypes.Page,
    page: {
      type,
      slug,
      title: label,
    },
  }
}

export const isModalLink = (link: Link) => {
  const regex = /^(\/staff\/|\/projects\/).+$/
  return regex.test(resolveLink(link))
}

export const isModalPath = (
  href: string,
): {
  type: 'staff' | 'project' | null
  slug: string | null
} => {
  const isStaffRegex = /^\/staff\/.+$/
  const isProjectRegex = /^\/projects\/.+$/
  const isStaffPage = isStaffRegex.test(href)
  const isProjectPage = isProjectRegex.test(href)
  return {
    type: isStaffPage ? 'staff' : isProjectPage ? 'project' : null,
    slug: isStaffPage
      ? href.replace('/staff/', '')
      : isProjectPage
      ? href.replace('/projects/', '')
      : null,
  }
}

export const useActiveLink = (link: Link, exact: Boolean = false) => {
  const router = useRouter()
  const path = router.asPath
  return exact ? path === resolveLink(link) : path.startsWith(resolveLink(link))
}
