import NextHead from 'next/head'
import { Image } from 'sanity'

import { urlForImage } from '../sanity.image'

export interface IMeta {
  siteTitle?: string
  gtmID?: string
  metaTitle?: string
  metaDesc?: string
  shareTitle?: string
  shareDesc?: string
  shareGraphic?: Image
  icon?: {
    light?: Image
    dark?: Image
  }
  appleTouchIcon?: Image
  appleWebApp?: {
    title?: string
    startupImage?: Image
  }
}

export default function Head({ meta }: { meta: IMeta }) {
  const {
    siteTitle,
    metaTitle,
    metaDesc,
    shareTitle,
    shareDesc,
    shareGraphic,
    icon: { light: lightIcon, dark: darkIcon } = {},
    appleTouchIcon,
    appleWebApp: {
      title: appleWebAppTitle,
      startupImage: appleWebAppStartupImage,
    } = {},
  } = meta
  return (
    <NextHead>
      <title>{siteTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={shareTitle} />
      <meta property="og:description" content={shareDesc} />
      {shareGraphic && (
        <meta
          property="og:image"
          content={urlForImage(shareGraphic).width(1200).height(630).url()}
        />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={shareTitle} />
      <meta name="twitter:description" content={shareDesc} />
      {shareGraphic && (
        <meta
          name="twitter:image"
          content={urlForImage(shareGraphic).width(1200).height(630).url()}
        />
      )}

      {lightIcon && (
        <link
          rel="icon"
          href={urlForImage(lightIcon).url()}
          media="(prefers-color-scheme: light)"
        />
      )}
      {darkIcon && (
        <link
          rel="icon"
          href={urlForImage(darkIcon).url()}
          media="(prefers-color-scheme: dark)"
        />
      )}
      {appleTouchIcon && (
        <link rel="apple-touch-icon" href={urlForImage(appleTouchIcon).url()} />
      )}
      {appleWebAppTitle && (
        <meta name="apple-mobile-web-app-title" content={appleWebAppTitle} />
      )}
      {appleWebAppStartupImage && (
        <link
          href={urlForImage(appleWebAppStartupImage).url()}
          rel="apple-touch-startup-image"
        />
      )}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
    </NextHead>
  )
}
