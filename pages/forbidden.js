import React from 'react'
import Navbar from '../components/widgets/Navbar'

function Forbidden() {
    return (
        <>
            <Navbar />
            <div>
                <h1>403 Forbidden: You&apos;re not allowed here</h1>
            </div>
        </>
    )
}

export default Forbidden
