import type { Meta, StoryObj } from '@storybook/react'

import { allModes } from '../../../.storybook/modes'
import ButtonComponent from './Button'

const meta: Meta<typeof ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  parameters: {
    chromatic: {
      modes: {
        mobile: allModes['desktop'],
      },
    },
    design: {
      type: 'figma',
      url: '',
      allowFullscreen: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof ButtonComponent>

export const Primary: Story = {
  args: {},
}
