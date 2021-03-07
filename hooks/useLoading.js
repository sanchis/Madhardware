import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Router from 'next/router'

export default function useLoading () {
  const [loading, setLoading] = useState(0)

  const inc = useCallback(() => setLoading(counter => counter + 1), [setLoading]) // add to counter
  const dec = useCallback(() => setLoading(counter => counter > 0 ? counter - 1 : counter), [setLoading]) // remove from counter

  const interceptors = useMemo(() => ({
    request: config => {
      inc()
      return config
    },
    response: response => {
      dec()
      return response
    },
    error: error => {
      dec()
      return error
    }
  }), [inc, dec]) // create the interceptors

  useEffect(() => {
    // add request interceptors
    const reqInterceptor = axios.interceptors.request.use(interceptors.request, interceptors.error)
    // add response interceptors
    const resInterceptor = axios.interceptors.response.use(interceptors.response, interceptors.error)
    return () => {
      // remove all intercepts when done
      axios.interceptors.request.eject(reqInterceptor)
      axios.interceptors.response.eject(resInterceptor)
    }
  }, [interceptors])

  useEffect(() => {
    const incrementByRouter = () => inc()
    const decrementByRouter = () => dec()

    Router.events.on('routeChangeStart', () => incrementByRouter())
    Router.events.on('routeChangeComplete', () => decrementByRouter())
    Router.events.on('routeChangeError', () => decrementByRouter())

    return () => {
      Router.events.off('routeChangeStart', () => incrementByRouter)
      Router.events.off('routeChangeComplete', () => decrementByRouter)
      Router.events.off('routeChangeError', () => decrementByRouter)
    }
  }, [])

  return [loading, setLoading]
}
