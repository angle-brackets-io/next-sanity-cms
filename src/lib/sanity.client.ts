// ./sanity/lib/client.ts

import { createClient } from '@sanity/client/stega'
import type { SanityClient } from 'next-sanity'

export function getClient(previewToken?: string): SanityClient {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: !previewToken,
    perspective: previewToken ? 'previewDrafts' : 'published',
    stega: {
      enabled: previewToken ? true : false,
      studioUrl: '/studio',
    },
    token: previewToken,
  })
}
