import { Link, User } from '@phosphor-icons/react'
import { Image as ImageType } from '@sanity/types'
import Image from 'next/image'

import { metaPluginOptions } from '..'
import { urlForImage } from '../sanity.image'

export interface Props {
  websiteUrlWithoutProtocol: string
  shareTitle: string
  shareDesc: string
  shareGraphic: ImageType
}

function TwitterCard({
  websiteUrlWithoutProtocol,
  shareTitle,
  shareDesc,
  shareGraphic,
}: Props) {
  const { name, handle } = metaPluginOptions?.metaPreview.twitterCard ?? {}

  return (
    <div className="pl-[60px]">
      <div className="relative mb-1 mr-20">
        <User
          className="border-gray-400 absolute left-[-55px] top-0 h-12 w-12 rounded-full border border-solid"
          size={32}
        />
        <span className="text-gray-800 mr-1 font-semibold">{name}</span>
        <span className="text-gray-500 text-xs ml-1 mt-1 px-0">@{handle}</span>
      </div>
      <div className="m-0 mb-2">
        <p>Tweet about this...</p>
      </div>
      <div className="text-decoration-none text-inherit cursor-pointer">
        <div className="border-gray-400 relative mb-2 mt-2 flex flex-col overflow-hidden rounded-lg border">
          <div className="flex w-full flex-shrink-0 overflow-hidden border-r">
            {shareGraphic ? (
              <Image
                width={1200}
                height={630}
                src={urlForImage(shareGraphic).width(1200).height(630).url()}
                alt="Image"
              />
            ) : (
              <span className='content-["no photo set!"] absolute left-0 right-0 top-1/2 block -translate-y-1/2 transform text-center' />
            )}
          </div>
          <div className="w-[calc(100%-8.81667em-2px)] overflow-hidden px-3 py-2">
            <h2 className="text-base m-0 mb-1 max-h-[1.3em] overflow-hidden overflow-ellipsis whitespace-nowrap font-normal">
              {shareTitle}
            </h2>
            {shareDesc && <div className="text-gray-500">{shareDesc}</div>}
            <div className="text-transform-lowercase text-gray-500 mt-1 flex items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
              <Link size={16} />
              {websiteUrlWithoutProtocol}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwitterCard
