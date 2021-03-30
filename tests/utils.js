import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import '@testing-library/jest-dom'
import theme from '../styles/theme'
import React from 'react'
import { AppLayaout } from '../components/AppLayout'

const ChakraRenderer = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <AppLayaout>
        {children}
      </AppLayaout>
    </ChakraProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {
    wrapper: ChakraRenderer,
    ...options
  })

export * from '@testing-library/react'
export { customRender as render }
