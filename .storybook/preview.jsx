import React from 'react'

import { allModes } from './modes'
import '../src/styles/global.scss'

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    chromatic: {
      modes: {
        mobile: allModes['mobile'],
        desktop: allModes['desktop'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story) => {
      return <Story />
    },
  ],
}

export default preview
