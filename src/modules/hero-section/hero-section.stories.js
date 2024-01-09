import HeroSection from './index'
const meta = {
  title: 'Modules/HeroSection',
  component: HeroSection,
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

export const Default = {
  args: {
    data: {
      title: 'hello',
    },
  },
}
