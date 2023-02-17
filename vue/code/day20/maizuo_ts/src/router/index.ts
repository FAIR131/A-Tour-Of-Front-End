import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/film',
    component: () => import( '../views/Film.vue')
  },
  {
    path: '/mine',
    component: () => import( '../views/Mine.vue')
  },
  {
    path: '/',
    redirect:'/film'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
