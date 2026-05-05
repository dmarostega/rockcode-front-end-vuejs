import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/apps',
      name: 'apps',
      component: () => import('../views/AppsView.vue'),
    },
    {
      path: '/experiences',
      name: 'experiences',
      component: () => import('../views/ExperiencesView.vue'),
    },
    {
      path: '/stacks',
      name: 'stacks',
      component: () => import('../views/StackView.vue'),
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/ArticlesView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },

    // precisa ser sempre a última rota
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router