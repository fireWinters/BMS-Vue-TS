import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/crm/home' },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Index.vue')
    }
  ]
})

export default router
