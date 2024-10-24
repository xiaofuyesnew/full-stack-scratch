import { log } from '@/utils'
import Router from '@koa/router'

const modules = import.meta.glob('./modules/*.js', { eager: true })

const controllers = Object.keys(modules)
  .map(key => modules[key].default)
  .reduce((acc, item) => {
    acc = { ...acc, ...item }
    return acc
  }, {})

export const whiteList = Object.keys(controllers)
  .filter(key => controllers[key].whiteList)
  .map(key => `/api${key.split(' ')[1]}`)

export default function setupRouters(app) {
  const router = new Router()

  Object.keys(controllers).forEach((key) => {
    const [method, url] = key.split(' ')
    router[method.toLowerCase()](`/api${url}`, controllers[key].handler)
    log(`↑ ${method.toUpperCase()} /api${url}`)
  })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
