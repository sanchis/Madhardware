import axios from 'axios'

export function searchPcc (text) {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'

  return axios.get(`${url}/api/parser/pcc/${text}`)
    .then(res =>
      res.data || null // In case statusCode !== 200 data is undefined
    )
    .catch(null)
}
