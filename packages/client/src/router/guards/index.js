import createAuthGuard from './auth'
import createTitleGuard from './title'

export default function setupRouterGuards(router) {
  createAuthGuard(router)
  createTitleGuard(router)
}
