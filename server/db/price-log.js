/* eslint-disable camelcase */
import { db } from './db-client'

export async function logPriceProduct ({ price, productShopId }) {
  const exist = await db.priceLog.findFirst({
    where: {
      productShopId: productShopId,
      price: price
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  if (exist) {
    return Promise.resolve(undefined)
  } else {
    return Promise.resolve({
      price: price
    })
  }
}
