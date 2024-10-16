import Koa from 'koa'

const app = new Koa()

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(async (ctx) => {
  ctx.body = 'Hello World'
})

if (import.meta.env.PROD) {
  app.listen(3000, () => {
    console.log('server is running, listen on 3000')
  })
}

export const viteNodeApp = app
