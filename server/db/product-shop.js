import { db, onErrorDb } from './db-client'
import { logPriceProduct } from './price-log'

export async function upsertProductShop ({ pn, name, url, price, img, shop, description }) {
  return db.productShop.upsert({
    where: {
      id: generateId(pn, shop)
    },
    update: {
      url: url,
      img: img,
      price: price,
      priceLogs: {
        create: await logPriceProduct({ price, productShopId: generateId(pn, shop) })
      }
    },
    create: {
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
  }).catch(err => onErrorDb(err))
}

function generateId (pn, shop) {
  return `${pn}_${shop}`
}
