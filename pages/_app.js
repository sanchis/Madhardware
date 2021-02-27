import { AppLayaout } from 'components/AppLayout'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <AppLayaout>
      <Component {...pageProps} />
    </AppLayaout>
  )
}

export default MyApp
