function GoogleSearchResult({
  websiteUrlWithoutProtocol,
  metaTitle,
  metaDesc,
}: {
  websiteUrlWithoutProtocol: string
  metaTitle: string
  metaDesc: string
}) {
  return (
    <>
      <div className="text-gray-800 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap leading-6">
        {websiteUrlWithoutProtocol}
      </div>
      <div className="text-blue-800 text-2xl w-full cursor-pointer overflow-x-hidden text-ellipsis whitespace-nowrap font-medium leading-9 hover:underline">
        {metaTitle}
      </div>

      {metaDesc && (
        <div className="text-gray-600 text-base break-words leading-6">
          {metaDesc}
        </div>
      )}
    </>
  )
}

export default GoogleSearchResult
