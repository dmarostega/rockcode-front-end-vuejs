import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getCanonicalUrlFromPath, INDEXABLE_PAGE_METADATA } from '../src/router/pageMetadata.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const distRoot = path.join(projectRoot, 'dist')
const shellPath = path.join(distRoot, 'index.html')

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const replaceTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) {
    throw new Error(`Unable to find tag matching ${pattern}`)
  }

  return html.replace(pattern, replacement)
}

const renderPage = (shellHtml, { path: routePath, title, description }) => {
  const canonicalUrl = getCanonicalUrlFromPath(routePath)
  const escapedTitle = escapeHtml(title)
  const escapedDescription = escapeHtml(description)
  const escapedCanonicalUrl = escapeHtml(canonicalUrl)

  return [
    [/<title>.*?<\/title>/s, `<title>${escapedTitle}</title>`],
    [
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="description" content="${escapedDescription}" />`,
    ],
    [
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/s,
      `<link rel="canonical" href="${escapedCanonicalUrl}" />`,
    ],
    [
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:url" content="${escapedCanonicalUrl}" />`,
    ],
    [
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:title" content="${escapedTitle}" />`,
    ],
    [
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:description" content="${escapedDescription}" />`,
    ],
    [
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/s,
      `<meta name="twitter:title" content="${escapedTitle}" />`,
    ],
    [
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="twitter:description" content="${escapedDescription}" />`,
    ],
  ].reduce((html, [pattern, replacement]) => replaceTag(html, pattern, replacement), shellHtml)
}

const getOutputPath = (routePath) => {
  if (routePath === '/') {
    return shellPath
  }

  return path.join(distRoot, routePath.replace(/^\//, ''), 'index.html')
}

const shellHtml = await readFile(shellPath, 'utf8')

await Promise.all(
  INDEXABLE_PAGE_METADATA.map(async (pageMetadata) => {
    const outputPath = getOutputPath(pageMetadata.path)
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, renderPage(shellHtml, pageMetadata))
  }),
)

console.log(`Prerendered route metadata for ${INDEXABLE_PAGE_METADATA.length} pages.`)
