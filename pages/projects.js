import React from 'react'
import { getCollectionSnapshot } from '../utils/serverSideFirestoreHandling'

import Navbar from '../components/widgets/Navbar'
import Loading from '../components/elements/Loading'
import Error from '../components/elements/Error'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../app/firebaseApp'

import ProjectListItem from '../components/elements/ProjectListItem'


/*
server side generated:
-client checks login status
-server access cookies
*/
export default function Projects({ projectsData }) {
    const [user, loading, error] = useAuthState(auth)
    const [onProjectLoad, setOnProjectLoad] = useState(false)
    projectsData && console.log(projectsData)

    if (user || loading || error) {
        return (
            <>
                <Navbar />
                {loading && <Loading />}
                {error && <Error msg={error.message} />}
                {user && (
                  <>
                    <h1>Projects List</h1>
                    <ul>
                        {
                            projectsData.map(project => (
                                <li key={project.projectId} style={{listStyle: 'none'}}>
                                    <ProjectListItem projectTitle={project.projectTitle} id={project.projectId} />
                                </li>
                            ))
                        }
                    </ul>
                  </>
                )}
            </>
          )
      }
    
      router.push('/login')
      return <h1>Redirecting...</h1>    
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
        return {props: {projectsData}}
    }

    return
}
