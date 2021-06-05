import nc from 'next-connect'
import { searchProduct } from 'parser/coolmod'
import { ErrorHandler } from 'server/utils/error-handler'

const handler = nc({
  onError: ErrorHandler
})

handler.get((req, res) => {
  const { search } = req.query

  return searchProduct(search)
    .then(res.json)
})

export default handler
