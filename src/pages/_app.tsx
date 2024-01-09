import '~/styles/global.scss'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { lazy, Suspense } from 'react'

import Footer from '~/components/footer'
import Navbar from '~/components/navbar'
import { IMeta, MetaComponent } from '~/lib/meta'

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))
const VisualEditing = lazy(() => import('~/components/VisualEditing'))

export interface SharedPageProps {
  draftMode: boolean
  token: string
  navigation?: any
  meta: IMeta
}

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token, meta, navigation } = pageProps
  const router = useRouter()
  const pageKey = router.asPath

  return (
    <>
      {meta && <MetaComponent meta={meta} />}
      {navigation && <Navbar />}
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
          <Suspense>
            <VisualEditing />
          </Suspense>
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
      {navigation && <Footer />}
    </>
  )
}
