import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { updatePageMetadata } from './pageMetadata'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        canonicalPath: '/',
        title: 'Rock Code Labs | Projetos Laravel, Vue e Desenvolvimento Web',
        description:
          'Laboratório pessoal de desenvolvimento web de Diogo Marostega, com projetos em Laravel, Vue, PHP, APIs REST, sistemas SaaS e estudos técnicos.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Sobre | Rock Code Labs',
        description:
          'Conheça a Rock Code Labs, laboratório pessoal de desenvolvimento web com foco em Laravel, Vue, PHP e soluções digitais.',
      },
    },
    {
      path: '/apps',
      name: 'apps',
      component: () => import('../views/AppsView.vue'),
      meta: {
        title: 'Aplicativos | Rock Code Labs',
        description:
          'Projetos e aplicações desenvolvidos pela Rock Code Labs usando Laravel, Vue, APIs REST e boas práticas de desenvolvimento web.',
      },
    },
    {
      path: '/experiences',
      name: 'experiences',
      component: () => import('../views/ExperiencesView.vue'),
      meta: {
        title: 'Experiências | Rock Code Labs',
        description:
          'Experiências profissionais, estudos técnicos e práticas de desenvolvimento reunidas pela Rock Code Labs.',
      },
    },
    {
      path: '/stacks',
      name: 'stacks',
      component: () => import('../views/StackView.vue'),
      meta: {
        title: 'Stacks | Rock Code Labs',
        description:
          'Tecnologias, ferramentas e stacks usadas nos projetos da Rock Code Labs, incluindo Laravel, Vue, PHP e integrações web.',
      },
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/ArticlesView.vue'),
      meta: {
        title: 'Artigos | Rock Code Labs',
        description:
          'Artigos, anotações e estudos técnicos sobre desenvolvimento web, Laravel, Vue, PHP, APIs e arquitetura de software.',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: 'Contato | Rock Code Labs',
        description:
          'Entre em contato com a Rock Code Labs para falar sobre projetos web, sistemas SaaS, APIs e desenvolvimento sob medida.',
      },
    },

    // precisa ser sempre a última rota
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        canonicalPath: '/',
        title: 'Página não encontrada | Rock Code Labs',
        description: 'A página solicitada não foi encontrada na Rock Code Labs.',
      },
    },
  ],
})

router.afterEach((to) => {
  updatePageMetadata(to)
})

export default router
