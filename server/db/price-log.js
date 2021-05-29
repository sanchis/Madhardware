/* eslint-disable camelcase */
import { db } from './db-client'

function getDb () {
  return db.from('price_log')
}

export function insertLog (values) {
  return getDb().insert(values)
}

export async function logPriceProduct (values) {
  const { price, product_id } = values
  const { data } = await getDb().select()
    .filter('price', 'eq', price)
    .filter('product_id', 'eq', product_id)
    .order('created_at', { ascending: false })
    .single()
  if (data) {
    return insertLog(values)
  }
  return Promise.resolve()
}
