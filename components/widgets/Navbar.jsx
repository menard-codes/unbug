import React from 'react'
import Link from 'next/link'
import navstyles  from './Navbar.module.css'

import Head from 'next/head'

function Navbar() {
    return (
        <>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet" />
        </Head>

        <nav className={navstyles.nav}>
            <Link href="/">
                <a>
                    <h1 style={{fontFamily: 'Roboto Slab'}}>UnBug</h1>
                </a>
            </Link>
            <Link href="/new-bug">
                <a>
                    <p>New Bug</p>
                </a>
            </Link>
            <Link href="/new-project">
                <a>
                    <p>New Project</p>
                </a>
            </Link>
            <Link href="/projects">
                <a>
                    <p>Projects</p>
                </a>
            </Link>
        </nav>
        </>
    )
}

export default Navbar
