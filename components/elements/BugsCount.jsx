import React from 'react'
import bugcountstyle from './BugsCount.module.css'

function BugsCount({ counts }) {
    return (
        <div className={bugcountstyle.layout}>
            <div>
                <p>Total Number of Bugs: {counts.numberOfBugs}</p>
                <p>Pending Bugs: {counts.numberOfBugBacklog}</p>
                <p>For Retest: {counts.numberOfRetestBacklog}</p>
                <p>Verified Fixed Bugs: {counts.numberOfVerifiedList}</p>
            </div>
            <div>
                <p>Defered Bugs: {counts.numberOfDeferedList}</p>
                <p>Duplicate Bugs: {counts.numberOfDuplicateList}</p>
                <p>Rejected Bugs: {counts.numberOfRejectedList}</p>
            </div>
        </div>
    )
}

export default BugsCount
