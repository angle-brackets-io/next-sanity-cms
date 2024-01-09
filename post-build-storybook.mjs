import { cp, readFile, writeFile } from 'fs/promises'

// copy storybook build file to public
await cp('./storybook-static', './public/storybook-static', { recursive: true })

// Add base element to storybook index.html, iframe.html, so that the relative links to resources like scripts and css work correctly
async function addBaseElement(path) {
  const file = await readFile(path, 'utf8')
  const baseElement = '<base href="/storybook-static/" />'
  const newFile = file.replace('<head>', `<head>${baseElement}`)
  await writeFile(path, newFile)
}

await addBaseElement('./public/storybook-static/index.html')
await addBaseElement('./public/storybook-static/iframe.html')
