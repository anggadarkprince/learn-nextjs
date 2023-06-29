import {useRouter} from "next/router";

export default function BlogPostsPage() {
  const router = useRouter();

  console.log('path', router.pathname);
  console.log('query', router.query);

  return (
    <div>
      <h1>Blog Page</h1>
      <p>{JSON.stringify(router.query, null, 2)}</p>
    </div>
  )
}
