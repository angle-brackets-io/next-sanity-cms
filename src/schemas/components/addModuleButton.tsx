import { Plus } from '@phosphor-icons/react'
import { Box, Button, Stack, Text } from '@sanity/ui'
import { useState } from 'react'

import { ModulePreviewIFrame } from './modulePreviewIFrame'
import { StorybookLink } from './storybookLink'

export const AddModuleButton = ({
  id,
  title,
  onClick,
}: {
  id: string
  title: string
  onClick: () => void
}) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Button
      mode="ghost"
      padding={0}
      onClick={onClick}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
    >
      <Stack
        space={1}
        className="border-storage-medium-light bg-storage-light text-black hover:bg-storage-medium-dark hover:text-white group rounded-sm border transition-all duration-200 hover:duration-75"
      >
        <Box
          className="border-storage-medium-light bg-white relative border-b"
          paddingX={3}
        >
          <ModulePreviewIFrame id={id} />
        </Box>
        <Box paddingX={3} paddingTop={2} paddingBottom={3}>
          <Text size={1} weight="medium">
            <span className="flex items-center gap-2 group-hover:hidden">
              {/* {Icon && <Icon />} */}
              {title}
            </span>
            <span className="hidden items-center gap-2 group-hover:flex">
              <Plus />
              Add module
            </span>
          </Text>
        </Box>
        {isHovering && (
          <Box
            className="absolute right-1 top-1"
            onClick={(event) => event.stopPropagation()}
          >
            <StorybookLink id={id} />
          </Box>
        )}
      </Stack>
    </Button>
  )
}
