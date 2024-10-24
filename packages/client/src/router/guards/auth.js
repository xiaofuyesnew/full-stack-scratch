import { local } from '@/utils'

/**
 * 创建一个路由守卫，用于检查用户是否已登录
 * @param {object} router - Vue Router 实例
 * @returns {void} - 无返回值
 */
export default function createAuthGuard(router) {
  router.beforeEach((to, from, next) => {
    const isAuthenticated = !!local.get('AccessToken')
    if (to.path === '/login' && isAuthenticated) {
      next('/')
    }
    else {
      next()
    }
  })
}
