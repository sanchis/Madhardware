import { AppLayaout } from 'components/AppLayout'
import Spinner from 'components/Spinner'
import '../styles/globals.css'
import axios from 'axios'
import theme from '../styles/theme'

import { ChakraProvider } from '@chakra-ui/react'

/** SET UP BASE URL */
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? `https://${process.env.API_URL}` : `http://${process.env.API_URL}`
/** */
export default function MyApp ({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppLayaout>
        <Spinner />
        <Component {...pageProps} />
      </AppLayaout>
    </ChakraProvider>
  )
}
