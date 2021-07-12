import { auth } from '../app/firebaseApp'
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth'

import Loading from '../components/elements/Loading'
import Error from '../components/elements/Error'
import Navbar from '../components/widgets/Navbar'

/*
Nothing is here yet
server side generated:
    -client checks login status
    -server access cookies
*/

export default function Home() {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter();
  const handleSignOut = () => {
    auth.signOut()
    router.push('/login')
  }

  if (user || loading || error) {
    return (
        <>
            <Navbar />
            {loading && <Loading />}
            {error && <Error msg={error.message} />}
            {user && (
              <>
                <h1>Main Page</h1>
                <button onClick={handleSignOut}>Sign Out</button>
              </>
            )}
        </>
      )
  }

  router.push('/login')
  return <h1>Redirecting...</h1>

}
