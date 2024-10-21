import { prisma } from '~/prisma/client'

export async function getUserInfo(ctx, next) {
  ctx.status = 200
  ctx.body = 'test ok!'

  await next()
}

export async function getUserProfile(ctx, next) {
  const user = await prisma.user.findMany()

  ctx.status = 200
  ctx.body = user
  await next()
}

export default {
  'get /user/info': getUserInfo,
  'get /user/profile': getUserProfile,
}
