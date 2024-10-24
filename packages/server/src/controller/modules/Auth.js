import { hashPassword, signJWT } from '@/utils'
import { create } from 'svg-captcha'
import { prisma } from '~/prisma/client'

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

async function login(ctx, next) {
  const { username, password, captcha } = ctx.request.body

  if (ctx.session.captcha.toLowerCase() !== captcha.toLowerCase()) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      message: '验证码错误',
      data: null,
    }
    return await next()
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email: username },
        { phone: username },
      ],
    },
  })

  // console.log(user)

  if (!user) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      message: '当前用户不存在',
      data: null,
    }

    return await next()
  }

  const [salt] = user.password.split(':')

  const hashedPassword = await hashPassword(password, salt)

  if (hashedPassword !== user.password) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      message: '密码错误',
      data: null,
    }
    return await next()
  }

  ctx.status = 200
  ctx.body = {
    code: 200,
    message: '登录成功',
    data: {
      accessToken: signJWT({
        id: user.id,
      }),
    },
  }

  await next()
}

export default {
  'get /auth/captcha': {
    handler: createCaptcha,
    whiteList: true,
  },
  'post /auth/login': {
    handler: login,
    whiteList: true,
  },
}
