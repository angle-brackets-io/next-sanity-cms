// ./src/pages/api/draft.ts

import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

export default async function handle(req, res) {
  if (!req.url) {
    throw new Error('Missing url')
  }

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client,
    req.url,
  )
  if (!isValid) {
    return res.status(401).send('Invalid secret')
  }
  // Enable Draft Mode by setting the cookies
  res.setDraftMode({ enable: true })
  res.writeHead(307, { Location: redirectTo })
  res.end()
}
