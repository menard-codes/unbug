import React from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../app/firebaseApp'

import { getDocData } from '../../utils/serverSideFirestoreHandling'

import Loading from '../../components/elements/Loading'
import Error from '../../components/elements/Error'
import Navbar from '../../components/widgets/Navbar'

import { useRouter } from 'next/router'

/*
server side generated:
    -client checks login status
    -server access cookies
*/
export default function Bug({ data }) {
    const [user, loading, error] = useAuthState(auth);
    user && console.log(data)
    const router = useRouter()

    if (user || loading || error) {
        return (
            <>
                <Navbar />
                {loading && <Loading />}
                {error && <Error msg={error.message} />}
                {user && <h1>Bug Page</h1>}
            </>
        )
    }

    router.push('/login')
    return <h1>Redirecting...</h1>
}

export async function getServerSideProps(ctx) {
    const bugId = ctx.params.id;
    const bugDocPath = `Bugs/${bugId}`
    const {redirect, notFound, props} = await getDocData(ctx, bugDocPath);

    if (redirect) {
        return {redirect}
    } else if (notFound) {
        return {notFound}
    } else if (props) {
        return {props}
    }
}
