import React from 'react'

function NewBugForm() {
    return (
        <form>
            <label>Title</label>
            <input
                type="text"
            />
            <label>Type of test conducted</label>
            <input
                type="text"
            />
            <label>Environment</label>
            <textarea />
            <label>Environment</label>
            <textarea />
            <h3>Bug Snapshot</h3>
            <label>Severity</label>
            <select>
                <option>Select</option>
                <option>Catastrophic</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
            <label>Description</label>
            <textarea />
            <label>Expected Result</label>
            <textarea />
            <label>Actual Result</label>
            <textarea />
            <label>Attachment</label>
            <input
                type="file"
            />
        </form>
    )
}

export default NewBugForm
