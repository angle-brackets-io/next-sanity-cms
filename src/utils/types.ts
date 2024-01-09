import { Image as Img } from 'sanity'

interface BasicLink {
  _key?: string
  label?: string
}

export interface PageLink extends BasicLink {
  type: 'page'
  page: PageReference
}

export interface ExternalLLink extends BasicLink {
  type: 'link'
  link: string
  targetBlank?: boolean
}

export interface FileLink extends BasicLink {
  type: 'file'
  file: { type: string; asset: { url: string } }
}

export type Link = PageLink | ExternalLLink | FileLink

export interface PageReference {
  type: string
  slug: string
  title: string
}

export interface Image extends Img {
  caption?: string
}
