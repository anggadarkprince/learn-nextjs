import {useRouter} from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();

  const loadProjectHandler = () => {
      //router.push('/clients/angga-ari/project-a')
      router.push({
        pathname: '/clients/[id]/[clientProjectId]',
        query: {id: router.query.id, clientProjectId: 'project-a'}
      })
      //router.replace('/clients/angga-ari/project-a')
  }

  return (
    <div>
      <h1>The Projects of a Given Client Page</h1>
      <button onClick={loadProjectHandler}>Load Project {router.query.id}</button>
    </div>
  )
}
