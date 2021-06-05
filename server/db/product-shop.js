import { db } from './db-client'
import { logPriceProduct } from './price-log'
import { upsertProduct } from './product'

function getDb () {
  return db.from('product_shops')
}

export async function upsertProductShop ({ pn, name, url, price, img, shop }) {
  await upsertProduct({ pn, name })
  return getDb().upsert({
    id: generateId(pn, shop),
    url: url,
    img: img,
    price: price,
    shop: shop,
    product_id: pn
  }).then(async data => {
    if (data) {
      const priceProduct = { product_shop_id: data.data[0].id, price: data.data[0].price }
      await logPriceProduct(priceProduct)
    }
    return data
  })
}

function generateId (pn, shop) {
  return `${pn}_${shop}`
}
