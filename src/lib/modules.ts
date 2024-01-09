import { default as heroSection } from '~/modules/hero-section'

export const moduleComponents = {
  // example
  heroSection,
}

export interface IModule {
  _type: string
  _key: string
  [key: string]: any
}
