import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import newProjStyle from './NewProjectForm.module.css';


// TODO: Send user id
function NewProjectForm({ownerId}) {
    const [projectName, setProjectName] = useState('');
    const [notif, setNotif] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const createProject = e => {
        e.preventDefault();
        setLoading(true)
        if (projectName.length <= 3) {
            setNotif('Project Name must be at least 4 characters long.')
            setLoading(false)
        } else {
            setNotif('')
            axios.post('/api/add-project', {title: projectName, ownerId}).then(data => {
                router.push(`/project/${data.data.id}`)
            })
        }
    }

    return (
        <div className={newProjStyle.component}>
            <h1>New Project</h1>
            {notif && <h1>{notif}</h1>}
            <form onSubmit={e => createProject(e)} className={newProjStyle.form}>
                <label>Project Title</label>
                <input
                    type="text"
                    placeholder="Enter project title..."
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    className={newProjStyle.input}
                />
                {loading ? <button disabled className={newProjStyle.btn}>...</button> : <button className={newProjStyle.btn}>Create</button>}
            </form>
        </div>
    )
}

export default NewProjectForm
