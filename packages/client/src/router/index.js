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
    name: 'Home',
    component: () => import('@/views/Home.vue'),
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