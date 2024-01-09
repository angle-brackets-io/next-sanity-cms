import { Box, Flex, Popover } from '@sanity/ui'
import { useState } from 'react'
import { PreviewProps } from 'sanity'

import { ModulePreviewIFrame } from './modulePreviewIFrame'
import { StorybookLink } from './storybookLink'

export function ModulePreview(props: PreviewProps) {
  const [isModuleHovering, setIsModuleHovering] = useState(false)
  const [isButtonHovering, setIsButtonHovering] = useState(false)

  // @ts-ignore
  const id = props.schemaType?.storybook?.id
  return (
    <Flex
      align="center"
      onPointerEnter={() => setIsModuleHovering(true)}
      onPointerLeave={() => setIsModuleHovering(false)}
    >
      <Box flex={1}>{props.renderDefault(props)}</Box>
      {isModuleHovering && (
        <Popover
          content={<ModulePreviewIFrame id={id} />}
          className="w-96"
          padding={2}
          placement="bottom-end"
          portal
          open={isButtonHovering}
        >
          <Box
            onPointerEnter={() => setIsButtonHovering(true)}
            onPointerLeave={() => setIsButtonHovering(false)}
            onClick={(event) => event.stopPropagation()}
          >
            <StorybookLink id={id} />
          </Box>
        </Popover>
      )}
    </Flex>
  )
}
