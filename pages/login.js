import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from '../app/firebaseApp';
import { uiConfig } from '../config/firebaseuiAuthConfig';


/*
statically generated site.
    -client checks auth status
*/

function Login() {
    return (
        <div>
            <h1>Login</h1>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
    )
}

export default Login
