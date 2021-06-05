import { db } from './db-client'

function getDb () {
  return db.from('product')
}

export function upsertProduct ({ pn, name }) {
  return getDb().upsert({
    id: pn,
    name: name
  })
}

// export function updateProduct (values) {
//   return getDb().update(values)
// }
