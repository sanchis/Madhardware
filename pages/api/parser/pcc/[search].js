import nc from 'next-connect'
import { searchProduct } from 'parser/pcc'

const handler = nc()

handler.get((req, res) => {
  const { search } = req.query
  console.log(search)
  searchProduct(search)
    .then(res.json)
    .catch(err => {
      console.error(err)
      res.json(err)
    })
})

export default handler
