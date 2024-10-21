import { log } from '@/utils'
import Router from '@koa/router'
import controllers from './modules'

export default function setupRoutes(app) {
  const router = new Router()

  Object.keys(controllers).forEach((key) => {
    const [method, url] = key.split(' ')
    log(`Register ${method.toUpperCase()} ${url}`)
    router[method.toLowerCase()](url, controllers[key])
  })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
