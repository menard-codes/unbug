import React from 'react'
import NewBugForm from '../components/widgets/NewBugForm'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../app/firebaseApp'

import { useRouter } from 'next/router'

import Loading from '../components/elements/Loading'
import Error from '../components/elements/Error'

import Navbar from '../components/widgets/Navbar'
import { getCollectionSnapshot } from '../utils/serverSideFirestoreHandling'


/*
statically generated site.
    -client checks auth status
*/

export default function NewBug({ projects }) {
    const [user, loading, error] = useAuthState(auth)
    const router = useRouter()
    projects && console.log(projects)

    if (user || loading || error) {
        return (
            <>
                <Navbar />
                {loading && <Loading />}
                {error && <Error msg={error.message} />}
                {user && <NewBugForm ownerId={user.uid} projects={projects} />}
            </>
          )
      }
    
    router.push('/login')
    return <h1>Redirecting...</h1>    
}

export async function getServerSideProps(ctx) {
    // TODO: Query database for all the projects this user owns
    // I need to refer to a collection
    const {redirect, collectionSnapshot} = await getCollectionSnapshot(ctx, 'Project')

    if (redirect) return {redirect}
    else if (collectionSnapshot) {
        // get all documents and access the title
        const projects = collectionSnapshot.docs.map(projSnapshot => {
            const data = projSnapshot.data();
            return {title: data.title, id: projSnapshot.id}
        })
        return {props: {projects}}
    }
}
