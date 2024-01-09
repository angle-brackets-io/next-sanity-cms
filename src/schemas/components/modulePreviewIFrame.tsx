import { getStorybookURL } from '../../lib/storybook-url'

export const ModulePreviewIFrame = ({ id }: { id: string }) => {
  return (
    <div className="aspect-video overflow-hidden">
      <iframe
        className="pointer-events-none aspect-video w-[1440px] origin-top-left scale-[12.5%] object-contain"
        src={getStorybookURL(id, true)}
      />
    </div>
  )
}
