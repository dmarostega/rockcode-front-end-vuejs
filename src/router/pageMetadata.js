export const SITE_URL = 'https://rockcodelabs.com.br'
export const DEFAULT_TITLE = 'Rock Code Labs | Projetos Laravel, Vue e Desenvolvimento Web'
export const DEFAULT_DESCRIPTION =
  'Projetos, estudos e soluções web com Laravel, Vue, PHP, APIs REST, sistemas SaaS e boas práticas de desenvolvimento.'

const normalizePath = (path) => `${path.replace(/\/$/, '')}/`

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
    title: 'Micro-SaaS, aplicativos web e projetos Laravel/Vue | Rock Code Labs',
    description:
      'Conheça apps, MVPs e projetos web da Rock Code Labs criados com Laravel, Vue e foco em soluções simples para negócios reais.',
  },
  {
    path: '/ferramentas',
    title: 'Ferramentas online gratuitas para uso diário e desenvolvedores | Rock Code Labs',
    description:
      'Use ferramentas online gratuitas da Rock Code Labs para cálculos, conversões e tarefas rápidas do dia a dia ou de desenvolvimento.',
  },
  {
    path: '/ferramentas/gerador-uuid',
    title: 'Gerador UUID online gratuito | Rock Code Labs',
    description:
      'Gere UUIDs v4 online e gratuitamente no navegador, sem login, sem salvar dados e sem depender de API externa.',
  },
  {
    path: '/ferramentas/base64',
    title: 'Conversor Base64 online gratuito | Rock Code Labs',
    description:
      'Converta texto para Base64 e decodifique Base64 para texto no navegador, sem login, sem salvar dados e sem API externa.',
  },
  {
    path: '/ferramentas/formatador-json',
    title: 'Formatador e validador JSON online gratuito | Rock Code Labs',
    description:
      'Formate, valide e minifique JSON online no navegador, com erro amigável, sem login, sem salvar dados e sem API externa.',
  },
  {
    path: '/ferramentas/gerador-slug',
    title: 'Gerador de slug online gratuito | Rock Code Labs',
    description:
      'Gere slugs amigáveis para URLs a partir de textos com espaços, acentos e pontuação, direto no navegador e sem salvar dados.',
  },
  {
    path: '/ferramentas/contador-caracteres-palavras',
    title: 'Contador de caracteres e palavras online gratuito | Rock Code Labs',
    description:
      'Conte caracteres, palavras e linhas em tempo real no navegador, sem login, sem backend, sem API externa e sem salvar o texto digitado.',
  },
  {
    path: '/ferramentas/url-encode-decode',
    title: 'URL encode e decode online gratuito | Rock Code Labs',
    description:
      'Codifique e decodifique URLs, parâmetros e textos no navegador, sem login, sem backend, sem API externa e sem salvar a entrada digitada.',
  },
  {
    path: '/ferramentas/conversor-timestamp',
    title: 'Conversor timestamp Unix e data online gratuito | Rock Code Labs',
    description:
      'Converta timestamp Unix em data legível e data em timestamp no navegador, sem login, backend, API externa ou histórico.',
  },
  {
    path: '/ferramentas/gerador-hash',
    title: 'Gerador SHA-256 e SHA-512 online gratuito | Rock Code Labs',
    description:
      'Gere hashes SHA-256 e SHA-512 localmente no navegador para uso didático e de desenvolvimento, sem backend ou API externa.',
  },
  {
    path: '/ferramentas/calculadora-desconto',
    title: 'Calculadora de desconto percentual online gratuita | Rock Code Labs',
    description:
      'Calcule preço final e economia a partir de um desconto percentual, com moeda em pt-BR e processamento local no navegador.',
  },
  {
    path: '/ferramentas/comparador-preco-unidade',
    title: 'Comparador de preço por unidade online gratuito | Rock Code Labs',
    description:
      'Compare custo por unidade, quilo, litro ou metro entre produtos para descobrir qual opção compensa mais, sem login ou backend.',
  },
  {
    path: '/ferramentas/calculadora-consumo-combustivel',
    title: 'Calculadora de consumo de combustível online gratuita | Rock Code Labs',
    description:
      'Calcule km/l, custo por quilômetro e gasto estimado com combustível no navegador, sem localização, cadastro ou API externa.',
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
    return route.meta.canonicalPath === '/' ? '/' : normalizePath(route.meta.canonicalPath)
  }

  return route.path === '/' ? '/' : normalizePath(route.path)
}

export const getCanonicalUrlFromPath = (canonicalPath) => {
  const normalizedPath = canonicalPath === '/' ? '/' : normalizePath(canonicalPath)

  return new URL(normalizedPath, SITE_URL).toString()
}

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
