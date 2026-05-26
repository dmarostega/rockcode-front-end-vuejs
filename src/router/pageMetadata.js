export const SITE_URL = 'https://rockcodelabs.com.br'
export const DEFAULT_TITLE = 'Rock Code Labs | Projetos Laravel, Vue e Desenvolvimento Web'
export const DEFAULT_DESCRIPTION =
  'Projetos, estudos e soluções web com Laravel, Vue, PHP, APIs REST, sistemas SaaS e boas práticas de desenvolvimento.'

export const INDEXABLE_PAGE_METADATA = [
  {
    path: '/',
    title: DEFAULT_TITLE,
    description:
      'Laboratório pessoal de desenvolvimento web de Diogo Marostega, com projetos em Laravel, Vue, PHP, APIs REST, sistemas SaaS e estudos técnicos.',
  },
  {
    path: '/about',
    title: 'Sobre | Rock Code Labs',
    description:
      'Conheça a Rock Code Labs, laboratório pessoal de desenvolvimento web com foco em Laravel, Vue, PHP e soluções digitais.',
  },
  {
    path: '/apps',
    title: 'Aplicativos | Rock Code Labs',
    description:
      'Projetos e aplicações desenvolvidos pela Rock Code Labs usando Laravel, Vue, APIs REST e boas práticas de desenvolvimento web.',
  },
  {
    path: '/experiences',
    title: 'Experiências | Rock Code Labs',
    description:
      'Experiências profissionais, estudos técnicos e práticas de desenvolvimento reunidas pela Rock Code Labs.',
  },
  {
    path: '/stacks',
    title: 'Stacks | Rock Code Labs',
    description:
      'Tecnologias, ferramentas e stacks usadas nos projetos da Rock Code Labs, incluindo Laravel, Vue, PHP e integrações web.',
  },
  {
    path: '/articles',
    title: 'Artigos | Rock Code Labs',
    description:
      'Artigos, anotações e estudos técnicos sobre desenvolvimento web, Laravel, Vue, PHP, APIs e arquitetura de software.',
  },
  {
    path: '/contact',
    title: 'Contato | Rock Code Labs',
    description:
      'Entre em contato com a Rock Code Labs para falar sobre projetos web, sistemas SaaS, APIs e desenvolvimento sob medida.',
  },
]

export const NOT_FOUND_PAGE_METADATA = {
  path: '/',
  title: 'Página não encontrada | Rock Code Labs',
  description: 'A página solicitada não foi encontrada na Rock Code Labs.',
}

export const getCanonicalPath = (route) => {
  if (route.meta?.canonicalPath) {
    return route.meta.canonicalPath
  }

  return route.path === '/' ? '/' : route.path.replace(/\/$/, '')
}

export const getCanonicalUrlFromPath = (canonicalPath) =>
  new URL(canonicalPath, SITE_URL).toString()

export const getCanonicalUrl = (route) => getCanonicalUrlFromPath(getCanonicalPath(route))

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
