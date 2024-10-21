import session from 'koa-session'

export function genSession(app) {
  app.keys = [import.meta.env.VITE_SECRET]
  return session({
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
  }, app)
}
