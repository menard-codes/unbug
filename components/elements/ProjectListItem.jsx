import React, { useState } from 'react'
import listItemStyle from './ProjectListItem.module.css'
import { useRouter } from 'next/router'
import { CircularProgress } from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'


function ProjectListItem({ projectTitle, id }) {
    const router = useRouter()
    const [onProjectLoad, setOnProjectLoad] = useState(false)

    const handleClickProject = () => {
        setOnProjectLoad(true)
        router.push(`/project/${id}`)
    }
    
    const theme = createTheme({
        palette: {
            primary: {
                main: grey[300]
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <div className={listItemStyle.listItem} onClick={handleClickProject}>
                {onProjectLoad ? <CircularProgress /> : projectTitle}
            </div>
        </ThemeProvider>
    )
}

export default ProjectListItem
