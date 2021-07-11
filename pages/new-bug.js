import React from 'react'
import NewBugForm from '../components/widgets/NewBugForm'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../app/firebaseApp'

import { useRouter } from 'next/router'

import Loading from '../components/elements/Loading'
import Error from '../components/elements/Error'

/*
statically generated site.
    -client checks auth status
*/

function NewBug() {
    const [user, loading, error] = useAuthState(auth)
    const router = useRouter()

    if (loading) return <Loading />
    else if (error) return <Error msg={error.message} />

    else if (user) {
        const uid = user.uid
        return (
            <div>
                <NewBugForm ownerId={uid} />
            </div>
        )    
    }

    router.push('/login')
    return <h1>Redirecting...</h1>
}

export default NewBug
