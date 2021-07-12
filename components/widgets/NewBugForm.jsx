import React, { useState, useEffect } from 'react'
import { storage, firebase } from '../../app/firebaseApp'
import { v4 } from 'uuid'
import { useRouter } from 'next/router'
import axios from 'axios'
import newBugStyle from './NewBugForm.module.css'
import AttachmentIcon from '@material-ui/icons/Attachment';
import BugReportIcon from '@material-ui/icons/BugReport';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// TODO: Migrate to using Formik
export default function NewBugForm({ownerId, projects}) {
    const [title, setTitle] = useState('')
    const [proj, setProj] = useState('')
    const [testType, setTestType] = useState('')
    const [environment, setEnvironment] = useState('')
    const [reproSteps, setReproSteps] = useState('')
    const [severity, setSeverity] = useState('')
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
            proj,
            testType,
            status: 'new',
            environment,
            reproSteps,
            timeAdded: firebase.firestore.Timestamp.now(),
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
        <div className={newBugStyle.container}>
            <h1>Post New Bug <BugReportIcon fontSize="large" /></h1>
            <form onSubmit={e => handleSubmit(e)} className={newBugStyle.form}>
                <label>Title</label>
                <input
                    type="text"
                    required
                    className={newBugStyle.input}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label>Project</label>
                <Select
                    value={proj}
                    onChange={e => setProj(e.target.value)}
                >
                    {
                        projects.map(project => <MenuItem key={project.id} value={project.id}>{project.title}</MenuItem>)
                    }
                </Select>
                <label>Type of test conducted</label>
                <input
                    type="text"
                    required
                    className={newBugStyle.input}
                    value={testType}
                    onChange={e => setTestType(e.target.value)}
                />
                <label>Environment</label>
                <textarea
                    className={newBugStyle.input}
                    required
                    value={environment}
                    onChange={e => setEnvironment(e.target.value)}
                />
                <label>Repro Steps</label>
                <textarea
                    className={newBugStyle.input}
                    required
                    value={reproSteps}
                    onChange={e => setReproSteps(e.target.value)}
                />
                <h3>Bug Snapshot</h3>
                <label htmlFor="car">Severity</label>
                <Select
                    value={severity}
                    onChange={e => setSeverity(e.target.value)}
                >
                    <MenuItem value={'catastrophic'}>Catastrophic</MenuItem>
                    <MenuItem value={'high'}>High</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'low'}>Low</MenuItem>
                </Select>
                <label>Description</label>
                <textarea
                    className={newBugStyle.input}
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label>Expected Result</label>
                <textarea
                    required
                    className={newBugStyle.input}
                    value={expected}
                    onChange={e => setExpected(e.target.value)}
                />
                <label>Actual Result</label>
                <textarea
                    required
                    className={newBugStyle.input}
                    value={actual}
                    onChange={e => setActual(e.target.value)}
                />
                <label className={newBugStyle.file}>
                    Add Attachment <AttachmentIcon />
                    <input
                        type="file"
                        className={newBugStyle.fileInput}
                        onChange={e => handleFileUpload(e)}
                    />
                </label>
                <button
                    className={newBugStyle.btn}
                >
                    Post Bug
                </button>
            </form>
        </div>
    )
}
