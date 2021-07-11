import React, { useState, useEffect } from 'react'
import { storage, firebase } from '../../app/firebaseApp'
import { v4 } from 'uuid'
import { useRouter } from 'next/router'
import axios from 'axios'


// TODO: Migrate to using Formik
export default function NewBugForm({ownerId}) {
    const [title, setTitle] = useState('')
    const [testType, setTestType] = useState('')
    const [environment, setEnvironment] = useState('')
    const [reproSteps, setReproSteps] = useState('')
    const [severity, setSeverity] = useState('cathastrophic')
    const [description, setDescription] = useState('')
    const [expected, setExpected] = useState('')
    const [actual, setActual] = useState('')
    const attachments = []
    
    const router = useRouter()

    const storageFolderRef = v4()

    const handleSubmit = e => {
        e.preventDefault()
        // TODO: This doesn't consider the error from api. handle that
        const bugSnapshot = {
            type: 'bug',
            severity,
            description,
            expected,
            actual,
            attachments
        }
        const bugData = {
            ownerId,
            title,
            testType,
            status: 'new',
            environment,
            reproSteps,
            timeAdded: new firebase.firestore.Timestamp(),
            snapshots: [bugSnapshot]
        }
        axios.post('/api/new-bug', {bugData}).then(data => {
            router.push(`/bug/${data.data.id}`)
        })
    }

    const handleFileUpload = e => {
        const file = e.target.files[0];
        // save to firebase, take url, push to attachments
        const folderRef = storage.ref(`/Bugs/${storageFolderRef}`)
        const uploadTask = folderRef.put(file)
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
        }, error => {
        }, () => (uploadTask.snapshot.ref.getDownloadURL().then(data => attachments.push(data))))
    }

    return (
        <>
            <h1>Post New Bug</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label>Type of test conducted</label>
                <input
                    type="text"
                    value={testType}
                    onChange={e => setTestType(e.target.value)}
                />
                <label>Environment</label>
                <textarea
                    value={environment}
                    onChange={e => setEnvironment(e.target.value)}
                />
                <label>Repro Steps</label>
                <textarea
                    value={reproSteps}
                    onChange={e => setReproSteps(e.target.value)}
                />
                <h3>Bug Snapshot</h3>
                <label htmlFor="car">Severity</label>
                <select value={severity} onChange={e => setSeverity(e.target.value)}>
                    <option value="cathastropic" defaultValue>Catastrophic</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label>Expected Result</label>
                <textarea
                    value={expected}
                    onChange={e => setExpected(e.target.value)}
                />
                <label>Actual Result</label>
                <textarea
                    value={actual}
                    onChange={e => setActual(e.target.value)}
                />
                <label>Attachment</label>
                <input
                    type="file"
                    onChange={e => handleFileUpload(e)}
                />
                <button>Post New Bug</button>
            </form>
        </>
    )
}
