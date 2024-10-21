import { create } from 'svg-captcha'

async function createCaptcha(ctx, next) {
  const captcha = create({
    size: 4,
    ignoreChars: '0o1il',
    noise: 4,
    color: true,
  })

  ctx.session.captcha = captcha.text

  ctx.type = 'image/svg+xml'
  ctx.body = captcha.data

  await next()
}

async function checkCaptcha(ctx, next) {
  const userCaptcha = ctx.query.captcha.toLowerCase()
  const sessionCaptcha = ctx.session.captcha.toLowerCase()

  if (userCaptcha !== sessionCaptcha) {
    ctx.throw(401, '验证码错误')
  }

  ctx.status = 200
  ctx.body = {
    code: 200,
    message: '验证码正确',
  }

  await next()
}

export default {
  'get /auth/captcha': createCaptcha,
  'get /auth/captcha/check': checkCaptcha,
}
