import { db, onErrorDb } from './db-client'
import { logPriceProduct } from './price-log'

export async function upsertProductShop (values) {
  return db.productShop.upsert({
    where: {
      id: generateId(values.pn, values.shop)
    },
    update: await updateObjPorductShop(values),
    create: await createObjProductShop(values)
  }).catch(err => onErrorDb(err))
}

async function updateObjPorductShop ({ url, img, price, pn, shop }) {
  return {
    url: url,
    img: img,
    price: price,
    priceLogs: {
      create: await logPriceProduct({ price, productShopId: generateId(pn, shop) })
    }
  }
}

async function createObjProductShop ({ pn, shop, url, img, price, name, description }) {
  return {
    id: generateId(pn, shop),
    url: url,
    img: img,
    price: price,
    product: {
      create: {
        id: pn,
        name: name,
        productDescription: {
          create: {
            description
          }
        }
      }
    },
    priceLogs: {
      create: await logPriceProduct({ price, productShopId: generateId(pn, shop) })
    }
  }
}

function generateId (pn, shop) {
  return `${pn}_${shop}`
}
