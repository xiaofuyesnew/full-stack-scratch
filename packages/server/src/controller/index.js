import { log } from '@/utils'
import Router from '@koa/router'

const modules = import.meta.glob('./modules/*.js', { eager: true })

const controllers = Object.keys(modules)
  .map(key => modules[key].default)
  .reduce((acc, item) => {
    acc = { ...acc, ...item }
    return acc
  }, {})

export default function setupRoutes(app) {
  const router = new Router()

  Object.keys(controllers).forEach((key) => {
    const [method, url] = key.split(' ')
    router[method.toLowerCase()](`/api${url}`, controllers[key])
    log(`↑ ${method.toUpperCase()} /api${url}`)
  })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
