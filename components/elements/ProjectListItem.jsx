import React from 'react'

import listItemStyle from './ProjectListItem.module.css'

import { useRouter } from 'next/router'

function ProjectListItem({ projectTitle, id }) {
    const router = useRouter()

    return (
        <div className={listItemStyle.listItem} onClick={() => router.push(`/project/${id}`)}>
            {projectTitle}
        </div>
    )
}

export default ProjectListItem
