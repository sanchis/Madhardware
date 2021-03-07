import { AppLayaout } from 'components/AppLayout'
import Spinner from 'components/Spinner'
import '../styles/variables.css'
import '../styles/globals.css'
import '../styles/inputs.css'
import '../styles/typography.css'

export default function MyApp ({ Component, pageProps }) {
  return (
    <AppLayaout>
      <Spinner />
      <Component {...pageProps} />
    </AppLayaout>
  )
}
