import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


// TODO: Send user id
function NewProjectForm() {
    const [projectName, setProjectName] = useState('');
    const router = useRouter();

    const createProject = e => {
        e.preventDefault();
        // get project name, save to firestore
        // this returns an id, which will be used when redirecting to project page by passing this id to the serverside generated props
        axios.post('/api/add-project', {title: projectName}).then(data => {
            router.push(`/project/${data.data.id}`)
        })
    }

    return (
        <>
            <h1>New Project</h1>
            <form onSubmit={e => createProject(e)}>
                <label>Project Title</label>
                <input
                    type="text"
                    placeholder="Enter project title..."
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                />
                <button>Create</button>
            </form>
        </>
    )
}

export default NewProjectForm
