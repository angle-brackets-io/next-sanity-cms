import classnames from 'classnames'
import { groq } from 'next-sanity'
import Button from '~/components/button/Button'
import { fragment as buttonFragment } from '~/components/button/Button'


export const fragment = groq`
  _type == 'heroSection' =>{
    ...,
button{
  ...,
  ${buttonFragment}
  }}
`

export default function HeroSection({ data }) {
  const heroClasses = classnames('')
  console.log(data);
  const { title,button } = data

  return (
    <section className={heroClasses} data-testid="hero">
      {title}
      <Button {...button}/>
    </section>
  )
}
