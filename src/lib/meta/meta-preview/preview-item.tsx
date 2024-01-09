import { Icon } from '@phosphor-icons/react'

type Props = {
  children: React.ReactNode
  title: string
  width?: number
  Icon?: Icon
}

export default function PreviewItem({
  children,
  title,
  width = 580,
  Icon,
}: Props) {
  return (
    <div className="m-0">
      <h3 className="text-lg m-0 flex items-center gap-2 p-4 leading-7">
        {Icon && <Icon className="mb-0.5" />}
        {title}
      </h3>
      <div className="border-gray-300 bg-gray-50 overflow-auto border-b border-r border-t py-6 pl-6">
        <div
          className="border-gray-300 bg-white rounded-lg border p-4 font-sans"
          style={{ width: `${width}px` }}
        >
          {children ?? (
            <p className="p-3 text-center">
              Please fill out your meta fields first. Default meta fields are
              used if they are left blank.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
