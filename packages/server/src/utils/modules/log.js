import dayjs from 'dayjs'

export function log(msg) {
  const msgWithTime = `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${msg}`
  return console.log(msgWithTime)
}

export async function logger(ctx, next) {
  log(`Request: ${ctx.method} ${ctx.url}`)
  await next()
  log(`Response: ${ctx.method} ${ctx.url} ${ctx.status} ${ctx.message}`)
}
