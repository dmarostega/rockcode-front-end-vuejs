import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {
  INDEXABLE_PAGE_METADATA,
  NOT_FOUND_PAGE_METADATA,
  updatePageMetadata,
} from './pageMetadata'

const pageMetadataByPath = Object.fromEntries(
  INDEXABLE_PAGE_METADATA.map((pageMetadata) => [pageMetadata.path, pageMetadata]),
)

const getPageMetadata = (path) => pageMetadataByPath[path]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: getPageMetadata('/'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: getPageMetadata('/about'),
    },
    {
      path: '/apps',
      name: 'apps',
      component: () => import('../views/AppsView.vue'),
      meta: getPageMetadata('/apps'),
    },
    {
      path: '/ferramentas',
      name: 'tools',
      component: () => import('../views/ToolsView.vue'),
      meta: getPageMetadata('/ferramentas'),
    },
    {
      path: '/ferramentas/gerador-uuid',
      name: 'uuid-generator',
      component: () => import('../views/UuidGeneratorView.vue'),
      meta: getPageMetadata('/ferramentas/gerador-uuid'),
    },
    {
      path: '/ferramentas/base64',
      name: 'base64-converter',
      component: () => import('../views/Base64ConverterView.vue'),
      meta: getPageMetadata('/ferramentas/base64'),
    },
    {
      path: '/ferramentas/formatador-json',
      name: 'json-formatter',
      component: () => import('../views/JsonFormatterView.vue'),
      meta: getPageMetadata('/ferramentas/formatador-json'),
    },
    {
      path: '/ferramentas/gerador-slug',
      name: 'slug-generator',
      component: () => import('../views/tools/SlugGeneratorView.vue'),
      meta: getPageMetadata('/ferramentas/gerador-slug'),
    },
    {
      path: '/ferramentas/contador-caracteres-palavras',
      name: 'character-word-counter',
      component: () => import('../views/tools/CharacterWordCounterView.vue'),
      meta: getPageMetadata('/ferramentas/contador-caracteres-palavras'),
    },
    {
      path: '/ferramentas/url-encode-decode',
      name: 'url-encode-decode',
      component: () => import('../views/tools/UrlEncodeDecodeView.vue'),
      meta: getPageMetadata('/ferramentas/url-encode-decode'),
    },
    {
      path: '/ferramentas/conversor-timestamp',
      name: 'timestamp-converter',
      component: () => import('../views/tools/TimestampConverterView.vue'),
      meta: getPageMetadata('/ferramentas/conversor-timestamp'),
    },
    {
      path: '/ferramentas/gerador-hash',
      name: 'hash-generator',
      component: () => import('../views/tools/HashGeneratorView.vue'),
      meta: getPageMetadata('/ferramentas/gerador-hash'),
    },
    {
      path: '/experiences',
      name: 'experiences',
      component: () => import('../views/ExperiencesView.vue'),
      meta: getPageMetadata('/experiences'),
    },
    {
      path: '/stacks',
      name: 'stacks',
      component: () => import('../views/StackView.vue'),
      meta: getPageMetadata('/stacks'),
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/ArticlesView.vue'),
      meta: getPageMetadata('/articles'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: getPageMetadata('/contact'),
    },

    // precisa ser sempre a última rota
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        canonicalPath: NOT_FOUND_PAGE_METADATA.path,
        title: NOT_FOUND_PAGE_METADATA.title,
        description: NOT_FOUND_PAGE_METADATA.description,
      },
    },
  ],
})

router.afterEach((to) => {
  updatePageMetadata(to)
})

export default router
