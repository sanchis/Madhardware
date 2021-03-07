import { AppLayaout } from 'components/AppLayout'
import Spinner from 'components/Spinner'
import '../styles/variables.css'
import '../styles/globals.css'
import '../styles/inputs.css'
import '../styles/typography.css'
import axios from 'axios'

/** SET UP BASE URL */
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? `https://${process.env.API_URL}` : `http://${process.env.API_URL}`
/** */
export default function MyApp ({ Component, pageProps }) {
  return (
    <AppLayaout>
      <Spinner />
      <Component {...pageProps} />
    </AppLayaout>
  )
}
