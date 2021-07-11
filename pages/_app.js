import { useEffect } from 'react'
import { auth } from '../app/firebaseApp'
import nookies from 'nookies'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async user => {
      // if user, set cookies, else, empty it
      if (user) {
        const token = await user.getIdToken()
        nookies.set(null, 'token', token, {sameSite: "strict"})
      } else {
        nookies.destroy(null, 'token', {})
      }
    })
    return () => unsub
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
