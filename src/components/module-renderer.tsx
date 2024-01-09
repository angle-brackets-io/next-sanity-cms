import { groq } from 'next-sanity'

import { IModule, moduleComponents } from '~/lib/modules'
import { fragment as heroSectionFragment } from '~/modules/hero-section/index'

export interface IModuleRenderer {
  modules?: IModule[]
}

export const fragment = groq`
  modules[] {
    ...,
    ${heroSectionFragment},    
  }
`

// Declare the below format fragment in above fragment
// ${projectsHighlightFragment},

export default function ModuleRenderer({ modules = [] }: IModuleRenderer) {
  return modules?.map((module) => {
    // @ts-ignore
    const Component = moduleComponents[module._type]

    if (!Component) {
      // eslint-disable-next-line no-console
      console.error(`No component found for module type "${module._type}"`)
      return null
    }

    return (
      <div key={module._key}>
        <Component data={module} />
      </div>
    )
  })
}
