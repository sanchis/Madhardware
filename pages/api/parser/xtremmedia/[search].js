import nc from 'next-connect'
import { searchProduct } from 'parser/xtremmedia'
import { CacheControl } from 'server/middlewares/cache-control'
import { ErrorHandler } from 'server/middlewares/error-handler'

const handler = nc({
  onError: ErrorHandler
}).use(CacheControl({ seconds: 86400 }))

handler.get((req, res) => {
  const { search } = req.query
  console.log(search)
  return searchProduct(search)
    .then(res.json)
    .catch(err => {
      console.error(`Xtremmedia search - ${search}`, err)
      res.status(404).json({ error: 'Producto no encontrado' })
    })
})

export default handler
