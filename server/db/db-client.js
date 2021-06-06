import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

export function onErrorDb (err) {
  console.error('-- ERROR DB --')
  console.error(err)
}
