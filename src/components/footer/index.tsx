import { groq } from 'next-sanity'

import { linkFragment } from '~/lib/sanity.fragments'

export const fragment = groq`
  address,
  email,
  footerLinks[] {
    _key,
    ${linkFragment}
  },
  socialLinks[] {
    _key,
    ${linkFragment}
  },
  "privacyLink": coalesce(privacyLink[0]{
    ${linkFragment}
  },[]),
  "termsLink": coalesce(termsLink[0]{
    ${linkFragment}
  },[])
`

export default function Footer({}) {
  return (
    <footer className="bg-primary text-primary-light lg:px-15 m-2 rounded p-10 tracking-[-.01em] md:m-5">
      footer
    </footer>
  )
}
