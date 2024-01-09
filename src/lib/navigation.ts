import { groq } from 'next-sanity'

import { fragment as footerFragment } from '~/components/footer'
import { fragment as navbarFragment } from '~/components/navbar'

import { getClient } from './sanity.client'

export const navigationQuery = groq`
  *[_type == 'navigation'][0] {
    ${navbarFragment},
    ${footerFragment}
  }

`

export const getNavigation = async () => {
  const client = getClient()
  return await client.fetch(navigationQuery)
}
