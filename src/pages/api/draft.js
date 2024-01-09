import { isValidSecret } from 'sanity-plugin-iframe-pane/is-valid-secret'

import { previewSecretId } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { resolveHref } from '~/lib/sanity.links'

const token = process.env.SANITY_API_READ_TOKEN
if (!token) {
  throw new Error(
    'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.',
  )
}

export default async function preview(req, res) {
  if (!token) {
    res.status(500).send('Misconfigured server')
    return
  }

  const { query } = req
console.log(query,"query");
  const secret = typeof query.secret === 'string' ? query.secret : undefined
  const slug = typeof query.slug === 'string' ? query.slug : undefined
  const type = typeof query.type === 'string' ? query.type : undefined
  const location = type ? resolveHref(type, slug) : '/'

  if (!secret) {
    res.status(401)
    res.send('Invalid secret')
    return
  }

  const authClient = getClient({ token: token }).withConfig({
    useCdn: false,
    token: token,
  })

  // This is the most common way to check for auth, but we encourage you to use your existing auth
  // infra to protect your token and securely transmit it to the client
  const validSecret = await isValidSecret(authClient, previewSecretId, secret)
  if (!validSecret) {
    return res.status(401).send('Invalid secret')
  }

  res.setDraftMode({ enable: true })
  res.writeHead(307, { Location: location })
  res.end()
  return
}
