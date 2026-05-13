const SITE_URL = 'https://www.rockcodelabs.com.br'
const DEFAULT_TITLE = 'Rock Code Labs | Projetos Laravel, Vue e Desenvolvimento Web'
const DEFAULT_DESCRIPTION =
  'Projetos, estudos e soluções web com Laravel, Vue, PHP, APIs REST, sistemas SaaS e boas práticas de desenvolvimento.'

const ensureHeadElement = (selector, createElement) => {
  const currentElement = document.head.querySelector(selector)

  if (currentElement) {
    return currentElement
  }

  const newElement = createElement()
  document.head.appendChild(newElement)

  return newElement
}

const setMetaContent = (selector, createElement, content) => {
  const element = ensureHeadElement(selector, createElement)
  element.setAttribute('content', content)
}

const getCanonicalPath = (route) => {
  if (route.meta?.canonicalPath) {
    return route.meta.canonicalPath
  }

  return route.path === '/' ? '/' : route.path.replace(/\/$/, '')
}

export const getCanonicalUrl = (route) => new URL(getCanonicalPath(route), SITE_URL).toString()

export const updatePageMetadata = (route) => {
  const title = route.meta?.title ?? DEFAULT_TITLE
  const description = route.meta?.description ?? DEFAULT_DESCRIPTION
  const canonicalUrl = getCanonicalUrl(route)

  document.title = title

  const canonicalLink = ensureHeadElement('link[rel="canonical"]', () => {
    const element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    return element
  })
  canonicalLink.setAttribute('href', canonicalUrl)

  setMetaContent(
    'meta[name="description"]',
    () => {
      const element = document.createElement('meta')
      element.setAttribute('name', 'description')
      return element
    },
    description,
  )

  setMetaContent(
    'meta[property="og:url"]',
    () => {
      const element = document.createElement('meta')
      element.setAttribute('property', 'og:url')
      return element
    },
    canonicalUrl,
  )

  setMetaContent(
    'meta[property="og:title"]',
    () => {
      const element = document.createElement('meta')
      element.setAttribute('property', 'og:title')
      return element
    },
    title,
  )

  setMetaContent(
    'meta[property="og:description"]',
    () => {
      const element = document.createElement('meta')
      element.setAttribute('property', 'og:description')
      return element
    },
    description,
  )

  setMetaContent(
    'meta[name="twitter:title"]',
    () => {
      const element = document.createElement('meta')
      element.setAttribute('name', 'twitter:title')
      return element
    },
    title,
  )

  setMetaContent(
    'meta[name="twitter:description"]',
    () => {
      const element = document.createElement('meta')
      element.setAttribute('name', 'twitter:description')
      return element
    },
    description,
  )
}
