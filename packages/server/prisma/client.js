import process from 'node:process'

import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

process.on('SIGINT', () => {
  prisma.$disconnect()
})
