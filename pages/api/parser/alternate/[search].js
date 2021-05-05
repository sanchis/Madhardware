import nc from 'next-connect'
import { searchProduct } from 'parser/alternate'
import { ErrorHandler } from 'server/middlewares/error-handler'
import { CacheControl } from 'server/middlewares/cache-control'

const handler = nc({
  onError: ErrorHandler
}).use(CacheControl({ seconds: 86400 }))

handler.get((req, res) => {
  const { search } = req.query

  return searchProduct(search)
    .then(res.json)
    .catch(err => {
      console.error(`Alternate search - ${search}`, err)
      res.status(404).json({ error: 'Producto no encontrado' })
    })
})

export default handler
