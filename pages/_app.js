import { AppLayaout } from 'components/AppLayout'
import Spinner from 'components/Spinner'
import '../styles/variables.css'
import '../styles/globals.css'
import '../styles/inputs.css'
import '../styles/typography.css'
import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
export default function MyApp ({ Component, pageProps }) {
  return (
    <AppLayaout>
      <Spinner />
      <Component {...pageProps} />
    </AppLayaout>
  )
}
