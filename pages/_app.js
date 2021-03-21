import { AppLayaout } from 'components/AppLayout'
import Spinner from 'components/Spinner'
import '../styles/globals.css'
import theme from '../styles/theme'

import { ChakraProvider } from '@chakra-ui/react'

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
