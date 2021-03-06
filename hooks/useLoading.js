import axios from 'axios'
import { useState } from 'react'

export default function useLoading () {
  const [loading, setLoading] = useState(0)

  function incrementLoading () {
    setLoading(state => state + 1)
  }

  function decrementLoading () {
    setLoading(state => state > 0 ? state - 1 : 0)
  }

  axios.interceptors.request.use((req) => {
    incrementLoading()
    return req
  })
  axios.interceptors.response.use(
    (res) => {
      decrementLoading()
      return res
    },
    (err) => {
      decrementLoading()
      return err
    }
  )

  return [loading, setLoading]
}
