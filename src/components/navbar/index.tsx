import { groq } from 'next-sanity'

import { linkFragment } from '~/lib/sanity.fragments'

export const fragment = groq`
  navbarLinks[] {
    _key,
    ${linkFragment}
  },
  socialLinks[] {
    _key,
    ${linkFragment}
  },
  "button": coalesce(button[0] {
    ${linkFragment}
  }, [])
`

export default function Navbar() {
  return (
    <div className="z-navbar bg-white fixed inset-0 bottom-auto py-[var(--mobile-padding-y)] transition-all duration-300 md:py-[var(--padding-y)]">
      navbar
    </div>
  )
}
