import type { Meta, StoryObj } from '@storybook/react'

import FooterComponent from './index'

const meta: Meta<typeof FooterComponent> = {
  title: 'Components/Footer',
  component: FooterComponent,
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Desktop',
        url: '',
        allowFullscreen: true,
      },
      {
        type: 'figma',
        name: 'Mobile',
        url: '',
        allowFullscreen: true,
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof FooterComponent>

export const Default: Story = {
  args: {},
}
