import axios from 'axios'

export function searchPcc (text) {
  return axios.get(`/api/parser/pcc/${text}`)
    .then(res =>
      res.data || null // In case statusCode !== 200 data is undefined
    )
    .catch(null)
}
