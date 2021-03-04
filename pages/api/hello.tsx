import nc from 'next-connect'

const handler = nc()

handler.get((req, res) => {
  res.status(200).json({ name: 'John Doe' })
})

export default handler
