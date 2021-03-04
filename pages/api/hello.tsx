import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc()

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' })
})

export default handler
