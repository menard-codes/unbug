import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import navstyles  from './Navbar.module.css'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../app/firebaseApp'
import Image from 'next/image'
import { LinearProgress } from '@material-ui/core'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'


function Navbar() {
    const [pathName, setPathName] = useState('')
    const [onLoad, setOnLoad] = useState(false)
    const [user, loading, error] = useAuthState(auth)

    useEffect(() => {
        setPathName(window.location.pathname)
    }, [pathName])
 
    useEffect(() => {
        setOnLoad(false)
    }, [])

    const theme = createTheme({
        palette: {
            primary: {
                main: grey[900]
            }
        }
    })

    return (
        <>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet" />
        </Head>

        <nav className={navstyles.nav}>
            <Link href="/">
                <a style={{fontFamily: 'Roboto Slab', fontSize: '2rem', fontWeight: 'bolder'}}
                    onClick={() => setOnLoad(pathName !== '/')}
                >
                    UnBug
                </a>
            </Link>
            <Link href="/projects">
                <a className={pathName === '/projects' ? navstyles.activeLink : navstyles.link}
                    onClick={() => setOnLoad(pathName !== '/projects')}
                >
                    Projects
                </a>
            </Link>
            <Link href="/new-bug">
                <a className={pathName === '/new-bug' ? navstyles.activeLink : navstyles.link}
                    onClick={() => setOnLoad(pathName !== '/new-bug')}
                >
                    New Bug
                </a>
            </Link>
            <Link href="/new-project">
                <a className={pathName === '/new-project' ? navstyles.activeLink : navstyles.link}
                    onClick={() => setOnLoad(pathName !== '/new-project')}
                >
                    New Project
                </a>
            </Link>
            {user && <Image src={user.photoURL} alt='user' width={40} height={40} className={navstyles.avatar} />}
        </nav>
        {onLoad && (
            <ThemeProvider theme={theme}>
                <LinearProgress />
            </ThemeProvider>
        )}
        </>
    )
}

export default Navbar
