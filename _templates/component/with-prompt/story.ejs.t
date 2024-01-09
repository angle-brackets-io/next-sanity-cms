---
to: src/components/<%= h.projectCase(name) %>/<%=  h.projectCase(name) %>.stories.js
---
import <%= h.changeCase.pascal(name) %> from './index'

const meta = {
  title: 'Components/<%= h.changeCase.pascal(name) %>',
  component: <%= h.changeCase.pascal(name) %>,
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
export default meta;

export const Default = {
   args: {},
}
