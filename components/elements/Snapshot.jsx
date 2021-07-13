import React, { useState } from 'react'

import listItemStyle from './ProjectListItem.module.css'
import { useRouter } from 'next/router'
import { CircularProgress } from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

function Snapshot({ title, id }) {
    const router = useRouter()
    const [onBugLoad, setOnBugLoad] = useState(false)

    const handleClickBug = () => {
        setOnBugLoad(true)
        router.push(`/bug/${id}`)
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
            <div className={listItemStyle.listItem} onClick={handleClickBug}>
                {onBugLoad ? <CircularProgress /> : title}
            </div>
        </ThemeProvider>
    )
}

export default Snapshot
