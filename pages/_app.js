import { AppLayaout } from 'components/AppLayout'
import '../styles/globals.css'
import theme from '../styles/theme'

import { ChakraProvider } from '@chakra-ui/react'

export default function MyApp ({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppLayaout>
        <Component {...pageProps} />
      </AppLayaout>
    </ChakraProvider>
  )
}
