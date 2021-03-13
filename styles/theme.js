import { extendTheme } from '@chakra-ui/react'
const colors = {
  brand: '#fd8737'
}

const components = {
  Input: {
    defaultProps: {
      focusBorderColor: 'brand'
    }
  }
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true
}
export default extendTheme({ colors, config, components })
