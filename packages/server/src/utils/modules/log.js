import dayjs from 'dayjs'

export function log(msg) {
  const msgWithTime = `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${msg}`
  return console.log(msgWithTime)
}

export function logger() {
  return async (ctx, next) => {
    const start = dayjs().valueOf()
    log(`==> ${ctx.method} ${ctx.url}`)
    try {
      await next()
      const end = dayjs().valueOf()
      log(`<== ${ctx.method} ${ctx.url} ${ctx.status} ${ctx.message} in ${end - start}ms`)
    }
    catch (err) {
      log(`==> ${err.message}`)
    }
  }
}
