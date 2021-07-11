import React, {useEffect} from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/firebaseApp';
import Loading from '../components/elements/Loading';
import Error from '../components/elements/Error';
import NewProjectForm from '../components/widgets/NewProjectForm';

/*
statically generated site.
    -client checks auth status
*/

export default function NewProject() {
    /*
    requires sign in
    just asks title
    */
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    
    if (loading) return <Loading />
    else if (error) return <Error msg={error} />
    else if (user) return <NewProjectForm />
    
    router.push('/login')
    return <h1>Redirecting...</h1>
}

