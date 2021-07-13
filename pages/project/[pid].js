import React from 'react'
import { useRouter } from 'next/router'
import { getCollectionSnapshot, getDocData } from '../../utils/serverSideFirestoreHandling'
import Navbar from '../../components/widgets/Navbar'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../app/firebaseApp'

import Loading from '../../components/elements/Loading'
import Error from '../../components/elements/Error'

import BugsCount from '../../components/elements/BugsCount'
import SimpleTabs from '../../components/elements/TabsBar'

import layout from '../../styles/layout.module.css'

/*
server side generated:
    -client checks login status
    -server access cookies
*/


// TODO: Render the data
// TODO: Auth
export default function Project({ projectTitle, backlogs, counts, lists }) {
    const [user, loading, error] = useAuthState(auth)
    const router = useRouter()
    console.log(backlogs, lists)

    if (user || loading || error) {
        return (
            <>
                <Navbar />
                <div className={layout.layout}>
                    {loading && <Loading />}
                    {error && <Error msg={error.message} />}
                    {user && (
                        <>
                            <h1>{projectTitle}</h1>
                            <div>
                                <BugsCount counts={counts} />
                                <SimpleTabs
                                    tabs={['Pending Bugs', 'For Retest', 'Verified Bugs', 'Defered Bugs', 'Duplicate Bugs', 'Rejected Bugs']}
                                    pending={backlogs.BugBacklog}
                                    retest={backlogs.RetestBacklog}
                                    verified={lists.VerifiedList}
                                    defered={lists.DeferedList}
                                    duplicate={lists.DuplicateList}
                                    rejected={lists.RejectedList}
                                />
                            </div>
                        </>
                    )}
                </div>
            </>
        )
    }

    router.push('/login')
    return <h1>Redirecting...</h1>
}

export async function getServerSideProps(ctx) {
    const projectId = ctx.params.pid;
    const {redirect, notFound, props} = await getDocData(ctx, `Project/${projectId}`)

    if (redirect) {
        return {redirect}
    } else if (notFound) {
        return {notFound}
    } else if (props) {
        const {data} = props
        const projectTitle = data.title

        const {redirect, collectionSnapshot} = await getCollectionSnapshot(ctx, 'Bugs');

        if (redirect) {
            return redirect
        } else if (collectionSnapshot) {
            const BugBacklog = collectionSnapshot
                                .docs
                                .filter(bugSnapshot => ['new', 'open', 'reopen'].includes(bugSnapshot.data().status))
                                .map(bugSnapshot => {
                                    const data = bugSnapshot.data()
                                    data['time added'] = Date(data['time added'])
                                    data['id'] = bugSnapshot.id
                                    return data
                                })
            const RetestBacklog = collectionSnapshot
                                    .docs
                                    .filter(bugSnapshot => ['fixed', 'retest'].includes(bugSnapshot.data().status))
                                    .map(bugSnapshot => {
                                        const data = bugSnapshot.data()
                                        data['time added'] = Date(data['time added'])
                                        data['id'] = bugSnapshot.id
                                        return data
                                    })

            const DeferedList = collectionSnapshot
                                    .docs
                                    .filter(bugSnapshot => bugSnapshot.data().status === 'defered')
                                    .map(bugSnapshot => {
                                        const data = bugSnapshot.data()
                                        data['time added'] = Date(data['time added'])
                                        data['id'] = bugSnapshot.id
                                        return data
                                    })
            const RejectedList = collectionSnapshot
                                    .docs
                                    .filter(bugSnapshot => bugSnapshot.data().status === 'rejected')
                                    .map(bugSnapshot => {
                                        const data = bugSnapshot.data()
                                        data['time added'] = Date(data['time added'])
                                        data['id'] = bugSnapshot.id
                                        return data
                                    })
            const DuplicateList = collectionSnapshot
                                    .docs
                                    .filter(bugSnapshot => bugSnapshot.data().status === 'duplicate')
                                    .map(bugSnapshot => {
                                        const data = bugSnapshot.data()
                                        data['time added'] = Date(data['time added'])
                                        data['id'] = bugSnapshot.id
                                        return data
                                    })
            const VerifiedList = collectionSnapshot
                                    .docs
                                    .filter(bugSnapshot => bugSnapshot.data().status === 'verified')
                                    .map(bugSnapshot => {
                                        const data = bugSnapshot.data()
                                        data['time added'] = Date(data['time added'])
                                        data['id'] = bugSnapshot.id
                                        return data
                                    })
            
            const numberOfBugs = collectionSnapshot.size;
            const numberOfBugBacklog = BugBacklog.length;
            const numberOfRetestBacklog = RetestBacklog.length;
            const numberOfDeferedList = DeferedList.length;
            const numberOfRejectedList = RejectedList.length;
            const numberOfDuplicateList = DuplicateList.length;
            const numberOfVerifiedList = VerifiedList.length;

            return {
                props: {
                    projectTitle,
                    backlogs: {
                        BugBacklog,
                        RetestBacklog,    
                    },
                    lists: {
                        DeferedList,
                        RejectedList,
                        DuplicateList,
                        VerifiedList,    
                    },
                    counts: {
                        numberOfBugs,
                        numberOfBugBacklog,
                        numberOfRetestBacklog,
                        numberOfDeferedList,
                        numberOfRejectedList,
                        numberOfDuplicateList,
                        numberOfVerifiedList    
                    }
                }
            }
        }
    }
    return
}
