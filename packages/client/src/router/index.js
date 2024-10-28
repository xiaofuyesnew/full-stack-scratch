import setupRouterGuards from './guards'

const BASE = import.meta.env.VITE_BASE || '/'
const ROUTER_MODES = {
  HISTORY: createWebHistory(BASE),
  MEMORY: createMemoryHistory(BASE),
  HASH: createWebHashHistory(BASE),
}
const ROUTER_MODE = import.meta.env.VITE_ROUTER_MODE || 'HISTORY'

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
]

export const router = createRouter({
  history: ROUTER_MODES[ROUTER_MODE],
  routes,
})

export function setupRouter(app) {
  setupRouterGuards(router)
  app.use(router)
}
