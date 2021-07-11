import React from 'react'
import NewBugForm from '../components/NewBugForm'


/*
statically generated site.
    -client checks auth status
*/

function NewBug() {
    return (
        <div>
            <h1>New Bug</h1>
            <NewBugForm />
        </div>
    )
}

export default NewBug
