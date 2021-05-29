import { db } from './db-client'

function getDb () {
  return db.from('product')
}

export function insertProduct (values) {
  return getDb().upsert(values)
}

export function updateProduct (values) {
  return getDb().update(values)
}
