/** @type {import('next').NextConfig} */

const config = {
  images: { remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
  rewrites: async () => [
    {
      source: '/storybook',
      destination: '/storybook-static/index.html',
    },
  ],
  /*
   * Fix Error: EMFILE: too many open files
   * see https://github.com/phosphor-icons/react/issues/45#issuecomment-1773840947
   */
  modularizeImports: {
    '@phosphor-icons/react': {
      transform: '@phosphor-icons/react/dist/ssr/{{member}}',
      skipDefaultConversion: true,
    },
  },
}

export default config
