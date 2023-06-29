import {useRouter} from "next/router";

export default function PortfolioProjectPage() {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  return (
    <div>
      <h1>The Portfolio Project ID: {router.query.projectId}</h1>
    </div>
  )
}
