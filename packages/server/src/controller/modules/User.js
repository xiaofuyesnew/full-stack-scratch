import { verifyJWT } from '@/utils'
import { prisma } from '~/prisma/client'

export async function getUserInfo(ctx, next) {
  // console.log(ctx.headers.authorization)
  const [,token] = ctx.headers.authorization.split(' ')

  const { id } = verifyJWT(token)

  // console.log(id)

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      phone: true,
    },
  })

  ctx.status = 200
  ctx.body = {
    code: 200,
    data: user,
    message: 'ok',
  }

  await next()
}

export default {
  'get /user/info': {
    handler: getUserInfo,
    whiteList: false,
  },
}
