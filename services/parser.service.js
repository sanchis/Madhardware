import axios from 'axios'

export function searchPcc (text) {
  return axios.get(`http://localhost:3000/api/parser/pcc/${text}`)
    .then(res => res.data || null)
    .catch(null)
}
