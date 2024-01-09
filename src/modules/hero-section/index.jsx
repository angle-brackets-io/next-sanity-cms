import classnames from 'classnames'
import { groq } from 'next-sanity'

export const fragment = groq`
_type == 'heroSection' => {
  _key,
  _id,
  _type,
  title
}
`

export default function HeroSection({ data }) {
  const heroClasses = classnames('')
  const { title } = data

  return (
    <section className={heroClasses} data-testid="hero">
      {title}
    </section>
  )
}
