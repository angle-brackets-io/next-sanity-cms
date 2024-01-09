import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import { SanityDocument } from 'next-sanity'

interface CustomSanityDocument extends SanityDocument {
  // Add any custom properties you need
  title?: string
  mainImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  body?: any // You might need to specify a more precise type for 'body'
}

let projectDataset: string = process.env.NEXT_PUBLIC_SANITY_DATASET || ''
let sanityProjectId: string = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

const builder = imageUrlBuilder({
  projectId: sanityProjectId,
  dataset: projectDataset,
})

export default function Post({ post }: { post: CustomSanityDocument }) {
  const { title = '', mainImage, body } = post || {}

  return (
    <main className="container prose prose-lg mx-auto p-4">
      {title ? <h1>{title}</h1> : null}
      {mainImage ? (
        <Image
          className="float-left m-0 mr-4 w-1/3 rounded-lg"
          src={builder
            .image(mainImage.asset._ref)
            .width(300)
            .height(300)
            .quality(80)
            .url()}
          width={300}
          height={300}
          alt={mainImage.alt || ''}
        />
      ) : null}
      {body ? <PortableText value={body} /> : null}
    </main>
  )
}
