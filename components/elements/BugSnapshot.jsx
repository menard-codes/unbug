import React from 'react'


function BugSnapshot({ type, severity, description, expected, actual, attachments }) {
    return (
        <div>
            <h3>Type: {type}</h3>
            <h4>Severity: {severity}</h4>
            <p>Description: {description}</p>
            <p>Expected Value: {expected}</p>
            <p>Actual Value: {actual}</p>
            <p>Attachemnts: <i><strong>Note:</strong> I&apos;ll create a separate component for the links of attachments</i></p>
        </div>
    )
}

export default BugSnapshot
