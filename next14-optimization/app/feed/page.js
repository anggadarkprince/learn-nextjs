import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';
/*
export const metadata = {
    title: 'All Posts (X Posts)',
    description: 'List of all posts',
}
*/

export async function generateMetadata() {
    const posts = await getPosts();
    return {
        title: `All Posts (${posts.length} Posts)`,
        description: 'List of all posts',
    }
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
