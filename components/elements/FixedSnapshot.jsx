import React from 'react'


function FixedSnapshot({ type, expectedVsActual, descriptionOfFix, attachments }) {
    return (
        <div>
            <h3>Type: {type}</h3>
            <p>Description: {descriptionOfFix}</p>
            <p>Expected vs. Fixed Actual: {expectedVsActual}</p>
            <p>Attachemnts: <i><strong>Note:</strong> I&apos;ll create a separate component for the links of attachments</i></p>
        </div>
    )
}

export default FixedSnapshot
