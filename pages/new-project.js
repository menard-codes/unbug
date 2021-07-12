import React, {useEffect} from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/firebaseApp';
import Loading from '../components/elements/Loading';
import Error from '../components/elements/Error';
import NewProjectForm from '../components/widgets/NewProjectForm';
import Navbar from '../components/widgets/Navbar';

/*
statically generated site.
    -client checks auth status
*/

export default function NewProject() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    
    if (user || loading || error) {
        return (
            <>
                <Navbar />
                {loading && <Loading />}
                {error && <Error msg={error.message} />}
                {user && (
                  <>
                    <NewProjectForm ownerId={user.uid} />
                  </>
                )}
            </>
          )
      }
    
      router.push('/login')
      return <h1>Redirecting...</h1>
    
}

