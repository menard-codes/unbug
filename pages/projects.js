import React from 'react'
import { getCollectionSnapshot } from '../utils/serverSideFirestoreHandling'


/*
server side generated:
    -client checks login status
    -server access cookies
*/
export default function Projects({ data }) {
    data && console.log(data)

    return (
        <div>
            <h1>Projects</h1>
        </div>
    )
}

/*
projects list:
    -projects reference
        -project title
        -project id
*/

export async function getServerSideProps(ctx) {
    const {redirect, collectionSnapshot} = await getCollectionSnapshot(ctx, 'Project');
    
    if (redirect) {
        return {redirect}
    } else if (collectionSnapshot) {
        const projectsData = collectionSnapshot.docs.map(projectSnapshot => {
            const projectData = projectSnapshot.data();
            return {
                projectTitle: projectData.title,
                projectId: projectSnapshot.id
            }
        })
        return {props: {data: projectsData}}
    }

    return
}
