import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from '../app/firebaseApp';
import { uiConfig } from '../config/firebaseuiAuthConfig';

import { useAuthState } from 'react-firebase-hooks/auth';

import Loading from '../components/elements/Loading';
import Error from '../components/elements/Error';
import { useRouter } from 'next/router';

/*
statically generated site.
    -client checks auth status
*/

function Login() {
    const [user, loading, error] = useAuthState(auth)
    const router = useRouter()

    if (loading) return <Loading />
    else if (error) <Error msg={error.message} />

    else if (user) {
        router.push('/')
        return <h1>Redirecting...</h1>
    }

    return (
        <div>
            <h1>Login</h1>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
    )
}

export default Login
