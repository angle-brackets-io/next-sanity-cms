---
to: src/modules/<%= h.projectCase(name)%>/index.jsx
---
import { groq } from 'next-sanity'
import classnames from 'classnames'

export const fragment = groq`
`

export default function <%= h.changeCase.pascal(name) %>({otherClasses}) {

  const <%= h.changeCase.camel(name) %>Classes = classnames(otherClasses);
  
  return (
    <section className={<%= h.changeCase.camel(name) %>Classes} data-testid='<%= h.changeCase.param(name) %>'>
        <%= h.projectCase(name)%> Modules!
    </section>
  )
}

