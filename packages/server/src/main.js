import setupRoutes from '@/controller/index.js'
import settings from '@/settings'
import { logger } from '@/utils'
import Koa from 'koa'
import responseTime from 'koa-response-time'

// console.log(env.DATABASE_URL)

const app = new Koa()

app.use(responseTime())

app.use(logger)

setupRoutes(app)

// app.use(async (ctx, next) => {
//   await next()
//   const rt = ctx.response.get('X-Response-Time')
//   console.log(`${ctx.method} ${ctx.url} - ${rt}`)
// })

// app.use(async (ctx, next) => {
//   const start = Date.now()
//   await next()
//   const ms = Date.now() - start
//   ctx.set('X-Response-Time', `${ms}ms`)
// })

// app.use(async (ctx) => {
//   ctx.body = 'Hello World'
// })

if (import.meta.env.PROD) {
  app.listen(settings.port, () => {
    console.log('server is running, listen on 3000')
  })
}

export const viteNodeApp = app
