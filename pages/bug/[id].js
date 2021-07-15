// React
import React from 'react'

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../app/firebaseApp'

// next js
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

// util
import { getDocData } from '../../utils/serverSideFirestoreHandling'

// Components
import Loading from '../../components/elements/Loading'
import Error from '../../components/elements/Error'
import Navbar from '../../components/widgets/Navbar'
import BugSnapshot from '../../components/elements/BugSnapshot'
import FixedSnapshot from '../../components/elements/FixedSnapshot'


/*
server side generated:
    -client checks login status
    -server access cookies
*/
export default function Bug({ data }) {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter()

    if (user || loading || error) {

        // TODO: Move this to CSS
        const underline = {
            textDecoration: 'underline',
            marginLeft: '10px'
        }
        const linkStyle = {
            color: '#2b73ad',
            textDecoration: 'underline 3px #3b98e3',
            marginLeft: '10px'
        }
        const dateCreated = new Date(data['time added']).toDateString()

        return (
            <>
                <Navbar />
                {loading && <Loading />}
                {error && <Error msg={error.message} />}
                {user && (
                       <>
                            <Head>
                                <title>{data.title}</title>
                            </Head>
                            <div>
                                <h1>Issue: <span style={underline}>{data.title}</span></h1>
                                <h3>Status: <span style={underline}>{data.status}</span></h3>
                                <time>Time Added: <span style={underline}>{dateCreated}</span></time>
                                <p>Project: 
                                    <Link href={`/project/${data.proj?.id}`}>
                                        <a><span style={linkStyle}>{data.proj.title}</span></a>
                                    </Link>
                                </p>
                                <p>Test Conducted when discovered: <span style={underline}>{data.testType}</span></p>
                                <p>Environment: <span style={underline}>{data.environment}</span></p>
                                <p>Steps to reproduce: <span style={underline}>{data.reproSteps}</span></p>
                                <h3>Snapshots:</h3>
                                <ul>
                                    {
                                        data.snapshots.map((snapshot, i) => {
                                            if (snapshot?.type?.toLowerCase() === 'bug') {
                                                const { type, severity, description, expected, actual, attachments } = snapshot;
                                                return (
                                                    <li key={i}>
                                                        <BugSnapshot
                                                            type={type}
                                                            severity={severity}
                                                            description={description}
                                                            expected={expected}
                                                            actual={actual}
                                                            attachments={attachments}
                                                        />
                                                    </li>
                                                )
                                            } else if (snapshot?.type?.toLowerCase === 'fix') {
                                                const { type, expectedVsActual, descriptionOfFix, attachments } = snapshot;
                                                return (
                                                    <li key={i}>
                                                        <FixedSnapshot
                                                            type={type}
                                                            expectedVsActual={expectedVsActual}
                                                            description={descriptionOfFix}
                                                            attachments={attachments}
                                                        />
                                                    </li>
                                                )
                                            }
                                            // TODO: add later: defered, rejected, duplicate, verified
                                        })
                                    }
                                </ul>
                            </div>
                        </>
                    )
                }
            </>
        )
    }

    router.push('/login')
    return <h1>Redirecting...</h1>
}

export async function getServerSideProps(ctx) {
    // take the bug id, query firestore, send props to component
    const { id } = ctx.params;
    const { redirect, notFound, props } = await getDocData(ctx, `Bugs/${id}`);

    if (redirect) return {redirect}
    else if (notFound) return {notFound}

    delete props.data.ownerId
    // get project title
    const project = await getDocData(ctx, `Project/${props.data.proj}`)
    if (project?.redirect) return {redirect: project.redirect}
    else if (project?.notFound) return {notFound: project.notFound}

    props.data.proj = {
        title: project?.props?.data?.title,
        id: props.data.proj
    }

    return {props}
}
