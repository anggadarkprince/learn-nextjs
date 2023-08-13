import classes from "./PostsGrid.module.css";
import PostItem from "@/components/posts/PostItem";
import {Post} from "@/types/Post";

function PostsGrid(props: {posts: Post[]}) {
  const {posts} = props;

  return (
    <ul className={classes.grid}>
      {posts.map(post => <PostItem key={post.slug} post={post} />)}
    </ul>
  )
}

export default PostsGrid;
