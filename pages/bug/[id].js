import React from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../app/firebaseApp'

import { getDocData } from '../../utils/serverSideFirestoreHandling'

import Loading from '../../components/elements/Loading'
import Error from '../../components/elements/Error'


/*
server side generated:
    -client checks login status
    -server access cookies
*/
export default function Bug({ data }) {
    const [user, loading, error] = useAuthState(auth);
    user && console.log(data)

    if (loading) return <Loading />
    else if (error) return <Error msg={error.message} />
    else if (user) {
        return (
            <div>
                <h1>Bug Page</h1>
            </div>
        )    
    }
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
