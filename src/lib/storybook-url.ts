export const getStorybookURL = (id: string, iframe = false) =>
  process.env.NODE_ENV === 'production'
    ? `/storybook${iframe ? '-iframe' : ''}/?path=/story/${id}`
    : `http://localhost:6006/${iframe ? 'iframe.html' : ''}?path=/story/${id}`
