import { resolve } from 'node:path'
import { cwd } from 'node:process'
import setupRoutes from '@/controller'
import { genJWT, genSession, log, logger } from '@/utils'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import error from 'koa-json-error'
import responseTime from 'koa-response-time'
import Static from 'koa-static'

const app = new Koa()

app
  .use(responseTime())
  .use(error())
  .use(logger())
  .use(Static(resolve(cwd(), 'www')))
  .use(bodyParser())
  .use(genJWT([
    '/api/auth/login',
    '/api/auth/captcha',
    '/api/user/info',
    '/api/auth/captcha/check',
  ]))
  .use(genSession(app))

setupRoutes(app)

if (import.meta.env.PROD) {
  app.listen(
    import.meta.env.VITE_PORT || 3000,
    () => {
      log('server is running, listen on 3000')
    },
  )
}

export const viteNodeApp = app
