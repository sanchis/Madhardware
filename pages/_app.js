import { AppLayaout } from 'components/AppLayout'
import '../styles/variables.css'
import '../styles/globals.css'
import '../styles/inputs.css'
import '../styles/typography.css'

export default function MyApp ({ Component, pageProps }) {
  return (
    <AppLayaout>
      <Component {...pageProps} />
    </AppLayaout>
  )
}
