import classes from './FeaturedPosts.module.css';
import PostsGrid from "@/components/posts/PostsGrid";
import {Post} from "@/types/Post";

function FeaturedPosts(props: {posts: Post[]}) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  )
}

export default FeaturedPosts;
