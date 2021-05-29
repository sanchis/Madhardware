import { db } from './db-client'
import { logPriceProduct } from './price-log'
import { insertProduct } from './product'

function getDb () {
  return db.from('product_shops')
}

export async function insertProductShop (values) {
  const data = await getDb().upsert(values)
  const priceProduct = { product_shop_id: data.data.id, price: data.data.price }
  logPriceProduct(priceProduct)
  insertProduct({ title: values.name })
  return data
}

export async function updateProductShop (values) {
  const data = await getDb().update(values)
  const priceProduct = { product_shop_id: data.data.id, price: data.data.price }
  logPriceProduct(priceProduct)
  return data
}
