/* eslint-disable camelcase */
import { db } from './db-client'

function getDb () {
  return db.from('price_log')
}

export function insertLog (values) {
  return getDb().insert(values)
}

export async function logPriceProduct ({ price, product_shop_id }) {
  const { data } = await getDb().select()
    .filter('price', 'eq', price)
    .filter('product_shop_id', 'eq', product_shop_id)
    .order('created_at', { ascending: false })
    .single()
  if (!data) {
    return insertLog({ price, product_shop_id })
  }
  return Promise.resolve()
}
