import {useRouter} from "next/router";

export default function SelectedClientProjectsPage() {
  const router = useRouter();

  console.log('path', router.pathname);
  console.log('query', router.query);

  return (
    <div>
      <h1>Selected Project Client ID: {router.query.clientProjectId}</h1>
    </div>
  )
}
