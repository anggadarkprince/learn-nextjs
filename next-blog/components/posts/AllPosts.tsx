import classes from './AllPosts.module.css';
import PostsGrid from "@/components/posts/PostsGrid";
import {Post} from "@/types/Post";

function AllPosts(props: {posts: Post[]}) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default AllPosts;
